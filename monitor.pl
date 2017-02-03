use strict;
use warnings;
use Mojo::UserAgent;
use Mojo::UserAgent::Proxy;
use Mojo::UserAgent::Transactor;
use JavaScript::Beautifier;
use Mojo::Util ();
use Carp;
use POSIX ();

my $ua = Mojo::UserAgent->new(
    proxy          => sub{ my $proxy = Mojo::UserAgent::Proxy->new;$proxy->detect;$proxy}->(),
    max_redirects  => 7,
    transactor     => Mojo::UserAgent::Transactor->new(
        name       => 'Mozilla/5.0 (Windows NT 6.1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/37.0.2062'
    ),
);

my @list = (
    {url=>'https://ui.ptlogin2.qq.com/js/10185/mq_comm.js',path=>'./smartqq/mq_comm.js'},
    {url=>'http://pub.idqqimg.com/smartqq/js/mq.js',path=>'./smartqq/mq.js'},
    {url=>'https://wx.qq.com/',path=>'./weixin/index.js'},
);
sub _log{
    my $log = POSIX::strftime('%Y/%m/%d %H:%M:%S ',localtime()) . join("",@_) . "\n";
    print $log;
    return $log;
}

$| = 1;
my $is_need_push = 0 ;
my $commit_message = '';
while(1){
    for (@list){
        my($url,$path) = ($_->{url},$_->{path});
        eval{
            #_log "[$path] detecting";
            my $tx = $ua->get($url);
            if (!$tx->success) {
                my $err = $tx->error;
                die "$err->{code} response: $err->{message}" if $err->{code};
                die "Connection error: $err->{message}";
            }
            my $data = $tx->res->body;
            if($url eq 'https://wx.qq.com/'){
                $data=~m#<script .*? src="(.*//res\.wx\.qq\.com/.*?/index_.*?\.js)"></script>#;
                if($1){
                    $url = $1;
                    $url = 'https:' . $url if $url!~/^https?:/;
                    $tx = $ua->get($url);
                    if (!$tx->success) {
                        my $err = $tx->error;
                        die "$err->{code} response: $err->{message}" if $err->{code};
                        die "Connection error: $err->{message}";
                    }
                    $data = $tx->res->body;
                }
                else{die "[$url] url not found"}
            }
            if($tx->res->headers->content_type =~/^(text|application)\/(x-)?javascript/){
                $data = JavaScript::Beautifier::js_beautify($data); 
            }
            my $new_md5 = Mojo::Util::md5_sum($data); 
            my $new_lm = $tx->res->headers->last_modified;
            if(-f $path){
                my $old_md5 = Mojo::Util::md5_sum(slurp($path));
                if ($old_md5 eq $new_md5){
                    _log "[$path] unchanged";
                }
                else{
                    Mojo::Util::spurt($data,$path);
                    my $log =_log "[$path] changed $new_lm";
                    $is_need_push = 1;
                    $commit_message .= "\n$log";
                }
            }
            else{
                Mojo::Util::spurt($data,$path);
                my $log = _log "[$path] created";
                $is_need_push = 1;
                $commit_message .= "\n$log";
            }
        };
        _log $@ if $@;
    }
    if($is_need_push){
        system("git commit -a -m '$commit_message' && git push origin master --force")==0  ?
            _log("git pushed") :
            _log("git pushed fail $!")
        ;
        $is_need_push = 0;
        $commit_message = "";
    }
    sleep 3600;
}

sub slurp {
    my $path = shift;
    open my $file, '<', $path or Carp::croak qq{Can't open file "$path": $!};
    my $ret = my $content = '';
    while ($ret = $file->sysread(my $buffer, 131072, 0)) { $content .= $buffer }
    Carp::croak qq{Can't read from file "$path": $!} unless defined $ret;
    return $content;
}
