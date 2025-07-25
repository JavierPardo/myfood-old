/* eslint-disable */
/*! modernizr 3.5.0 (Custom Build) | MIT *
 * https://modernizr.com/download/?-bgpositionshorthand-bgpositionxy-bgrepeatspace_bgrepeatround-bgsizecover-borderradius-cssanimations-csscalc-csstransforms-csstransforms3d-csstransitions-flexboxtweener-fontface-inlinesvg-localstorage-multiplebgs-preserve3d-sessionstorage-smil-svg-svgasimg-svgclippaths-svgfilters-svgforeignobject-websqldatabase-setclasses !*/
!(function (e, t, n) {
  function r(e, t) {
    return typeof e === t;
  }
  function s() {
    var e, t, n, s, o, i, a;
    for (var l in S)
      if (S.hasOwnProperty(l)) {
        if (
          ((e = []),
          (t = S[l]),
          t.name &&
            (e.push(t.name.toLowerCase()),
            t.options && t.options.aliases && t.options.aliases.length))
        )
          for (n = 0; n < t.options.aliases.length; n++)
            e.push(t.options.aliases[n].toLowerCase());
        for (s = r(t.fn, "function") ? t.fn() : t.fn, o = 0; o < e.length; o++)
          (i = e[o]),
            (a = i.split(".")),
            1 === a.length
              ? (Modernizr[a[0]] = s)
              : (!Modernizr[a[0]] ||
                  Modernizr[a[0]] instanceof Boolean ||
                  (Modernizr[a[0]] = new Boolean(Modernizr[a[0]])),
                (Modernizr[a[0]][a[1]] = s)),
            b.push((s ? "" : "no-") + a.join("-"));
      }
  }
  function o(e) {
    var t = x.className,
      n = Modernizr._config.classPrefix || "";
    if ((C && (t = t.baseVal), Modernizr._config.enableJSClass)) {
      var r = new RegExp("(^|\\s)" + n + "no-js(\\s|$)");
      t = t.replace(r, "$1" + n + "js$2");
    }
    Modernizr._config.enableClasses &&
      ((t += " " + n + e.join(" " + n)),
      C ? (x.className.baseVal = t) : (x.className = t));
  }
  function i() {
    return "function" != typeof t.createElement
      ? t.createElement(arguments[0])
      : C
      ? t.createElementNS.call(t, "http://www.w3.org/2000/svg", arguments[0])
      : t.createElement.apply(t, arguments);
  }
  function a(e, t) {
    return !!~("" + e).indexOf(t);
  }
  function l() {
    var e = t.body;
    return e || ((e = i(C ? "svg" : "body")), (e.fake = !0)), e;
  }
  function d(e, n, r, s) {
    var o,
      a,
      d,
      u,
      c = "modernizr",
      f = i("div"),
      p = l();
    if (parseInt(r, 10))
      for (; r--; )
        (d = i("div")), (d.id = s ? s[r] : c + (r + 1)), f.appendChild(d);
    return (
      (o = i("style")),
      (o.type = "text/css"),
      (o.id = "s" + c),
      (p.fake ? p : f).appendChild(o),
      p.appendChild(f),
      o.styleSheet
        ? (o.styleSheet.cssText = e)
        : o.appendChild(t.createTextNode(e)),
      (f.id = c),
      p.fake &&
        ((p.style.background = ""),
        (p.style.overflow = "hidden"),
        (u = x.style.overflow),
        (x.style.overflow = "hidden"),
        x.appendChild(p)),
      (a = n(f, e)),
      p.fake
        ? (p.parentNode.removeChild(p), (x.style.overflow = u), x.offsetHeight)
        : f.parentNode.removeChild(f),
      !!a
    );
  }
  function u(e) {
    return e
      .replace(/([A-Z])/g, function (e, t) {
        return "-" + t.toLowerCase();
      })
      .replace(/^ms-/, "-ms-");
  }
  function c(t, n, r) {
    var s;
    if ("getComputedStyle" in e) {
      s = getComputedStyle.call(e, t, n);
      var o = e.console;
      if (null !== s) r && (s = s.getPropertyValue(r));
      else if (o) {
        var i = o.error ? "error" : "log";
        o[i].call(
          o,
          "getComputedStyle returning null, its possible modernizr test results are inaccurate"
        );
      }
    } else s = !n && t.currentStyle && t.currentStyle[r];
    return s;
  }
  function f(t, r) {
    var s = t.length;
    if ("CSS" in e && "supports" in e.CSS) {
      for (; s--; ) if (e.CSS.supports(u(t[s]), r)) return !0;
      return !1;
    }
    if ("CSSSupportsRule" in e) {
      for (var o = []; s--; ) o.push("(" + u(t[s]) + ":" + r + ")");
      return (
        (o = o.join(" or ")),
        d(
          "@supports (" + o + ") { #modernizr { position: absolute; } }",
          function (e) {
            return "absolute" == c(e, null, "position");
          }
        )
      );
    }
    return n;
  }
  function p(e) {
    return e
      .replace(/([a-z])-([a-z])/g, function (e, t, n) {
        return t + n.toUpperCase();
      })
      .replace(/^-/, "");
  }
  function g(e, t, s, o) {
    function l() {
      u && (delete k.style, delete k.modElem);
    }
    if (((o = r(o, "undefined") ? !1 : o), !r(s, "undefined"))) {
      var d = f(e, s);
      if (!r(d, "undefined")) return d;
    }
    for (
      var u, c, g, m, h, v = ["modernizr", "tspan", "samp"];
      !k.style && v.length;

    )
      (u = !0), (k.modElem = i(v.shift())), (k.style = k.modElem.style);
    for (g = e.length, c = 0; g > c; c++)
      if (
        ((m = e[c]),
        (h = k.style[m]),
        a(m, "-") && (m = p(m)),
        k.style[m] !== n)
      ) {
        if (o || r(s, "undefined")) return l(), "pfx" == t ? m : !0;
        try {
          k.style[m] = s;
        } catch (y) {}
        if (k.style[m] != h) return l(), "pfx" == t ? m : !0;
      }
    return l(), !1;
  }
  function m(e, t) {
    return function () {
      return e.apply(t, arguments);
    };
  }
  function h(e, t, n) {
    var s;
    for (var o in e)
      if (e[o] in t)
        return n === !1
          ? e[o]
          : ((s = t[e[o]]), r(s, "function") ? m(s, n || t) : s);
    return !1;
  }
  function v(e, t, n, s, o) {
    var i = e.charAt(0).toUpperCase() + e.slice(1),
      a = (e + " " + E.join(i + " ") + i).split(" ");
    return r(t, "string") || r(t, "undefined")
      ? g(a, t, s, o)
      : ((a = (e + " " + z.join(i + " ") + i).split(" ")), h(a, t, n));
  }
  function y(e, t, r) {
    return v(e, n, n, t, r);
  }
  function w(e, t) {
    if ("object" == typeof e) for (var n in e) O(e, n) && w(n, e[n]);
    else {
      e = e.toLowerCase();
      var r = e.split("."),
        s = Modernizr[r[0]];
      if ((2 == r.length && (s = s[r[1]]), "undefined" != typeof s))
        return Modernizr;
      (t = "function" == typeof t ? t() : t),
        1 == r.length
          ? (Modernizr[r[0]] = t)
          : (!Modernizr[r[0]] ||
              Modernizr[r[0]] instanceof Boolean ||
              (Modernizr[r[0]] = new Boolean(Modernizr[r[0]])),
            (Modernizr[r[0]][r[1]] = t)),
        o([(t && 0 != t ? "" : "no-") + r.join("-")]),
        Modernizr._trigger(e, t);
    }
    return Modernizr;
  }
  var S = [],
    T = {
      _version: "3.5.0",
      _config: {
        classPrefix: "",
        enableClasses: !0,
        enableJSClass: !0,
        usePrefixes: !0,
      },
      _q: [],
      on: function (e, t) {
        var n = this;
        setTimeout(function () {
          t(n[e]);
        }, 0);
      },
      addTest: function (e, t, n) {
        S.push({ name: e, fn: t, options: n });
      },
      addAsyncTest: function (e) {
        S.push({ name: null, fn: e });
      },
    },
    Modernizr = function () {};
  (Modernizr.prototype = T), (Modernizr = new Modernizr());
  var b = [],
    x = t.documentElement,
    C = "svg" === x.nodeName.toLowerCase();
  Modernizr.addTest("bgpositionshorthand", function () {
    var e = i("a"),
      t = e.style,
      n = "right 10px bottom 10px";
    return (
      (t.cssText = "background-position: " + n + ";"),
      t.backgroundPosition === n
    );
  });
  var _ = "Moz O ms Webkit",
    E = T._config.usePrefixes ? _.split(" ") : [];
  T._cssomPrefixes = E;
  var P = { elem: i("modernizr") };
  Modernizr._q.push(function () {
    delete P.elem;
  });
  var k = { style: P.elem.style };
  Modernizr._q.unshift(function () {
    delete k.style;
  });
  var z = T._config.usePrefixes ? _.toLowerCase().split(" ") : [];
  (T._domPrefixes = z),
    (T.testAllProps = v),
    (T.testAllProps = y),
    Modernizr.addTest("bgpositionxy", function () {
      return (
        y("backgroundPositionX", "3px", !0) &&
        y("backgroundPositionY", "5px", !0)
      );
    }),
    Modernizr.addTest("bgrepeatround", y("backgroundRepeat", "round")),
    Modernizr.addTest("bgrepeatspace", y("backgroundRepeat", "space")),
    Modernizr.addTest("bgsizecover", y("backgroundSize", "cover")),
    Modernizr.addTest("borderradius", y("borderRadius", "0px", !0)),
    Modernizr.addTest("cssanimations", y("animationName", "a", !0));
  var N = T._config.usePrefixes
    ? " -webkit- -moz- -o- -ms- ".split(" ")
    : ["", ""];
  (T._prefixes = N),
    Modernizr.addTest("csscalc", function () {
      var e = "width:",
        t = "calc(10px);",
        n = i("a");
      return (n.style.cssText = e + N.join(t + e)), !!n.style.length;
    }),
    Modernizr.addTest("csstransforms", function () {
      return (
        -1 === navigator.userAgent.indexOf("Android 2.") &&
        y("transform", "scale(1)", !0)
      );
    });
  var R = (T.testStyles = d),
    A = "CSS" in e && "supports" in e.CSS,
    j = "supportsCSS" in e;
  Modernizr.addTest("supports", A || j),
    Modernizr.addTest("csstransforms3d", function () {
      var e = !!y("perspective", "1px", !0),
        t = Modernizr._config.usePrefixes;
      if (e && (!t || "webkitPerspective" in x.style)) {
        var n,
          r = "#modernizr{width:0;height:0}";
        Modernizr.supports
          ? (n = "@supports (perspective: 1px)")
          : ((n = "@media (transform-3d)"),
            t && (n += ",(-webkit-transform-3d)")),
          (n +=
            "{#modernizr{width:7px;height:18px;margin:0;padding:0;border:0}}"),
          R(r + n, function (t) {
            e = 7 === t.offsetWidth && 18 === t.offsetHeight;
          });
      }
      return e;
    }),
    Modernizr.addTest("preserve3d", function () {
      var t,
        n,
        r = e.CSS,
        s = !1;
      return r && r.supports && r.supports("(transform-style: preserve-3d)")
        ? !0
        : ((t = i("a")),
          (n = i("a")),
          (t.style.cssText =
            "display: block; transform-style: preserve-3d; transform-origin: right; transform: rotateY(40deg);"),
          (n.style.cssText =
            "display: block; width: 9px; height: 1px; background: #000; transform-origin: right; transform: rotateY(40deg);"),
          t.appendChild(n),
          x.appendChild(t),
          (s = n.getBoundingClientRect()),
          x.removeChild(t),
          (s = s.width && s.width < 4));
    }),
    Modernizr.addTest("csstransitions", y("transition", "all", !0)),
    Modernizr.addTest("flexboxtweener", y("flexAlign", "end", !0));
  var V = (function () {
    var e = navigator.userAgent,
      t = e.match(/w(eb)?osbrowser/gi),
      n =
        e.match(/windows phone/gi) &&
        e.match(/iemobile\/([0-9])+/gi) &&
        parseFloat(RegExp.$1) >= 9;
    return t || n;
  })();
  V
    ? Modernizr.addTest("fontface", !1)
    : R('@font-face {font-family:"font";src:url("https://")}', function (e, n) {
        var r = t.getElementById("smodernizr"),
          s = r.sheet || r.styleSheet,
          o = s
            ? s.cssRules && s.cssRules[0]
              ? s.cssRules[0].cssText
              : s.cssText || ""
            : "",
          i = /src/i.test(o) && 0 === o.indexOf(n.split(" ")[0]);
        Modernizr.addTest("fontface", i);
      }),
    Modernizr.addTest(
      "svg",
      !!t.createElementNS &&
        !!t.createElementNS("http://www.w3.org/2000/svg", "svg").createSVGRect
    );
  var O;
  !(function () {
    var e = {}.hasOwnProperty;
    O =
      r(e, "undefined") || r(e.call, "undefined")
        ? function (e, t) {
            return t in e && r(e.constructor.prototype[t], "undefined");
          }
        : function (t, n) {
            return e.call(t, n);
          };
  })(),
    (T._l = {}),
    (T.on = function (e, t) {
      this._l[e] || (this._l[e] = []),
        this._l[e].push(t),
        Modernizr.hasOwnProperty(e) &&
          setTimeout(function () {
            Modernizr._trigger(e, Modernizr[e]);
          }, 0);
    }),
    (T._trigger = function (e, t) {
      if (this._l[e]) {
        var n = this._l[e];
        setTimeout(function () {
          var e, r;
          for (e = 0; e < n.length; e++) (r = n[e])(t);
        }, 0),
          delete this._l[e];
      }
    }),
    Modernizr._q.push(function () {
      T.addTest = w;
    }),
    Modernizr.addTest(
      "svgasimg",
      t.implementation.hasFeature(
        "http://www.w3.org/TR/SVG11/feature#Image",
        "1.1"
      )
    );
  var I = {}.toString;
  Modernizr.addTest("svgclippaths", function () {
    return (
      !!t.createElementNS &&
      /SVGClipPath/.test(
        I.call(t.createElementNS("http://www.w3.org/2000/svg", "clipPath"))
      )
    );
  }),
    Modernizr.addTest("svgfilters", function () {
      var t = !1;
      try {
        t =
          "SVGFEColorMatrixElement" in e &&
          2 == SVGFEColorMatrixElement.SVG_FECOLORMATRIX_TYPE_SATURATE;
      } catch (n) {}
      return t;
    }),
    Modernizr.addTest("svgforeignobject", function () {
      return (
        !!t.createElementNS &&
        /SVGForeignObject/.test(
          I.call(
            t.createElementNS("http://www.w3.org/2000/svg", "foreignObject")
          )
        )
      );
    }),
    Modernizr.addTest("inlinesvg", function () {
      var e = i("div");
      return (
        (e.innerHTML = "<svg/>"),
        "http://www.w3.org/2000/svg" ==
          ("undefined" != typeof SVGRect &&
            e.firstChild &&
            e.firstChild.namespaceURI)
      );
    }),
    Modernizr.addTest("smil", function () {
      return (
        !!t.createElementNS &&
        /SVGAnimate/.test(
          I.call(t.createElementNS("http://www.w3.org/2000/svg", "animate"))
        )
      );
    }),
    Modernizr.addTest("localstorage", function () {
      var e = "modernizr";
      try {
        return localStorage.setItem(e, e), localStorage.removeItem(e), !0;
      } catch (t) {
        return !1;
      }
    }),
    Modernizr.addTest("sessionstorage", function () {
      var e = "modernizr";
      try {
        return sessionStorage.setItem(e, e), sessionStorage.removeItem(e), !0;
      } catch (t) {
        return !1;
      }
    }),
    Modernizr.addTest("websqldatabase", "openDatabase" in e),
    Modernizr.addTest("multiplebgs", function () {
      var e = i("a").style;
      return (
        (e.cssText =
          "background:url(https://),url(https://),red url(https://)"),
        /(url\s*\(.*?){3}/.test(e.background)
      );
    }),
    s(),
    o(b),
    delete T.addTest,
    delete T.addAsyncTest;
  for (var G = 0; G < Modernizr._q.length; G++) Modernizr._q[G]();
  e.Modernizr = Modernizr;
})(window, document);
