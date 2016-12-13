function getCookie(t) {
    return pt.cookie.get(t)
}
function setCookie(t) {
    pt.cookie.set(t.value)
}
function ptui_onEnableLLogin(t) {
    var e = t.low_login_enable,
    i = t.low_login_hour;
    null != e && null != i && (i.disabled = !e.checked)
}
function ptui_setDefUin(t, e) {
    if (!e) {
        var e = unescape(pt.cookie.get("ptui_loginuin")),
        i = pt.chkAccount;
        g_appid != t_appid && (i.isNick(e) || i.isName(e)) && (e = pt.cookie.get("pt2gguin").replace(/^o/, "") - 0, e = 0 == e ? "" : e),
        defaultuin = e
    }
    e && (t.u.value = e)
}
function ptui_needVC(t, e) {
    if (pt.chkAccount.isQQ(t) && (document.cookie = "chkuin=" + t + ";domain=ptlogin2." + g_domain + ";path=/"), t = pt.needAt ? pt.needAt : t, pt.ckNum[t]) {
        if (2 == pt.ckNum[t]) return void pt.show_err(str_net_error);
        pt.ckNum[t]++
    } else pt.ckNum = {},
    pt.ckNum[t] = 1;
    var i = (pt.isHttps ? "https://ssl." : "http://check.") + "ptlogin2." + g_domain + "/check?";
    2 == pt.regmaster ? i = "http://check.ptlogin2.function.qq.com/check?regmaster=2&" : 3 == pt.regmaster && (i = "http://check.ptlogin2.crm2.qq.com/check?regmaster=3&"),
    i += "pt_tea=2&uin=" + t + "&appid=" + e + "&js_ver=" + window.g_pt_version + "&js_type=" + pt.js_type + "&login_sig=" + window.g_login_sig + "&u1=" + encodeURIComponent(document.forms[0].u1.value) + "&r=" + Math.random(),
    pt.loadScript(i),
    g_loadcheck = !0
}
function ptui_checkVC(t, e, i, n, r) {
    if (clearTimeout(checkClock), !i) return g_uin = "0",
    void check();
    if (pt.ckNum[pt.needAt ? pt.needAt : sys.$("u").value.trim()] = 0, "\x00\x00\x00\x00\x00\x00'" == i) return g_uin = "0",
    void pt.show_err(str_inv_uin);
    pt.isRandSalt = r,
    pt.salt = i,
    pt.uin = i,
    pt.submitN[pt.uin] || (pt.submitN[pt.uin] = 1);
    var o = new Date;
    g_time.time7 = o;
    var a = {
        12: g_time.time7 - g_time.time6
    };
    curXui || ptui_speedReport(a),
    g_loadcheck = !1,
    g_submitting || ("0" == t ? ($("verifycode").value = e, loadVC(!1)) : "1" == t && (pt.cap_cd = e, $("verifycode").value = pt.needCodeTip ? str_codetip : "", loadVC(!0)), pt.pt_verifysession = n)
}
function ptui_changeImg(t, e, i) {
    e = window.g_appid,
    changeimg = !0;
    var n = pt.needAt ? pt.needAt : g_uin,
    r = (pt.isHttps ? "https://ssl." : "http://") + "captcha." + t + "/getimage?&uin=" + n + "&aid=" + e + "&" + Math.random() + "&cap_cd=" + pt.cap_cd,
    o = $("imgVerify");
    try {
        if (null != o) {
            o.src = r;
            var a = $("verifycode");
            null != a && 0 == a.disabled && i && (a.focus(), a.select())
        }
    } catch(s) {}
}
function ptui_initFocus(t) {
    if (!pt.isIpad) try {
        var e = t.u,
        i = t.p,
        n = t.verifycode;
        if ("" == e.value || str_uintip == e.value) return void e.focus();
        if ("" == i.value) return void i.focus();
        "" == n.value && n.focus()
    } catch(r) {}
}
function getSubmitUrl(t) {
    var e = !0,
    i = document.forms[0],
    n = (pt.isHttps ? "https://ssl." : "http://") + "ptlogin2." + g_domain + "/" + t + "?",
    r = document.getElementById("login2qq");
    2 == pt.regmaster ? n = "http://ptlogin2.function.qq.com/" + t + "?regmaster=2&" : 3 == pt.regmaster && (n = "http://ptlogin2.crm2.qq.com/" + t + "?regmaster=3&");
    for (var o = 0; o < i.length; o++) if ("ptqrlogin" != t || "u" != i[o].name && "p" != i[o].name && "verifycode" != i[o].name && "h" != i[o].name) if ("ipFlag" != i[o].name || i[o].checked) {
        if ("fp" != i[o].name && "submit" != i[o].type) if ("ptredirect" == i[o].name && (g_ptredirect = i[o].value), "low_login_enable" != i[o].name || i[o].checked) {
            if (("low_login_hour" != i[o].name || e) && ("webqq_type" != i[o].name || r || i[o].checked)) if (n += i[o].name, n += "=", "u" == i[o].name && pt.needAt) n += pt.needAt + "&";
            else {
                if ("p" == i[o].name) n += $.Encryption.getEncryption(i.p.value, pt.salt, i.verifycode.value);
                else if ("u1" == i[o].name || "ep" == i[o].name) {
                    var a = i[o].value,
                    s = "";
                    if (("1003903" == g_appid || "501004106" == g_appid) && r) {
                        s = /\?/g.test(a) ? "&" : "?";
                        var p = document.getElementById("webqq_type").value;
                        s += "login2qq=" + r.value + "&webqq_type=" + p
                    }
                    n += encodeURIComponent(a + s)
                } else n += i[o].value;
                n += "&"
            }
        } else e = !1
    } else n += i[o].name + "=-1&";
    return n += "fp=loginerroralert&action=" + pt.action.join("-") + "-" + (new Date - g_begTime) + "&mibao_css=" + pt.mibao_css + "&t=" + pt.submitN[pt.uin] + "&g=1",
    n += "&js_type=" + pt.js_type + "&js_ver=" + window.g_pt_version + "&login_sig=" + window.g_login_sig,
    n += "&pt_randsalt=" + (pt.isRandSalt || 0),
    "login" == t && (n += "&pt_vcode_v1=0", n += "&pt_verifysession_v1=" + (pt.pt_verifysession || pt.cookie.get("verifysession"))),
    n
}
function ajax_Submit() {
    if (pt.cntCheckTimeout >= 2) return void pt.show_err("网络繁忙，请尝试刷新页面重试");
    var t = getSubmitUrl("login");
    pt.winName.set("login_param", encodeURIComponent(login_param)),
    pt.loadScript(t)
}
function qrlogin_submit() {
    var t = getSubmitUrl("ptqrlogin");
    pt.winName.set("login_param", encodeURIComponent(login_param)),
    pt.loadScript(t)
}
function ptuiCB(t, e, i, n, r, o) {
    function a() {
        var t = pt.cookie.get("uin"),
        e = pt.cookie.get("skey");
        ("" == t || "" == e) && ptui_reportAttr2("240601")
    }
    function s() {
        switch ("0" != n && a(), pt.hide_err(), n) {
        case "0":
            pt.is_mibao(i) && (i += "#login_param=" + encodeURIComponent(login_param)),
            window.location.href = i;
            break;
        case "1":
            top.location.href = i;
            break;
        case "2":
            parent.location.href = i;
            break;
        default:
            top.location.href = i
        }
    }
    g_time.time13 = new Date;
    var p = {
        15: g_time.time13 - g_time.time12
    };
    if (ptui_speedReport(p), g_submitting = !1, 65 == t) return void pt.switch_qrlogin(!1);
    if (66 != t) {
        if (67 == t) return pt.go_qrlogin_step(2),
        window.clearInterval(pt.qrlogin_clock),
        void(pt.qrlogin_clock = window.setInterval("qrlogin_submit();", 1e3));
        if (10005 == t && pt.force_qrlogin(), (10006 == t || 22009 == t) && pt.force_qrlogin(), 0 == t) {
            pt.isQrLogin && !pt.is_mibao(i) ? (window.clearInterval(pt.qrlogin_clock), pt.qr_uin = pt.cookie.get("uin"), pt.qr_uin = parseInt(pt.qr_uin.substring(1, pt.qr_uin.length), 10), pt.qr_nick = o, pt.isHttps ? sys.$("qr_head").src = pt.dftImg : pt.loadScript("http://ptlogin2." + g_domain + "/getface?appid=" + g_appid + "&imgtype=3&encrytype=0&devtype=0&keytpye=0&uin=" + pt.qr_uin + "&js=1&r=" + Math.random()), pt.loadScript((pt.isHttps ? "https://ssl." : "http://") + "ptlogin2." + g_domain + "/getlongnick?appid=" + g_appid + "&js=1&r=" + Math.random()), pt.go_qrlogin_step(3), window.setTimeout(function() {
                s()
            },
            4e3)) : s()
        } else if (pt.submitN[pt.uin] && pt.submitN[pt.uin]++, 0 == e ? pt.show_err(r && "" != r ? r : str_input_error) : (pt.show_err(r), $("p").value = "", $("p").focus(), $("p").select()), isLoadVC ? (ptui_changeImg(g_domain, g_appid, !0), $("verifycode").value = pt.needCodeTip ? str_codetip : "", loadVC(!0), $("verifycode").focus(), $("verifycode").select()) : 0 == e && (g_uin = 0), 3 == t || 4 == t) {
            if (navigator.userAgent.toLowerCase().indexOf("webkit") > -1 && $("u").focus(), 3 == t && ($("p").value = ""), $("p").focus(), $("p").select(), 4 == t) {
                check();
                try {
                    $("verifycode").focus(),
                    $("verifycode").select()
                } catch(c) {}
            }
            0 != e && 102 != e && ($("verifycode").value = pt.needCodeTip ? str_codetip : "", loadVC(!0), g_submitting = !0)
        }
    }
}
function browser_version() {
    var t = navigator.userAgent.toLowerCase();
    return t.match(/msie ([\d.]+)/) ? 1 : t.match(/firefox\/([\d.]+)/) ? 3 : t.match(/chrome\/([\d.]+)/) ? 5 : t.match(/opera.([\d.]+)/) ? 9 : t.match(/version\/([\d.]+).*safari/) ? 7 : 1
}
function ptui_reportSpeed(t, e) {
    if (! (pt.isHttps || window.flag2 && Math.random() > .5 || !window.flag2 && Math.random() > .05)) {
        var i = browser_version();
        url = "http://isdspeed.qq.com/cgi-bin/r.cgi?flag1=6000&flag2=" + (window.flag2 ? window.flag2 : 1) + "&flag3=" + i;
        for (var n = 0; n < g_speedArray.length; n++) url += "&" + g_speedArray[n][0] + "=" + (g_speedArray[n][1] - t);
        0 != e && (url += "&4=" + (t - e)),
        imgSendTimePoint = new Image,
        imgSendTimePoint.src = url + "&24=" + g_appid
    }
}
function ptui_reportAttr(t) {
    Math.random() > .05 || (url = (pt.isHttps ? "https" : "http") + "://ui.ptlogin2." + g_domain + "/cgi-bin/report?id=" + t + "&t=" + Math.random(), imgAttr = new Image, imgAttr.src = url, imgAttr = null)
}
function ptui_reportAttr2(t, e) {
    Math.random() > (e || 1) || (url = (pt.isHttps ? "https" : "http") + "://ui.ptlogin2." + g_domain + "/cgi-bin/report?id=" + t + "&t=" + Math.random(), imgAttr = new Image, imgAttr.src = url, imgAttr = null)
}
function ptui_reportNum(t) {
    if (! (Math.random() > .05)) {
        url = (pt.isHttps ? "https" : "http") + "://ui.ptlogin2." + g_domain + "/cgi-bin/report?id=1000&n=" + t;
        var e = new Image;
        e.src = url
    }
}
function imgLoadReport() {
    if (!changeimg) {
        g_time.time8 = new Date;
        var t = {
            11: g_time.time8 - g_time.time7
        };
        curXui || ptui_speedReport(t)
    }
}
function webLoginReport() {
    var t = {};
    g_time.time0 && g_time.time0 > 0 && g_time.time1 && g_time.time1 > 0 && g_time.time2 && g_time.time2 > 0 && g_time.time3 && g_time.time3 > 0 && (t[18] = g_time.time1 - g_time.time0, t[19] = g_time.time2 - g_time.time0, t[20] = g_time.time4 - g_time.time0, t[21] = g_time.time5 - g_time.time0, t[7] = g_time.time4 - g_time.time3, t[26] = g_time.time5 - g_time.time3, ptui_speedReport(t))
}
function ptui_speedReport(t) {
    if (! (pt.isHttps || window.flag2 && Math.random() > .5 || !window.flag2 && Math.random() > .1)) {
        var e = "http://isdspeed.qq.com/cgi-bin/r.cgi?flag1=6000&flag2=" + (window.flag2 ? window.flag2 : 1) + "&flag3=" + browser_version(),
        i = 0;
        for (var n in t) t[n] > 3e5 || t[n] < 0 || (e += "&" + n + "=" + t[n], i++);
        if (0 != i) {
            var r = new Image;
            r.src = e + "&24=" + g_appid
        }
    }
}
function ptui_notifyClose() {
    try {
        window.clearInterval(pt.qrlogin_clock),
        parent.ptlogin2_onClose ? parent.ptlogin2_onClose() : top == this && window.close()
    } catch(t) {
        window.close()
    }
}
function ptui_setUinColor(t, e, i) {
    var n = $(t);
    n.style.color = str_uintip == n.value ? i : e
}
function ptui_checkPwdOnInput() {
    return $("p").value.length >= 16 ? !1 : !0
}
function ptui_onLogin(t) {
    return canLogin ? (canLogin = !1, loginButton.value = "登录中..", loginButton.style.opacity = .6, ptui_checkValidate(t)) : void 0
}
function ptui_onLoginEx(t, e) {
    if (g_time.time12 = new Date, ptui_onLogin(t)) {
        var i = new Date;
        i.setHours(i.getHours() + 720),
        pt.cookie.set("ptui_loginuin", t.u.value, i, "/", e)
    }
    return !1
}
function ptui_onReset() {
    try {
        if (parent.ptlogin2_onReset && !parent.ptlogin2_onReset()) return !1
    } catch(t) {}
    return !0
}
function ptui_checkValidate(t) {
    var e = t.u,
    i = t.p,
    n = t.verifycode;
    if ("" == e.value || str_uintip == e.value) return pt.show_err(str_no_uin),
    e.focus(),
    !1;
    if (e.value = e.value.trim(), !pt.chkUin(e.value)) return pt.show_err(str_inv_uin),
    e.focus(),
    e.select(),
    !1;
    if ("" == i.value) return pt.show_err(str_no_pwd),
    i.focus(),
    !1;
    if ("" == n.value) {
        if (!isLoadVC) return check(),
        !1;
        pt.show_err(str_no_vcode);
        try {
            n.focus()
        } catch(r) {}
        return ptui_reportAttr(g_loadcheck ? 78029 : 78028),
        !1
    }
    return n.value.length < 4 ? (pt.show_err(str_inv_vcode), n.focus(), n.select(), !1) : (i.setAttribute("maxlength", "32"), ajax_Submit(), ptui_reportNum(g_changeNum), g_changeNum = 0, !0)
}
function uin2hex(str) {
    for (var maxLength = 16, hex = parseInt(str).toString(16), len = hex.length, i = len; maxLength > i; i++) hex = "0" + hex;
    for (var arr = [], j = 0; maxLength > j; j += 2) arr.push("\\x" + hex.substr(j, 2));
    var result = arr.join("");
    return eval('result="' + result + '"'),
    result
}
function checkTimeout() {
    var t = $("u").value.trim();
    pt.chkAccount.isQQ(t) && (pt.uin = pt.salt = uin2hex(t), $("verifycode").value = "", loadVC(!0), pt.cntCheckTimeout++, pt.cntCheckTimeout >= 2 && pt.show_err("网络繁忙，请尝试刷新页面重试")),
    ptui_reportAttr2(216082)
}
function check() {
    g_time.time6 = new Date,
    g_changeNum++;
    var t = $("u").value.trim();
    if ($("u").value = t, g_uin != t && pt.chkUin(t) || 0 != pt.cntCheckTimeout) {
        clearTimeout(checkClock),
        checkClock = setTimeout("checkTimeout()", 5e3),
        g_uin = $("u").value.trim();
        try {
            parent.ptui_uin && parent.ptui_uin(g_uin)
        } catch(e) {}
        ptui_needVC(g_uin, g_appid)
    }
}
function loadVC(t) {
    if (isLoadVC != t || lastUin != g_uin) if (lastUin = g_uin, isLoadVC = t, 1 == t) {
        {
            var e = $("imgVerify"),
            i = pt.needAt ? pt.needAt : g_uin,
            n = (pt.isHttps ? "https://ssl." : "http://") + "captcha." + g_domain + "/getimage?aid=" + g_appid + "&r=" + Math.random() + "&uin=" + i + "&cap_cd=" + pt.cap_cd;
            new Date
        }
        e.src = n,
        $("verifyinput").style.display = "",
        $("verifytip").style.display = "",
        $("verifyshow").style.display = "",
        ptui_notifySize("login");
        try {
            $("p").focus()
        } catch(r) {}
    } else {
        $("verifyinput").style.display = "none",
        $("verifytip").style.display = "none",
        $("verifyshow").style.display = "none",
        ptui_notifySize("login");
        try {
            $("p").focus()
        } catch(r) {}
    }
}
function onPageClose() {
    ptui_notifyClose()
}
function onFormReset(t) {
    return ptui_onReset(t) ? (t.u.style.color = "#CCCCCC", !0) : !1
}
function onClickForgetPwd() {
    var t = $("u"),
    e = $("label_forget_pwd");
    return 2052 == sys.getQueryValue("fgt") && (g_forget = g_forget.replace("1028", 2052)),
    e.href = g_forget,
    null != t && t.value != str_uintip && (e.href += -1 == e.href.indexOf("?") ? "?" : "&", e.href += "aquin=" + t.value),
    !0
}
String.prototype.trim = function() {
    return this.replace(/(^\s*)|(\s*$)/g, "")
};
var sys = {
    $: function(t) {
        return document.getElementById(t)
    },
    onload: function(t) {
        var e = window.onload;
        window.onload = function() {
            "function" == typeof e && e(),
            "function" == typeof t && t()
        }
    },
    getQueryValue: function(t, e) {
        var i = "";
        return i = e ? "&" + e : window.location.search.replace(/(^\?+)|(#\S*$)/g, ""),
        i = i.match(new RegExp("(^|&)" + t + "=([^&]*)(&|$)")),
        i ? decodeURIComponent(i[2]) : ""
    }
},
_ua = navigator.userAgent,
isMobile = _ua.indexOf("Android") > -1 || _ua.indexOf("iPhone") > -1 || _ua.indexOf("iPad") > -1 || _ua.indexOf("iPod") > -1,
canLogin = !0,
loginButton = document.getElementById("login_button"),
pt = {
    uin: 0,
    salt: "",
    ckNum: {},
    action: [0, 0],
    submitN: {},
    err_m: null,
    isHttps: !1,
    isIpad: !1,
    mibao_css: "",
    needAt: "",
    t_appid: 46000101,
    seller_id: 703010802,
    needCodeTip: !1,
    regmaster: 0,
    qrlogin_step: 0,
    qrlogin_clock: 0,
    qrlogin_timeout: 0,
    qrlogin_timeout_time: 12e4,
    isQrLogin: !1,
    qr_uin: "",
    qr_nick: "",
    dftImg: "http://imgcache.qq.com/ptlogin/face/1.png",
    js_type: 0,
    pt_verifysession: "",
    cntCheckTimeout: 0,
    nlog: function(t, e) {
        var i = "https:" == location.protocol ? "https://ssl.qq.com/ptlogin/cgi-bin/ptlogin_report?" : "http://log.wtlogin.qq.com/cgi-bin/ptlogin_report?",
        n = encodeURIComponent(t + "|_|" + location.href + "|_|" + window.navigator.userAgent);
        e = e ? e : 0,
        i += "id=" + e + "&msg=" + n + "&v=" + Math.random();
        var r = new Image;
        r.src = i
    },
    is_weibo_appid: function(t) {
        return 46000101 == t || 607000101 == t ? !0 : !1
    },
    is_mibao: function(t) {
        return /^http(s)?:\/\/ui.ptlogin2.(\S)+\/cgi-bin\/mibao_vry/.test(t)
    },
    chkUin: function(t) {
        if (t = t.trim(), 0 == t.length) return !1;
        if (window.location.hostname.match(/paipai.com$/) && t.length < 64 && new RegExp(/^[A-Za-z0-9]+@{1}[A-Za-z0-9]+$/).test(t)) return !0;
        if (g_appid == pt.seller_id && t.length < 64 && new RegExp(/^[A-Za-z0-9]+@{1}[0-9]+$/).test(t)) return !0;
        pt.needAt = "";
        var e = pt.chkAccount;
        if (pt.is_weibo_appid(g_appid)) {
            if (e.isQQ(t) || e.isMail(t)) return !0;
            if (e.isNick(t) || e.isName(t)) return pt.needAt = "@" + encodeURIComponent(t),
            !0;
            if (e.isPhone(t)) return pt.needAt = "@" + t.replace(/^(86|886)/, ""),
            !0;
            if (e.isSeaPhone(t)) return pt.needAt = "@00" + t.replace(/^(00)/, ""),
            /^(@0088609)/.test(pt.needAt) && (pt.needAt = pt.needAt.replace(/^(@0088609)/, "@008869")),
            !0;
            pt.needAt = ""
        } else {
            if (e.isQQ(t) || e.isMail(t)) return !0;
            if (e.isPhone(t)) return pt.needAt = "@" + t.replace(/^(86|886)/, ""),
            !0;
            if (e.isNick(t)) return sys.$("u").value = t + "@qq.com",
            !0
        }
        return e.isForeignPhone(t) ? (pt.needAt = "@" + t, !0) : !1
    },
    chkAccount: {
        isQQ: function(t) {
            return /^[1-9]{1}\d{4,9}$/.test(t)
        },
        isNick: function(t) {
            return /^[a-zA-Z]{1}([a-zA-Z0-9]|[-_]){0,19}$/.test(t)
        },
        isName: function(t) {
            return "<请输入帐号>" == t ? !1 : /[\u4E00-\u9FA5]/.test(t) ? t.length > 8 ? !1 : !0 : !1
        },
        isPhone: function(t) {
            return /^(?:86|886|)1\d{10}\s*$/.test(t)
        },
        isDXPhone: function(t) {
            return /^(?:86|886|)1(?:33|53|80|81|89)\d{8}$/.test(t)
        },
        isSeaPhone: function(t) {
            return /^(00)?(?:852|853|886(0)?\d{1})\d{8}$/.test(t)
        },
        isMail: function(t) {
            return /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/.test(t)
        },
        isForeignPhone: function(t) {
            return /^00\d{7,}/.test(t)
        }
    },
    cookie: {
        get: function(t) {
            var e, i = function(t) {
                if (!t) return t;
                for (; t != unescape(t);) t = unescape(t);
                for (var e = ["<", ">", "'", '"', "%3c", "%3e", "%27", "%22", "%253c", "%253e", "%2527", "%2522"], i = ["&#x3c;", "&#x3e;", "&#x27;", "&#x22;", "%26%23x3c%3B", "%26%23x3e%3B", "%26%23x27%3B", "%26%23x22%3B", "%2526%2523x3c%253B", "%2526%2523x3e%253B", "%2526%2523x27%253B", "%2526%2523x22%253B"], n = 0; n < e.length; n++) t = t.replace(new RegExp(e[n], "gi"), i[n]);
                return t
            };
            return i((e = document.cookie.match(RegExp("(^|;\\s*)" + t + "=([^;]*)(;|$)"))) ? unescape(e[2]) : "")
        },
        set: function(t, e) {
            var i = arguments,
            n = arguments.length,
            r = n > 2 ? i[2].toGMTString() : "",
            o = n > 3 ? i[3] : "",
            a = n > 4 ? i[4] : "",
            s = n > 5 ? i[5] : !1;
            document.cookie = t + "=" + escape(e) + ";expires =" + r + ";path = " + o + ";domain =" + a + (1 == s ? ";secure" : " ")
        }
    },
    html: {
        encode: function(t) {
            var e = "";
            return 0 == t.length ? "" : e = t.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/  /g, "&nbsp; ").replace(/'/g, "&apos;").replace(/"/g, "&quot;")
        }
    },
    init: function() {
        var t = Date.now();
        pt.t_appid == g_appid && (sys.$("u") && sys.$("u").setAttribute("style", ""), sys.$("u").style.cssText = ""),
        pt.isHttps = /^https/g.test(window.location),
        sys.onload(function() {
            var e = Date.now(),
            i = new Image;
            i.src = isMobile ? "http://isdspeed.qq.com/cgi-bin/r.cgi?flag1=170&flag2=126&flag3=1&4=" + (e - g_begTime) + "&2=" + (e - t) + "&t=" + e : "http://isdspeed.qq.com/cgi-bin/r.cgi?flag1=7812&flag2=2&flag3=1&5=" + (e - g_begTime) + "&3=" + (e - t) + "&t=" + e,
            sys.$("u").value && check(),
            pt.err_m = sys.$("err_m"),
            1003903 != g_appid && 501004106 != g_appid && (document.body.onclick = function(t) {
                t |= window.event,
                pt.action[0]++
            }),
            document.body.onkeydown = function(t) {
                t |= window.event,
                pt.action[1]++
            },
            Math.random() < .1 && !pt.isHttps && pt.loadScript("http://mat1.gtimg.com/www/js/common.js", function() {
                "function" == typeof checkNonTxDomain && checkNonTxDomain(1, 5)
            }),
            window.setTimeout(function() {
                ptui_reportAttr2("313790&union=256038", .05),
                window.g_login_sig || pt.nlog("旧版登录框login_sig为空|_|" + window.g_pt_version, "291551")
            },
            1e3);
            try {
                var n = sys.getQueryValue("s_url"),
                r = sys.getQueryValue("style"),
                o = sys.getQueryValue("appid"),
                a = (/paipai.com$/.test(window.location.hostname), sys.getQueryValue("regmaster")),
                s = sys.getQueryValue("enable_qlogin");
                if (5 == r) {
                    var p = /\?/g.test(n) ? "&" : "?";
                    p += "login2qq=1&webqq_type=10",
                    n += p
                }
                var c = 1 == sys.getQueryValue("hide_close_icon") || 1 == sys.getQueryValue("hide_title_bar"),
                u = document.createElement("h4");
                if (u.innerHTML = '<input type="button" class="btn_close" id="close" name="close" onclick="javascript:onPageClose();" title="关闭" /><u id="label_login_title">用户登录</u>', window.g_href && -1 == location.href.indexOf(g_href) && /^ui.ptlogin2./.test(location.hostname)) {
                    if ("http:" == location.protocol) if ("aqjump" == window.g_jumpname && 5 != r && 3 != a && 2 != a) {
                        c || sys.$("close") || (sys.$("login").insertBefore(u, sys.$("normal_login")), sys.$("login").style.border = "1px");
                        var l = document.createElement("div");
                        l.style.textAlign = "center",
                        l.innerHTML = '<div style="position:relative;">\r\n							<br/>\r\n							<p style="line-height:20px;text-align:left;width:220px;margin:0 auto;">您当前的网络存在链路层劫持，为了确保您的帐号安全，请使用安全登录。</p></div>\r\n							<input id="safe_login" value="安全登录"" type="button" class="btn" style="text-align:center;"/>\r\n							</div>\r\n							<div style="margin-top:10px;margin-left:10px; height:20px;">\r\n							<span style="float:left;height:15px;width:14px; background: url(https://ui.ptlogin2.qq.com/style/14/images/help.png) no-repeat scroll right center transparent;"></span>\r\n							<a style="float:left; margin-left:5px;" href="http://kf.qq.com/info/80861.html" target="_blank" >什么是链路层劫持</a>\r\n							</div>',
                        sys.$("loginform").style.display = "none",
                        sys.$("web_login").appendChild(l),
                        ptui_notifySize("login"),
                        ptui_reportAttr2(245663);
                        var h = new Image,
                        f = encodeURIComponent(window.g_href + "|_|" + location.href + "|_|" + window.g_jumpname + "|_|mid=245663");
                        h.src = "http://log.wtlogin.qq.com/cgi-bin/ptlogin_report?msg=" + f + "&v=" + Math.random()
                    } else {
                        var h = new Image,
                        f = encodeURIComponent(window.g_href + "|_|" + location.href + "|_|" + window.g_jumpname + "|_|mid=245580");
                        h.src = "http://log.wtlogin.qq.com/cgi-bin/ptlogin_report??id=245580&msg=" + f + "&v=" + Math.random()
                    } else ptui_reportAttr2("aqjump" == window.g_jumpname ? 245582 : 245581);
                    switch (g_jumpname = sys.getQueryValue("jumpname"), g_target = sys.getQueryValue("target"), g_target) {
                    case "self":
                        document.forms[0].ptredirect.value = 0;
                        break;
                    case "top":
                        document.forms[0].ptredirect.value = 1;
                        break;
                    case "parent":
                        document.forms[0].ptredirect.value = 2;
                        break;
                    default:
                        document.forms[0].ptredirect.value = 1
                    }
                    switch (g_qtarget = sys.getQueryValue("qtarget"), g_qtarget) {
                    case "self":
                        g_qtarget = 0;
                        break;
                    case "top":
                        g_qtarget = 1;
                        break;
                    case "parent":
                        g_qtarget = 2;
                        break;
                    default:
                        g_qtarget = 1
                    }
                    var g = 1;
                    if ("" != g_jumpname) - 1 != g_qtarget && (g = g_qtarget);
                    else switch (g_target) {
                    case "self":
                        g = 0;
                        break;
                    case "top":
                        g = 1;
                        break;
                    case "parent":
                        g = 2;
                        break;
                    default:
                        g = 1
                    }
                    sys.$("safe_login") && (sys.$("safe_login").onclick = function() {
                        if (1 != g) try {
                            n = top.location.href
                        } catch(t) {}
                        n = encodeURIComponent(n);
                        var e = "https://ui.ptlogin2.qq.com/cgi-bin/login";
                        window.open(e + "?style=14&pt_safe=1&appid=" + o + "&s_url=" + n + "&regmaster=" + a + "&enable_qlogin=" + s, "_top"),
                        ptui_reportAttr2(247563)
                    },
                    "none" == sys.$("switch").style.display ? ptui_reportAttr2(248671) : sys.$("switch").onclick = function() {
                        pt.hasShowSafeTips || (pt.hasShowSafeTips = !0, ptui_reportAttr2(248671))
                    }),
                    document.forms[0].u1.value = n,
                    (3 == a || 2 == a) && (pt.regmaster = a);
                    var d = "jump" == g_jumpname || "" == g_jumpname ? encodeURIComponent("u1=" + encodeURIComponent(document.forms[0].u1.value)) : "";
                    sys.$("xui") && (sys.$("xui").src = sys.$("xui").src + "&jumpname=" + g_jumpname + "&param=" + d + "&qtarget=" + g + "&regmaster" + a)
                }
            } catch(m) {}
        }),
        pt.mibao_css = window.g_mibao_css;
        var e = navigator.userAgent.toLowerCase();
        pt.isIpad = /ipad/i.test(e),
        pt.needCodeTip = window.needCodeTip ? needCodeTip : !1;
        var i = document.loginform.regmaster ? document.loginform.regmaster.value : "";
        2 != i && 3 != i || pt.isHttps || (pt.regmaster = i),
        pt.dftImg = pt.ishttps ? "https://ui.ptlogin2.qq.com/face/1.png" : "http://imgcache.qq.com/ptlogin/face/1.png"
    },
    show_err: function(t) {
        if (canLogin = !0, loginButton.value = "登  录", loginButton.style.opacity = 1, !pt.isQrLogin) {
            var e = pt.html.encode(sys.$("u").value);
            return pt.err_m && "function" == typeof ptui_notifySize ? (t += '<a href="http://support.qq.com/write.shtml?guest=1&fid=713&SSTAG=10011-' + e + '" target="_blank">' + str_yjfk + "</a>", pt.err_m.innerHTML = t, pt.err_m.style.display = "block", void ptui_notifySize("login")) : void alert(t)
        }
    },
    hide_err: function() {
        return pt.err_m && "function" == typeof ptui_notifySize ? (pt.err_m.innerHTML = "", pt.err_m.style.display = "none", void ptui_notifySize("login")) : void 0
    },
    setHeader: function(t) {
        for (var e in t)"" != e && sys.$("qr_head") && (sys.$("qr_head").src = t[e])
    },
    imgErr: function(t) {
        return t.onerror = null,
        t.src != pt.dftImg && (t.src = pt.dftImg),
        !1
    },
    setFeeds: function(t) {
        for (var e in t)"" != e && sys.$("qr_feeds") && pt.getShortWord(sys.$("qr_feeds"), t[e], 120)
    },
    get_qrlogin_pic: function() {
        var t = "ptqrshow",
        e = (pt.isHttps ? "https://ssl." : "http://") + "ptlogin2." + g_domain + "/" + t + "?";
        return 2 == pt.regmaster ? e = "http://ptlogin2.function.qq.com/" + t + "?regmaster=2&" : 3 == pt.regmaster && (e = "http://ptlogin2.crm2.qq.com/" + t + "?regmaster=3&"),
        e += "appid=" + g_appid + "&e=0&l=M&s=5&d=72&v=4&t=" + Math.random()
    },
    animate: function(t, e, i, n, r) {
        if (t) {
            t.effect || (t.effect = {}),
            "undefined" == typeof t.effect.animate && (t.effect.animate = 0);
            for (var o in e) e[o] = parseInt(e[o]) || 0;
            window.clearInterval(t.effect.animate);
            var i = i || 10,
            n = n || 20,
            a = function(t) {
                var e = {
                    left: t.offsetLeft,
                    top: t.offsetTop
                };
                return e
            },
            s = a(t),
            p = {
                width: t.clientWidth,
                height: t.clientHeight,
                left: s.left,
                top: s.top
            },
            c = [],
            u = window.navigator.userAgent.toLowerCase();
            if (-1 == u.indexOf("msie") || "BackCompat" != document.compatMode) {
                var l = document.defaultView ? document.defaultView.getComputedStyle(t, null) : t.currentStyle,
                h = e.width || 0 == e.width ? parseInt(e.width) : null,
                f = e.height || 0 == e.height ? parseInt(e.height) : null;
                "number" == typeof h && (c.push("width"), e.width = h - l.paddingLeft.replace(/\D/g, "") - l.paddingRight.replace(/\D/g, "")),
                "number" == typeof f && (c.push("height"), e.height = f - l.paddingTop.replace(/\D/g, "") - l.paddingBottom.replace(/\D/g, "")),
                15 > n && (i = Math.floor(15 * i / n), n = 15)
            }
            var g = e.left || 0 == e.left ? parseInt(e.left) : null,
            d = e.top || 0 == e.top ? parseInt(e.top) : null;
            "number" == typeof g && (c.push("left"), t.style.position = "absolute"),
            "number" == typeof d && (c.push("top"), t.style.position = "absolute");
            for (var m = [], _ = c.length, o = 0; _ > o; o++) m[c[o]] = p[c[o]] < e[c[o]] ? 1 : -1;
            var v = t.style,
            y = function() {
                for (var n = !0, o = 0; _ > o; o++) p[c[o]] = p[c[o]] + m[c[o]] * Math.abs(e[c[o]] - Math.floor(p[c[o]]) * i / 100),
                (Math.round(p[c[o]]) - e[c[o]]) * m[c[o]] >= 0 ? (n = n && !0, v[c[o]] = e[c[o]] + "px") : (n = n && !1, v[c[o]] = p[c[o]] + "px");
                n && (window.clearInterval(t.effect.animate), "function" == typeof r && r(t))
            };
            t.effect.animate = window.setInterval(y, n)
        }
    },
    go_qrlogin_step: function(t) {
        switch (t) {
        case 1:
            sys.$("qrlogin_step1").style.display = "block",
            sys.$("qrlogin_step2").style.display = "none",
            sys.$("qrlogin_step3").style.display = "none";
            break;
        case 2:
            sys.$("qrlogin_step1").style.display = "none",
            sys.$("qrlogin_step2").style.display = "block",
            sys.$("qrlogin_step3").style.display = "none";
            break;
        case 3:
            sys.$("qr_nick").innerHTML = pt.html.encode(pt.qr_nick),
            sys.$("qr_uin").innerHTML = pt.qr_uin,
            sys.$("qrlogin_step2").style.display = "none"
        }
    },
    switch_qrlogin: function(t) {
        t ? (ptui_reportAttr2(228433), sys.$("normal_login").style.display = "none", pt.go_qrlogin_step(1), sys.$("qrlogin_img").src = pt.get_qrlogin_pic(), window.clearInterval(pt.qrlogin_clock), pt.qrlogin_clock = window.setInterval("qrlogin_submit();", 2e3), window.clearTimeout(pt.qrlogin_timeout), pt.qrlogin_timeout = window.setTimeout(function() {
            pt.switch_qrlogin(!1)
        },
        pt.qrlogin_timeout_time)) : (sys.$("qr_mask_wrap").style.display = "block", pt.go_qrlogin_step(1), window.clearInterval(pt.qrlogin_clock), window.clearTimeout(pt.qrlogin_timeout)),
        ptui_notifySize("login")
    },
    force_qrlogin: function() {
        $("login_button").disabled = !0
    },
    no_force_qrlogin: function() {
        $("login_button").disabled = !1
    },
    getShortWord: function(t, e, i) {
        i = t.getAttribute("w") || i,
        e = e ? e : "";
        var n = "...";
        if (t.innerHTML = pt.html.encode(e), t.clientWidth <= i);
        else for (var r = Math.min(e.length, 20), o = r; o > 0; o--) {
            var a = e.substring(0, o);
            if (t.innerHTML = pt.html.encode(a + n), t.clientWidth <= i) break
        }
        t.style.width = i + "px"
    },
    bind_account: function() {
        window.open("http://id.qq.com/index.html#account"),
        ptui_reportAttr2("234964")
    },
    loadScript: function(t, e) {
        var i = document.createElement("script");
        i.charset = "UTF-8",
        i.onload = i.onreadystatechange = function() {
            this.readyState && "loaded" !== this.readyState && "complete" !== this.readyState || ("function" == typeof e && e(i), i.onload = i.onreadystatechange = null, i.parentNode && i.parentNode.removeChild(i))
        },
        i.src = t,
        document.getElementsByTagName("head")[0].appendChild(i)
    },
    clearScript: function(t) {
        window.setTimeout(function() {
            t.parentNode.removeChild(t)
        },
        5e3)
    },
    winName: {
        set: function(t, e) {
            var i = window.name || "";
            window.name = i.match(new RegExp(";" + t + "=([^;]*)(;|$)")) ? i.replace(new RegExp(";" + t + "=([^;]*)"), ";" + t + "=" + e) : i + ";" + t + "=" + e
        },
        get: function(t) {
            var e = window.name || "",
            i = e.match(new RegExp(";" + t + "=([^;]*)(;|$)"));
            return i ? i[1] : ""
        },
        clear: function(t) {
            var e = window.name || "";
            window.name = e.replace(new RegExp(";" + t + "=([^;]*)"), "")
        }
    }
};
pt.init();
var checkClock = 0,
lastUin = 1,
t_appid = 46000101,
g_changeNum = 0,
changeimg = !1,
defaultuin = "",
login_param = g_href.substring(g_href.indexOf("?") + 1),
g_ptredirect = -1,
g_xmlhttp,
g_loadcheck = !0,
g_submitting = !1;
isAbleSubmit = !0;
var _ua = navigator.userAgent,
$$ = function(t) {
    return document.querySelectorAll(t)
};
(_ua.indexOf("Android") > -1 || _ua.indexOf("iPhone") > -1 || _ua.indexOf("iPad") > -1 || _ua.indexOf("iPod") > -1) && ($$(".input_login_text")[0].innerHTML = "QQ手机版 网页版", pt.switch_qrlogin = function() {}),
$ = window.$ || {},
$pt = window.$pt || {},
$.RSA = $pt.RSA = function() {
    function t(t, e) {
        return new a(t, e)
    }
    function e(t, e) {
        if (e < t.length + 11) return uv_alert("Message too long for RSA"),
        null;
        for (var i = new Array, n = t.length - 1; n >= 0 && e > 0;) {
            var r = t.charCodeAt(n--);
            i[--e] = r
        }
        i[--e] = 0;
        for (var o = new Y, s = new Array; e > 2;) {
            for (s[0] = 0; 0 == s[0];) o.nextBytes(s);
            i[--e] = s[0]
        }
        return i[--e] = 2,
        i[--e] = 0,
        new a(i)
    }
    function i() {
        this.n = null,
        this.e = 0,
        this.d = null,
        this.p = null,
        this.q = null,
        this.dmp1 = null,
        this.dmq1 = null,
        this.coeff = null
    }
    function n(e, i) {
        null != e && null != i && e.length > 0 && i.length > 0 ? (this.n = t(e, 16), this.e = parseInt(i, 16)) : uv_alert("Invalid RSA public key")
    }
    function r(t) {
        return t.modPowInt(this.e, this.n)
    }
    function o(t) {
        var i = e(t, this.n.bitLength() + 7 >> 3);
        if (null == i) return null;
        var n = this.doPublic(i);
        if (null == n) return null;
        var r = n.toString(16);
        return 0 == (1 & r.length) ? r : "0" + r
    }
    function a(t, e, i) {
        null != t && ("number" == typeof t ? this.fromNumber(t, e, i) : null == e && "string" != typeof t ? this.fromString(t, 256) : this.fromString(t, e))
    }
    function s() {
        return new a(null)
    }
    function p(t, e, i, n, r, o) {
        for (; --o >= 0;) {
            var a = e * this[t++] + i[n] + r;
            r = Math.floor(a / 67108864),
            i[n++] = 67108863 & a
        }
        return r
    }
    function c(t, e, i, n, r, o) {
        for (var a = 32767 & e, s = e >> 15; --o >= 0;) {
            var p = 32767 & this[t],
            c = this[t++] >> 15,
            u = s * p + c * a;
            p = a * p + ((32767 & u) << 15) + i[n] + (1073741823 & r),
            r = (p >>> 30) + (u >>> 15) + s * c + (r >>> 30),
            i[n++] = 1073741823 & p
        }
        return r
    }
    function u(t, e, i, n, r, o) {
        for (var a = 16383 & e, s = e >> 14; --o >= 0;) {
            var p = 16383 & this[t],
            c = this[t++] >> 14,
            u = s * p + c * a;
            p = a * p + ((16383 & u) << 14) + i[n] + r,
            r = (p >> 28) + (u >> 14) + s * c,
            i[n++] = 268435455 & p
        }
        return r
    }
    function l(t) {
        return lt.charAt(t)
    }
    function h(t, e) {
        var i = ht[t.charCodeAt(e)];
        return null == i ? -1 : i
    }
    function f(t) {
        for (var e = this.t - 1; e >= 0; --e) t[e] = this[e];
        t.t = this.t,
        t.s = this.s
    }
    function g(t) {
        this.t = 1,
        this.s = 0 > t ? -1 : 0,
        t > 0 ? this[0] = t : -1 > t ? this[0] = t + DV : this.t = 0
    }
    function d(t) {
        var e = s();
        return e.fromInt(t),
        e
    }
    function m(t, e) {
        var i;
        if (16 == e) i = 4;
        else if (8 == e) i = 3;
        else if (256 == e) i = 8;
        else if (2 == e) i = 1;
        else if (32 == e) i = 5;
        else {
            if (4 != e) return void this.fromRadix(t, e);
            i = 2
        }
        this.t = 0,
        this.s = 0;
        for (var n = t.length, r = !1, o = 0; --n >= 0;) {
            var s = 8 == i ? 255 & t[n] : h(t, n);
            0 > s ? "-" == t.charAt(n) && (r = !0) : (r = !1, 0 == o ? this[this.t++] = s : o + i > this.DB ? (this[this.t - 1] |= (s & (1 << this.DB - o) - 1) << o, this[this.t++] = s >> this.DB - o) : this[this.t - 1] |= s << o, o += i, o >= this.DB && (o -= this.DB))
        }
        8 == i && 0 != (128 & t[0]) && (this.s = -1, o > 0 && (this[this.t - 1] |= (1 << this.DB - o) - 1 << o)),
        this.clamp(),
        r && a.ZERO.subTo(this, this)
    }
    function _() {
        for (var t = this.s & this.DM; this.t > 0 && this[this.t - 1] == t;)--this.t
    }
    function v(t) {
        if (this.s < 0) return "-" + this.negate().toString(t);
        var e;
        if (16 == t) e = 4;
        else if (8 == t) e = 3;
        else if (2 == t) e = 1;
        else if (32 == t) e = 5;
        else {
            if (4 != t) return this.toRadix(t);
            e = 2
        }
        var i, n = (1 << e) - 1,
        r = !1,
        o = "",
        a = this.t,
        s = this.DB - a * this.DB % e;
        if (a -->
        0) for (s < this.DB && (i = this[a] >> s) > 0 && (r = !0, o = l(i)); a >= 0;) e > s ? (i = (this[a] & (1 << s) - 1) << e - s, i |= this[--a] >> (s += this.DB - e)) : (i = this[a] >> (s -= e) & n, 0 >= s && (s += this.DB, --a)),
        i > 0 && (r = !0),
        r && (o += l(i));
        return r ? o : "0"
    }
    function y() {
        var t = s();
        return a.ZERO.subTo(this, t),
        t
    }
    function w() {
        return this.s < 0 ? this.negate() : this
    }
    function b(t) {
        var e = this.s - t.s;
        if (0 != e) return e;
        var i = this.t;
        if (e = i - t.t, 0 != e) return e;
        for (; --i >= 0;) if (0 != (e = this[i] - t[i])) return e;
        return 0
    }
    function q(t) {
        var e, i = 1;
        return 0 != (e = t >>> 16) && (t = e, i += 16),
        0 != (e = t >> 8) && (t = e, i += 8),
        0 != (e = t >> 4) && (t = e, i += 4),
        0 != (e = t >> 2) && (t = e, i += 2),
        0 != (e = t >> 1) && (t = e, i += 1),
        i
    }
    function A() {
        return this.t <= 0 ? 0 : this.DB * (this.t - 1) + q(this[this.t - 1] ^ this.s & this.DM)
    }
    function k(t, e) {
        var i;
        for (i = this.t - 1; i >= 0; --i) e[i + t] = this[i];
        for (i = t - 1; i >= 0; --i) e[i] = 0;
        e.t = this.t + t,
        e.s = this.s
    }
    function T(t, e) {
        for (var i = t; i < this.t; ++i) e[i - t] = this[i];
        e.t = Math.max(this.t - t, 0),
        e.s = this.s
    }
    function $(t, e) {
        var i, n = t % this.DB,
        r = this.DB - n,
        o = (1 << r) - 1,
        a = Math.floor(t / this.DB),
        s = this.s << n & this.DM;
        for (i = this.t - 1; i >= 0; --i) e[i + a + 1] = this[i] >> r | s,
        s = (this[i] & o) << n;
        for (i = a - 1; i >= 0; --i) e[i] = 0;
        e[a] = s,
        e.t = this.t + a + 1,
        e.s = this.s,
        e.clamp()
    }
    function x(t, e) {
        e.s = this.s;
        var i = Math.floor(t / this.DB);
        if (i >= this.t) return void(e.t = 0);
        var n = t % this.DB,
        r = this.DB - n,
        o = (1 << n) - 1;
        e[0] = this[i] >> n;
        for (var a = i + 1; a < this.t; ++a) e[a - i - 1] |= (this[a] & o) << r,
        e[a - i] = this[a] >> n;
        n > 0 && (e[this.t - i - 1] |= (this.s & o) << r),
        e.t = this.t - i,
        e.clamp()
    }
    function S(t, e) {
        for (var i = 0, n = 0, r = Math.min(t.t, this.t); r > i;) n += this[i] - t[i],
        e[i++] = n & this.DM,
        n >>= this.DB;
        if (t.t < this.t) {
            for (n -= t.s; i < this.t;) n += this[i],
            e[i++] = n & this.DM,
            n >>= this.DB;
            n += this.s
        } else {
            for (n += this.s; i < t.t;) n -= t[i],
            e[i++] = n & this.DM,
            n >>= this.DB;
            n -= t.s
        }
        e.s = 0 > n ? -1 : 0,
        -1 > n ? e[i++] = this.DV + n : n > 0 && (e[i++] = n),
        e.t = i,
        e.clamp()
    }
    function C(t, e) {
        var i = this.abs(),
        n = t.abs(),
        r = i.t;
        for (e.t = r + n.t; --r >= 0;) e[r] = 0;
        for (r = 0; r < n.t; ++r) e[r + i.t] = i.am(0, n[r], e, r, 0, i.t);
        e.s = 0,
        e.clamp(),
        this.s != t.s && a.ZERO.subTo(e, e)
    }
    function D(t) {
        for (var e = this.abs(), i = t.t = 2 * e.t; --i >= 0;) t[i] = 0;
        for (i = 0; i < e.t - 1; ++i) {
            var n = e.am(i, e[i], t, 2 * i, 0, 1);
            (t[i + e.t] += e.am(i + 1, 2 * e[i], t, 2 * i + 1, n, e.t - i - 1)) >= e.DV && (t[i + e.t] -= e.DV, t[i + e.t + 1] = 1)
        }
        t.t > 0 && (t[t.t - 1] += e.am(i, e[i], t, 2 * i, 0, 1)),
        t.s = 0,
        t.clamp()
    }
    function I(t, e, i) {
        var n = t.abs();
        if (! (n.t <= 0)) {
            var r = this.abs();
            if (r.t < n.t) return null != e && e.fromInt(0),
            void(null != i && this.copyTo(i));
            null == i && (i = s());
            var o = s(),
            p = this.s,
            c = t.s,
            u = this.DB - q(n[n.t - 1]);
            u > 0 ? (n.lShiftTo(u, o), r.lShiftTo(u, i)) : (n.copyTo(o), r.copyTo(i));
            var l = o.t,
            h = o[l - 1];
            if (0 != h) {
                var f = h * (1 << this.F1) + (l > 1 ? o[l - 2] >> this.F2 : 0),
                g = this.FV / f,
                d = (1 << this.F1) / f,
                m = 1 << this.F2,
                _ = i.t,
                v = _ - l,
                y = null == e ? s() : e;
                for (o.dlShiftTo(v, y), i.compareTo(y) >= 0 && (i[i.t++] = 1, i.subTo(y, i)), a.ONE.dlShiftTo(l, y), y.subTo(o, o); o.t < l;) o[o.t++] = 0;
                for (; --v >= 0;) {
                    var w = i[--_] == h ? this.DM : Math.floor(i[_] * g + (i[_ - 1] + m) * d);
                    if ((i[_] += o.am(0, w, i, v, 0, l)) < w) for (o.dlShiftTo(v, y), i.subTo(y, i); i[_] < --w;) i.subTo(y, i)
                }
                null != e && (i.drShiftTo(l, e), p != c && a.ZERO.subTo(e, e)),
                i.t = l,
                i.clamp(),
                u > 0 && i.rShiftTo(u, i),
                0 > p && a.ZERO.subTo(i, i)
            }
        }
    }
    function R(t) {
        var e = s();
        return this.abs().divRemTo(t, null, e),
        this.s < 0 && e.compareTo(a.ZERO) > 0 && t.subTo(e, e),
        e
    }
    function M(t) {
        this.m = t
    }
    function E(t) {
        return t.s < 0 || t.compareTo(this.m) >= 0 ? t.mod(this.m) : t
    }
    function B(t) {
        return t
    }
    function N(t) {
        t.divRemTo(this.m, null, t)
    }
    function j(t, e, i) {
        t.multiplyTo(e, i),
        this.reduce(i)
    }
    function V(t, e) {
        t.squareTo(e),
        this.reduce(e)
    }
    function L() {
        if (this.t < 1) return 0;
        var t = this[0];
        if (0 == (1 & t)) return 0;
        var e = 3 & t;
        return e = e * (2 - (15 & t) * e) & 15,
        e = e * (2 - (255 & t) * e) & 255,
        e = e * (2 - ((65535 & t) * e & 65535)) & 65535,
        e = e * (2 - t * e % this.DV) % this.DV,
        e > 0 ? this.DV - e : -e
    }
    function H(t) {
        this.m = t,
        this.mp = t.invDigit(),
        this.mpl = 32767 & this.mp,
        this.mph = this.mp >> 15,
        this.um = (1 << t.DB - 15) - 1,
        this.mt2 = 2 * t.t
    }
    function P(t) {
        var e = s();
        return t.abs().dlShiftTo(this.m.t, e),
        e.divRemTo(this.m, null, e),
        t.s < 0 && e.compareTo(a.ZERO) > 0 && this.m.subTo(e, e),
        e
    }
    function z(t) {
        var e = s();
        return t.copyTo(e),
        this.reduce(e),
        e
    }
    function Q(t) {
        for (; t.t <= this.mt2;) t[t.t++] = 0;
        for (var e = 0; e < this.m.t; ++e) {
            var i = 32767 & t[e],
            n = i * this.mpl + ((i * this.mph + (t[e] >> 15) * this.mpl & this.um) << 15) & t.DM;
            for (i = e + this.m.t, t[i] += this.m.am(0, n, t, e, 0, this.m.t); t[i] >= t.DV;) t[i] -= t.DV,
            t[++i]++
        }
        t.clamp(),
        t.drShiftTo(this.m.t, t),
        t.compareTo(this.m) >= 0 && t.subTo(this.m, t)
    }
    function U(t, e) {
        t.squareTo(e),
        this.reduce(e)
    }
    function O(t, e, i) {
        t.multiplyTo(e, i),
        this.reduce(i)
    }
    function F() {
        return 0 == (this.t > 0 ? 1 & this[0] : this.s)
    }
    function Z(t, e) {
        if (t > 4294967295 || 1 > t) return a.ONE;
        var i = s(),
        n = s(),
        r = e.convert(this),
        o = q(t) - 1;
        for (r.copyTo(i); --o >= 0;) if (e.sqrTo(i, n), (t & 1 << o) > 0) e.mulTo(n, r, i);
        else {
            var p = i;
            i = n,
            n = p
        }
        return e.revert(i)
    }
    function W(t, e) {
        var i;
        return i = 256 > t || e.isEven() ? new M(e) : new H(e),
        this.exp(t, i)
    }
    function X(t) {
        gt[dt++] ^= 255 & t,
        gt[dt++] ^= t >> 8 & 255,
        gt[dt++] ^= t >> 16 & 255,
        gt[dt++] ^= t >> 24 & 255,
        dt >= vt && (dt -= vt)
    }
    function G() {
        X((new Date).getTime())
    }
    function J() {
        if (null == ft) {
            for (G(), ft = nt(), ft.init(gt), dt = 0; dt < gt.length; ++dt) gt[dt] = 0;
            dt = 0
        }
        return ft.next()
    }
    function K(t) {
        var e;
        for (e = 0; e < t.length; ++e) t[e] = J()
    }
    function Y() {}
    function tt() {
        this.i = 0,
        this.j = 0,
        this.S = new Array
    }
    function et(t) {
        var e, i, n;
        for (e = 0; 256 > e; ++e) this.S[e] = e;
        for (i = 0, e = 0; 256 > e; ++e) i = i + this.S[e] + t[e % t.length] & 255,
        n = this.S[e],
        this.S[e] = this.S[i],
        this.S[i] = n;
        this.i = 0,
        this.j = 0
    }
    function it() {
        var t;
        return this.i = this.i + 1 & 255,
        this.j = this.j + this.S[this.i] & 255,
        t = this.S[this.i],
        this.S[this.i] = this.S[this.j],
        this.S[this.j] = t,
        this.S[t + this.S[this.i] & 255]
    }
    function nt() {
        return new tt
    }
    function rt(t, e, n) {
        e = "e9a815ab9d6e86abbf33a4ac64e9196d5be44a09bd0ed6ae052914e1a865ac8331fed863de8ea697e9a7f63329e5e23cda09c72570f46775b7e39ea9670086f847d3c9c51963b131409b1e04265d9747419c635404ca651bbcbc87f99b8008f7f5824653e3658be4ba73e4480156b390bb73bc1f8b33578e7a4e12440e9396f2552c1aff1c92e797ebacdc37c109ab7bce2367a19c56a033ee04534723cc2558cb27368f5b9d32c04d12dbd86bbd68b1d99b7c349a8453ea75d1b2e94491ab30acf6c46a36a75b721b312bedf4e7aad21e54e9bcbcf8144c79b6e3c05eb4a1547750d224c0085d80e6da3907c3d945051c13c7c1dcefd6520ee8379c4f5231ed",
        n = "10001";
        var r = new i;
        return r.setPublic(e, n),
        r.encrypt(t)
    }
    i.prototype.doPublic = r,
    i.prototype.setPublic = n,
    i.prototype.encrypt = o;
    var ot, at = 0xdeadbeefcafe,
    st = 15715070 == (16777215 & at);
    st && "Microsoft Internet Explorer" == navigator.appName ? (a.prototype.am = c, ot = 30) : st && "Netscape" != navigator.appName ? (a.prototype.am = p, ot = 26) : (a.prototype.am = u, ot = 28),
    a.prototype.DB = ot,
    a.prototype.DM = (1 << ot) - 1,
    a.prototype.DV = 1 << ot;
    var pt = 52;
    a.prototype.FV = Math.pow(2, pt),
    a.prototype.F1 = pt - ot,
    a.prototype.F2 = 2 * ot - pt;
    var ct, ut, lt = "0123456789abcdefghijklmnopqrstuvwxyz",
    ht = new Array;
    for (ct = "0".charCodeAt(0), ut = 0; 9 >= ut; ++ut) ht[ct++] = ut;
    for (ct = "a".charCodeAt(0), ut = 10; 36 > ut; ++ut) ht[ct++] = ut;
    for (ct = "A".charCodeAt(0), ut = 10; 36 > ut; ++ut) ht[ct++] = ut;
    M.prototype.convert = E,
    M.prototype.revert = B,
    M.prototype.reduce = N,
    M.prototype.mulTo = j,
    M.prototype.sqrTo = V,
    H.prototype.convert = P,
    H.prototype.revert = z,
    H.prototype.reduce = Q,
    H.prototype.mulTo = O,
    H.prototype.sqrTo = U,
    a.prototype.copyTo = f,
    a.prototype.fromInt = g,
    a.prototype.fromString = m,
    a.prototype.clamp = _,
    a.prototype.dlShiftTo = k,
    a.prototype.drShiftTo = T,
    a.prototype.lShiftTo = $,
    a.prototype.rShiftTo = x,
    a.prototype.subTo = S,
    a.prototype.multiplyTo = C,
    a.prototype.squareTo = D,
    a.prototype.divRemTo = I,
    a.prototype.invDigit = L,
    a.prototype.isEven = F,
    a.prototype.exp = Z,
    a.prototype.toString = v,
    a.prototype.negate = y,
    a.prototype.abs = w,
    a.prototype.compareTo = b,
    a.prototype.bitLength = A,
    a.prototype.mod = R,
    a.prototype.modPowInt = W,
    a.ZERO = d(0),
    a.ONE = d(1);
    var ft, gt, dt;
    if (null == gt) {
        gt = new Array,
        dt = 0;
        var mt;
        if ("Netscape" == navigator.appName && navigator.appVersion < "5" && window.crypto && window.crypto.random) {
            var _t = window.crypto.random(32);
            for (mt = 0; mt < _t.length; ++mt) gt[dt++] = 255 & _t.charCodeAt(mt)
        }
        for (; vt > dt;) mt = Math.floor(65536 * Math.random()),
        gt[dt++] = mt >>> 8,
        gt[dt++] = 255 & mt;
        dt = 0,
        G()
    }
    Y.prototype.nextBytes = K,
    tt.prototype.init = et,
    tt.prototype.next = it;
    var vt = 256;
    return {
        rsa_encrypt: rt
    }
} (),
function(t) {
    function e() {
        return Math.round(4294967295 * Math.random())
    }
    function i(t, e, i) {
        (!i || i > 4) && (i = 4);
        for (var n = 0, r = e; e + i > r; r++) n <<= 8,
        n |= t[r];
        return (4294967295 & n) >>> 0
    }
    function n(t, e, i) {
        t[e + 3] = i >> 0 & 255,
        t[e + 2] = i >> 8 & 255,
        t[e + 1] = i >> 16 & 255,
        t[e + 0] = i >> 24 & 255
    }
    function r(t) {
        if (!t) return "";
        for (var e = "", i = 0; i < t.length; i++) {
            var n = Number(t[i]).toString(16);
            1 == n.length && (n = "0" + n),
            e += n
        }
        return e
    }
    function o(t) {
        for (var e = "", i = 0; i < t.length; i += 2) e += String.fromCharCode(parseInt(t.substr(i, 2), 16));
        return e
    }
    function a(t, e) {
        if (!t) return "";
        e && (t = s(t));
        for (var i = [], n = 0; n < t.length; n++) i[n] = t.charCodeAt(n);
        return r(i)
    }
    function s(t) {
        var e, i, n = [],
        r = t.length;
        for (e = 0; r > e; e++) i = t.charCodeAt(e),
        i > 0 && 127 >= i ? n.push(t.charAt(e)) : i >= 128 && 2047 >= i ? n.push(String.fromCharCode(192 | i >> 6 & 31), String.fromCharCode(128 | 63 & i)) : i >= 2048 && 65535 >= i && n.push(String.fromCharCode(224 | i >> 12 & 15), String.fromCharCode(128 | i >> 6 & 63), String.fromCharCode(128 | 63 & i));
        return n.join("")
    }
    function p(t) {
        _ = new Array(8),
        v = new Array(8),
        y = w = 0,
        A = !0,
        m = 0;
        var i = t.length,
        n = 0;
        m = (i + 10) % 8,
        0 != m && (m = 8 - m),
        b = new Array(i + m + 10),
        _[0] = 255 & (248 & e() | m);
        for (var r = 1; m >= r; r++) _[r] = 255 & e();
        m++;
        for (var r = 0; 8 > r; r++) v[r] = 0;
        for (n = 1; 2 >= n;) 8 > m && (_[m++] = 255 & e(), n++),
        8 == m && u();
        for (var r = 0; i > 0;) 8 > m && (_[m++] = t[r++], i--),
        8 == m && u();
        for (n = 1; 7 >= n;) 8 > m && (_[m++] = 0, n++),
        8 == m && u();
        return b
    }
    function c(t) {
        var e = 0,
        i = new Array(8),
        n = t.length;
        if (q = t, n % 8 != 0 || 16 > n) return null;
        if (v = h(t), m = 7 & v[0], e = n - m - 10, 0 > e) return null;
        for (var r = 0; r < i.length; r++) i[r] = 0;
        b = new Array(e),
        w = 0,
        y = 8,
        m++;
        for (var o = 1; 2 >= o;) if (8 > m && (m++, o++), 8 == m && (i = t, !f())) return null;
        for (var r = 0; 0 != e;) if (8 > m && (b[r] = 255 & (i[w + m] ^ v[m]), r++, e--, m++), 8 == m && (i = t, w = y - 8, !f())) return null;
        for (o = 1; 8 > o; o++) {
            if (8 > m) {
                if (0 != (i[w + m] ^ v[m])) return null;
                m++
            }
            if (8 == m && (i = t, w = y, !f())) return null
        }
        return b
    }
    function u() {
        for (var t = 0; 8 > t; t++) _[t] ^= A ? v[t] : b[w + t];
        for (var e = l(_), t = 0; 8 > t; t++) b[y + t] = e[t] ^ v[t],
        v[t] = _[t];
        w = y,
        y += 8,
        m = 0,
        A = !1
    }
    function l(t) {
        for (var e = 16, r = i(t, 0, 4), o = i(t, 4, 4), a = i(d, 0, 4), s = i(d, 4, 4), p = i(d, 8, 4), c = i(d, 12, 4), u = 0, l = 2654435769; e -->
        0;) u += l,
        u = (4294967295 & u) >>> 0,
        r += (o << 4) + a ^ o + u ^ (o >>> 5) + s,
        r = (4294967295 & r) >>> 0,
        o += (r << 4) + p ^ r + u ^ (r >>> 5) + c,
        o = (4294967295 & o) >>> 0;
        var h = new Array(8);
        return n(h, 0, r),
        n(h, 4, o),
        h
    }
    function h(t) {
        for (var e = 16, r = i(t, 0, 4), o = i(t, 4, 4), a = i(d, 0, 4), s = i(d, 4, 4), p = i(d, 8, 4), c = i(d, 12, 4), u = 3816266640, l = 2654435769; e -->
        0;) o -= (r << 4) + p ^ r + u ^ (r >>> 5) + c,
        o = (4294967295 & o) >>> 0,
        r -= (o << 4) + a ^ o + u ^ (o >>> 5) + s,
        r = (4294967295 & r) >>> 0,
        u -= l,
        u = (4294967295 & u) >>> 0;
        var h = new Array(8);
        return n(h, 0, r),
        n(h, 4, o),
        h
    }
    function f() {
        for (var t = (q.length, 0); 8 > t; t++) v[t] ^= q[y + t];
        return v = h(v),
        y += 8,
        m = 0,
        !0
    }
    function g(t, e) {
        var i = [];
        if (e) for (var n = 0; n < t.length; n++) i[n] = 255 & t.charCodeAt(n);
        else for (var r = 0, n = 0; n < t.length; n += 2) i[r++] = parseInt(t.substr(n, 2), 16);
        return i
    }
    var d = "",
    m = 0,
    _ = [],
    v = [],
    y = 0,
    w = 0,
    b = [],
    q = [],
    A = !0;
    t.TEA = {
        encrypt: function(t, e) {
            var i = g(t, e),
            n = p(i);
            return r(n)
        },
        enAsBase64: function(t, e) {
            for (var i = g(t, e), n = p(i), r = "", o = 0; o < n.length; o++) r += String.fromCharCode(n[o]);
            return btoa(r)
        },
        decrypt: function(t) {
            var e = g(t, !1),
            i = c(e);
            return r(i)
        },
        initkey: function(t, e) {
            d = g(t, e)
        },
        bytesToStr: o,
        strToBytes: a,
        bytesInStr: r,
        dataFromStr: g
    };
    var k = {};
    k.PADCHAR = "=",
    k.ALPHA = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",
    k.getbyte = function(t, e) {
        var i = t.charCodeAt(e);
        if (i > 255) throw "INVALID_CHARACTER_ERR: DOM Exception 5";
        return i
    },
    k.encode = function(t) {
        if (1 != arguments.length) throw "SyntaxError: Not enough arguments";
        var e, i, n = k.PADCHAR,
        r = k.ALPHA,
        o = k.getbyte,
        a = [];
        t = "" + t;
        var s = t.length - t.length % 3;
        if (0 == t.length) return t;
        for (e = 0; s > e; e += 3) i = o(t, e) << 16 | o(t, e + 1) << 8 | o(t, e + 2),
        a.push(r.charAt(i >> 18)),
        a.push(r.charAt(i >> 12 & 63)),
        a.push(r.charAt(i >> 6 & 63)),
        a.push(r.charAt(63 & i));
        switch (t.length - s) {
        case 1:
            i = o(t, e) << 16,
            a.push(r.charAt(i >> 18) + r.charAt(i >> 12 & 63) + n + n);
            break;
        case 2:
            i = o(t, e) << 16 | o(t, e + 1) << 8,
            a.push(r.charAt(i >> 18) + r.charAt(i >> 12 & 63) + r.charAt(i >> 6 & 63) + n)
        }
        return a.join("")
    },
    window.btoa || (window.btoa = k.encode)
} (window),
$ = window.$ || {},
$pt = window.$pt || {},
$.Encryption = $pt.Encryption = function() {
    function md5(t) {
        return hex_md5(t)
    }
    function hex_md5(t) {
        return binl2hex(core_md5(str2binl(t), t.length * chrsz))
    }
    function str_md5(t) {
        return binl2str(core_md5(str2binl(t), t.length * chrsz))
    }
    function hex_hmac_md5(t, e) {
        return binl2hex(core_hmac_md5(t, e))
    }
    function b64_hmac_md5(t, e) {
        return binl2b64(core_hmac_md5(t, e))
    }
    function str_hmac_md5(t, e) {
        return binl2str(core_hmac_md5(t, e))
    }
    function core_md5(t, e) {
        t[e >> 5] |= 128 << e % 32,
        t[(e + 64 >>> 9 << 4) + 14] = e;
        for (var i = 1732584193, n = -271733879, r = -1732584194, o = 271733878, a = 0; a < t.length; a += 16) {
            var s = i,
            p = n,
            c = r,
            u = o;
            i = md5_ff(i, n, r, o, t[a + 0], 7, -680876936),
            o = md5_ff(o, i, n, r, t[a + 1], 12, -389564586),
            r = md5_ff(r, o, i, n, t[a + 2], 17, 606105819),
            n = md5_ff(n, r, o, i, t[a + 3], 22, -1044525330),
            i = md5_ff(i, n, r, o, t[a + 4], 7, -176418897),
            o = md5_ff(o, i, n, r, t[a + 5], 12, 1200080426),
            r = md5_ff(r, o, i, n, t[a + 6], 17, -1473231341),
            n = md5_ff(n, r, o, i, t[a + 7], 22, -45705983),
            i = md5_ff(i, n, r, o, t[a + 8], 7, 1770035416),
            o = md5_ff(o, i, n, r, t[a + 9], 12, -1958414417),
            r = md5_ff(r, o, i, n, t[a + 10], 17, -42063),
            n = md5_ff(n, r, o, i, t[a + 11], 22, -1990404162),
            i = md5_ff(i, n, r, o, t[a + 12], 7, 1804603682),
            o = md5_ff(o, i, n, r, t[a + 13], 12, -40341101),
            r = md5_ff(r, o, i, n, t[a + 14], 17, -1502002290),
            n = md5_ff(n, r, o, i, t[a + 15], 22, 1236535329),
            i = md5_gg(i, n, r, o, t[a + 1], 5, -165796510),
            o = md5_gg(o, i, n, r, t[a + 6], 9, -1069501632),
            r = md5_gg(r, o, i, n, t[a + 11], 14, 643717713),
            n = md5_gg(n, r, o, i, t[a + 0], 20, -373897302),
            i = md5_gg(i, n, r, o, t[a + 5], 5, -701558691),
            o = md5_gg(o, i, n, r, t[a + 10], 9, 38016083),
            r = md5_gg(r, o, i, n, t[a + 15], 14, -660478335),
            n = md5_gg(n, r, o, i, t[a + 4], 20, -405537848),
            i = md5_gg(i, n, r, o, t[a + 9], 5, 568446438),
            o = md5_gg(o, i, n, r, t[a + 14], 9, -1019803690),
            r = md5_gg(r, o, i, n, t[a + 3], 14, -187363961),
            n = md5_gg(n, r, o, i, t[a + 8], 20, 1163531501),
            i = md5_gg(i, n, r, o, t[a + 13], 5, -1444681467),
            o = md5_gg(o, i, n, r, t[a + 2], 9, -51403784),
            r = md5_gg(r, o, i, n, t[a + 7], 14, 1735328473),
            n = md5_gg(n, r, o, i, t[a + 12], 20, -1926607734),
            i = md5_hh(i, n, r, o, t[a + 5], 4, -378558),
            o = md5_hh(o, i, n, r, t[a + 8], 11, -2022574463),
            r = md5_hh(r, o, i, n, t[a + 11], 16, 1839030562),
            n = md5_hh(n, r, o, i, t[a + 14], 23, -35309556),
            i = md5_hh(i, n, r, o, t[a + 1], 4, -1530992060),
            o = md5_hh(o, i, n, r, t[a + 4], 11, 1272893353),
            r = md5_hh(r, o, i, n, t[a + 7], 16, -155497632),
            n = md5_hh(n, r, o, i, t[a + 10], 23, -1094730640),
            i = md5_hh(i, n, r, o, t[a + 13], 4, 681279174),
            o = md5_hh(o, i, n, r, t[a + 0], 11, -358537222),
            r = md5_hh(r, o, i, n, t[a + 3], 16, -722521979),
            n = md5_hh(n, r, o, i, t[a + 6], 23, 76029189),
            i = md5_hh(i, n, r, o, t[a + 9], 4, -640364487),
            o = md5_hh(o, i, n, r, t[a + 12], 11, -421815835),
            r = md5_hh(r, o, i, n, t[a + 15], 16, 530742520),
            n = md5_hh(n, r, o, i, t[a + 2], 23, -995338651),
            i = md5_ii(i, n, r, o, t[a + 0], 6, -198630844),
            o = md5_ii(o, i, n, r, t[a + 7], 10, 1126891415),
            r = md5_ii(r, o, i, n, t[a + 14], 15, -1416354905),
            n = md5_ii(n, r, o, i, t[a + 5], 21, -57434055),
            i = md5_ii(i, n, r, o, t[a + 12], 6, 1700485571),
            o = md5_ii(o, i, n, r, t[a + 3], 10, -1894986606),
            r = md5_ii(r, o, i, n, t[a + 10], 15, -1051523),
            n = md5_ii(n, r, o, i, t[a + 1], 21, -2054922799),
            i = md5_ii(i, n, r, o, t[a + 8], 6, 1873313359),
            o = md5_ii(o, i, n, r, t[a + 15], 10, -30611744),
            r = md5_ii(r, o, i, n, t[a + 6], 15, -1560198380),
            n = md5_ii(n, r, o, i, t[a + 13], 21, 1309151649),
            i = md5_ii(i, n, r, o, t[a + 4], 6, -145523070),
            o = md5_ii(o, i, n, r, t[a + 11], 10, -1120210379),
            r = md5_ii(r, o, i, n, t[a + 2], 15, 718787259),
            n = md5_ii(n, r, o, i, t[a + 9], 21, -343485551),
            i = safe_add(i, s),
            n = safe_add(n, p),
            r = safe_add(r, c),
            o = safe_add(o, u)
        }
        return 16 == mode ? Array(n, r) : Array(i, n, r, o)
    }
    function md5_cmn(t, e, i, n, r, o) {
        return safe_add(bit_rol(safe_add(safe_add(e, t), safe_add(n, o)), r), i)
    }
    function md5_ff(t, e, i, n, r, o, a) {
        return md5_cmn(e & i | ~e & n, t, e, r, o, a)
    }
    function md5_gg(t, e, i, n, r, o, a) {
        return md5_cmn(e & n | i & ~n, t, e, r, o, a)
    }
    function md5_hh(t, e, i, n, r, o, a) {
        return md5_cmn(e ^ i ^ n, t, e, r, o, a)
    }
    function md5_ii(t, e, i, n, r, o, a) {
        return md5_cmn(i ^ (e | ~n), t, e, r, o, a)
    }
    function core_hmac_md5(t, e) {
        var i = str2binl(t);
        i.length > 16 && (i = core_md5(i, t.length * chrsz));
        for (var n = Array(16), r = Array(16), o = 0; 16 > o; o++) n[o] = 909522486 ^ i[o],
        r[o] = 1549556828 ^ i[o];
        var a = core_md5(n.concat(str2binl(e)), 512 + e.length * chrsz);
        return core_md5(r.concat(a), 640)
    }
    function safe_add(t, e) {
        var i = (65535 & t) + (65535 & e),
        n = (t >> 16) + (e >> 16) + (i >> 16);
        return n << 16 | 65535 & i
    }
    function bit_rol(t, e) {
        return t << e | t >>> 32 - e
    }
    function str2binl(t) {
        for (var e = Array(), i = (1 << chrsz) - 1, n = 0; n < t.length * chrsz; n += chrsz) e[n >> 5] |= (t.charCodeAt(n / chrsz) & i) << n % 32;
        return e
    }
    function binl2str(t) {
        for (var e = "", i = (1 << chrsz) - 1, n = 0; n < 32 * t.length; n += chrsz) e += String.fromCharCode(t[n >> 5] >>> n % 32 & i);
        return e
    }
    function binl2hex(t) {
        for (var e = hexcase ? "0123456789ABCDEF" : "0123456789abcdef", i = "", n = 0; n < 4 * t.length; n++) i += e.charAt(t[n >> 2] >> n % 4 * 8 + 4 & 15) + e.charAt(t[n >> 2] >> n % 4 * 8 & 15);
        return i
    }
    function binl2b64(t) {
        for (var e = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/", i = "", n = 0; n < 4 * t.length; n += 3) for (var r = (t[n >> 2] >> 8 * (n % 4) & 255) << 16 | (t[n + 1 >> 2] >> 8 * ((n + 1) % 4) & 255) << 8 | t[n + 2 >> 2] >> 8 * ((n + 2) % 4) & 255, o = 0; 4 > o; o++) i += 8 * n + 6 * o > 32 * t.length ? b64pad : e.charAt(r >> 6 * (3 - o) & 63);
        return i
    }
    function hexchar2bin(str) {
        for (var arr = [], i = 0; i < str.length; i += 2) arr.push("\\x" + str.substr(i, 2));
        return arr = arr.join(""),
        eval("var temp = '" + arr + "'"),
        temp
    }
    function __monitor(t, e) {
        if (! (Math.random() > (e || 1))) try {
            var i = location.protocol + "//ui.ptlogin2.qq.com/cgi-bin/report?id=" + t,
            n = document.createElement("img");
            n.src = i
        } catch(r) {}
    }
    function getEncryption(t, e, i, n) {
        i = i || "",
        t = t || "";
        for (var r = n ? t : md5(t), o = hexchar2bin(r), a = md5(o + e), s = TEA.strToBytes(i.toUpperCase(), !0), p = Number(s.length / 2).toString(16); p.length < 4;) p = "0" + p;
        TEA.initkey(a);
        var c = TEA.encrypt(r + TEA.strToBytes(e) + p + s);
        TEA.initkey("");
        for (var u = Number(c.length / 2).toString(16); u.length < 4;) u = "0" + u;
        var l = $pt.RSA.rsa_encrypt(hexchar2bin(u + c));
        return setTimeout(function() {
            __monitor(488358, 1)
        },
        0),
        btoa(hexchar2bin(l)).replace(/[\/\+=]/g, function(t) {
            return {
                "/": "-",
                "+": "*",
                "=": "_"
            } [t]
        })
    }
    function getRSAEncryption(t, e, i) {
        var n = i ? t : md5(t),
        r = n + e.toUpperCase(),
        o = $.RSA.rsa_encrypt(r);
        return o
    }
    var hexcase = 1,
    b64pad = "",
    chrsz = 8,
    mode = 32;
    return {
        getEncryption: getEncryption,
        getRSAEncryption: getRSAEncryption,
        md5: md5
    }
} ();