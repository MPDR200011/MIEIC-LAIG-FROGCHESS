CGFversion = "2.0.5";
CGFdate = " (20191021)";
console.log("WebCGF - Library for Computer Graphics @ FEUP (WebGL) - v" + CGFversion + CGFdate);
var Detector = {
    canvas: !!window.CanvasRenderingContext2D,
    webgl: (function() {
        try {
            var t = document.createElement("canvas");
            return !!(window.WebGLRenderingContext && t.getContext("webgl2"));
        } catch (t) {
            return false;
        }
    })(),
    workers: !!window.Worker,
    fileapi: window.File && window.FileReader && window.FileList && window.Blob,
    getWebGLErrorMessage: function() {
        var t = document.createElement("div");
        t.id = "webgl-error-message";
        t.style.fontFamily = "monospace";
        t.style.fontSize = "13px";
        t.style.fontWeight = "normal";
        t.style.textAlign = "center";
        t.style.background = "#fff";
        t.style.color = "#000";
        t.style.padding = "1.5em";
        t.style.width = "400px";
        t.style.margin = "5em auto 0";
        if (!this.webgl) {
            t.innerHTML = window.WebGLRenderingContext
                ? [
                      'Your graphics card does not seem to support <a href="http://khronos.org/webgl/wiki/Getting_a_WebGL_Implementation" style="color:#000">WebGL</a>.<br />',
                      'Find out how to get it <a href="http://get.webgl.org/" style="color:#000">here</a>.'
                  ].join("\n")
                : [
                      'Your browser does not seem to support <a href="http://khronos.org/webgl/wiki/Getting_a_WebGL_Implementation" style="color:#000">WebGL</a>.<br/>',
                      'Find out how to get it <a href="http://get.webgl.org/" style="color:#000">here</a>.'
                  ].join("\n");
        }
        return t;
    },
    addGetWebGLMessage: function(t) {
        var e, i, r;
        t = t || {};
        e = t.parent !== undefined ? t.parent : document.body;
        i = t.id !== undefined ? t.id : "oldie";
        r = Detector.getWebGLErrorMessage();
        r.id = i;
        e.appendChild(r);
    }
};
if (typeof module === "object") {
    module.exports = Detector;
}
(function() {
    "use strict";
    var t = {};
    if (typeof exports === "undefined") {
        if (typeof define == "function" && typeof define.amd == "object" && define.amd) {
            t.exports = {};
            define(function() {
                return t.exports;
            });
        } else {
            t.exports = window;
        }
    } else {
        t.exports = exports;
    }
    (function(t) {
        if (!e) {
            var e = 1e-6;
        }
        if (!i) {
            var i = typeof Float32Array !== "undefined" ? Float32Array : Array;
        }
        var r = {};
        r.setMatrixArrayType = function(t) {
            i = t;
        };
        if (typeof t !== "undefined") {
            t.glMatrix = r;
        }
        var n = {};
        n.create = function() {
            var t = new i(2);
            t[0] = 0;
            t[1] = 0;
            return t;
        };
        n.clone = function(t) {
            var e = new i(2);
            e[0] = t[0];
            e[1] = t[1];
            return e;
        };
        n.fromValues = function(t, e) {
            var r = new i(2);
            r[0] = t;
            r[1] = e;
            return r;
        };
        n.copy = function(t, e) {
            t[0] = e[0];
            t[1] = e[1];
            return t;
        };
        n.set = function(t, e, i) {
            t[0] = e;
            t[1] = i;
            return t;
        };
        n.add = function(t, e, i) {
            t[0] = e[0] + i[0];
            t[1] = e[1] + i[1];
            return t;
        };
        n.subtract = function(t, e, i) {
            t[0] = e[0] - i[0];
            t[1] = e[1] - i[1];
            return t;
        };
        n.sub = n.subtract;
        n.multiply = function(t, e, i) {
            t[0] = e[0] * i[0];
            t[1] = e[1] * i[1];
            return t;
        };
        n.mul = n.multiply;
        n.divide = function(t, e, i) {
            t[0] = e[0] / i[0];
            t[1] = e[1] / i[1];
            return t;
        };
        n.div = n.divide;
        n.min = function(t, e, i) {
            t[0] = Math.min(e[0], i[0]);
            t[1] = Math.min(e[1], i[1]);
            return t;
        };
        n.max = function(t, e, i) {
            t[0] = Math.max(e[0], i[0]);
            t[1] = Math.max(e[1], i[1]);
            return t;
        };
        n.scale = function(t, e, i) {
            t[0] = e[0] * i;
            t[1] = e[1] * i;
            return t;
        };
        n.distance = function(t, e) {
            var i = e[0] - t[0],
                r = e[1] - t[1];
            return Math.sqrt(i * i + r * r);
        };
        n.dist = n.distance;
        n.squaredDistance = function(t, e) {
            var i = e[0] - t[0],
                r = e[1] - t[1];
            return i * i + r * r;
        };
        n.sqrDist = n.squaredDistance;
        n.length = function(t) {
            var e = t[0],
                i = t[1];
            return Math.sqrt(e * e + i * i);
        };
        n.len = n.length;
        n.squaredLength = function(t) {
            var e = t[0],
                i = t[1];
            return e * e + i * i;
        };
        n.sqrLen = n.squaredLength;
        n.negate = function(t, e) {
            t[0] = -e[0];
            t[1] = -e[1];
            return t;
        };
        n.normalize = function(t, e) {
            var i = e[0],
                r = e[1];
            var n = i * i + r * r;
            if (n > 0) {
                n = 1 / Math.sqrt(n);
                t[0] = e[0] * n;
                t[1] = e[1] * n;
            }
            return t;
        };
        n.dot = function(t, e) {
            return t[0] * e[0] + t[1] * e[1];
        };
        n.cross = function(t, e, i) {
            var r = e[0] * i[1] - e[1] * i[0];
            t[0] = t[1] = 0;
            t[2] = r;
            return t;
        };
        n.lerp = function(t, e, i, r) {
            var n = e[0],
                s = e[1];
            t[0] = n + r * (i[0] - n);
            t[1] = s + r * (i[1] - s);
            return t;
        };
        n.transformMat2 = function(t, e, i) {
            var r = e[0],
                n = e[1];
            t[0] = i[0] * r + i[2] * n;
            t[1] = i[1] * r + i[3] * n;
            return t;
        };
        n.transformMat2d = function(t, e, i) {
            var r = e[0],
                n = e[1];
            t[0] = i[0] * r + i[2] * n + i[4];
            t[1] = i[1] * r + i[3] * n + i[5];
            return t;
        };
        n.transformMat3 = function(t, e, i) {
            var r = e[0],
                n = e[1];
            t[0] = i[0] * r + i[3] * n + i[6];
            t[1] = i[1] * r + i[4] * n + i[7];
            return t;
        };
        n.transformMat4 = function(t, e, i) {
            var r = e[0],
                n = e[1];
            t[0] = i[0] * r + i[4] * n + i[12];
            t[1] = i[1] * r + i[5] * n + i[13];
            return t;
        };
        n.forEach = (function() {
            var t = n.create();
            return function(e, i, r, n, s, o) {
                var a, c;
                if (!i) {
                    i = 2;
                }
                if (!r) {
                    r = 0;
                }
                if (n) {
                    c = Math.min(n * i + r, e.length);
                } else {
                    c = e.length;
                }
                for (a = r; a < c; a += i) {
                    t[0] = e[a];
                    t[1] = e[a + 1];
                    s(t, t, o);
                    e[a] = t[0];
                    e[a + 1] = t[1];
                }
                return e;
            };
        })();
        n.str = function(t) {
            return "vec2(" + t[0] + ", " + t[1] + ")";
        };
        if (typeof t !== "undefined") {
            t.vec2 = n;
        }
        var s = {};
        s.create = function() {
            var t = new i(3);
            t[0] = 0;
            t[1] = 0;
            t[2] = 0;
            return t;
        };
        s.clone = function(t) {
            var e = new i(3);
            e[0] = t[0];
            e[1] = t[1];
            e[2] = t[2];
            return e;
        };
        s.fromValues = function(t, e, r) {
            var n = new i(3);
            n[0] = t;
            n[1] = e;
            n[2] = r;
            return n;
        };
        s.copy = function(t, e) {
            t[0] = e[0];
            t[1] = e[1];
            t[2] = e[2];
            return t;
        };
        s.set = function(t, e, i, r) {
            t[0] = e;
            t[1] = i;
            t[2] = r;
            return t;
        };
        s.add = function(t, e, i) {
            t[0] = e[0] + i[0];
            t[1] = e[1] + i[1];
            t[2] = e[2] + i[2];
            return t;
        };
        s.subtract = function(t, e, i) {
            t[0] = e[0] - i[0];
            t[1] = e[1] - i[1];
            t[2] = e[2] - i[2];
            return t;
        };
        s.sub = s.subtract;
        s.multiply = function(t, e, i) {
            t[0] = e[0] * i[0];
            t[1] = e[1] * i[1];
            t[2] = e[2] * i[2];
            return t;
        };
        s.mul = s.multiply;
        s.divide = function(t, e, i) {
            t[0] = e[0] / i[0];
            t[1] = e[1] / i[1];
            t[2] = e[2] / i[2];
            return t;
        };
        s.div = s.divide;
        s.min = function(t, e, i) {
            t[0] = Math.min(e[0], i[0]);
            t[1] = Math.min(e[1], i[1]);
            t[2] = Math.min(e[2], i[2]);
            return t;
        };
        s.max = function(t, e, i) {
            t[0] = Math.max(e[0], i[0]);
            t[1] = Math.max(e[1], i[1]);
            t[2] = Math.max(e[2], i[2]);
            return t;
        };
        s.scale = function(t, e, i) {
            t[0] = e[0] * i;
            t[1] = e[1] * i;
            t[2] = e[2] * i;
            return t;
        };
        s.distance = function(t, e) {
            var i = e[0] - t[0],
                r = e[1] - t[1],
                n = e[2] - t[2];
            return Math.sqrt(i * i + r * r + n * n);
        };
        s.dist = s.distance;
        s.squaredDistance = function(t, e) {
            var i = e[0] - t[0],
                r = e[1] - t[1],
                n = e[2] - t[2];
            return i * i + r * r + n * n;
        };
        s.sqrDist = s.squaredDistance;
        s.length = function(t) {
            var e = t[0],
                i = t[1],
                r = t[2];
            return Math.sqrt(e * e + i * i + r * r);
        };
        s.len = s.length;
        s.squaredLength = function(t) {
            var e = t[0],
                i = t[1],
                r = t[2];
            return e * e + i * i + r * r;
        };
        s.sqrLen = s.squaredLength;
        s.negate = function(t, e) {
            t[0] = -e[0];
            t[1] = -e[1];
            t[2] = -e[2];
            return t;
        };
        s.normalize = function(t, e) {
            var i = e[0],
                r = e[1],
                n = e[2];
            var s = i * i + r * r + n * n;
            if (s > 0) {
                s = 1 / Math.sqrt(s);
                t[0] = e[0] * s;
                t[1] = e[1] * s;
                t[2] = e[2] * s;
            }
            return t;
        };
        s.dot = function(t, e) {
            return t[0] * e[0] + t[1] * e[1] + t[2] * e[2];
        };
        s.cross = function(t, e, i) {
            var r = e[0],
                n = e[1],
                s = e[2],
                o = i[0],
                a = i[1],
                c = i[2];
            t[0] = n * c - s * a;
            t[1] = s * o - r * c;
            t[2] = r * a - n * o;
            return t;
        };
        s.lerp = function(t, e, i, r) {
            var n = e[0],
                s = e[1],
                o = e[2];
            t[0] = n + r * (i[0] - n);
            t[1] = s + r * (i[1] - s);
            t[2] = o + r * (i[2] - o);
            return t;
        };
        s.transformMat4 = function(t, e, i) {
            var r = e[0],
                n = e[1],
                s = e[2];
            t[0] = i[0] * r + i[4] * n + i[8] * s + i[12];
            t[1] = i[1] * r + i[5] * n + i[9] * s + i[13];
            t[2] = i[2] * r + i[6] * n + i[10] * s + i[14];
            return t;
        };
        s.transformQuat = function(t, e, i) {
            var r = e[0],
                n = e[1],
                s = e[2],
                o = i[0],
                a = i[1],
                c = i[2],
                l = i[3],
                u = l * r + a * s - c * n,
                h = l * n + c * r - o * s,
                d = l * s + o * n - a * r,
                f = -o * r - a * n - c * s;
            t[0] = u * l + f * -o + h * -c - d * -a;
            t[1] = h * l + f * -a + d * -o - u * -c;
            t[2] = d * l + f * -c + u * -a - h * -o;
            return t;
        };
        s.forEach = (function() {
            var t = s.create();
            return function(e, i, r, n, s, o) {
                var a, c;
                if (!i) {
                    i = 3;
                }
                if (!r) {
                    r = 0;
                }
                if (n) {
                    c = Math.min(n * i + r, e.length);
                } else {
                    c = e.length;
                }
                for (a = r; a < c; a += i) {
                    t[0] = e[a];
                    t[1] = e[a + 1];
                    t[2] = e[a + 2];
                    s(t, t, o);
                    e[a] = t[0];
                    e[a + 1] = t[1];
                    e[a + 2] = t[2];
                }
                return e;
            };
        })();
        s.str = function(t) {
            return "vec3(" + t[0] + ", " + t[1] + ", " + t[2] + ")";
        };
        if (typeof t !== "undefined") {
            t.vec3 = s;
        }
        var o = {};
        o.create = function() {
            var t = new i(4);
            t[0] = 0;
            t[1] = 0;
            t[2] = 0;
            t[3] = 0;
            return t;
        };
        o.clone = function(t) {
            var e = new i(4);
            e[0] = t[0];
            e[1] = t[1];
            e[2] = t[2];
            e[3] = t[3];
            return e;
        };
        o.fromValues = function(t, e, r, n) {
            var s = new i(4);
            s[0] = t;
            s[1] = e;
            s[2] = r;
            s[3] = n;
            return s;
        };
        o.copy = function(t, e) {
            t[0] = e[0];
            t[1] = e[1];
            t[2] = e[2];
            t[3] = e[3];
            return t;
        };
        o.set = function(t, e, i, r, n) {
            t[0] = e;
            t[1] = i;
            t[2] = r;
            t[3] = n;
            return t;
        };
        o.add = function(t, e, i) {
            t[0] = e[0] + i[0];
            t[1] = e[1] + i[1];
            t[2] = e[2] + i[2];
            t[3] = e[3] + i[3];
            return t;
        };
        o.subtract = function(t, e, i) {
            t[0] = e[0] - i[0];
            t[1] = e[1] - i[1];
            t[2] = e[2] - i[2];
            t[3] = e[3] - i[3];
            return t;
        };
        o.sub = o.subtract;
        o.multiply = function(t, e, i) {
            t[0] = e[0] * i[0];
            t[1] = e[1] * i[1];
            t[2] = e[2] * i[2];
            t[3] = e[3] * i[3];
            return t;
        };
        o.mul = o.multiply;
        o.divide = function(t, e, i) {
            t[0] = e[0] / i[0];
            t[1] = e[1] / i[1];
            t[2] = e[2] / i[2];
            t[3] = e[3] / i[3];
            return t;
        };
        o.div = o.divide;
        o.min = function(t, e, i) {
            t[0] = Math.min(e[0], i[0]);
            t[1] = Math.min(e[1], i[1]);
            t[2] = Math.min(e[2], i[2]);
            t[3] = Math.min(e[3], i[3]);
            return t;
        };
        o.max = function(t, e, i) {
            t[0] = Math.max(e[0], i[0]);
            t[1] = Math.max(e[1], i[1]);
            t[2] = Math.max(e[2], i[2]);
            t[3] = Math.max(e[3], i[3]);
            return t;
        };
        o.scale = function(t, e, i) {
            t[0] = e[0] * i;
            t[1] = e[1] * i;
            t[2] = e[2] * i;
            t[3] = e[3] * i;
            return t;
        };
        o.distance = function(t, e) {
            var i = e[0] - t[0],
                r = e[1] - t[1],
                n = e[2] - t[2],
                s = e[3] - t[3];
            return Math.sqrt(i * i + r * r + n * n + s * s);
        };
        o.dist = o.distance;
        o.squaredDistance = function(t, e) {
            var i = e[0] - t[0],
                r = e[1] - t[1],
                n = e[2] - t[2],
                s = e[3] - t[3];
            return i * i + r * r + n * n + s * s;
        };
        o.sqrDist = o.squaredDistance;
        o.length = function(t) {
            var e = t[0],
                i = t[1],
                r = t[2],
                n = t[3];
            return Math.sqrt(e * e + i * i + r * r + n * n);
        };
        o.len = o.length;
        o.squaredLength = function(t) {
            var e = t[0],
                i = t[1],
                r = t[2],
                n = t[3];
            return e * e + i * i + r * r + n * n;
        };
        o.sqrLen = o.squaredLength;
        o.negate = function(t, e) {
            t[0] = -e[0];
            t[1] = -e[1];
            t[2] = -e[2];
            t[3] = -e[3];
            return t;
        };
        o.normalize = function(t, e) {
            var i = e[0],
                r = e[1],
                n = e[2],
                s = e[3];
            var o = i * i + r * r + n * n + s * s;
            if (o > 0) {
                o = 1 / Math.sqrt(o);
                t[0] = e[0] * o;
                t[1] = e[1] * o;
                t[2] = e[2] * o;
                t[3] = e[3] * o;
            }
            return t;
        };
        o.dot = function(t, e) {
            return t[0] * e[0] + t[1] * e[1] + t[2] * e[2] + t[3] * e[3];
        };
        o.lerp = function(t, e, i, r) {
            var n = e[0],
                s = e[1],
                o = e[2],
                a = e[3];
            t[0] = n + r * (i[0] - n);
            t[1] = s + r * (i[1] - s);
            t[2] = o + r * (i[2] - o);
            t[3] = a + r * (i[3] - a);
            return t;
        };
        o.transformMat4 = function(t, e, i) {
            var r = e[0],
                n = e[1],
                s = e[2],
                o = e[3];
            t[0] = i[0] * r + i[4] * n + i[8] * s + i[12] * o;
            t[1] = i[1] * r + i[5] * n + i[9] * s + i[13] * o;
            t[2] = i[2] * r + i[6] * n + i[10] * s + i[14] * o;
            t[3] = i[3] * r + i[7] * n + i[11] * s + i[15] * o;
            return t;
        };
        o.transformQuat = function(t, e, i) {
            var r = e[0],
                n = e[1],
                s = e[2],
                o = i[0],
                a = i[1],
                c = i[2],
                l = i[3],
                u = l * r + a * s - c * n,
                h = l * n + c * r - o * s,
                d = l * s + o * n - a * r,
                f = -o * r - a * n - c * s;
            t[0] = u * l + f * -o + h * -c - d * -a;
            t[1] = h * l + f * -a + d * -o - u * -c;
            t[2] = d * l + f * -c + u * -a - h * -o;
            return t;
        };
        o.forEach = (function() {
            var t = o.create();
            return function(e, i, r, n, s, o) {
                var a, c;
                if (!i) {
                    i = 4;
                }
                if (!r) {
                    r = 0;
                }
                if (n) {
                    c = Math.min(n * i + r, e.length);
                } else {
                    c = e.length;
                }
                for (a = r; a < c; a += i) {
                    t[0] = e[a];
                    t[1] = e[a + 1];
                    t[2] = e[a + 2];
                    t[3] = e[a + 3];
                    s(t, t, o);
                    e[a] = t[0];
                    e[a + 1] = t[1];
                    e[a + 2] = t[2];
                    e[a + 3] = t[3];
                }
                return e;
            };
        })();
        o.str = function(t) {
            return "vec4(" + t[0] + ", " + t[1] + ", " + t[2] + ", " + t[3] + ")";
        };
        if (typeof t !== "undefined") {
            t.vec4 = o;
        }
        var a = {};
        var c = new Float32Array([1, 0, 0, 1]);
        a.create = function() {
            var t = new i(4);
            t[0] = 1;
            t[1] = 0;
            t[2] = 0;
            t[3] = 1;
            return t;
        };
        a.clone = function(t) {
            var e = new i(4);
            e[0] = t[0];
            e[1] = t[1];
            e[2] = t[2];
            e[3] = t[3];
            return e;
        };
        a.copy = function(t, e) {
            t[0] = e[0];
            t[1] = e[1];
            t[2] = e[2];
            t[3] = e[3];
            return t;
        };
        a.identity = function(t) {
            t[0] = 1;
            t[1] = 0;
            t[2] = 0;
            t[3] = 1;
            return t;
        };
        a.transpose = function(t, e) {
            if (t === e) {
                var i = e[1];
                t[1] = e[2];
                t[2] = i;
            } else {
                t[0] = e[0];
                t[1] = e[2];
                t[2] = e[1];
                t[3] = e[3];
            }
            return t;
        };
        a.invert = function(t, e) {
            var i = e[0],
                r = e[1],
                n = e[2],
                s = e[3],
                o = i * s - n * r;
            if (!o) {
                return null;
            }
            o = 1 / o;
            t[0] = s * o;
            t[1] = -r * o;
            t[2] = -n * o;
            t[3] = i * o;
            return t;
        };
        a.adjoint = function(t, e) {
            var i = e[0];
            t[0] = e[3];
            t[1] = -e[1];
            t[2] = -e[2];
            t[3] = i;
            return t;
        };
        a.determinant = function(t) {
            return t[0] * t[3] - t[2] * t[1];
        };
        a.multiply = function(t, e, i) {
            var r = e[0],
                n = e[1],
                s = e[2],
                o = e[3];
            var a = i[0],
                c = i[1],
                l = i[2],
                u = i[3];
            t[0] = r * a + n * l;
            t[1] = r * c + n * u;
            t[2] = s * a + o * l;
            t[3] = s * c + o * u;
            return t;
        };
        a.mul = a.multiply;
        a.rotate = function(t, e, i) {
            var r = e[0],
                n = e[1],
                s = e[2],
                o = e[3],
                a = Math.sin(i),
                c = Math.cos(i);
            t[0] = r * c + n * a;
            t[1] = r * -a + n * c;
            t[2] = s * c + o * a;
            t[3] = s * -a + o * c;
            return t;
        };
        a.scale = function(t, e, i) {
            var r = e[0],
                n = e[1],
                s = e[2],
                o = e[3],
                a = i[0],
                c = i[1];
            t[0] = r * a;
            t[1] = n * c;
            t[2] = s * a;
            t[3] = o * c;
            return t;
        };
        a.str = function(t) {
            return "mat2(" + t[0] + ", " + t[1] + ", " + t[2] + ", " + t[3] + ")";
        };
        if (typeof t !== "undefined") {
            t.mat2 = a;
        }
        var l = {};
        var u = new Float32Array([1, 0, 0, 1, 0, 0]);
        l.create = function() {
            var t = new i(6);
            t[0] = 1;
            t[1] = 0;
            t[2] = 0;
            t[3] = 1;
            t[4] = 0;
            t[5] = 0;
            return t;
        };
        l.clone = function(t) {
            var e = new i(6);
            e[0] = t[0];
            e[1] = t[1];
            e[2] = t[2];
            e[3] = t[3];
            e[4] = t[4];
            e[5] = t[5];
            return e;
        };
        l.copy = function(t, e) {
            t[0] = e[0];
            t[1] = e[1];
            t[2] = e[2];
            t[3] = e[3];
            t[4] = e[4];
            t[5] = e[5];
            return t;
        };
        l.identity = function(t) {
            t[0] = 1;
            t[1] = 0;
            t[2] = 0;
            t[3] = 1;
            t[4] = 0;
            t[5] = 0;
            return t;
        };
        l.invert = function(t, e) {
            var i = e[0],
                r = e[1],
                n = e[2],
                s = e[3],
                o = e[4],
                a = e[5];
            var c = i * s - r * n;
            if (!c) {
                return null;
            }
            c = 1 / c;
            t[0] = s * c;
            t[1] = -r * c;
            t[2] = -n * c;
            t[3] = i * c;
            t[4] = (n * a - s * o) * c;
            t[5] = (r * o - i * a) * c;
            return t;
        };
        l.determinant = function(t) {
            return t[0] * t[3] - t[1] * t[2];
        };
        l.multiply = function(t, e, i) {
            var r = e[0],
                n = e[1],
                s = e[2],
                o = e[3],
                a = e[4],
                c = e[5],
                l = i[0],
                u = i[1],
                h = i[2],
                d = i[3],
                f = i[4],
                p = i[5];
            t[0] = r * l + n * h;
            t[1] = r * u + n * d;
            t[2] = s * l + o * h;
            t[3] = s * u + o * d;
            t[4] = l * a + h * c + f;
            t[5] = u * a + d * c + p;
            return t;
        };
        l.mul = l.multiply;
        l.rotate = function(t, e, i) {
            var r = e[0],
                n = e[1],
                s = e[2],
                o = e[3],
                a = e[4],
                c = e[5],
                l = Math.sin(i),
                u = Math.cos(i);
            t[0] = r * u + n * l;
            t[1] = -r * l + n * u;
            t[2] = s * u + o * l;
            t[3] = -s * l + u * o;
            t[4] = u * a + l * c;
            t[5] = u * c - l * a;
            return t;
        };
        l.scale = function(t, e, i) {
            var r = i[0],
                n = i[1];
            t[0] = e[0] * r;
            t[1] = e[1] * n;
            t[2] = e[2] * r;
            t[3] = e[3] * n;
            t[4] = e[4] * r;
            t[5] = e[5] * n;
            return t;
        };
        l.translate = function(t, e, i) {
            t[0] = e[0];
            t[1] = e[1];
            t[2] = e[2];
            t[3] = e[3];
            t[4] = e[4] + i[0];
            t[5] = e[5] + i[1];
            return t;
        };
        l.str = function(t) {
            return "mat2d(" + t[0] + ", " + t[1] + ", " + t[2] + ", " + t[3] + ", " + t[4] + ", " + t[5] + ")";
        };
        if (typeof t !== "undefined") {
            t.mat2d = l;
        }
        var h = {};
        var d = new Float32Array([1, 0, 0, 0, 1, 0, 0, 0, 1]);
        h.create = function() {
            var t = new i(9);
            t[0] = 1;
            t[1] = 0;
            t[2] = 0;
            t[3] = 0;
            t[4] = 1;
            t[5] = 0;
            t[6] = 0;
            t[7] = 0;
            t[8] = 1;
            return t;
        };
        h.clone = function(t) {
            var e = new i(9);
            e[0] = t[0];
            e[1] = t[1];
            e[2] = t[2];
            e[3] = t[3];
            e[4] = t[4];
            e[5] = t[5];
            e[6] = t[6];
            e[7] = t[7];
            e[8] = t[8];
            return e;
        };
        h.copy = function(t, e) {
            t[0] = e[0];
            t[1] = e[1];
            t[2] = e[2];
            t[3] = e[3];
            t[4] = e[4];
            t[5] = e[5];
            t[6] = e[6];
            t[7] = e[7];
            t[8] = e[8];
            return t;
        };
        h.identity = function(t) {
            t[0] = 1;
            t[1] = 0;
            t[2] = 0;
            t[3] = 0;
            t[4] = 1;
            t[5] = 0;
            t[6] = 0;
            t[7] = 0;
            t[8] = 1;
            return t;
        };
        h.transpose = function(t, e) {
            if (t === e) {
                var i = e[1],
                    r = e[2],
                    n = e[5];
                t[1] = e[3];
                t[2] = e[6];
                t[3] = i;
                t[5] = e[7];
                t[6] = r;
                t[7] = n;
            } else {
                t[0] = e[0];
                t[1] = e[3];
                t[2] = e[6];
                t[3] = e[1];
                t[4] = e[4];
                t[5] = e[7];
                t[6] = e[2];
                t[7] = e[5];
                t[8] = e[8];
            }
            return t;
        };
        h.invert = function(t, e) {
            var i = e[0],
                r = e[1],
                n = e[2],
                s = e[3],
                o = e[4],
                a = e[5],
                c = e[6],
                l = e[7],
                u = e[8],
                h = u * o - a * l,
                d = -u * s + a * c,
                f = l * s - o * c,
                p = i * h + r * d + n * f;
            if (!p) {
                return null;
            }
            p = 1 / p;
            t[0] = h * p;
            t[1] = (-u * r + n * l) * p;
            t[2] = (a * r - n * o) * p;
            t[3] = d * p;
            t[4] = (u * i - n * c) * p;
            t[5] = (-a * i + n * s) * p;
            t[6] = f * p;
            t[7] = (-l * i + r * c) * p;
            t[8] = (o * i - r * s) * p;
            return t;
        };
        h.adjoint = function(t, e) {
            var i = e[0],
                r = e[1],
                n = e[2],
                s = e[3],
                o = e[4],
                a = e[5],
                c = e[6],
                l = e[7],
                u = e[8];
            t[0] = o * u - a * l;
            t[1] = n * l - r * u;
            t[2] = r * a - n * o;
            t[3] = a * c - s * u;
            t[4] = i * u - n * c;
            t[5] = n * s - i * a;
            t[6] = s * l - o * c;
            t[7] = r * c - i * l;
            t[8] = i * o - r * s;
            return t;
        };
        h.determinant = function(t) {
            var e = t[0],
                i = t[1],
                r = t[2],
                n = t[3],
                s = t[4],
                o = t[5],
                a = t[6],
                c = t[7],
                l = t[8];
            return e * (l * s - o * c) + i * (-l * n + o * a) + r * (c * n - s * a);
        };
        h.multiply = function(t, e, i) {
            var r = e[0],
                n = e[1],
                s = e[2],
                o = e[3],
                a = e[4],
                c = e[5],
                l = e[6],
                u = e[7],
                h = e[8],
                d = i[0],
                f = i[1],
                p = i[2],
                v = i[3],
                m = i[4],
                _ = i[5],
                g = i[6],
                b = i[7],
                x = i[8];
            t[0] = d * r + f * o + p * l;
            t[1] = d * n + f * a + p * u;
            t[2] = d * s + f * c + p * h;
            t[3] = v * r + m * o + _ * l;
            t[4] = v * n + m * a + _ * u;
            t[5] = v * s + m * c + _ * h;
            t[6] = g * r + b * o + x * l;
            t[7] = g * n + b * a + x * u;
            t[8] = g * s + b * c + x * h;
            return t;
        };
        h.mul = h.multiply;
        h.translate = function(t, e, i) {
            var r = e[0],
                n = e[1],
                s = e[2],
                o = e[3],
                a = e[4],
                c = e[5],
                l = e[6],
                u = e[7],
                h = e[8],
                d = i[0],
                f = i[1];
            t[0] = r;
            t[1] = n;
            t[2] = s;
            t[3] = o;
            t[4] = a;
            t[5] = c;
            t[6] = d * r + f * o + l;
            t[7] = d * n + f * a + u;
            t[8] = d * s + f * c + h;
            return t;
        };
        h.rotate = function(t, e, i) {
            var r = e[0],
                n = e[1],
                s = e[2],
                o = e[3],
                a = e[4],
                c = e[5],
                l = e[6],
                u = e[7],
                h = e[8],
                d = Math.sin(i),
                f = Math.cos(i);
            t[0] = f * r + d * o;
            t[1] = f * n + d * a;
            t[2] = f * s + d * c;
            t[3] = f * o - d * r;
            t[4] = f * a - d * n;
            t[5] = f * c - d * s;
            t[6] = l;
            t[7] = u;
            t[8] = h;
            return t;
        };
        h.scale = function(t, e, i) {
            var r = i[0],
                n = i[2];
            t[0] = r * e[0];
            t[1] = r * e[1];
            t[2] = r * e[2];
            t[3] = n * e[3];
            t[4] = n * e[4];
            t[5] = n * e[5];
            t[6] = e[6];
            t[7] = e[7];
            t[8] = e[8];
            return t;
        };
        h.fromMat2d = function(t, e) {
            t[0] = e[0];
            t[1] = e[1];
            t[2] = 0;
            t[3] = e[2];
            t[4] = e[3];
            t[5] = 0;
            t[6] = e[4];
            t[7] = e[5];
            t[8] = 1;
            return t;
        };
        h.fromQuat = function(t, e) {
            var i = e[0],
                r = e[1],
                n = e[2],
                s = e[3],
                o = i + i,
                a = r + r,
                c = n + n,
                l = i * o,
                u = i * a,
                h = i * c,
                d = r * a,
                f = r * c,
                p = n * c,
                v = s * o,
                m = s * a,
                _ = s * c;
            t[0] = 1 - (d + p);
            t[1] = u + _;
            t[2] = h - m;
            t[3] = u - _;
            t[4] = 1 - (l + p);
            t[5] = f + v;
            t[6] = h + m;
            t[7] = f - v;
            t[8] = 1 - (l + d);
            return t;
        };
        h.str = function(t) {
            return "mat3(" + t[0] + ", " + t[1] + ", " + t[2] + ", " + t[3] + ", " + t[4] + ", " + t[5] + ", " + t[6] + ", " + t[7] + ", " + t[8] + ")";
        };
        if (typeof t !== "undefined") {
            t.mat3 = h;
        }
        var f = {};
        var p = new Float32Array([1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1]);
        f.create = function() {
            var t = new i(16);
            t[0] = 1;
            t[1] = 0;
            t[2] = 0;
            t[3] = 0;
            t[4] = 0;
            t[5] = 1;
            t[6] = 0;
            t[7] = 0;
            t[8] = 0;
            t[9] = 0;
            t[10] = 1;
            t[11] = 0;
            t[12] = 0;
            t[13] = 0;
            t[14] = 0;
            t[15] = 1;
            return t;
        };
        f.clone = function(t) {
            var e = new i(16);
            e[0] = t[0];
            e[1] = t[1];
            e[2] = t[2];
            e[3] = t[3];
            e[4] = t[4];
            e[5] = t[5];
            e[6] = t[6];
            e[7] = t[7];
            e[8] = t[8];
            e[9] = t[9];
            e[10] = t[10];
            e[11] = t[11];
            e[12] = t[12];
            e[13] = t[13];
            e[14] = t[14];
            e[15] = t[15];
            return e;
        };
        f.copy = function(t, e) {
            t[0] = e[0];
            t[1] = e[1];
            t[2] = e[2];
            t[3] = e[3];
            t[4] = e[4];
            t[5] = e[5];
            t[6] = e[6];
            t[7] = e[7];
            t[8] = e[8];
            t[9] = e[9];
            t[10] = e[10];
            t[11] = e[11];
            t[12] = e[12];
            t[13] = e[13];
            t[14] = e[14];
            t[15] = e[15];
            return t;
        };
        f.identity = function(t) {
            t[0] = 1;
            t[1] = 0;
            t[2] = 0;
            t[3] = 0;
            t[4] = 0;
            t[5] = 1;
            t[6] = 0;
            t[7] = 0;
            t[8] = 0;
            t[9] = 0;
            t[10] = 1;
            t[11] = 0;
            t[12] = 0;
            t[13] = 0;
            t[14] = 0;
            t[15] = 1;
            return t;
        };
        f.transpose = function(t, e) {
            if (t === e) {
                var i = e[1],
                    r = e[2],
                    n = e[3],
                    s = e[6],
                    o = e[7],
                    a = e[11];
                t[1] = e[4];
                t[2] = e[8];
                t[3] = e[12];
                t[4] = i;
                t[6] = e[9];
                t[7] = e[13];
                t[8] = r;
                t[9] = s;
                t[11] = e[14];
                t[12] = n;
                t[13] = o;
                t[14] = a;
            } else {
                t[0] = e[0];
                t[1] = e[4];
                t[2] = e[8];
                t[3] = e[12];
                t[4] = e[1];
                t[5] = e[5];
                t[6] = e[9];
                t[7] = e[13];
                t[8] = e[2];
                t[9] = e[6];
                t[10] = e[10];
                t[11] = e[14];
                t[12] = e[3];
                t[13] = e[7];
                t[14] = e[11];
                t[15] = e[15];
            }
            return t;
        };
        f.invert = function(t, e) {
            var i = e[0],
                r = e[1],
                n = e[2],
                s = e[3],
                o = e[4],
                a = e[5],
                c = e[6],
                l = e[7],
                u = e[8],
                h = e[9],
                d = e[10],
                f = e[11],
                p = e[12],
                v = e[13],
                m = e[14],
                _ = e[15],
                g = i * a - r * o,
                b = i * c - n * o,
                x = i * l - s * o,
                y = r * c - n * a,
                E = r * l - s * a,
                w = n * l - s * c,
                A = u * v - h * p,
                T = u * m - d * p,
                C = u * _ - f * p,
                M = h * m - d * v,
                S = h * _ - f * v,
                R = d * _ - f * m,
                F = g * R - b * S + x * M + y * C - E * T + w * A;
            if (!F) {
                return null;
            }
            F = 1 / F;
            t[0] = (a * R - c * S + l * M) * F;
            t[1] = (n * S - r * R - s * M) * F;
            t[2] = (v * w - m * E + _ * y) * F;
            t[3] = (d * E - h * w - f * y) * F;
            t[4] = (c * C - o * R - l * T) * F;
            t[5] = (i * R - n * C + s * T) * F;
            t[6] = (m * x - p * w - _ * b) * F;
            t[7] = (u * w - d * x + f * b) * F;
            t[8] = (o * S - a * C + l * A) * F;
            t[9] = (r * C - i * S - s * A) * F;
            t[10] = (p * E - v * x + _ * g) * F;
            t[11] = (h * x - u * E - f * g) * F;
            t[12] = (a * T - o * M - c * A) * F;
            t[13] = (i * M - r * T + n * A) * F;
            t[14] = (v * b - p * y - m * g) * F;
            t[15] = (u * y - h * b + d * g) * F;
            return t;
        };
        f.adjoint = function(t, e) {
            var i = e[0],
                r = e[1],
                n = e[2],
                s = e[3],
                o = e[4],
                a = e[5],
                c = e[6],
                l = e[7],
                u = e[8],
                h = e[9],
                d = e[10],
                f = e[11],
                p = e[12],
                v = e[13],
                m = e[14],
                _ = e[15];
            t[0] = a * (d * _ - f * m) - h * (c * _ - l * m) + v * (c * f - l * d);
            t[1] = -(r * (d * _ - f * m) - h * (n * _ - s * m) + v * (n * f - s * d));
            t[2] = r * (c * _ - l * m) - a * (n * _ - s * m) + v * (n * l - s * c);
            t[3] = -(r * (c * f - l * d) - a * (n * f - s * d) + h * (n * l - s * c));
            t[4] = -(o * (d * _ - f * m) - u * (c * _ - l * m) + p * (c * f - l * d));
            t[5] = i * (d * _ - f * m) - u * (n * _ - s * m) + p * (n * f - s * d);
            t[6] = -(i * (c * _ - l * m) - o * (n * _ - s * m) + p * (n * l - s * c));
            t[7] = i * (c * f - l * d) - o * (n * f - s * d) + u * (n * l - s * c);
            t[8] = o * (h * _ - f * v) - u * (a * _ - l * v) + p * (a * f - l * h);
            t[9] = -(i * (h * _ - f * v) - u * (r * _ - s * v) + p * (r * f - s * h));
            t[10] = i * (a * _ - l * v) - o * (r * _ - s * v) + p * (r * l - s * a);
            t[11] = -(i * (a * f - l * h) - o * (r * f - s * h) + u * (r * l - s * a));
            t[12] = -(o * (h * m - d * v) - u * (a * m - c * v) + p * (a * d - c * h));
            t[13] = i * (h * m - d * v) - u * (r * m - n * v) + p * (r * d - n * h);
            t[14] = -(i * (a * m - c * v) - o * (r * m - n * v) + p * (r * c - n * a));
            t[15] = i * (a * d - c * h) - o * (r * d - n * h) + u * (r * c - n * a);
            return t;
        };
        f.determinant = function(t) {
            var e = t[0],
                i = t[1],
                r = t[2],
                n = t[3],
                s = t[4],
                o = t[5],
                a = t[6],
                c = t[7],
                l = t[8],
                u = t[9],
                h = t[10],
                d = t[11],
                f = t[12],
                p = t[13],
                v = t[14],
                m = t[15],
                _ = e * o - i * s,
                g = e * a - r * s,
                b = e * c - n * s,
                x = i * a - r * o,
                y = i * c - n * o,
                E = r * c - n * a,
                w = l * p - u * f,
                A = l * v - h * f,
                T = l * m - d * f,
                C = u * v - h * p,
                M = u * m - d * p,
                S = h * m - d * v;
            return _ * S - g * M + b * C + x * T - y * A + E * w;
        };
        f.multiply = function(t, e, i) {
            var r = e[0],
                n = e[1],
                s = e[2],
                o = e[3],
                a = e[4],
                c = e[5],
                l = e[6],
                u = e[7],
                h = e[8],
                d = e[9],
                f = e[10],
                p = e[11],
                v = e[12],
                m = e[13],
                _ = e[14],
                g = e[15];
            var b = i[0],
                x = i[1],
                y = i[2],
                E = i[3];
            t[0] = b * r + x * a + y * h + E * v;
            t[1] = b * n + x * c + y * d + E * m;
            t[2] = b * s + x * l + y * f + E * _;
            t[3] = b * o + x * u + y * p + E * g;
            b = i[4];
            x = i[5];
            y = i[6];
            E = i[7];
            t[4] = b * r + x * a + y * h + E * v;
            t[5] = b * n + x * c + y * d + E * m;
            t[6] = b * s + x * l + y * f + E * _;
            t[7] = b * o + x * u + y * p + E * g;
            b = i[8];
            x = i[9];
            y = i[10];
            E = i[11];
            t[8] = b * r + x * a + y * h + E * v;
            t[9] = b * n + x * c + y * d + E * m;
            t[10] = b * s + x * l + y * f + E * _;
            t[11] = b * o + x * u + y * p + E * g;
            b = i[12];
            x = i[13];
            y = i[14];
            E = i[15];
            t[12] = b * r + x * a + y * h + E * v;
            t[13] = b * n + x * c + y * d + E * m;
            t[14] = b * s + x * l + y * f + E * _;
            t[15] = b * o + x * u + y * p + E * g;
            return t;
        };
        f.mul = f.multiply;
        f.translate = function(t, e, i) {
            var r = i[0],
                n = i[1],
                s = i[2],
                o,
                a,
                c,
                l,
                u,
                h,
                d,
                f,
                p,
                v,
                m,
                _;
            if (e === t) {
                t[12] = e[0] * r + e[4] * n + e[8] * s + e[12];
                t[13] = e[1] * r + e[5] * n + e[9] * s + e[13];
                t[14] = e[2] * r + e[6] * n + e[10] * s + e[14];
                t[15] = e[3] * r + e[7] * n + e[11] * s + e[15];
            } else {
                o = e[0];
                a = e[1];
                c = e[2];
                l = e[3];
                u = e[4];
                h = e[5];
                d = e[6];
                f = e[7];
                p = e[8];
                v = e[9];
                m = e[10];
                _ = e[11];
                t[0] = o;
                t[1] = a;
                t[2] = c;
                t[3] = l;
                t[4] = u;
                t[5] = h;
                t[6] = d;
                t[7] = f;
                t[8] = p;
                t[9] = v;
                t[10] = m;
                t[11] = _;
                t[12] = o * r + u * n + p * s + e[12];
                t[13] = a * r + h * n + v * s + e[13];
                t[14] = c * r + d * n + m * s + e[14];
                t[15] = l * r + f * n + _ * s + e[15];
            }
            return t;
        };
        f.scale = function(t, e, i) {
            var r = i[0],
                n = i[1],
                s = i[2];
            t[0] = e[0] * r;
            t[1] = e[1] * r;
            t[2] = e[2] * r;
            t[3] = e[3] * r;
            t[4] = e[4] * n;
            t[5] = e[5] * n;
            t[6] = e[6] * n;
            t[7] = e[7] * n;
            t[8] = e[8] * s;
            t[9] = e[9] * s;
            t[10] = e[10] * s;
            t[11] = e[11] * s;
            t[12] = e[12];
            t[13] = e[13];
            t[14] = e[14];
            t[15] = e[15];
            return t;
        };
        f.rotate = function(t, i, r, n) {
            var s = n[0],
                o = n[1],
                a = n[2],
                c = Math.sqrt(s * s + o * o + a * a),
                l,
                u,
                h,
                d,
                f,
                p,
                v,
                m,
                _,
                g,
                b,
                x,
                y,
                E,
                w,
                A,
                T,
                C,
                M,
                S,
                R,
                F,
                k,
                B;
            if (Math.abs(c) < e) {
                return null;
            }
            c = 1 / c;
            s *= c;
            o *= c;
            a *= c;
            l = Math.sin(r);
            u = Math.cos(r);
            h = 1 - u;
            d = i[0];
            f = i[1];
            p = i[2];
            v = i[3];
            m = i[4];
            _ = i[5];
            g = i[6];
            b = i[7];
            x = i[8];
            y = i[9];
            E = i[10];
            w = i[11];
            A = s * s * h + u;
            T = o * s * h + a * l;
            C = a * s * h - o * l;
            M = s * o * h - a * l;
            S = o * o * h + u;
            R = a * o * h + s * l;
            F = s * a * h + o * l;
            k = o * a * h - s * l;
            B = a * a * h + u;
            t[0] = d * A + m * T + x * C;
            t[1] = f * A + _ * T + y * C;
            t[2] = p * A + g * T + E * C;
            t[3] = v * A + b * T + w * C;
            t[4] = d * M + m * S + x * R;
            t[5] = f * M + _ * S + y * R;
            t[6] = p * M + g * S + E * R;
            t[7] = v * M + b * S + w * R;
            t[8] = d * F + m * k + x * B;
            t[9] = f * F + _ * k + y * B;
            t[10] = p * F + g * k + E * B;
            t[11] = v * F + b * k + w * B;
            if (i !== t) {
                t[12] = i[12];
                t[13] = i[13];
                t[14] = i[14];
                t[15] = i[15];
            }
            return t;
        };
        f.rotateX = function(t, e, i) {
            var r = Math.sin(i),
                n = Math.cos(i),
                s = e[4],
                o = e[5],
                a = e[6],
                c = e[7],
                l = e[8],
                u = e[9],
                h = e[10],
                d = e[11];
            if (e !== t) {
                t[0] = e[0];
                t[1] = e[1];
                t[2] = e[2];
                t[3] = e[3];
                t[12] = e[12];
                t[13] = e[13];
                t[14] = e[14];
                t[15] = e[15];
            }
            t[4] = s * n + l * r;
            t[5] = o * n + u * r;
            t[6] = a * n + h * r;
            t[7] = c * n + d * r;
            t[8] = l * n - s * r;
            t[9] = u * n - o * r;
            t[10] = h * n - a * r;
            t[11] = d * n - c * r;
            return t;
        };
        f.rotateY = function(t, e, i) {
            var r = Math.sin(i),
                n = Math.cos(i),
                s = e[0],
                o = e[1],
                a = e[2],
                c = e[3],
                l = e[8],
                u = e[9],
                h = e[10],
                d = e[11];
            if (e !== t) {
                t[4] = e[4];
                t[5] = e[5];
                t[6] = e[6];
                t[7] = e[7];
                t[12] = e[12];
                t[13] = e[13];
                t[14] = e[14];
                t[15] = e[15];
            }
            t[0] = s * n - l * r;
            t[1] = o * n - u * r;
            t[2] = a * n - h * r;
            t[3] = c * n - d * r;
            t[8] = s * r + l * n;
            t[9] = o * r + u * n;
            t[10] = a * r + h * n;
            t[11] = c * r + d * n;
            return t;
        };
        f.rotateZ = function(t, e, i) {
            var r = Math.sin(i),
                n = Math.cos(i),
                s = e[0],
                o = e[1],
                a = e[2],
                c = e[3],
                l = e[4],
                u = e[5],
                h = e[6],
                d = e[7];
            if (e !== t) {
                t[8] = e[8];
                t[9] = e[9];
                t[10] = e[10];
                t[11] = e[11];
                t[12] = e[12];
                t[13] = e[13];
                t[14] = e[14];
                t[15] = e[15];
            }
            t[0] = s * n + l * r;
            t[1] = o * n + u * r;
            t[2] = a * n + h * r;
            t[3] = c * n + d * r;
            t[4] = l * n - s * r;
            t[5] = u * n - o * r;
            t[6] = h * n - a * r;
            t[7] = d * n - c * r;
            return t;
        };
        f.fromRotationTranslation = function(t, e, i) {
            var r = e[0],
                n = e[1],
                s = e[2],
                o = e[3],
                a = r + r,
                c = n + n,
                l = s + s,
                u = r * a,
                h = r * c,
                d = r * l,
                f = n * c,
                p = n * l,
                v = s * l,
                m = o * a,
                _ = o * c,
                g = o * l;
            t[0] = 1 - (f + v);
            t[1] = h + g;
            t[2] = d - _;
            t[3] = 0;
            t[4] = h - g;
            t[5] = 1 - (u + v);
            t[6] = p + m;
            t[7] = 0;
            t[8] = d + _;
            t[9] = p - m;
            t[10] = 1 - (u + f);
            t[11] = 0;
            t[12] = i[0];
            t[13] = i[1];
            t[14] = i[2];
            t[15] = 1;
            return t;
        };
        f.fromQuat = function(t, e) {
            var i = e[0],
                r = e[1],
                n = e[2],
                s = e[3],
                o = i + i,
                a = r + r,
                c = n + n,
                l = i * o,
                u = i * a,
                h = i * c,
                d = r * a,
                f = r * c,
                p = n * c,
                v = s * o,
                m = s * a,
                _ = s * c;
            t[0] = 1 - (d + p);
            t[1] = u + _;
            t[2] = h - m;
            t[3] = 0;
            t[4] = u - _;
            t[5] = 1 - (l + p);
            t[6] = f + v;
            t[7] = 0;
            t[8] = h + m;
            t[9] = f - v;
            t[10] = 1 - (l + d);
            t[11] = 0;
            t[12] = 0;
            t[13] = 0;
            t[14] = 0;
            t[15] = 1;
            return t;
        };
        f.frustum = function(t, e, i, r, n, s, o) {
            var a = 1 / (i - e),
                c = 1 / (n - r),
                l = 1 / (s - o);
            t[0] = s * 2 * a;
            t[1] = 0;
            t[2] = 0;
            t[3] = 0;
            t[4] = 0;
            t[5] = s * 2 * c;
            t[6] = 0;
            t[7] = 0;
            t[8] = (i + e) * a;
            t[9] = (n + r) * c;
            t[10] = (o + s) * l;
            t[11] = -1;
            t[12] = 0;
            t[13] = 0;
            t[14] = o * s * 2 * l;
            t[15] = 0;
            return t;
        };
        f.perspective = function(t, e, i, r, n) {
            var s = 1 / Math.tan(e / 2),
                o = 1 / (r - n);
            t[0] = s / i;
            t[1] = 0;
            t[2] = 0;
            t[3] = 0;
            t[4] = 0;
            t[5] = s;
            t[6] = 0;
            t[7] = 0;
            t[8] = 0;
            t[9] = 0;
            t[10] = (n + r) * o;
            t[11] = -1;
            t[12] = 0;
            t[13] = 0;
            t[14] = 2 * n * r * o;
            t[15] = 0;
            return t;
        };
        f.ortho = function(t, e, i, r, n, s, o) {
            var a = 1 / (e - i),
                c = 1 / (r - n),
                l = 1 / (s - o);
            t[0] = -2 * a;
            t[1] = 0;
            t[2] = 0;
            t[3] = 0;
            t[4] = 0;
            t[5] = -2 * c;
            t[6] = 0;
            t[7] = 0;
            t[8] = 0;
            t[9] = 0;
            t[10] = 2 * l;
            t[11] = 0;
            t[12] = (e + i) * a;
            t[13] = (n + r) * c;
            t[14] = (o + s) * l;
            t[15] = 1;
            return t;
        };
        f.lookAt = function(t, i, r, n) {
            var s,
                o,
                a,
                c,
                l,
                u,
                h,
                d,
                p,
                v,
                m = i[0],
                _ = i[1],
                g = i[2],
                b = n[0],
                x = n[1],
                y = n[2],
                E = r[0],
                w = r[1],
                A = r[2];
            if (Math.abs(m - E) < e && Math.abs(_ - w) < e && Math.abs(g - A) < e) {
                return f.identity(t);
            }
            h = m - E;
            d = _ - w;
            p = g - A;
            v = 1 / Math.sqrt(h * h + d * d + p * p);
            h *= v;
            d *= v;
            p *= v;
            s = x * p - y * d;
            o = y * h - b * p;
            a = b * d - x * h;
            v = Math.sqrt(s * s + o * o + a * a);
            if (!v) {
                s = 0;
                o = 0;
                a = 0;
            } else {
                v = 1 / v;
                s *= v;
                o *= v;
                a *= v;
            }
            c = d * a - p * o;
            l = p * s - h * a;
            u = h * o - d * s;
            v = Math.sqrt(c * c + l * l + u * u);
            if (!v) {
                c = 0;
                l = 0;
                u = 0;
            } else {
                v = 1 / v;
                c *= v;
                l *= v;
                u *= v;
            }
            t[0] = s;
            t[1] = c;
            t[2] = h;
            t[3] = 0;
            t[4] = o;
            t[5] = l;
            t[6] = d;
            t[7] = 0;
            t[8] = a;
            t[9] = u;
            t[10] = p;
            t[11] = 0;
            t[12] = -(s * m + o * _ + a * g);
            t[13] = -(c * m + l * _ + u * g);
            t[14] = -(h * m + d * _ + p * g);
            t[15] = 1;
            return t;
        };
        f.str = function(t) {
            return (
                "mat4(" +
                t[0] +
                ", " +
                t[1] +
                ", " +
                t[2] +
                ", " +
                t[3] +
                ", " +
                t[4] +
                ", " +
                t[5] +
                ", " +
                t[6] +
                ", " +
                t[7] +
                ", " +
                t[8] +
                ", " +
                t[9] +
                ", " +
                t[10] +
                ", " +
                t[11] +
                ", " +
                t[12] +
                ", " +
                t[13] +
                ", " +
                t[14] +
                ", " +
                t[15] +
                ")"
            );
        };
        if (typeof t !== "undefined") {
            t.mat4 = f;
        }
        var v = {};
        var m = new Float32Array([0, 0, 0, 1]);
        v.create = function() {
            var t = new i(4);
            t[0] = 0;
            t[1] = 0;
            t[2] = 0;
            t[3] = 1;
            return t;
        };
        v.clone = o.clone;
        v.fromValues = o.fromValues;
        v.copy = o.copy;
        v.set = o.set;
        v.identity = function(t) {
            t[0] = 0;
            t[1] = 0;
            t[2] = 0;
            t[3] = 1;
            return t;
        };
        v.setAxisAngle = function(t, e, i) {
            i = i * 0.5;
            var r = Math.sin(i);
            t[0] = r * e[0];
            t[1] = r * e[1];
            t[2] = r * e[2];
            t[3] = Math.cos(i);
            return t;
        };
        v.add = o.add;
        v.multiply = function(t, e, i) {
            var r = e[0],
                n = e[1],
                s = e[2],
                o = e[3],
                a = i[0],
                c = i[1],
                l = i[2],
                u = i[3];
            t[0] = r * u + o * a + n * l - s * c;
            t[1] = n * u + o * c + s * a - r * l;
            t[2] = s * u + o * l + r * c - n * a;
            t[3] = o * u - r * a - n * c - s * l;
            return t;
        };
        v.mul = v.multiply;
        v.scale = o.scale;
        v.rotateX = function(t, e, i) {
            i *= 0.5;
            var r = e[0],
                n = e[1],
                s = e[2],
                o = e[3],
                a = Math.sin(i),
                c = Math.cos(i);
            t[0] = r * c + o * a;
            t[1] = n * c + s * a;
            t[2] = s * c - n * a;
            t[3] = o * c - r * a;
            return t;
        };
        v.rotateY = function(t, e, i) {
            i *= 0.5;
            var r = e[0],
                n = e[1],
                s = e[2],
                o = e[3],
                a = Math.sin(i),
                c = Math.cos(i);
            t[0] = r * c - s * a;
            t[1] = n * c + o * a;
            t[2] = s * c + r * a;
            t[3] = o * c - n * a;
            return t;
        };
        v.rotateZ = function(t, e, i) {
            i *= 0.5;
            var r = e[0],
                n = e[1],
                s = e[2],
                o = e[3],
                a = Math.sin(i),
                c = Math.cos(i);
            t[0] = r * c + n * a;
            t[1] = n * c - r * a;
            t[2] = s * c + o * a;
            t[3] = o * c - s * a;
            return t;
        };
        v.calculateW = function(t, e) {
            var i = e[0],
                r = e[1],
                n = e[2];
            t[0] = i;
            t[1] = r;
            t[2] = n;
            t[3] = -Math.sqrt(Math.abs(1 - i * i - r * r - n * n));
            return t;
        };
        v.dot = o.dot;
        v.lerp = o.lerp;
        v.slerp = function(t, e, i, r) {
            var n = e[0],
                s = e[1],
                o = e[2],
                a = e[3],
                c = i[0],
                l = i[1],
                u = i[2],
                h = i[3];
            var d = n * c + s * l + o * u + a * h,
                f,
                p,
                v,
                m;
            if (Math.abs(d) >= 1) {
                if (t !== e) {
                    t[0] = n;
                    t[1] = s;
                    t[2] = o;
                    t[3] = a;
                }
                return t;
            }
            f = Math.acos(d);
            p = Math.sqrt(1 - d * d);
            if (Math.abs(p) < 0.001) {
                t[0] = n * 0.5 + c * 0.5;
                t[1] = s * 0.5 + l * 0.5;
                t[2] = o * 0.5 + u * 0.5;
                t[3] = a * 0.5 + h * 0.5;
                return t;
            }
            v = Math.sin((1 - r) * f) / p;
            m = Math.sin(r * f) / p;
            t[0] = n * v + c * m;
            t[1] = s * v + l * m;
            t[2] = o * v + u * m;
            t[3] = a * v + h * m;
            return t;
        };
        v.invert = function(t, e) {
            var i = e[0],
                r = e[1],
                n = e[2],
                s = e[3],
                o = i * i + r * r + n * n + s * s,
                a = o ? 1 / o : 0;
            t[0] = -i * a;
            t[1] = -r * a;
            t[2] = -n * a;
            t[3] = s * a;
            return t;
        };
        v.conjugate = function(t, e) {
            t[0] = -e[0];
            t[1] = -e[1];
            t[2] = -e[2];
            t[3] = e[3];
            return t;
        };
        v.length = o.length;
        v.len = v.length;
        v.squaredLength = o.squaredLength;
        v.sqrLen = v.squaredLength;
        v.normalize = o.normalize;
        v.fromMat3 = (function() {
            var t = [1, 2, 0];
            return function(e, i) {
                var r = i[0] + i[4] + i[8];
                var n;
                if (r > 0) {
                    n = Math.sqrt(r + 1);
                    e[3] = 0.5 * n;
                    n = 0.5 / n;
                    e[0] = (i[7] - i[5]) * n;
                    e[1] = (i[2] - i[6]) * n;
                    e[2] = (i[3] - i[1]) * n;
                } else {
                    var s = 0;
                    if (i[4] > i[0]) s = 1;
                    if (i[8] > i[s * 3 + s]) s = 2;
                    var o = t[s];
                    var a = t[o];
                    n = Math.sqrt(i[s * 3 + s] - i[o * 3 + o] - i[a * 3 + a] + 1);
                    e[s] = 0.5 * n;
                    n = 0.5 / n;
                    e[3] = (i[a * 3 + o] - i[o * 3 + a]) * n;
                    e[o] = (i[o * 3 + s] + i[s * 3 + o]) * n;
                    e[a] = (i[a * 3 + s] + i[s * 3 + a]) * n;
                }
                return e;
            };
        })();
        v.str = function(t) {
            return "quat(" + t[0] + ", " + t[1] + ", " + t[2] + ", " + t[3] + ")";
        };
        if (typeof t !== "undefined") {
            t.quat = v;
        }
    })(t.exports);
})();
!(function(t, e) {
    "object" == typeof exports && "undefined" != typeof module
        ? e(exports)
        : "function" == typeof define && define.amd
        ? define(["exports"], e)
        : e((t.dat = {}));
})(this, function(t) {
    "use strict";
    function e(t, e) {
        var i = t.__state.conversionName.toString(),
            r = Math.round(t.r),
            n = Math.round(t.g),
            s = Math.round(t.b),
            o = t.a,
            a = Math.round(t.h),
            c = t.s.toFixed(1),
            l = t.v.toFixed(1);
        if (e || "THREE_CHAR_HEX" === i || "SIX_CHAR_HEX" === i) {
            for (var u = t.hex.toString(16); u.length < 6; ) u = "0" + u;
            return "#" + u;
        }
        return "CSS_RGB" === i
            ? "rgb(" + r + "," + n + "," + s + ")"
            : "CSS_RGBA" === i
            ? "rgba(" + r + "," + n + "," + s + "," + o + ")"
            : "HEX" === i
            ? "0x" + t.hex.toString(16)
            : "RGB_ARRAY" === i
            ? "[" + r + "," + n + "," + s + "]"
            : "RGBA_ARRAY" === i
            ? "[" + r + "," + n + "," + s + "," + o + "]"
            : "RGB_OBJ" === i
            ? "{r:" + r + ",g:" + n + ",b:" + s + "}"
            : "RGBA_OBJ" === i
            ? "{r:" + r + ",g:" + n + ",b:" + s + ",a:" + o + "}"
            : "HSV_OBJ" === i
            ? "{h:" + a + ",s:" + c + ",v:" + l + "}"
            : "HSVA_OBJ" === i
            ? "{h:" + a + ",s:" + c + ",v:" + l + ",a:" + o + "}"
            : "unknown format";
    }
    function i(t, e, i) {
        Object.defineProperty(t, e, {
            get: function() {
                return "RGB" === this.__state.space ? this.__state[e] : (I.recalculateRGB(this, e, i), this.__state[e]);
            },
            set: function(t) {
                "RGB" !== this.__state.space && (I.recalculateRGB(this, e, i), (this.__state.space = "RGB")), (this.__state[e] = t);
            }
        });
    }
    function r(t, e) {
        Object.defineProperty(t, e, {
            get: function() {
                return "HSV" === this.__state.space ? this.__state[e] : (I.recalculateHSV(this), this.__state[e]);
            },
            set: function(t) {
                "HSV" !== this.__state.space && (I.recalculateHSV(this), (this.__state.space = "HSV")), (this.__state[e] = t);
            }
        });
    }
    function n(t) {
        if ("0" === t || M.isUndefined(t)) return 0;
        var e = t.match(H);
        return M.isNull(e) ? 0 : parseFloat(e[1]);
    }
    function s(t) {
        var e = t.toString();
        return e.indexOf(".") > -1 ? e.length - e.indexOf(".") - 1 : 0;
    }
    function o(t, e) {
        var i = Math.pow(10, e);
        return Math.round(t * i) / i;
    }
    function a(t, e, i, r, n) {
        return r + ((t - e) / (i - e)) * (n - r);
    }
    function c(t, e, i, r) {
        (t.style.background = ""),
            M.each(tt, function(n) {
                t.style.cssText += "background: " + n + "linear-gradient(" + e + ", " + i + " 0%, " + r + " 100%); ";
            });
    }
    function l(t) {
        (t.style.background = ""),
            (t.style.cssText +=
                "background: -moz-linear-gradient(top,  #ff0000 0%, #ff00ff 17%, #0000ff 34%, #00ffff 50%, #00ff00 67%, #ffff00 84%, #ff0000 100%);"),
            (t.style.cssText +=
                "background: -webkit-linear-gradient(top,  #ff0000 0%,#ff00ff 17%,#0000ff 34%,#00ffff 50%,#00ff00 67%,#ffff00 84%,#ff0000 100%);"),
            (t.style.cssText += "background: -o-linear-gradient(top,  #ff0000 0%,#ff00ff 17%,#0000ff 34%,#00ffff 50%,#00ff00 67%,#ffff00 84%,#ff0000 100%);"),
            (t.style.cssText += "background: -ms-linear-gradient(top,  #ff0000 0%,#ff00ff 17%,#0000ff 34%,#00ffff 50%,#00ff00 67%,#ffff00 84%,#ff0000 100%);"),
            (t.style.cssText += "background: linear-gradient(top,  #ff0000 0%,#ff00ff 17%,#0000ff 34%,#00ffff 50%,#00ff00 67%,#ffff00 84%,#ff0000 100%);");
    }
    function u(t, e, i) {
        var r = document.createElement("li");
        return e && r.appendChild(e), i ? t.__ul.insertBefore(r, i) : t.__ul.appendChild(r), t.onResize(), r;
    }
    function h(t) {
        j.unbind(window, "resize", t.__resizeHandler), t.saveToLocalStorageIfPossible && j.unbind(window, "unload", t.saveToLocalStorageIfPossible);
    }
    function d(t, e) {
        var i = t.__preset_select[t.__preset_select.selectedIndex];
        i.innerHTML = e ? i.value + "*" : i.value;
    }
    function f(t, e, i) {
        if (
            ((i.__li = e),
            (i.__gui = t),
            M.extend(i, {
                options: function(e) {
                    if (arguments.length > 1) {
                        var r = i.__li.nextElementSibling;
                        return i.remove(), v(t, i.object, i.property, { before: r, factoryArgs: [M.toArray(arguments)] });
                    }
                    if (M.isArray(e) || M.isObject(e)) {
                        var n = i.__li.nextElementSibling;
                        return i.remove(), v(t, i.object, i.property, { before: n, factoryArgs: [e] });
                    }
                },
                name: function(t) {
                    return (i.__li.firstElementChild.firstElementChild.innerHTML = t), i;
                },
                listen: function() {
                    return i.__gui.listen(i), i;
                },
                remove: function() {
                    return i.__gui.remove(i), i;
                }
            }),
            i instanceof J)
        ) {
            var r = new Q(i.object, i.property, { min: i.__min, max: i.__max, step: i.__step });
            M.each(["updateDisplay", "onChange", "onFinishChange", "step", "min", "max"], function(t) {
                var e = i[t],
                    n = r[t];
                i[t] = r[t] = function() {
                    var t = Array.prototype.slice.call(arguments);
                    return n.apply(r, t), e.apply(i, t);
                };
            }),
                j.addClass(e, "has-slider"),
                i.domElement.insertBefore(r.domElement, i.domElement.firstElementChild);
        } else if (i instanceof Q) {
            var n = function(e) {
                if (M.isNumber(i.__min) && M.isNumber(i.__max)) {
                    var r = i.__li.firstElementChild.firstElementChild.innerHTML,
                        n = i.__gui.__listening.indexOf(i) > -1;
                    i.remove();
                    var s = v(t, i.object, i.property, { before: i.__li.nextElementSibling, factoryArgs: [i.__min, i.__max, i.__step] });
                    return s.name(r), n && s.listen(), s;
                }
                return e;
            };
            (i.min = M.compose(
                n,
                i.min
            )),
                (i.max = M.compose(
                    n,
                    i.max
                ));
        } else
            i instanceof Y
                ? (j.bind(e, "click", function() {
                      j.fakeEvent(i.__checkbox, "click");
                  }),
                  j.bind(i.__checkbox, "click", function(t) {
                      t.stopPropagation();
                  }))
                : i instanceof Z
                ? (j.bind(e, "click", function() {
                      j.fakeEvent(i.__button, "click");
                  }),
                  j.bind(e, "mouseover", function() {
                      j.addClass(i.__button, "hover");
                  }),
                  j.bind(e, "mouseout", function() {
                      j.removeClass(i.__button, "hover");
                  }))
                : i instanceof $ &&
                  (j.addClass(e, "color"),
                  (i.updateDisplay = M.compose(
                      function(t) {
                          return (e.style.borderLeftColor = i.__color.toString()), t;
                      },
                      i.updateDisplay
                  )),
                  i.updateDisplay());
        i.setValue = M.compose(
            function(e) {
                return t.getRoot().__preset_select && i.isModified() && d(t.getRoot(), !0), e;
            },
            i.setValue
        );
    }
    function p(t, e) {
        var i = t.getRoot(),
            r = i.__rememberedObjects.indexOf(e.object);
        if (-1 !== r) {
            var n = i.__rememberedObjectIndecesToControllers[r];
            if ((void 0 === n && ((n = {}), (i.__rememberedObjectIndecesToControllers[r] = n)), (n[e.property] = e), i.load && i.load.remembered)) {
                var s = i.load.remembered,
                    o = void 0;
                if (s[t.preset]) o = s[t.preset];
                else {
                    if (!s[ot]) return;
                    o = s[ot];
                }
                if (o[r] && void 0 !== o[r][e.property]) {
                    var a = o[r][e.property];
                    (e.initialValue = a), e.setValue(a);
                }
            }
        }
    }
    function v(t, e, i, r) {
        if (void 0 === e[i]) throw new Error('Object "' + e + '" has no property "' + i + '"');
        var n = void 0;
        if (r.color) n = new $(e, i);
        else {
            var s = [e, i].concat(r.factoryArgs);
            n = it.apply(t, s);
        }
        r.before instanceof N && (r.before = r.before.__li), p(t, n), j.addClass(n.domElement, "c");
        var o = document.createElement("span");
        j.addClass(o, "property-name"), (o.innerHTML = n.property);
        var a = document.createElement("div");
        a.appendChild(o), a.appendChild(n.domElement);
        var c = u(t, a, r.before);
        return (
            j.addClass(c, ft.CLASS_CONTROLLER_ROW),
            n instanceof $ ? j.addClass(c, "color") : j.addClass(c, D(n.getValue())),
            f(t, c, n),
            t.__controllers.push(n),
            n
        );
    }
    function m(t, e) {
        return document.location.href + "." + e;
    }
    function _(t, e, i) {
        var r = document.createElement("option");
        (r.innerHTML = e), (r.value = e), t.__preset_select.appendChild(r), i && (t.__preset_select.selectedIndex = t.__preset_select.length - 1);
    }
    function g(t, e) {
        e.style.display = t.useLocalStorage ? "block" : "none";
    }
    function b(t) {
        var e = (t.__save_row = document.createElement("li"));
        j.addClass(t.domElement, "has-save"), t.__ul.insertBefore(e, t.__ul.firstChild), j.addClass(e, "save-row");
        var i = document.createElement("span");
        (i.innerHTML = "&nbsp;"), j.addClass(i, "button gears");
        var r = document.createElement("span");
        (r.innerHTML = "Save"), j.addClass(r, "button"), j.addClass(r, "save");
        var n = document.createElement("span");
        (n.innerHTML = "New"), j.addClass(n, "button"), j.addClass(n, "save-as");
        var s = document.createElement("span");
        (s.innerHTML = "Revert"), j.addClass(s, "button"), j.addClass(s, "revert");
        var o = (t.__preset_select = document.createElement("select"));
        if (
            (t.load && t.load.remembered
                ? M.each(t.load.remembered, function(e, i) {
                      _(t, i, i === t.preset);
                  })
                : _(t, ot, !1),
            j.bind(o, "change", function() {
                for (var e = 0; e < t.__preset_select.length; e++) t.__preset_select[e].innerHTML = t.__preset_select[e].value;
                t.preset = this.value;
            }),
            e.appendChild(o),
            e.appendChild(i),
            e.appendChild(r),
            e.appendChild(n),
            e.appendChild(s),
            at)
        ) {
            var a = document.getElementById("dg-local-explain"),
                c = document.getElementById("dg-local-storage");
            (document.getElementById("dg-save-locally").style.display = "block"),
                "true" === localStorage.getItem(m(t, "isLocal")) && c.setAttribute("checked", "checked"),
                g(t, a),
                j.bind(c, "change", function() {
                    (t.useLocalStorage = !t.useLocalStorage), g(t, a);
                });
        }
        var l = document.getElementById("dg-new-constructor");
        j.bind(l, "keydown", function(t) {
            !t.metaKey || (67 !== t.which && 67 !== t.keyCode) || ct.hide();
        }),
            j.bind(i, "click", function() {
                (l.innerHTML = JSON.stringify(t.getSaveObject(), void 0, 2)), ct.show(), l.focus(), l.select();
            }),
            j.bind(r, "click", function() {
                t.save();
            }),
            j.bind(n, "click", function() {
                var e = prompt("Enter a new preset name.");
                e && t.saveAs(e);
            }),
            j.bind(s, "click", function() {
                t.revert();
            });
    }
    function x(t) {
        function e(e) {
            return e.preventDefault(), (t.width += n - e.clientX), t.onResize(), (n = e.clientX), !1;
        }
        function i() {
            j.removeClass(t.__closeButton, ft.CLASS_DRAG), j.unbind(window, "mousemove", e), j.unbind(window, "mouseup", i);
        }
        function r(r) {
            return (
                r.preventDefault(),
                (n = r.clientX),
                j.addClass(t.__closeButton, ft.CLASS_DRAG),
                j.bind(window, "mousemove", e),
                j.bind(window, "mouseup", i),
                !1
            );
        }
        var n = void 0;
        (t.__resize_handle = document.createElement("div")),
            M.extend(t.__resize_handle.style, { width: "6px", marginLeft: "-3px", height: "200px", cursor: "ew-resize", position: "absolute" }),
            j.bind(t.__resize_handle, "mousedown", r),
            j.bind(t.__closeButton, "mousedown", r),
            t.domElement.insertBefore(t.__resize_handle, t.domElement.firstElementChild);
    }
    function y(t, e) {
        (t.domElement.style.width = e + "px"),
            t.__save_row && t.autoPlace && (t.__save_row.style.width = e + "px"),
            t.__closeButton && (t.__closeButton.style.width = e + "px");
    }
    function E(t, e) {
        var i = {};
        return (
            M.each(t.__rememberedObjects, function(r, n) {
                var s = {},
                    o = t.__rememberedObjectIndecesToControllers[n];
                M.each(o, function(t, i) {
                    s[i] = e ? t.initialValue : t.getValue();
                }),
                    (i[n] = s);
            }),
            i
        );
    }
    function w(t) {
        for (var e = 0; e < t.__preset_select.length; e++) t.__preset_select[e].value === t.preset && (t.__preset_select.selectedIndex = e);
    }
    function A(t) {
        0 !== t.length &&
            rt.call(window, function() {
                A(t);
            }),
            M.each(t, function(t) {
                t.updateDisplay();
            });
    }
    var T = Array.prototype.forEach,
        C = Array.prototype.slice,
        M = {
            BREAK: {},
            extend: function(t) {
                return (
                    this.each(
                        C.call(arguments, 1),
                        function(e) {
                            (this.isObject(e) ? Object.keys(e) : []).forEach(
                                function(i) {
                                    this.isUndefined(e[i]) || (t[i] = e[i]);
                                }.bind(this)
                            );
                        },
                        this
                    ),
                    t
                );
            },
            defaults: function(t) {
                return (
                    this.each(
                        C.call(arguments, 1),
                        function(e) {
                            (this.isObject(e) ? Object.keys(e) : []).forEach(
                                function(i) {
                                    this.isUndefined(t[i]) && (t[i] = e[i]);
                                }.bind(this)
                            );
                        },
                        this
                    ),
                    t
                );
            },
            compose: function() {
                var t = C.call(arguments);
                return function() {
                    for (var e = C.call(arguments), i = t.length - 1; i >= 0; i--) e = [t[i].apply(this, e)];
                    return e[0];
                };
            },
            each: function(t, e, i) {
                if (t)
                    if (T && t.forEach && t.forEach === T) t.forEach(e, i);
                    else if (t.length === t.length + 0) {
                        var r = void 0,
                            n = void 0;
                        for (r = 0, n = t.length; r < n; r++) if (r in t && e.call(i, t[r], r) === this.BREAK) return;
                    } else for (var s in t) if (e.call(i, t[s], s) === this.BREAK) return;
            },
            defer: function(t) {
                setTimeout(t, 0);
            },
            debounce: function(t, e, i) {
                var r = void 0;
                return function() {
                    var n = this,
                        s = arguments,
                        o = i || !r;
                    clearTimeout(r),
                        (r = setTimeout(function() {
                            (r = null), i || t.apply(n, s);
                        }, e)),
                        o && t.apply(n, s);
                };
            },
            toArray: function(t) {
                return t.toArray ? t.toArray() : C.call(t);
            },
            isUndefined: function(t) {
                return void 0 === t;
            },
            isNull: function(t) {
                return null === t;
            },
            isNaN: (function(t) {
                function e(e) {
                    return t.apply(this, arguments);
                }
                return (
                    (e.toString = function() {
                        return t.toString();
                    }),
                    e
                );
            })(function(t) {
                return isNaN(t);
            }),
            isArray:
                Array.isArray ||
                function(t) {
                    return t.constructor === Array;
                },
            isObject: function(t) {
                return t === Object(t);
            },
            isNumber: function(t) {
                return t === t + 0;
            },
            isString: function(t) {
                return t === t + "";
            },
            isBoolean: function(t) {
                return !1 === t || !0 === t;
            },
            isFunction: function(t) {
                return "[object Function]" === Object.prototype.toString.call(t);
            }
        },
        S = [
            {
                litmus: M.isString,
                conversions: {
                    THREE_CHAR_HEX: {
                        read: function(t) {
                            var e = t.match(/^#([A-F0-9])([A-F0-9])([A-F0-9])$/i);
                            return (
                                null !== e && {
                                    space: "HEX",
                                    hex: parseInt(
                                        "0x" + e[1].toString() + e[1].toString() + e[2].toString() + e[2].toString() + e[3].toString() + e[3].toString(),
                                        0
                                    )
                                }
                            );
                        },
                        write: e
                    },
                    SIX_CHAR_HEX: {
                        read: function(t) {
                            var e = t.match(/^#([A-F0-9]{6})$/i);
                            return null !== e && { space: "HEX", hex: parseInt("0x" + e[1].toString(), 0) };
                        },
                        write: e
                    },
                    CSS_RGB: {
                        read: function(t) {
                            var e = t.match(/^rgb\(\s*(.+)\s*,\s*(.+)\s*,\s*(.+)\s*\)/);
                            return null !== e && { space: "RGB", r: parseFloat(e[1]), g: parseFloat(e[2]), b: parseFloat(e[3]) };
                        },
                        write: e
                    },
                    CSS_RGBA: {
                        read: function(t) {
                            var e = t.match(/^rgba\(\s*(.+)\s*,\s*(.+)\s*,\s*(.+)\s*,\s*(.+)\s*\)/);
                            return null !== e && { space: "RGB", r: parseFloat(e[1]), g: parseFloat(e[2]), b: parseFloat(e[3]), a: parseFloat(e[4]) };
                        },
                        write: e
                    }
                }
            },
            {
                litmus: M.isNumber,
                conversions: {
                    HEX: {
                        read: function(t) {
                            return { space: "HEX", hex: t, conversionName: "HEX" };
                        },
                        write: function(t) {
                            return t.hex;
                        }
                    }
                }
            },
            {
                litmus: M.isArray,
                conversions: {
                    RGB_ARRAY: {
                        read: function(t) {
                            return 3 === t.length && { space: "RGB", r: t[0], g: t[1], b: t[2] };
                        },
                        write: function(t) {
                            return [t.r, t.g, t.b];
                        }
                    },
                    RGBA_ARRAY: {
                        read: function(t) {
                            return 4 === t.length && { space: "RGB", r: t[0], g: t[1], b: t[2], a: t[3] };
                        },
                        write: function(t) {
                            return [t.r, t.g, t.b, t.a];
                        }
                    }
                }
            },
            {
                litmus: M.isObject,
                conversions: {
                    RGBA_OBJ: {
                        read: function(t) {
                            return (
                                !!(M.isNumber(t.r) && M.isNumber(t.g) && M.isNumber(t.b) && M.isNumber(t.a)) && { space: "RGB", r: t.r, g: t.g, b: t.b, a: t.a }
                            );
                        },
                        write: function(t) {
                            return { r: t.r, g: t.g, b: t.b, a: t.a };
                        }
                    },
                    RGB_OBJ: {
                        read: function(t) {
                            return !!(M.isNumber(t.r) && M.isNumber(t.g) && M.isNumber(t.b)) && { space: "RGB", r: t.r, g: t.g, b: t.b };
                        },
                        write: function(t) {
                            return { r: t.r, g: t.g, b: t.b };
                        }
                    },
                    HSVA_OBJ: {
                        read: function(t) {
                            return (
                                !!(M.isNumber(t.h) && M.isNumber(t.s) && M.isNumber(t.v) && M.isNumber(t.a)) && { space: "HSV", h: t.h, s: t.s, v: t.v, a: t.a }
                            );
                        },
                        write: function(t) {
                            return { h: t.h, s: t.s, v: t.v, a: t.a };
                        }
                    },
                    HSV_OBJ: {
                        read: function(t) {
                            return !!(M.isNumber(t.h) && M.isNumber(t.s) && M.isNumber(t.v)) && { space: "HSV", h: t.h, s: t.s, v: t.v };
                        },
                        write: function(t) {
                            return { h: t.h, s: t.s, v: t.v };
                        }
                    }
                }
            }
        ],
        R = void 0,
        F = void 0,
        k = function() {
            F = !1;
            var t = arguments.length > 1 ? M.toArray(arguments) : arguments[0];
            return (
                M.each(S, function(e) {
                    if (e.litmus(t))
                        return (
                            M.each(e.conversions, function(e, i) {
                                if (((R = e.read(t)), !1 === F && !1 !== R)) return (F = R), (R.conversionName = i), (R.conversion = e), M.BREAK;
                            }),
                            M.BREAK
                        );
                }),
                F
            );
        },
        B = void 0,
        L = {
            hsv_to_rgb: function(t, e, i) {
                var r = Math.floor(t / 60) % 6,
                    n = t / 60 - Math.floor(t / 60),
                    s = i * (1 - e),
                    o = i * (1 - n * e),
                    a = i * (1 - (1 - n) * e),
                    c = [[i, a, s], [o, i, s], [s, i, a], [s, o, i], [a, s, i], [i, s, o]][r];
                return { r: 255 * c[0], g: 255 * c[1], b: 255 * c[2] };
            },
            rgb_to_hsv: function(t, e, i) {
                var r = Math.min(t, e, i),
                    n = Math.max(t, e, i),
                    s = n - r,
                    o = void 0,
                    a = void 0;
                return 0 === n
                    ? { h: NaN, s: 0, v: 0 }
                    : ((a = s / n),
                      (o = t === n ? (e - i) / s : e === n ? 2 + (i - t) / s : 4 + (t - e) / s),
                      (o /= 6) < 0 && (o += 1),
                      { h: 360 * o, s: a, v: n / 255 });
            },
            rgb_to_hex: function(t, e, i) {
                var r = this.hex_with_component(0, 2, t);
                return (r = this.hex_with_component(r, 1, e)), (r = this.hex_with_component(r, 0, i));
            },
            component_from_hex: function(t, e) {
                return (t >> (8 * e)) & 255;
            },
            hex_with_component: function(t, e, i) {
                return (i << (B = 8 * e)) | (t & ~(255 << B));
            }
        },
        D =
            "function" == typeof Symbol && "symbol" == typeof Symbol.iterator
                ? function(t) {
                      return typeof t;
                  }
                : function(t) {
                      return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
                  },
        O = function(t, e) {
            if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function");
        },
        P = (function() {
            function t(t, e) {
                for (var i = 0; i < e.length; i++) {
                    var r = e[i];
                    (r.enumerable = r.enumerable || !1), (r.configurable = !0), "value" in r && (r.writable = !0), Object.defineProperty(t, r.key, r);
                }
            }
            return function(e, i, r) {
                return i && t(e.prototype, i), r && t(e, r), e;
            };
        })(),
        U = function t(e, i, r) {
            null === e && (e = Function.prototype);
            var n = Object.getOwnPropertyDescriptor(e, i);
            if (void 0 === n) {
                var s = Object.getPrototypeOf(e);
                return null === s ? void 0 : t(s, i, r);
            }
            if ("value" in n) return n.value;
            var o = n.get;
            if (void 0 !== o) return o.call(r);
        },
        V = function(t, e) {
            if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function, not " + typeof e);
            (t.prototype = Object.create(e && e.prototype, { constructor: { value: t, enumerable: !1, writable: !0, configurable: !0 } })),
                e && (Object.setPrototypeOf ? Object.setPrototypeOf(t, e) : (t.__proto__ = e));
        },
        G = function(t, e) {
            if (!t) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return !e || ("object" != typeof e && "function" != typeof e) ? t : e;
        },
        I = (function() {
            function t() {
                if ((O(this, t), (this.__state = k.apply(this, arguments)), !1 === this.__state)) throw new Error("Failed to interpret color arguments");
                this.__state.a = this.__state.a || 1;
            }
            return (
                P(t, [
                    {
                        key: "toString",
                        value: function() {
                            return e(this);
                        }
                    },
                    {
                        key: "toHexString",
                        value: function() {
                            return e(this, !0);
                        }
                    },
                    {
                        key: "toOriginal",
                        value: function() {
                            return this.__state.conversion.write(this);
                        }
                    }
                ]),
                t
            );
        })();
    (I.recalculateRGB = function(t, e, i) {
        if ("HEX" === t.__state.space) t.__state[e] = L.component_from_hex(t.__state.hex, i);
        else {
            if ("HSV" !== t.__state.space) throw new Error("Corrupted color state");
            M.extend(t.__state, L.hsv_to_rgb(t.__state.h, t.__state.s, t.__state.v));
        }
    }),
        (I.recalculateHSV = function(t) {
            var e = L.rgb_to_hsv(t.r, t.g, t.b);
            M.extend(t.__state, { s: e.s, v: e.v }), M.isNaN(e.h) ? M.isUndefined(t.__state.h) && (t.__state.h = 0) : (t.__state.h = e.h);
        }),
        (I.COMPONENTS = ["r", "g", "b", "h", "s", "v", "hex", "a"]),
        i(I.prototype, "r", 2),
        i(I.prototype, "g", 1),
        i(I.prototype, "b", 0),
        r(I.prototype, "h"),
        r(I.prototype, "s"),
        r(I.prototype, "v"),
        Object.defineProperty(I.prototype, "a", {
            get: function() {
                return this.__state.a;
            },
            set: function(t) {
                this.__state.a = t;
            }
        }),
        Object.defineProperty(I.prototype, "hex", {
            get: function() {
                return "HEX" !== !this.__state.space && (this.__state.hex = L.rgb_to_hex(this.r, this.g, this.b)), this.__state.hex;
            },
            set: function(t) {
                (this.__state.space = "HEX"), (this.__state.hex = t);
            }
        });
    var N = (function() {
            function t(e, i) {
                O(this, t),
                    (this.initialValue = e[i]),
                    (this.domElement = document.createElement("div")),
                    (this.object = e),
                    (this.property = i),
                    (this.__onChange = void 0),
                    (this.__onFinishChange = void 0);
            }
            return (
                P(t, [
                    {
                        key: "onChange",
                        value: function(t) {
                            return (this.__onChange = t), this;
                        }
                    },
                    {
                        key: "onFinishChange",
                        value: function(t) {
                            return (this.__onFinishChange = t), this;
                        }
                    },
                    {
                        key: "setValue",
                        value: function(t) {
                            return (this.object[this.property] = t), this.__onChange && this.__onChange.call(this, t), this.updateDisplay(), this;
                        }
                    },
                    {
                        key: "getValue",
                        value: function() {
                            return this.object[this.property];
                        }
                    },
                    {
                        key: "updateDisplay",
                        value: function() {
                            return this;
                        }
                    },
                    {
                        key: "isModified",
                        value: function() {
                            return this.initialValue !== this.getValue();
                        }
                    }
                ]),
                t
            );
        })(),
        X = { HTMLEvents: ["change"], MouseEvents: ["click", "mousemove", "mousedown", "mouseup", "mouseover"], KeyboardEvents: ["keydown"] },
        z = {};
    M.each(X, function(t, e) {
        M.each(t, function(t) {
            z[t] = e;
        });
    });
    var H = /(\d+(\.\d+)?)px/,
        j = {
            makeSelectable: function(t, e) {
                void 0 !== t &&
                    void 0 !== t.style &&
                    ((t.onselectstart = e
                        ? function() {
                              return !1;
                          }
                        : function() {}),
                    (t.style.MozUserSelect = e ? "auto" : "none"),
                    (t.style.KhtmlUserSelect = e ? "auto" : "none"),
                    (t.unselectable = e ? "on" : "off"));
            },
            makeFullscreen: function(t, e, i) {
                var r = i,
                    n = e;
                M.isUndefined(n) && (n = !0),
                    M.isUndefined(r) && (r = !0),
                    (t.style.position = "absolute"),
                    n && ((t.style.left = 0), (t.style.right = 0)),
                    r && ((t.style.top = 0), (t.style.bottom = 0));
            },
            fakeEvent: function(t, e, i, r) {
                var n = i || {},
                    s = z[e];
                if (!s) throw new Error("Event type " + e + " not supported.");
                var o = document.createEvent(s);
                switch (s) {
                    case "MouseEvents":
                        var a = n.x || n.clientX || 0,
                            c = n.y || n.clientY || 0;
                        o.initMouseEvent(e, n.bubbles || !1, n.cancelable || !0, window, n.clickCount || 1, 0, 0, a, c, !1, !1, !1, !1, 0, null);
                        break;
                    case "KeyboardEvents":
                        var l = o.initKeyboardEvent || o.initKeyEvent;
                        M.defaults(n, { cancelable: !0, ctrlKey: !1, altKey: !1, shiftKey: !1, metaKey: !1, keyCode: void 0, charCode: void 0 }),
                            l(e, n.bubbles || !1, n.cancelable, window, n.ctrlKey, n.altKey, n.shiftKey, n.metaKey, n.keyCode, n.charCode);
                        break;
                    default:
                        o.initEvent(e, n.bubbles || !1, n.cancelable || !0);
                }
                M.defaults(o, r), t.dispatchEvent(o);
            },
            bind: function(t, e, i, r) {
                var n = r || !1;
                return t.addEventListener ? t.addEventListener(e, i, n) : t.attachEvent && t.attachEvent("on" + e, i), j;
            },
            unbind: function(t, e, i, r) {
                var n = r || !1;
                return t.removeEventListener ? t.removeEventListener(e, i, n) : t.detachEvent && t.detachEvent("on" + e, i), j;
            },
            addClass: function(t, e) {
                if (void 0 === t.className) t.className = e;
                else if (t.className !== e) {
                    var i = t.className.split(/ +/);
                    -1 === i.indexOf(e) &&
                        (i.push(e),
                        (t.className = i
                            .join(" ")
                            .replace(/^\s+/, "")
                            .replace(/\s+$/, "")));
                }
                return j;
            },
            removeClass: function(t, e) {
                if (e)
                    if (t.className === e) t.removeAttribute("class");
                    else {
                        var i = t.className.split(/ +/),
                            r = i.indexOf(e);
                        -1 !== r && (i.splice(r, 1), (t.className = i.join(" ")));
                    }
                else t.className = void 0;
                return j;
            },
            hasClass: function(t, e) {
                return new RegExp("(?:^|\\s+)" + e + "(?:\\s+|$)").test(t.className) || !1;
            },
            getWidth: function(t) {
                var e = getComputedStyle(t);
                return n(e["border-left-width"]) + n(e["border-right-width"]) + n(e["padding-left"]) + n(e["padding-right"]) + n(e.width);
            },
            getHeight: function(t) {
                var e = getComputedStyle(t);
                return n(e["border-top-width"]) + n(e["border-bottom-width"]) + n(e["padding-top"]) + n(e["padding-bottom"]) + n(e.height);
            },
            getOffset: function(t) {
                var e = t,
                    i = { left: 0, top: 0 };
                if (e.offsetParent)
                    do {
                        (i.left += e.offsetLeft), (i.top += e.offsetTop), (e = e.offsetParent);
                    } while (e);
                return i;
            },
            isActive: function(t) {
                return t === document.activeElement && (t.type || t.href);
            }
        },
        Y = (function(t) {
            function e(t, i) {
                O(this, e);
                var r = G(this, (e.__proto__ || Object.getPrototypeOf(e)).call(this, t, i)),
                    n = r;
                return (
                    (r.__prev = r.getValue()),
                    (r.__checkbox = document.createElement("input")),
                    r.__checkbox.setAttribute("type", "checkbox"),
                    j.bind(
                        r.__checkbox,
                        "change",
                        function() {
                            n.setValue(!n.__prev);
                        },
                        !1
                    ),
                    r.domElement.appendChild(r.__checkbox),
                    r.updateDisplay(),
                    r
                );
            }
            return (
                V(e, N),
                P(e, [
                    {
                        key: "setValue",
                        value: function(t) {
                            var i = U(e.prototype.__proto__ || Object.getPrototypeOf(e.prototype), "setValue", this).call(this, t);
                            return this.__onFinishChange && this.__onFinishChange.call(this, this.getValue()), (this.__prev = this.getValue()), i;
                        }
                    },
                    {
                        key: "updateDisplay",
                        value: function() {
                            return (
                                !0 === this.getValue()
                                    ? (this.__checkbox.setAttribute("checked", "checked"), (this.__checkbox.checked = !0), (this.__prev = !0))
                                    : ((this.__checkbox.checked = !1), (this.__prev = !1)),
                                U(e.prototype.__proto__ || Object.getPrototypeOf(e.prototype), "updateDisplay", this).call(this)
                            );
                        }
                    }
                ]),
                e
            );
        })(),
        q = (function(t) {
            function e(t, i, r) {
                O(this, e);
                var n = G(this, (e.__proto__ || Object.getPrototypeOf(e)).call(this, t, i)),
                    s = r,
                    o = n;
                if (((n.__select = document.createElement("select")), M.isArray(s))) {
                    var a = {};
                    M.each(s, function(t) {
                        a[t] = t;
                    }),
                        (s = a);
                }
                return (
                    M.each(s, function(t, e) {
                        var i = document.createElement("option");
                        (i.innerHTML = e), i.setAttribute("value", t), o.__select.appendChild(i);
                    }),
                    n.updateDisplay(),
                    j.bind(n.__select, "change", function() {
                        var t = this.options[this.selectedIndex].value;
                        o.setValue(t);
                    }),
                    n.domElement.appendChild(n.__select),
                    n
                );
            }
            return (
                V(e, N),
                P(e, [
                    {
                        key: "setValue",
                        value: function(t) {
                            var i = U(e.prototype.__proto__ || Object.getPrototypeOf(e.prototype), "setValue", this).call(this, t);
                            return this.__onFinishChange && this.__onFinishChange.call(this, this.getValue()), i;
                        }
                    },
                    {
                        key: "updateDisplay",
                        value: function() {
                            return j.isActive(this.__select)
                                ? this
                                : ((this.__select.value = this.getValue()),
                                  U(e.prototype.__proto__ || Object.getPrototypeOf(e.prototype), "updateDisplay", this).call(this));
                        }
                    }
                ]),
                e
            );
        })(),
        W = (function(t) {
            function e(t, i) {
                function r() {
                    s.setValue(s.__input.value);
                }
                O(this, e);
                var n = G(this, (e.__proto__ || Object.getPrototypeOf(e)).call(this, t, i)),
                    s = n;
                return (
                    (n.__input = document.createElement("input")),
                    n.__input.setAttribute("type", "text"),
                    j.bind(n.__input, "keyup", r),
                    j.bind(n.__input, "change", r),
                    j.bind(n.__input, "blur", function() {
                        s.__onFinishChange && s.__onFinishChange.call(s, s.getValue());
                    }),
                    j.bind(n.__input, "keydown", function(t) {
                        13 === t.keyCode && this.blur();
                    }),
                    n.updateDisplay(),
                    n.domElement.appendChild(n.__input),
                    n
                );
            }
            return (
                V(e, N),
                P(e, [
                    {
                        key: "updateDisplay",
                        value: function() {
                            return (
                                j.isActive(this.__input) || (this.__input.value = this.getValue()),
                                U(e.prototype.__proto__ || Object.getPrototypeOf(e.prototype), "updateDisplay", this).call(this)
                            );
                        }
                    }
                ]),
                e
            );
        })(),
        K = (function(t) {
            function e(t, i, r) {
                O(this, e);
                var n = G(this, (e.__proto__ || Object.getPrototypeOf(e)).call(this, t, i)),
                    o = r || {};
                return (
                    (n.__min = o.min),
                    (n.__max = o.max),
                    (n.__step = o.step),
                    M.isUndefined(n.__step)
                        ? 0 === n.initialValue
                            ? (n.__impliedStep = 1)
                            : (n.__impliedStep = Math.pow(10, Math.floor(Math.log(Math.abs(n.initialValue)) / Math.LN10)) / 10)
                        : (n.__impliedStep = n.__step),
                    (n.__precision = s(n.__impliedStep)),
                    n
                );
            }
            return (
                V(e, N),
                P(e, [
                    {
                        key: "setValue",
                        value: function(t) {
                            var i = t;
                            return (
                                void 0 !== this.__min && i < this.__min ? (i = this.__min) : void 0 !== this.__max && i > this.__max && (i = this.__max),
                                void 0 !== this.__step && i % this.__step != 0 && (i = Math.round(i / this.__step) * this.__step),
                                U(e.prototype.__proto__ || Object.getPrototypeOf(e.prototype), "setValue", this).call(this, i)
                            );
                        }
                    },
                    {
                        key: "min",
                        value: function(t) {
                            return (this.__min = t), this;
                        }
                    },
                    {
                        key: "max",
                        value: function(t) {
                            return (this.__max = t), this;
                        }
                    },
                    {
                        key: "step",
                        value: function(t) {
                            return (this.__step = t), (this.__impliedStep = t), (this.__precision = s(t)), this;
                        }
                    }
                ]),
                e
            );
        })(),
        Q = (function(t) {
            function e(t, i, r) {
                function n() {
                    c.__onFinishChange && c.__onFinishChange.call(c, c.getValue());
                }
                function s(t) {
                    var e = l - t.clientY;
                    c.setValue(c.getValue() + e * c.__impliedStep), (l = t.clientY);
                }
                function o() {
                    j.unbind(window, "mousemove", s), j.unbind(window, "mouseup", o), n();
                }
                O(this, e);
                var a = G(this, (e.__proto__ || Object.getPrototypeOf(e)).call(this, t, i, r));
                a.__truncationSuspended = !1;
                var c = a,
                    l = void 0;
                return (
                    (a.__input = document.createElement("input")),
                    a.__input.setAttribute("type", "text"),
                    j.bind(a.__input, "change", function() {
                        var t = parseFloat(c.__input.value);
                        M.isNaN(t) || c.setValue(t);
                    }),
                    j.bind(a.__input, "blur", function() {
                        n();
                    }),
                    j.bind(a.__input, "mousedown", function(t) {
                        j.bind(window, "mousemove", s), j.bind(window, "mouseup", o), (l = t.clientY);
                    }),
                    j.bind(a.__input, "keydown", function(t) {
                        13 === t.keyCode && ((c.__truncationSuspended = !0), this.blur(), (c.__truncationSuspended = !1), n());
                    }),
                    a.updateDisplay(),
                    a.domElement.appendChild(a.__input),
                    a
                );
            }
            return (
                V(e, K),
                P(e, [
                    {
                        key: "updateDisplay",
                        value: function() {
                            return (
                                (this.__input.value = this.__truncationSuspended ? this.getValue() : o(this.getValue(), this.__precision)),
                                U(e.prototype.__proto__ || Object.getPrototypeOf(e.prototype), "updateDisplay", this).call(this)
                            );
                        }
                    }
                ]),
                e
            );
        })(),
        J = (function(t) {
            function e(t, i, r, n, s) {
                function o(t) {
                    t.preventDefault();
                    var e = d.__background.getBoundingClientRect();
                    return d.setValue(a(t.clientX, e.left, e.right, d.__min, d.__max)), !1;
                }
                function c() {
                    j.unbind(window, "mousemove", o), j.unbind(window, "mouseup", c), d.__onFinishChange && d.__onFinishChange.call(d, d.getValue());
                }
                function l(t) {
                    var e = t.touches[0].clientX,
                        i = d.__background.getBoundingClientRect();
                    d.setValue(a(e, i.left, i.right, d.__min, d.__max));
                }
                function u() {
                    j.unbind(window, "touchmove", l), j.unbind(window, "touchend", u), d.__onFinishChange && d.__onFinishChange.call(d, d.getValue());
                }
                O(this, e);
                var h = G(this, (e.__proto__ || Object.getPrototypeOf(e)).call(this, t, i, { min: r, max: n, step: s })),
                    d = h;
                return (
                    (h.__background = document.createElement("div")),
                    (h.__foreground = document.createElement("div")),
                    j.bind(h.__background, "mousedown", function(t) {
                        document.activeElement.blur(), j.bind(window, "mousemove", o), j.bind(window, "mouseup", c), o(t);
                    }),
                    j.bind(h.__background, "touchstart", function(t) {
                        1 === t.touches.length && (j.bind(window, "touchmove", l), j.bind(window, "touchend", u), l(t));
                    }),
                    j.addClass(h.__background, "slider"),
                    j.addClass(h.__foreground, "slider-fg"),
                    h.updateDisplay(),
                    h.__background.appendChild(h.__foreground),
                    h.domElement.appendChild(h.__background),
                    h
                );
            }
            return (
                V(e, K),
                P(e, [
                    {
                        key: "updateDisplay",
                        value: function() {
                            var t = (this.getValue() - this.__min) / (this.__max - this.__min);
                            return (
                                (this.__foreground.style.width = 100 * t + "%"),
                                U(e.prototype.__proto__ || Object.getPrototypeOf(e.prototype), "updateDisplay", this).call(this)
                            );
                        }
                    }
                ]),
                e
            );
        })(),
        Z = (function(t) {
            function e(t, i, r) {
                O(this, e);
                var n = G(this, (e.__proto__ || Object.getPrototypeOf(e)).call(this, t, i)),
                    s = n;
                return (
                    (n.__button = document.createElement("div")),
                    (n.__button.innerHTML = void 0 === r ? "Fire" : r),
                    j.bind(n.__button, "click", function(t) {
                        return t.preventDefault(), s.fire(), !1;
                    }),
                    j.addClass(n.__button, "button"),
                    n.domElement.appendChild(n.__button),
                    n
                );
            }
            return (
                V(e, N),
                P(e, [
                    {
                        key: "fire",
                        value: function() {
                            this.__onChange && this.__onChange.call(this),
                                this.getValue().call(this.object),
                                this.__onFinishChange && this.__onFinishChange.call(this, this.getValue());
                        }
                    }
                ]),
                e
            );
        })(),
        $ = (function(t) {
            function e(t, i) {
                function r(t) {
                    h(t), j.bind(window, "mousemove", h), j.bind(window, "touchmove", h), j.bind(window, "mouseup", s), j.bind(window, "touchend", s);
                }
                function n(t) {
                    d(t), j.bind(window, "mousemove", d), j.bind(window, "touchmove", d), j.bind(window, "mouseup", o), j.bind(window, "touchend", o);
                }
                function s() {
                    j.unbind(window, "mousemove", h), j.unbind(window, "touchmove", h), j.unbind(window, "mouseup", s), j.unbind(window, "touchend", s), u();
                }
                function o() {
                    j.unbind(window, "mousemove", d), j.unbind(window, "touchmove", d), j.unbind(window, "mouseup", o), j.unbind(window, "touchend", o), u();
                }
                function a() {
                    var t = k(this.value);
                    !1 !== t ? ((p.__color.__state = t), p.setValue(p.__color.toOriginal())) : (this.value = p.__color.toString());
                }
                function u() {
                    p.__onFinishChange && p.__onFinishChange.call(p, p.__color.toOriginal());
                }
                function h(t) {
                    -1 === t.type.indexOf("touch") && t.preventDefault();
                    var e = p.__saturation_field.getBoundingClientRect(),
                        i = (t.touches && t.touches[0]) || t,
                        r = i.clientX,
                        n = i.clientY,
                        s = (r - e.left) / (e.right - e.left),
                        o = 1 - (n - e.top) / (e.bottom - e.top);
                    return (
                        o > 1 ? (o = 1) : o < 0 && (o = 0),
                        s > 1 ? (s = 1) : s < 0 && (s = 0),
                        (p.__color.v = o),
                        (p.__color.s = s),
                        p.setValue(p.__color.toOriginal()),
                        !1
                    );
                }
                function d(t) {
                    -1 === t.type.indexOf("touch") && t.preventDefault();
                    var e = p.__hue_field.getBoundingClientRect(),
                        i = 1 - (((t.touches && t.touches[0]) || t).clientY - e.top) / (e.bottom - e.top);
                    return i > 1 ? (i = 1) : i < 0 && (i = 0), (p.__color.h = 360 * i), p.setValue(p.__color.toOriginal()), !1;
                }
                O(this, e);
                var f = G(this, (e.__proto__ || Object.getPrototypeOf(e)).call(this, t, i));
                (f.__color = new I(f.getValue())), (f.__temp = new I(0));
                var p = f;
                (f.domElement = document.createElement("div")),
                    j.makeSelectable(f.domElement, !1),
                    (f.__selector = document.createElement("div")),
                    (f.__selector.className = "selector"),
                    (f.__saturation_field = document.createElement("div")),
                    (f.__saturation_field.className = "saturation-field"),
                    (f.__field_knob = document.createElement("div")),
                    (f.__field_knob.className = "field-knob"),
                    (f.__field_knob_border = "2px solid "),
                    (f.__hue_knob = document.createElement("div")),
                    (f.__hue_knob.className = "hue-knob"),
                    (f.__hue_field = document.createElement("div")),
                    (f.__hue_field.className = "hue-field"),
                    (f.__input = document.createElement("input")),
                    (f.__input.type = "text"),
                    (f.__input_textShadow = "0 1px 1px "),
                    j.bind(f.__input, "keydown", function(t) {
                        13 === t.keyCode && a.call(this);
                    }),
                    j.bind(f.__input, "blur", a),
                    j.bind(f.__selector, "mousedown", function() {
                        j.addClass(this, "drag").bind(window, "mouseup", function() {
                            j.removeClass(p.__selector, "drag");
                        });
                    }),
                    j.bind(f.__selector, "touchstart", function() {
                        j.addClass(this, "drag").bind(window, "touchend", function() {
                            j.removeClass(p.__selector, "drag");
                        });
                    });
                var v = document.createElement("div");
                return (
                    M.extend(f.__selector.style, {
                        width: "122px",
                        height: "102px",
                        padding: "3px",
                        backgroundColor: "#222",
                        boxShadow: "0px 1px 3px rgba(0,0,0,0.3)"
                    }),
                    M.extend(f.__field_knob.style, {
                        position: "absolute",
                        width: "12px",
                        height: "12px",
                        border: f.__field_knob_border + (f.__color.v < 0.5 ? "#fff" : "#000"),
                        boxShadow: "0px 1px 3px rgba(0,0,0,0.5)",
                        borderRadius: "12px",
                        zIndex: 1
                    }),
                    M.extend(f.__hue_knob.style, { position: "absolute", width: "15px", height: "2px", borderRight: "4px solid #fff", zIndex: 1 }),
                    M.extend(f.__saturation_field.style, {
                        width: "100px",
                        height: "100px",
                        border: "1px solid #555",
                        marginRight: "3px",
                        display: "inline-block",
                        cursor: "pointer"
                    }),
                    M.extend(v.style, { width: "100%", height: "100%", background: "none" }),
                    c(v, "top", "rgba(0,0,0,0)", "#000"),
                    M.extend(f.__hue_field.style, {
                        width: "15px",
                        height: "100px",
                        border: "1px solid #555",
                        cursor: "ns-resize",
                        position: "absolute",
                        top: "3px",
                        right: "3px"
                    }),
                    l(f.__hue_field),
                    M.extend(f.__input.style, {
                        outline: "none",
                        textAlign: "center",
                        color: "#fff",
                        border: 0,
                        fontWeight: "bold",
                        textShadow: f.__input_textShadow + "rgba(0,0,0,0.7)"
                    }),
                    j.bind(f.__saturation_field, "mousedown", r),
                    j.bind(f.__saturation_field, "touchstart", r),
                    j.bind(f.__field_knob, "mousedown", r),
                    j.bind(f.__field_knob, "touchstart", r),
                    j.bind(f.__hue_field, "mousedown", n),
                    j.bind(f.__hue_field, "touchstart", n),
                    f.__saturation_field.appendChild(v),
                    f.__selector.appendChild(f.__field_knob),
                    f.__selector.appendChild(f.__saturation_field),
                    f.__selector.appendChild(f.__hue_field),
                    f.__hue_field.appendChild(f.__hue_knob),
                    f.domElement.appendChild(f.__input),
                    f.domElement.appendChild(f.__selector),
                    f.updateDisplay(),
                    f
                );
            }
            return (
                V(e, N),
                P(e, [
                    {
                        key: "updateDisplay",
                        value: function() {
                            var t = k(this.getValue());
                            if (!1 !== t) {
                                var e = !1;
                                M.each(
                                    I.COMPONENTS,
                                    function(i) {
                                        if (!M.isUndefined(t[i]) && !M.isUndefined(this.__color.__state[i]) && t[i] !== this.__color.__state[i])
                                            return (e = !0), {};
                                    },
                                    this
                                ),
                                    e && M.extend(this.__color.__state, t);
                            }
                            M.extend(this.__temp.__state, this.__color.__state), (this.__temp.a = 1);
                            var i = this.__color.v < 0.5 || this.__color.s > 0.5 ? 255 : 0,
                                r = 255 - i;
                            M.extend(this.__field_knob.style, {
                                marginLeft: 100 * this.__color.s - 7 + "px",
                                marginTop: 100 * (1 - this.__color.v) - 7 + "px",
                                backgroundColor: this.__temp.toHexString(),
                                border: this.__field_knob_border + "rgb(" + i + "," + i + "," + i + ")"
                            }),
                                (this.__hue_knob.style.marginTop = 100 * (1 - this.__color.h / 360) + "px"),
                                (this.__temp.s = 1),
                                (this.__temp.v = 1),
                                c(this.__saturation_field, "left", "#fff", this.__temp.toHexString()),
                                (this.__input.value = this.__color.toString()),
                                M.extend(this.__input.style, {
                                    backgroundColor: this.__color.toHexString(),
                                    color: "rgb(" + i + "," + i + "," + i + ")",
                                    textShadow: this.__input_textShadow + "rgba(" + r + "," + r + "," + r + ",.7)"
                                });
                        }
                    }
                ]),
                e
            );
        })(),
        tt = ["-moz-", "-o-", "-webkit-", "-ms-", ""],
        et = {
            load: function(t, e) {
                var i = e || document,
                    r = i.createElement("link");
                (r.type = "text/css"), (r.rel = "stylesheet"), (r.href = t), i.getElementsByTagName("head")[0].appendChild(r);
            },
            inject: function(t, e) {
                var i = e || document,
                    r = document.createElement("style");
                (r.type = "text/css"), (r.innerHTML = t);
                var n = i.getElementsByTagName("head")[0];
                try {
                    n.appendChild(r);
                } catch (t) {}
            }
        },
        it = function(t, e) {
            var i = t[e];
            return M.isArray(arguments[2]) || M.isObject(arguments[2])
                ? new q(t, e, arguments[2])
                : M.isNumber(i)
                ? M.isNumber(arguments[2]) && M.isNumber(arguments[3])
                    ? M.isNumber(arguments[4])
                        ? new J(t, e, arguments[2], arguments[3], arguments[4])
                        : new J(t, e, arguments[2], arguments[3])
                    : M.isNumber(arguments[4])
                    ? new Q(t, e, { min: arguments[2], max: arguments[3], step: arguments[4] })
                    : new Q(t, e, { min: arguments[2], max: arguments[3] })
                : M.isString(i)
                ? new W(t, e)
                : M.isFunction(i)
                ? new Z(t, e, "")
                : M.isBoolean(i)
                ? new Y(t, e)
                : null;
        },
        rt =
            window.requestAnimationFrame ||
            window.webkitRequestAnimationFrame ||
            window.mozRequestAnimationFrame ||
            window.oRequestAnimationFrame ||
            window.msRequestAnimationFrame ||
            function(t) {
                setTimeout(t, 1e3 / 60);
            },
        nt = (function() {
            function t() {
                O(this, t),
                    (this.backgroundElement = document.createElement("div")),
                    M.extend(this.backgroundElement.style, {
                        backgroundColor: "rgba(0,0,0,0.8)",
                        top: 0,
                        left: 0,
                        display: "none",
                        zIndex: "1000",
                        opacity: 0,
                        WebkitTransition: "opacity 0.2s linear",
                        transition: "opacity 0.2s linear"
                    }),
                    j.makeFullscreen(this.backgroundElement),
                    (this.backgroundElement.style.position = "fixed"),
                    (this.domElement = document.createElement("div")),
                    M.extend(this.domElement.style, {
                        position: "fixed",
                        display: "none",
                        zIndex: "1001",
                        opacity: 0,
                        WebkitTransition: "-webkit-transform 0.2s ease-out, opacity 0.2s linear",
                        transition: "transform 0.2s ease-out, opacity 0.2s linear"
                    }),
                    document.body.appendChild(this.backgroundElement),
                    document.body.appendChild(this.domElement);
                var e = this;
                j.bind(this.backgroundElement, "click", function() {
                    e.hide();
                });
            }
            return (
                P(t, [
                    {
                        key: "show",
                        value: function() {
                            var t = this;
                            (this.backgroundElement.style.display = "block"),
                                (this.domElement.style.display = "block"),
                                (this.domElement.style.opacity = 0),
                                (this.domElement.style.webkitTransform = "scale(1.1)"),
                                this.layout(),
                                M.defer(function() {
                                    (t.backgroundElement.style.opacity = 1),
                                        (t.domElement.style.opacity = 1),
                                        (t.domElement.style.webkitTransform = "scale(1)");
                                });
                        }
                    },
                    {
                        key: "hide",
                        value: function() {
                            var t = this,
                                e = function e() {
                                    (t.domElement.style.display = "none"),
                                        (t.backgroundElement.style.display = "none"),
                                        j.unbind(t.domElement, "webkitTransitionEnd", e),
                                        j.unbind(t.domElement, "transitionend", e),
                                        j.unbind(t.domElement, "oTransitionEnd", e);
                                };
                            j.bind(this.domElement, "webkitTransitionEnd", e),
                                j.bind(this.domElement, "transitionend", e),
                                j.bind(this.domElement, "oTransitionEnd", e),
                                (this.backgroundElement.style.opacity = 0),
                                (this.domElement.style.opacity = 0),
                                (this.domElement.style.webkitTransform = "scale(1.1)");
                        }
                    },
                    {
                        key: "layout",
                        value: function() {
                            (this.domElement.style.left = window.innerWidth / 2 - j.getWidth(this.domElement) / 2 + "px"),
                                (this.domElement.style.top = window.innerHeight / 2 - j.getHeight(this.domElement) / 2 + "px");
                        }
                    }
                ]),
                t
            );
        })(),
        st = (function(t) {
            if (t && "undefined" != typeof window) {
                var e = document.createElement("style");
                return e.setAttribute("type", "text/css"), (e.innerHTML = t), document.head.appendChild(e), t;
            }
        })(
            ".dg ul{list-style:none;margin:0;padding:0;width:100%;clear:both}.dg.ac{position:fixed;top:0;left:0;right:0;height:0;z-index:0}.dg:not(.ac) .main{overflow:hidden}.dg.main{-webkit-transition:opacity .1s linear;-o-transition:opacity .1s linear;-moz-transition:opacity .1s linear;transition:opacity .1s linear}.dg.main.taller-than-window{overflow-y:auto}.dg.main.taller-than-window .close-button{opacity:1;margin-top:-1px;border-top:1px solid #2c2c2c}.dg.main ul.closed .close-button{opacity:1 !important}.dg.main:hover .close-button,.dg.main .close-button.drag{opacity:1}.dg.main .close-button{-webkit-transition:opacity .1s linear;-o-transition:opacity .1s linear;-moz-transition:opacity .1s linear;transition:opacity .1s linear;border:0;line-height:19px;height:20px;cursor:pointer;text-align:center;background-color:#000}.dg.main .close-button.close-top{position:relative}.dg.main .close-button.close-bottom{position:absolute}.dg.main .close-button:hover{background-color:#111}.dg.a{float:right;margin-right:15px;overflow-y:visible}.dg.a.has-save>ul.close-top{margin-top:0}.dg.a.has-save>ul.close-bottom{margin-top:27px}.dg.a.has-save>ul.closed{margin-top:0}.dg.a .save-row{top:0;z-index:1002}.dg.a .save-row.close-top{position:relative}.dg.a .save-row.close-bottom{position:fixed}.dg li{-webkit-transition:height .1s ease-out;-o-transition:height .1s ease-out;-moz-transition:height .1s ease-out;transition:height .1s ease-out;-webkit-transition:overflow .1s linear;-o-transition:overflow .1s linear;-moz-transition:overflow .1s linear;transition:overflow .1s linear}.dg li:not(.folder){cursor:auto;height:27px;line-height:27px;padding:0 4px 0 5px}.dg li.folder{padding:0;border-left:4px solid rgba(0,0,0,0)}.dg li.title{cursor:pointer;margin-left:-4px}.dg .closed li:not(.title),.dg .closed ul li,.dg .closed ul li>*{height:0;overflow:hidden;border:0}.dg .cr{clear:both;padding-left:3px;height:27px;overflow:hidden}.dg .property-name{cursor:default;float:left;clear:left;width:40%;overflow:hidden;text-overflow:ellipsis}.dg .c{float:left;width:60%;position:relative}.dg .c input[type=text]{border:0;margin-top:4px;padding:3px;width:100%;float:right}.dg .has-slider input[type=text]{width:30%;margin-left:0}.dg .slider{float:left;width:66%;margin-left:-5px;margin-right:0;height:19px;margin-top:4px}.dg .slider-fg{height:100%}.dg .c input[type=checkbox]{margin-top:7px}.dg .c select{margin-top:5px}.dg .cr.function,.dg .cr.function .property-name,.dg .cr.function *,.dg .cr.boolean,.dg .cr.boolean *{cursor:pointer}.dg .cr.color{overflow:visible}.dg .selector{display:none;position:absolute;margin-left:-9px;margin-top:23px;z-index:10}.dg .c:hover .selector,.dg .selector.drag{display:block}.dg li.save-row{padding:0}.dg li.save-row .button{display:inline-block;padding:0px 6px}.dg.dialogue{background-color:#222;width:460px;padding:15px;font-size:13px;line-height:15px}#dg-new-constructor{padding:10px;color:#222;font-family:Monaco, monospace;font-size:10px;border:0;resize:none;box-shadow:inset 1px 1px 1px #888;word-wrap:break-word;margin:12px 0;display:block;width:440px;overflow-y:scroll;height:100px;position:relative}#dg-local-explain{display:none;font-size:11px;line-height:17px;border-radius:3px;background-color:#333;padding:8px;margin-top:10px}#dg-local-explain code{font-size:10px}#dat-gui-save-locally{display:none}.dg{color:#eee;font:11px 'Lucida Grande', sans-serif;text-shadow:0 -1px 0 #111}.dg.main::-webkit-scrollbar{width:5px;background:#1a1a1a}.dg.main::-webkit-scrollbar-corner{height:0;display:none}.dg.main::-webkit-scrollbar-thumb{border-radius:5px;background:#676767}.dg li:not(.folder){background:#1a1a1a;border-bottom:1px solid #2c2c2c}.dg li.save-row{line-height:25px;background:#dad5cb;border:0}.dg li.save-row select{margin-left:5px;width:108px}.dg li.save-row .button{margin-left:5px;margin-top:1px;border-radius:2px;font-size:9px;line-height:7px;padding:4px 4px 5px 4px;background:#c5bdad;color:#fff;text-shadow:0 1px 0 #b0a58f;box-shadow:0 -1px 0 #b0a58f;cursor:pointer}.dg li.save-row .button.gears{background:#c5bdad url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAsAAAANCAYAAAB/9ZQ7AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAQJJREFUeNpiYKAU/P//PwGIC/ApCABiBSAW+I8AClAcgKxQ4T9hoMAEUrxx2QSGN6+egDX+/vWT4e7N82AMYoPAx/evwWoYoSYbACX2s7KxCxzcsezDh3evFoDEBYTEEqycggWAzA9AuUSQQgeYPa9fPv6/YWm/Acx5IPb7ty/fw+QZblw67vDs8R0YHyQhgObx+yAJkBqmG5dPPDh1aPOGR/eugW0G4vlIoTIfyFcA+QekhhHJhPdQxbiAIguMBTQZrPD7108M6roWYDFQiIAAv6Aow/1bFwXgis+f2LUAynwoIaNcz8XNx3Dl7MEJUDGQpx9gtQ8YCueB+D26OECAAQDadt7e46D42QAAAABJRU5ErkJggg==) 2px 1px no-repeat;height:7px;width:8px}.dg li.save-row .button:hover{background-color:#bab19e;box-shadow:0 -1px 0 #b0a58f}.dg li.folder{border-bottom:0}.dg li.title{padding-left:16px;background:#000 url(data:image/gif;base64,R0lGODlhBQAFAJEAAP////Pz8////////yH5BAEAAAIALAAAAAAFAAUAAAIIlI+hKgFxoCgAOw==) 6px 10px no-repeat;cursor:pointer;border-bottom:1px solid rgba(255,255,255,0.2)}.dg .closed li.title{background-image:url(data:image/gif;base64,R0lGODlhBQAFAJEAAP////Pz8////////yH5BAEAAAIALAAAAAAFAAUAAAIIlGIWqMCbWAEAOw==)}.dg .cr.boolean{border-left:3px solid #806787}.dg .cr.color{border-left:3px solid}.dg .cr.function{border-left:3px solid #e61d5f}.dg .cr.number{border-left:3px solid #2FA1D6}.dg .cr.number input[type=text]{color:#2FA1D6}.dg .cr.string{border-left:3px solid #1ed36f}.dg .cr.string input[type=text]{color:#1ed36f}.dg .cr.function:hover,.dg .cr.boolean:hover{background:#111}.dg .c input[type=text]{background:#303030;outline:none}.dg .c input[type=text]:hover{background:#3c3c3c}.dg .c input[type=text]:focus{background:#494949;color:#fff}.dg .c .slider{background:#303030;cursor:ew-resize}.dg .c .slider-fg{background:#2FA1D6;max-width:100%}.dg .c .slider:hover{background:#3c3c3c}.dg .c .slider:hover .slider-fg{background:#44abda}\n"
        );
    et.inject(st);
    var ot = "Default",
        at = (function() {
            try {
                return !!window.localStorage;
            } catch (t) {
                return !1;
            }
        })(),
        ct = void 0,
        lt = !0,
        ut = void 0,
        ht = !1,
        dt = [],
        ft = function t(e) {
            var i = this,
                r = e || {};
            (this.domElement = document.createElement("div")),
                (this.__ul = document.createElement("ul")),
                this.domElement.appendChild(this.__ul),
                j.addClass(this.domElement, "dg"),
                (this.__folders = {}),
                (this.__controllers = []),
                (this.__rememberedObjects = []),
                (this.__rememberedObjectIndecesToControllers = []),
                (this.__listening = []),
                (r = M.defaults(r, { closeOnTop: !1, autoPlace: !0, width: t.DEFAULT_WIDTH })),
                (r = M.defaults(r, { resizable: r.autoPlace, hideable: r.autoPlace })),
                M.isUndefined(r.load) ? (r.load = { preset: ot }) : r.preset && (r.load.preset = r.preset),
                M.isUndefined(r.parent) && r.hideable && dt.push(this),
                (r.resizable = M.isUndefined(r.parent) && r.resizable),
                r.autoPlace && M.isUndefined(r.scrollable) && (r.scrollable = !0);
            var n = at && "true" === localStorage.getItem(m(this, "isLocal")),
                s = void 0,
                o = void 0;
            if (
                (Object.defineProperties(this, {
                    parent: {
                        get: function() {
                            return r.parent;
                        }
                    },
                    scrollable: {
                        get: function() {
                            return r.scrollable;
                        }
                    },
                    autoPlace: {
                        get: function() {
                            return r.autoPlace;
                        }
                    },
                    closeOnTop: {
                        get: function() {
                            return r.closeOnTop;
                        }
                    },
                    preset: {
                        get: function() {
                            return i.parent ? i.getRoot().preset : r.load.preset;
                        },
                        set: function(t) {
                            i.parent ? (i.getRoot().preset = t) : (r.load.preset = t), w(this), i.revert();
                        }
                    },
                    width: {
                        get: function() {
                            return r.width;
                        },
                        set: function(t) {
                            (r.width = t), y(i, t);
                        }
                    },
                    name: {
                        get: function() {
                            return r.name;
                        },
                        set: function(t) {
                            (r.name = t), o && (o.innerHTML = r.name);
                        }
                    },
                    closed: {
                        get: function() {
                            return r.closed;
                        },
                        set: function(e) {
                            (r.closed = e),
                                r.closed ? j.addClass(i.__ul, t.CLASS_CLOSED) : j.removeClass(i.__ul, t.CLASS_CLOSED),
                                this.onResize(),
                                i.__closeButton && (i.__closeButton.innerHTML = e ? t.TEXT_OPEN : t.TEXT_CLOSED);
                        }
                    },
                    load: {
                        get: function() {
                            return r.load;
                        }
                    },
                    useLocalStorage: {
                        get: function() {
                            return n;
                        },
                        set: function(t) {
                            at && ((n = t), t ? j.bind(window, "unload", s) : j.unbind(window, "unload", s), localStorage.setItem(m(i, "isLocal"), t));
                        }
                    }
                }),
                M.isUndefined(r.parent))
            ) {
                if (((this.closed = r.closed || !1), j.addClass(this.domElement, t.CLASS_MAIN), j.makeSelectable(this.domElement, !1), at && n)) {
                    i.useLocalStorage = !0;
                    var a = localStorage.getItem(m(this, "gui"));
                    a && (r.load = JSON.parse(a));
                }
                (this.__closeButton = document.createElement("div")),
                    (this.__closeButton.innerHTML = t.TEXT_CLOSED),
                    j.addClass(this.__closeButton, t.CLASS_CLOSE_BUTTON),
                    r.closeOnTop
                        ? (j.addClass(this.__closeButton, t.CLASS_CLOSE_TOP), this.domElement.insertBefore(this.__closeButton, this.domElement.childNodes[0]))
                        : (j.addClass(this.__closeButton, t.CLASS_CLOSE_BOTTOM), this.domElement.appendChild(this.__closeButton)),
                    j.bind(this.__closeButton, "click", function() {
                        i.closed = !i.closed;
                    });
            } else {
                void 0 === r.closed && (r.closed = !0);
                var c = document.createTextNode(r.name);
                j.addClass(c, "controller-name"), (o = u(i, c));
                j.addClass(this.__ul, t.CLASS_CLOSED),
                    j.addClass(o, "title"),
                    j.bind(o, "click", function(t) {
                        return t.preventDefault(), (i.closed = !i.closed), !1;
                    }),
                    r.closed || (this.closed = !1);
            }
            r.autoPlace &&
                (M.isUndefined(r.parent) &&
                    (lt &&
                        ((ut = document.createElement("div")),
                        j.addClass(ut, "dg"),
                        j.addClass(ut, t.CLASS_AUTO_PLACE_CONTAINER),
                        document.body.appendChild(ut),
                        (lt = !1)),
                    ut.appendChild(this.domElement),
                    j.addClass(this.domElement, t.CLASS_AUTO_PLACE)),
                this.parent || y(i, r.width)),
                (this.__resizeHandler = function() {
                    i.onResizeDebounced();
                }),
                j.bind(window, "resize", this.__resizeHandler),
                j.bind(this.__ul, "webkitTransitionEnd", this.__resizeHandler),
                j.bind(this.__ul, "transitionend", this.__resizeHandler),
                j.bind(this.__ul, "oTransitionEnd", this.__resizeHandler),
                this.onResize(),
                r.resizable && x(this),
                (s = function() {
                    at && "true" === localStorage.getItem(m(i, "isLocal")) && localStorage.setItem(m(i, "gui"), JSON.stringify(i.getSaveObject()));
                }),
                (this.saveToLocalStorageIfPossible = s),
                r.parent ||
                    (function() {
                        var t = i.getRoot();
                        (t.width += 1),
                            M.defer(function() {
                                t.width -= 1;
                            });
                    })();
        };
    (ft.toggleHide = function() {
        (ht = !ht),
            M.each(dt, function(t) {
                t.domElement.style.display = ht ? "none" : "";
            });
    }),
        (ft.CLASS_AUTO_PLACE = "a"),
        (ft.CLASS_AUTO_PLACE_CONTAINER = "ac"),
        (ft.CLASS_MAIN = "main"),
        (ft.CLASS_CONTROLLER_ROW = "cr"),
        (ft.CLASS_TOO_TALL = "taller-than-window"),
        (ft.CLASS_CLOSED = "closed"),
        (ft.CLASS_CLOSE_BUTTON = "close-button"),
        (ft.CLASS_CLOSE_TOP = "close-top"),
        (ft.CLASS_CLOSE_BOTTOM = "close-bottom"),
        (ft.CLASS_DRAG = "drag"),
        (ft.DEFAULT_WIDTH = 245),
        (ft.TEXT_CLOSED = "Close Controls"),
        (ft.TEXT_OPEN = "Open Controls"),
        (ft._keydownHandler = function(t) {
            "text" === document.activeElement.type || (72 !== t.which && 72 !== t.keyCode) || ft.toggleHide();
        }),
        j.bind(window, "keydown", ft._keydownHandler, !1),
        M.extend(ft.prototype, {
            add: function(t, e) {
                return v(this, t, e, { factoryArgs: Array.prototype.slice.call(arguments, 2) });
            },
            addColor: function(t, e) {
                return v(this, t, e, { color: !0 });
            },
            remove: function(t) {
                this.__ul.removeChild(t.__li), this.__controllers.splice(this.__controllers.indexOf(t), 1);
                var e = this;
                M.defer(function() {
                    e.onResize();
                });
            },
            destroy: function() {
                if (this.parent) throw new Error("Only the root GUI should be removed with .destroy(). For subfolders, use gui.removeFolder(folder) instead.");
                this.autoPlace && ut.removeChild(this.domElement);
                var t = this;
                M.each(this.__folders, function(e) {
                    t.removeFolder(e);
                }),
                    j.unbind(window, "keydown", ft._keydownHandler, !1),
                    h(this);
            },
            addFolder: function(t) {
                if (void 0 !== this.__folders[t]) throw new Error('You already have a folder in this GUI by the name "' + t + '"');
                var e = { name: t, parent: this };
                (e.autoPlace = this.autoPlace),
                    this.load && this.load.folders && this.load.folders[t] && ((e.closed = this.load.folders[t].closed), (e.load = this.load.folders[t]));
                var i = new ft(e);
                this.__folders[t] = i;
                var r = u(this, i.domElement);
                return j.addClass(r, "folder"), i;
            },
            removeFolder: function(t) {
                this.__ul.removeChild(t.domElement.parentElement),
                    delete this.__folders[t.name],
                    this.load && this.load.folders && this.load.folders[t.name] && delete this.load.folders[t.name],
                    h(t);
                var e = this;
                M.each(t.__folders, function(e) {
                    t.removeFolder(e);
                }),
                    M.defer(function() {
                        e.onResize();
                    });
            },
            open: function() {
                this.closed = !1;
            },
            close: function() {
                this.closed = !0;
            },
            onResize: function() {
                var t = this.getRoot();
                if (t.scrollable) {
                    var e = j.getOffset(t.__ul).top,
                        i = 0;
                    M.each(t.__ul.childNodes, function(e) {
                        (t.autoPlace && e === t.__save_row) || (i += j.getHeight(e));
                    }),
                        window.innerHeight - e - 20 < i
                            ? (j.addClass(t.domElement, ft.CLASS_TOO_TALL), (t.__ul.style.height = window.innerHeight - e - 20 + "px"))
                            : (j.removeClass(t.domElement, ft.CLASS_TOO_TALL), (t.__ul.style.height = "auto"));
                }
                t.__resize_handle &&
                    M.defer(function() {
                        t.__resize_handle.style.height = t.__ul.offsetHeight + "px";
                    }),
                    t.__closeButton && (t.__closeButton.style.width = t.width + "px");
            },
            onResizeDebounced: M.debounce(function() {
                this.onResize();
            }, 50),
            remember: function() {
                if (
                    (M.isUndefined(ct) &&
                        ((ct = new nt()).domElement.innerHTML =
                            '<div id="dg-save" class="dg dialogue">\n\n  Here\'s the new load parameter for your <code>GUI</code>\'s constructor:\n\n  <textarea id="dg-new-constructor"></textarea>\n\n  <div id="dg-save-locally">\n\n    <input id="dg-local-storage" type="checkbox"/> Automatically save\n    values to <code>localStorage</code> on exit.\n\n    <div id="dg-local-explain">The values saved to <code>localStorage</code> will\n      override those passed to <code>dat.GUI</code>\'s constructor. This makes it\n      easier to work incrementally, but <code>localStorage</code> is fragile,\n      and your friends may not see the same values you do.\n\n    </div>\n\n  </div>\n\n</div>'),
                    this.parent)
                )
                    throw new Error("You can only call remember on a top level GUI.");
                var t = this;
                M.each(Array.prototype.slice.call(arguments), function(e) {
                    0 === t.__rememberedObjects.length && b(t), -1 === t.__rememberedObjects.indexOf(e) && t.__rememberedObjects.push(e);
                }),
                    this.autoPlace && y(this, this.width);
            },
            getRoot: function() {
                for (var t = this; t.parent; ) t = t.parent;
                return t;
            },
            getSaveObject: function() {
                var t = this.load;
                return (
                    (t.closed = this.closed),
                    this.__rememberedObjects.length > 0 &&
                        ((t.preset = this.preset), t.remembered || (t.remembered = {}), (t.remembered[this.preset] = E(this))),
                    (t.folders = {}),
                    M.each(this.__folders, function(e, i) {
                        t.folders[i] = e.getSaveObject();
                    }),
                    t
                );
            },
            save: function() {
                this.load.remembered || (this.load.remembered = {}),
                    (this.load.remembered[this.preset] = E(this)),
                    d(this, !1),
                    this.saveToLocalStorageIfPossible();
            },
            saveAs: function(t) {
                this.load.remembered || ((this.load.remembered = {}), (this.load.remembered[ot] = E(this, !0))),
                    (this.load.remembered[t] = E(this)),
                    (this.preset = t),
                    _(this, t, !0),
                    this.saveToLocalStorageIfPossible();
            },
            revert: function(t) {
                M.each(
                    this.__controllers,
                    function(e) {
                        this.getRoot().load.remembered ? p(t || this.getRoot(), e) : e.setValue(e.initialValue),
                            e.__onFinishChange && e.__onFinishChange.call(e, e.getValue());
                    },
                    this
                ),
                    M.each(this.__folders, function(t) {
                        t.revert(t);
                    }),
                    t || d(this.getRoot(), !1);
            },
            listen: function(t) {
                var e = 0 === this.__listening.length;
                this.__listening.push(t), e && A(this.__listening);
            },
            updateDisplay: function() {
                M.each(this.__controllers, function(t) {
                    t.updateDisplay();
                }),
                    M.each(this.__folders, function(t) {
                        t.updateDisplay();
                    });
            }
        });
    var pt = { Color: I, math: L, interpret: k },
        vt = {
            Controller: N,
            BooleanController: Y,
            OptionController: q,
            StringController: W,
            NumberController: K,
            NumberControllerBox: Q,
            NumberControllerSlider: J,
            FunctionController: Z,
            ColorController: $
        },
        mt = { dom: j },
        _t = { GUI: ft },
        gt = ft,
        bt = { color: pt, controllers: vt, dom: mt, gui: _t, GUI: gt };
    (t.color = pt), (t.controllers = vt), (t.dom = mt), (t.gui = _t), (t.GUI = gt), (t.default = bt), Object.defineProperty(t, "__esModule", { value: !0 });
});
function setProperty(t, e, i) {
    var r = e.split(/[\.\[\]]/).filter(function(t) {
        return t.length > 0;
    });
    var n = t;
    for (var s = 0; s < r.length - 1; ++s) {
        if (n[r[s]] === undefined) {
            n[r[s]] = {};
        }
        n = n[r[s]];
    }
    n[r[r.length - 1]] = i;
}
function getStringFromUrl(t) {
    var e = new XMLHttpRequest();
    e.open("GET", t, false);
    e.send();
    return e.responseText;
}
class CGFshader {
    constructor(t, e, i) {
        this.gl = t;
        this.uniforms = {};
        this.attributes = {};
        if (e != undefined && i != undefined) {
            this.init(e, i);
        }
        this.textureUnit = 0;
    }
    init(t, e) {
        this.fragmentURL = e;
        this.vertexURL = t;
        var i = getStringFromUrl(e);
        var r = getStringFromUrl(t);
        var n = this.createShaderFromSource(WebGLRenderingContext.FRAGMENT_SHADER, i);
        var s = this.createShaderFromSource(WebGLRenderingContext.VERTEX_SHADER, r);
        this.compile_program(s, n);
    }
    createShaderFromSource(t, e) {
        var i = this.gl.createShader(t);
        this.gl.shaderSource(i, e);
        this.gl.compileShader(i);
        if (!this.gl.getShaderParameter(i, this.gl.COMPILE_STATUS)) {
            alert(this.gl.getShaderInfoLog(i));
            return null;
        }
        return i;
    }
    createUniformSetter(t, e, i, r) {
        var n = i.type;
        var s = i.size > 1 && i.name.substr(-3) === "[0]";
        if (n === t.FLOAT && s) {
            return function(e) {
                t.uniform1fv(r, e);
            };
        }
        if (n === t.FLOAT) {
            return function(e) {
                t.uniform1f(r, e);
            };
        }
        if (n === t.FLOAT_VEC2) {
            return function(e) {
                t.uniform2fv(r, e);
            };
        }
        if (n === t.FLOAT_VEC3) {
            return function(e) {
                t.uniform3fv(r, e);
            };
        }
        if (n === t.FLOAT_VEC4) {
            return function(e) {
                t.uniform4fv(r, e);
            };
        }
        if (n === t.INT && s) {
            return function(e) {
                t.uniform1iv(r, e);
            };
        }
        if (n === t.INT) {
            return function(e) {
                t.uniform1i(r, e);
            };
        }
        if (n === t.INT_VEC2) {
            return function(e) {
                t.uniform2iv(r, e);
            };
        }
        if (n === t.INT_VEC3) {
            return function(e) {
                t.uniform3iv(r, e);
            };
        }
        if (n === t.INT_VEC4) {
            return function(e) {
                t.uniform4iv(r, e);
            };
        }
        if (n === t.BOOL) {
            return function(e) {
                t.uniform1i(r, e);
            };
        }
        if (n === t.BOOL_VEC2) {
            return function(e) {
                t.uniform2iv(r, e);
            };
        }
        if (n === t.BOOL_VEC3) {
            return function(e) {
                t.uniform3iv(r, e);
            };
        }
        if (n === t.BOOL_VEC4) {
            return function(e) {
                t.uniform4iv(r, e);
            };
        }
        if (n === t.FLOAT_MAT2) {
            return function(e) {
                t.uniformMatrix2fv(r, false, e);
            };
        }
        if (n === t.FLOAT_MAT3) {
            return function(e) {
                t.uniformMatrix3fv(r, false, e);
            };
        }
        if (n === t.FLOAT_MAT4) {
            return function(e) {
                t.uniformMatrix4fv(r, false, e);
            };
        }
        if ((n === t.SAMPLER_2D || n === t.SAMPLER_CUBE) && s) {
            var o = [];
            for (var a = 0; a < info.size; ++a) {
                o.push(textureUnit++);
            }
            return (function(e, i) {
                return function(e) {
                    t.uniform1iv(r, i);
                    e.forEach(function(t, e) {});
                };
            })(this.getBindPointForSamplerType(t, n), o);
        }
        if (n === t.SAMPLER_2D || n === t.SAMPLER_CUBE) {
            return function(e) {
                t.uniform1i(r, e);
            };
        }
        throw "unknown type: 0x" + n.toString(16);
    }
    getBindPointForSamplerType(t, e) {
        if (e === t.SAMPLER_2D) return t.TEXTURE_2D;
        if (e === t.SAMPLER_CUBE) return t.TEXTURE_CUBE_MAP;
    }
    createAttributeSetter(t, e) {
        return function(i) {
            t.bindBuffer(t.ARRAY_BUFFER, i.buffer);
            t.enableVertexAttribArray(e);
            t.vertexAttribPointer(e, i.numComponents || i.size, i.type || t.FLOAT, i.normalize || false, i.stride || 0, i.offset || 0);
        };
    }
    compile_program(t, e) {
        var i = this.gl;
        var r = i.createProgram();
        i.attachShader(r, t);
        i.attachShader(r, e);
        try {
            i.bindAttribLocation(r, 0, "aVertexPosition");
        } catch (t) {
            console.log("CGFshader: could not bind 'aVertexPosition' to location 0. Do you have this attribute in your shader?");
        }
        i.linkProgram(r);
        if (!i.getProgramParameter(r, i.LINK_STATUS)) {
            console.log(i.getProgramInfoLog(r));
            alert("Could not initialise shaders");
        }
        this.program = r;
        i.useProgram(r);
        this.uniforms = {};
        this.uniformSetters = {};
        var n = i.getProgramParameter(r, i.ACTIVE_UNIFORMS);
        for (var s = 0; s < n; ++s) {
            var o = i.getActiveUniform(r, s);
            var a = i.getUniformLocation(r, o.name);
            setProperty(this.uniforms, o.name, a);
            setProperty(this.uniformSetters, o.name, this.createUniformSetter(i, r, o, a));
        }
        this.attributes = {};
        this.attributeSetters = {};
        var c = i.getProgramParameter(r, i.ACTIVE_ATTRIBUTES);
        for (var s = 0; s < c; ++s) {
            var l = i.getActiveAttrib(r, s);
            var a = i.getAttribLocation(r, l.name);
            setProperty(this.attributes, l.name, a);
            setProperty(this.attributeSetters, l.name, this.createAttributeSetter(i, a));
        }
    }
    update() {}
    bind() {
        this.gl.useProgram(this.program);
    }
    unbind() {
        if (!this.warnedunbind) {
            console.warn(
                "CGFshader.unbind should not be used. Please review your code and remove direct shader binding/unbinding and use CGFscene.setActiveShader() instead."
            );
            this.warnedunbind = true;
        }
    }
    applyUniforms(t) {
        var e = this;
        Object.keys(t).forEach(function(i) {
            var r = e.uniformSetters[i];
            if (r) {
                r(t[i]);
            } else {
                console.log("Attempt to set value for uniform '" + i + "' with no setter function (does it exist in the shader?).");
            }
        });
    }
    getUniformsValues() {
        var t = this;
        var e = function(i, r) {
            for (var n in i) {
                var s;
                if (typeof i[n] !== "function") {
                    if (!(i[n] instanceof WebGLUniformLocation)) {
                        s = {};
                        e(i[n], s);
                    } else s = t.gl.getUniform(t.program, i[n]);
                    r[n] = s;
                }
            }
        };
        var i = {};
        e(this.uniforms, i);
        return i;
    }
    setUniformsValues(t) {
        this.bind();
        var e = this;
        var i = function(t, e) {
            for (var r in t) {
                try {
                    if (typeof e[r] != "undefined")
                        if (typeof t[r] !== "function") i(t[r], e[r]);
                        else t[r](e[r]);
                } catch (t) {
                    console.log("Problem setting uniform " + r);
                }
            }
        };
        i(this.uniformSetters, t);
    }
    importUniforms(t) {
        t.bind();
        var e = t.getUniformsValues();
        this.bind();
        this.setUniformsValues(e);
    }
    getUniformValue(t) {
        return this.gl.getUniform(this.program, this.uniforms[t]);
    }
}
class CGFtexture {
    constructor(t, e) {
        this.scene = t;
        this.texID = -1;
        this.gl = t.gl;
        this.image = new Image();
        this.image.crossOrigin = "anonymous";
        var i = this;
        this.image.onload = function() {
            console.log("Texture loaded: " + i.image.src);
            i.texID = i.gl.createTexture();
            i.gl.bindTexture(i.gl.TEXTURE_2D, i.texID);
            i.gl.texImage2D(i.gl.TEXTURE_2D, 0, i.gl.RGBA, i.gl.RGBA, i.gl.UNSIGNED_BYTE, i.image);
            i.gl.texParameteri(i.gl.TEXTURE_2D, i.gl.TEXTURE_MAG_FILTER, i.gl.LINEAR);
            if (isPowerOfTwo(i.image.width) && isPowerOfTwo(i.image.height)) {
                i.gl.texParameteri(i.gl.TEXTURE_2D, i.gl.TEXTURE_MIN_FILTER, i.gl.LINEAR);
            } else {
                i.gl.texParameteri(i.gl.TEXTURE_2D, i.gl.TEXTURE_MIN_FILTER, i.gl.LINEAR);
                i.gl.texParameteri(i.gl.TEXTURE_2D, i.gl.TEXTURE_WRAP_S, i.gl.CLAMP_TO_EDGE);
                i.gl.texParameteri(i.gl.TEXTURE_2D, i.gl.TEXTURE_WRAP_T, i.gl.CLAMP_TO_EDGE);
            }
        };
        this.image.src = e;
    }
    bind(t) {
        var e = t || 0;
        if (this.texID != -1) {
            this.gl.activeTexture(this.gl.TEXTURE0 + e);
            this.gl.bindTexture(this.gl.TEXTURE_2D, this.texID);
            if (e == 0) this.scene.activeTexture = this;
            return true;
        } else {
            if (e == 0) this.scene.activeTexture = null;
            return false;
        }
    }
    unbind(t) {
        var e = t || 0;
        this.gl.activeTexture(this.gl.TEXTURE0 + e);
        this.gl.bindTexture(this.gl.TEXTURE_2D, null);
        if (e == 0) this.scene.activeTexture = null;
    }
}
function isPowerOfTwo(t) {
    return (t & (t - 1)) == 0;
}
class CGFtextureRTT {
    constructor(t, e, i) {
        this.scene = t;
        this.texID = -1;
        this.gl = t.gl;
        const r = this.gl;
        this.targetTextureWidth = e || 256;
        this.targetTextureHeight = i || 256;
        this.texID = r.createTexture();
        r.bindTexture(r.TEXTURE_2D, this.texID);
        const n = 0;
        {
            const t = r.RGBA;
            const e = 0;
            const i = r.RGBA;
            const s = r.UNSIGNED_BYTE;
            const o = null;
            r.texImage2D(r.TEXTURE_2D, n, t, this.targetTextureWidth, this.targetTextureHeight, e, i, s, o);
            r.texParameteri(r.TEXTURE_2D, r.TEXTURE_MIN_FILTER, r.LINEAR);
            r.texParameteri(r.TEXTURE_2D, r.TEXTURE_WRAP_S, r.CLAMP_TO_EDGE);
            r.texParameteri(r.TEXTURE_2D, r.TEXTURE_WRAP_T, r.CLAMP_TO_EDGE);
        }
        this.fb = r.createFramebuffer();
        this.gl.bindFramebuffer(this.gl.FRAMEBUFFER, this.fb);
        const s = this.gl.COLOR_ATTACHMENT0;
        this.gl.framebufferTexture2D(this.gl.FRAMEBUFFER, s, this.gl.TEXTURE_2D, this.texID, n);
        const o = this.gl.createRenderbuffer();
        this.gl.bindRenderbuffer(this.gl.RENDERBUFFER, o);
        this.gl.renderbufferStorage(this.gl.RENDERBUFFER, this.gl.DEPTH_COMPONENT16, this.targetTextureWidth, this.targetTextureHeight);
        this.gl.framebufferRenderbuffer(this.gl.FRAMEBUFFER, this.gl.DEPTH_ATTACHMENT, this.gl.RENDERBUFFER, o);
        this.gl.bindFramebuffer(this.gl.FRAMEBUFFER, null);
        r.bindTexture(r.TEXTURE_2D, null);
    }
    attachToFrameBuffer() {
        this.gl.bindFramebuffer(this.gl.FRAMEBUFFER, this.fb);
    }
    detachFromFrameBuffer() {
        this.gl.bindFramebuffer(this.gl.FRAMEBUFFER, null);
    }
    bind(t) {
        var e = t || 0;
        if (this.texID != -1) {
            this.gl.activeTexture(this.gl.TEXTURE0 + e);
            this.gl.bindTexture(this.gl.TEXTURE_2D, this.texID);
            if (e == 0) this.scene.activeTexture = this;
            return true;
        } else {
            if (e == 0) this.scene.activeTexture = null;
            return false;
        }
    }
    unbind(t) {
        var e = t || 0;
        this.gl.activeTexture(this.gl.TEXTURE0 + e);
        this.gl.bindTexture(this.gl.TEXTURE_2D, null);
        if (e == 0) this.scene.activeTexture = null;
    }
}
class CGFappearance {
    constructor(t) {
        this.scene = t;
        this.ambient = vec4.fromValues(0.2, 0.2, 0.2, 1);
        this.diffuse = vec4.fromValues(0.5, 0.5, 0.5, 1);
        this.specular = vec4.fromValues(0.5, 0.5, 0.5, 1);
        this.shininess = 10;
        this.emission = vec4.fromValues(0, 0, 0, 1);
        this.texture = null;
    }
    setAmbient(t, e, i, r) {
        vec4.set(this.ambient, t, e, i, r);
    }
    setDiffuse(t, e, i, r) {
        vec4.set(this.diffuse, t, e, i, r);
    }
    setSpecular(t, e, i, r) {
        vec4.set(this.specular, t, e, i, r);
    }
    setShininess(t) {
        this.shininess = t;
    }
    setEmission(t, e, i, r) {
        vec4.set(this.emission, t, e, i, r);
    }
    setColor(t, e, i, r) {
        this.setAmbient(t, e, i, r);
        this.setDiffuse(t, e, i, r);
    }
    apply() {
        this.scene.setAmbient(this.ambient[0], this.ambient[1], this.ambient[2], this.ambient[3]);
        this.scene.setDiffuse(this.diffuse[0], this.diffuse[1], this.diffuse[2], this.diffuse[3]);
        this.scene.setSpecular(this.specular[0], this.specular[1], this.specular[2], this.specular[3]);
        this.scene.setShininess(this.shininess);
        this.scene.setEmission(this.emission[0], this.emission[1], this.emission[2], this.emission[3]);
        if (this.texture) {
            if (this.texture.bind() && this.wrapS && this.wrapT) {
                var t = this.scene.gl;
                t.texParameteri(t.TEXTURE_2D, t.TEXTURE_WRAP_S, this.wrapS);
                t.texParameteri(t.TEXTURE_2D, t.TEXTURE_WRAP_T, this.wrapT);
                this.scene.activeTexture = this.texture;
            }
        } else this.scene.activeTexture = null;
    }
    setTexture(t) {
        this.texture = t;
    }
    loadTexture(t) {
        this.texture = new CGFtexture(this.scene, t);
    }
    setTextureWrap(t, e) {
        this.wrapS = this.scene.gl[t];
        this.wrapT = this.scene.gl[e];
    }
}
class CGFobject {
    constructor(t) {
        this.scene = t;
        this.inited = false;
        this.pickingEnabled = false;
        this.primitiveType = this.scene.gl.TRIANGLES;
        this.normalVizEnabled = false;
        this.normalVizInited = false;
    }
    display() {
        this.drawElements(this.primitiveType);
        if (this.normalVizEnabled) this.drawNormalViz();
    }
    initGLBuffers() {
        var t = this.scene.gl;
        this.vertsBuffer = t.createBuffer();
        t.bindBuffer(t.ARRAY_BUFFER, this.vertsBuffer);
        t.bufferData(t.ARRAY_BUFFER, new Float32Array(this.vertices), t.STATIC_DRAW);
        if (!this.normals)
            this.normals = Array.apply(null, new Array(this.vertices.length)).map(function() {
                return 1;
            });
        this.normsBuffer = t.createBuffer();
        t.bindBuffer(t.ARRAY_BUFFER, this.normsBuffer);
        t.bufferData(t.ARRAY_BUFFER, new Float32Array(this.normals), t.STATIC_DRAW);
        this.indicesBuffer = t.createBuffer();
        t.bindBuffer(t.ELEMENT_ARRAY_BUFFER, this.indicesBuffer);
        t.bufferData(t.ELEMENT_ARRAY_BUFFER, new Uint16Array(this.indices), t.STATIC_DRAW);
        if (!this.texCoords) this.hasTexCoords = false;
        else {
            this.hasTexCoords = true;
            this.texCoordsBuffer = t.createBuffer();
            t.bindBuffer(t.ARRAY_BUFFER, this.texCoordsBuffer);
            t.bufferData(t.ARRAY_BUFFER, new Float32Array(this.texCoords), t.STATIC_DRAW);
        }
        this.indicesBuffer.numValues = this.indices.length;
        t.bindBuffer(t.ARRAY_BUFFER, null);
        t.bindBuffer(t.ELEMENT_ARRAY_BUFFER, null);
        this.inited = true;
    }
    updateTexCoordsGLBuffers() {
        var t = this.scene.gl;
        if (!this.texCoords) this.hasTexCoords = false;
        else {
            this.hasTexCoords = true;
            if (!this.texCoordsBuffer) this.texCoordsBuffer = t.createBuffer();
            t.bindBuffer(t.ARRAY_BUFFER, this.texCoordsBuffer);
            t.bufferData(t.ARRAY_BUFFER, new Float32Array(this.texCoords), t.STATIC_DRAW);
        }
    }
    initBuffers() {
        this.vertices = [-0.5, -0.5, 0, 0.5, -0.5, 0, -0.5, 0.5, 0, 0.5, 0.5, 0];
        this.indices = [0, 1, 2, 3];
        this.normals = [0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1];
        this.primitiveType = this.scene.gl.TRIANGLE_STRIP;
        this.initGLBuffers();
    }
    drawElements(t) {
        var e = this.scene.activeShader;
        var i = this.scene.gl;
        i.uniformMatrix4fv(e.uniforms.uMVMatrix, false, this.scene.activeMatrix);
        i.enableVertexAttribArray(e.attributes.aVertexPosition);
        i.bindBuffer(i.ARRAY_BUFFER, this.vertsBuffer);
        i.vertexAttribPointer(e.attributes.aVertexPosition, 3, i.FLOAT, false, 0, 0);
        if (e.uniforms.uNMatrix) this.scene.updateInverseMatrix();
        i.uniformMatrix4fv(e.uniforms.uNMatrix, false, this.scene.invMatrix);
        if (e.attributes.aVertexNormal) {
            i.enableVertexAttribArray(e.attributes.aVertexNormal);
            i.bindBuffer(i.ARRAY_BUFFER, this.normsBuffer);
            i.vertexAttribPointer(e.attributes.aVertexNormal, 3, i.FLOAT, false, 0, 0);
        }
        var r = this.scene.texturesEnabled;
        if (e.attributes.aTextureCoord)
            if (this.hasTexCoords && r && this.scene.activeTexture) {
                i.enableVertexAttribArray(e.attributes.aTextureCoord);
                i.bindBuffer(i.ARRAY_BUFFER, this.texCoordsBuffer);
                i.vertexAttribPointer(e.attributes.aTextureCoord, 2, i.FLOAT, false, 0, 0);
            } else {
                this.scene.enableTextures(false);
                i.disableVertexAttribArray(e.attributes.aTextureCoord);
            }
        i.bindBuffer(i.ELEMENT_ARRAY_BUFFER, this.indicesBuffer);
        i.drawElements(t, this.indicesBuffer.numValues, i.UNSIGNED_SHORT, 0);
        i.bindBuffer(i.ARRAY_BUFFER, null);
        i.bindBuffer(i.ELEMENT_ARRAY_BUFFER, null);
        this.scene.enableTextures(r);
    }
    initNormalVizBuffers(t = 1) {
        this.normalVerts = [];
        this.normalIndices = [];
        for (var e = 0; e < this.normals.length; e += 3) {
            this.normalVerts.push(this.vertices[e], this.vertices[e + 1], this.vertices[e + 2]);
            this.normalVerts.push(
                this.vertices[e] + this.normals[e] * t,
                this.vertices[e + 1] + this.normals[e + 1] * t,
                this.vertices[e + 2] + this.normals[e + 2] * t
            );
            this.normalIndices.push(2 * (e / 3), 2 * (e / 3) + 1);
        }
        var i = this.scene.gl;
        this.nVertsBuffer = i.createBuffer();
        i.bindBuffer(i.ARRAY_BUFFER, this.nVertsBuffer);
        i.bufferData(i.ARRAY_BUFFER, new Float32Array(this.normalVerts), i.STATIC_DRAW);
        this.nIndicesBuffer = i.createBuffer();
        i.bindBuffer(i.ELEMENT_ARRAY_BUFFER, this.nIndicesBuffer);
        i.bufferData(i.ELEMENT_ARRAY_BUFFER, new Uint16Array(this.normalIndices), i.STATIC_DRAW);
        this.nIndicesBuffer.numValues = this.normalIndices.length;
        i.bindBuffer(i.ARRAY_BUFFER, null);
        i.bindBuffer(i.ELEMENT_ARRAY_BUFFER, null);
        this.normalVizInited = true;
    }
    drawNormalViz() {
        var t = this.scene.activeShader;
        var e = this.scene.normalsShader;
        this.scene.setActiveShaderSimple(e);
        var i = this.scene.gl;
        i.uniformMatrix4fv(e.uniforms.uMVMatrix, false, this.scene.activeMatrix);
        i.enableVertexAttribArray(e.attributes.aVertexPosition);
        i.bindBuffer(i.ARRAY_BUFFER, this.nVertsBuffer);
        i.vertexAttribPointer(e.attributes.aVertexPosition, 3, i.FLOAT, false, 0, 0);
        i.bindBuffer(i.ELEMENT_ARRAY_BUFFER, this.nIndicesBuffer);
        i.drawElements(this.scene.gl.LINES, this.nIndicesBuffer.numValues, i.UNSIGNED_SHORT, 0);
        i.bindBuffer(i.ARRAY_BUFFER, null);
        i.bindBuffer(i.ELEMENT_ARRAY_BUFFER, null);
        this.scene.setActiveShaderSimple(t);
    }
    enableNormalViz() {
        if (!this.normalVizInited) this.initNormalVizBuffers();
        this.normalVizEnabled = true;
    }
    disableNormalViz() {
        this.normalVizEnabled = false;
    }
}
class CGFaxis extends CGFobject {
    constructor(t, e, i) {
        super(t);
        this.length = 5;
        this.thickness = 0.05;
        switch (arguments.length) {
            case 3:
                this.thickness = i;
            case 2:
                this.length = e;
        }
        this.HALF_PI = 3.1415926536 / 2;
        this.pyr = new CGFquadPyramid(t, this.length - this.thickness / 2, this.thickness);
    }
    display() {
        this.scene.pushMatrix();
        this.scene.activeTexture = null;
        this.scene.setShininess(100);
        this.scene.setAmbient(1, 1, 1, 1);
        this.scene.pushMatrix();
        this.scene.translate(0, 0, this.thickness / 2);
        this.scene.setDiffuse(0, 0, 1, 1);
        this.scene.setSpecular(0, 0, 1, 1);
        this.pyr.display();
        this.scene.popMatrix();
        this.scene.pushMatrix();
        this.scene.rotate(this.HALF_PI, 0, 1, 0);
        this.scene.translate(0, 0, this.thickness / 2);
        this.scene.setDiffuse(1, 0, 0, 1);
        this.scene.setSpecular(1, 0, 0, 1);
        this.pyr.display();
        this.scene.popMatrix();
        this.scene.pushMatrix();
        this.scene.rotate(-this.HALF_PI, 1, 0, 0);
        this.scene.translate(0, 0, this.thickness / 2);
        this.scene.setDiffuse(0, 1, 0, 1);
        this.scene.setSpecular(0, 1, 0, 1);
        this.pyr.display();
        this.scene.popMatrix();
        this.scene.popMatrix();
    }
}
class CGFquadPyramid extends CGFobject {
    constructor(t, e, i) {
        super(t);
        this.halfSide = i / 2;
        this.height = e;
        this.initBuffers();
    }
    initBuffers() {
        this.vertices = [
            -this.halfSide,
            -this.halfSide,
            0,
            this.halfSide,
            -this.halfSide,
            0,
            -this.halfSide,
            this.halfSide,
            0,
            this.halfSide,
            this.halfSide,
            0,
            0,
            0,
            this.height
        ];
        this.indices = [2, 1, 0, 1, 2, 3, 0, 1, 4, 1, 3, 4, 2, 0, 4, 3, 2, 4];
        this.primitiveType = this.scene.gl.TRIANGLES;
        this.initGLBuffers();
    }
}
class CGFinterface {
    constructor() {
        this.mouse = vec2.create();
        this.prevMouse = vec2.create();
        this.mouseButtons = [false, false, false];
        this.activeCamera = null;
        this.ctrlKey = false;
    }
    init(t) {
        console.log("Initializing Interface");
        this.scene = t.scene;
        var e = t.gl.canvas;
        e.tabIndex = 1;
        var i = this;
        e.oncontextmenu = function(t) {
            return false;
        };
        e.addEventListener("mousedown", function(t) {
            t.preventDefault();
            t.stopPropagation();
            i.processMouseDown(t);
            i.scene.onPick(t);
        });
        e.addEventListener("mouseup", function(t) {
            t.preventDefault();
            t.stopPropagation();
            i.processMouseUp(t);
        });
        e.addEventListener("mousemove", function(t) {
            t.preventDefault();
            t.stopPropagation();
            i.processMouseMove(t);
        });
        e.addEventListener("touchstart", function(t) {
            t.preventDefault();
            t.stopPropagation();
            i.processTouchStart(t);
        });
        e.addEventListener("touchend", function(t) {
            t.preventDefault();
            t.stopPropagation();
            i.processTouchEnd(t);
            i.scene.onPick(t);
        });
        e.addEventListener("touchmove", function(t) {
            t.preventDefault();
            t.stopPropagation();
            i.processTouchMove(t);
        });
        document.onkeypress = function(t) {
            i.processKeyboard(t);
        };
        document.onkeydown = function(t) {
            i.processKeyDown(t);
        };
        document.onkeyup = function(t) {
            i.processKeyUp(t);
        };
        return true;
    }
    update() {}
    processKeyboard(t) {
        console.log("keypress");
    }
    processKeyDown(t) {
        console.log("keydown");
    }
    processKeyUp(t) {
        console.log("keyup");
    }
    setActiveCamera(t) {
        this.activeCamera = t;
    }
    processMouseDown(t) {
        var e = t.which;
        this.mouseButtons[e - 1] = true;
        this.mouse[0] = t.pageX;
        this.mouse[1] = t.pageY;
        this.prevMouse[0] = this.mouse[0];
        this.prevMouse[1] = this.mouse[1];
        this.ctrlKey = t.ctrlKey;
    }
    processMouseUp(t) {
        var e = t.which;
        this.mouseButtons[e - 1] = false;
        this.prevMouse[0] = this.mouse[0];
        this.prevMouse[1] = this.mouse[1];
        this.mouse[0] = t.pageX;
        this.mouse[1] = t.pageY;
        this.ctrlKey = t.ctrlKey;
    }
    processMouseMove(t) {
        this.prevMouse[0] = this.mouse[0];
        this.prevMouse[1] = this.mouse[1];
        this.mouse[0] = t.pageX;
        this.mouse[1] = t.pageY;
        this.processMouse();
    }
    processMouse() {
        if (this.activeCamera) {
            var t = vec2.subtract(vec2.create(), this.mouse, this.prevMouse);
            if (this.mouseButtons[0]) {
                if (this.ctrlKey) {
                    this.activeCamera.zoom(t[1] * 0.05);
                } else {
                    this.activeCamera.orbit(CGFcameraAxisID.X, (t[1] * Math.PI) / 180);
                    this.activeCamera.orbit(CGFcameraAxisID.Y, (-t[0] * Math.PI) / 180);
                }
            } else if (this.mouseButtons[2]) {
                this.activeCamera.pan([-t[0] * 0.05, t[1] * 0.05, 0]);
            } else if (this.mouseButtons[1]) {
                this.activeCamera.zoom(t[1] * 0.05);
            }
        }
    }
    processTouchStart(t) {
        this.touches = t.targetTouches;
        this.prevTouches = this.touches;
    }
    processTouchEnd(t) {
        this.prevTouches = this.touches;
        this.touches = t.targetTouches;
    }
    processTouchMove(t) {
        this.prevTouches = this.touches;
        this.touches = t.targetTouches;
        this.processTouches();
    }
    processTouches() {
        if (this.activeCamera) {
            if (this.touches.length == 1) {
                var t = [this.prevTouches[0].pageX, this.prevTouches[0].pageY];
                var e = [this.touches[0].pageX, this.touches[0].pageY];
                var i = vec2.subtract(vec2.create(), e, t);
                this.activeCamera.orbit(CGFcameraAxisID.X, (i[1] * Math.PI) / 180);
                this.activeCamera.orbit(CGFcameraAxisID.Y, (-i[0] * Math.PI) / 180);
            } else {
                var r = [this.prevTouches[0].pageX, this.prevTouches[0].pageY];
                var n = [this.touches[0].pageX, this.touches[0].pageY];
                if (this.touches.length == 2) {
                    var s = [this.prevTouches[1].pageX, this.prevTouches[1].pageY];
                    var o = [this.touches[1].pageX, this.touches[1].pageY];
                    var a = this.distanceBetweenPoints(r, s);
                    var c = this.distanceBetweenPoints(n, o);
                    var l = c - a;
                    this.activeCamera.zoom(l * 0.05);
                } else {
                    var i = vec2.subtract(vec2.create(), n, r);
                    this.activeCamera.pan([-i[0] * 0.05, i[1] * 0.05, 0]);
                }
            }
        }
    }
    distanceBetweenPoints(t, e) {
        return Math.sqrt((t[0] - e[0]) * (t[0] - e[0]) + (t[1] - e[1]) * (t[1] - e[1]));
    }
}
class CGFscene {
    constructor() {}
    init(t) {
        console.log("Initializing Scene");
        this.gl = t.gl;
        this.pMatrix = mat4.create();
        this.invMatrix = mat4.create();
        this.activeMatrix = mat4.create();
        this.matrixStack = new Array();
        this.picksRequests = [];
        this.pickData = [];
        this.pickIds = [];
        this.pickResults = [];
        this.pickMode = false;
        this.normalsShader = new CGFshader(this.gl, "../lib/CGF/shaders/viz/normals-vertex.glsl", "../lib/CGF/shaders/viz/normals-fragment.glsl");
        this.pickShader = new CGFshader(this.gl, "../lib/CGF/shaders/picking/vertex.glsl", "../lib/CGF/shaders/picking/fragment.glsl");
        this.defaultShader = new CGFshader(
            this.gl,
            "../lib/CGF/shaders/Gouraud/textured/multiple_light-vertex.glsl",
            "../lib/CGF/shaders/Gouraud/textured/fragment.glsl"
        );
        this.shader = {
            bind: function() {
                console.error(
                    "direct shader bind deprecated, use CGFscene.setActiveShader() instead, and only when you need to change shader. (" +
                        arguments.callee.caller.name +
                        ")"
                );
            },
            unbind: function() {
                console.error("direct shader unbind deprecated, please remove. (" + arguments.callee.caller.name + ")");
            }
        };
        this.activeShader = this.defaultShader;
        this.activeShader.bind();
        this.gl.activeTexture(this.gl.TEXTURE0);
        this.gl.uniform1i(this.activeShader.uniforms.uSampler, 0);
        this.enableTextures(false);
        this.activeTexture = null;
        this.lights = new Array();
        var e = 0;
        for (var i in this.activeShader.uniforms.uLight) {
            this.lights[e] = new CGFlight(this, e);
            this.lights[e].disable();
            this.lights[e].update();
            e++;
        }
        this.gl.enable(this.gl.DEPTH_TEST);
        this.gl.depthFunc(this.gl.LEQUAL);
        this.setGlobalAmbientLight(0.1, 0.1, 0.1, 1);
        this.lastUpdate = 0;
        this.updatePeriod = 0;
        return true;
    }
    enableTextures(t) {
        this.activeShader.bind();
        this.texturesEnabled = t;
        this.gl.uniform1i(this.activeShader.uniforms.uUseTexture, t);
    }
    loadIdentity() {
        mat4.identity(this.activeMatrix);
    }
    pushMatrix() {
        this.matrixStack.push(this.activeMatrix);
        this.activeMatrix = mat4.clone(this.activeMatrix);
    }
    popMatrix() {
        this.activeMatrix = this.matrixStack.pop();
    }
    multMatrix(t) {
        mat4.multiply(this.activeMatrix, this.activeMatrix, t);
    }
    getMatrix() {
        return mat4.clone(this.activeMatrix);
    }
    setMatrix(t) {
        this.activeMatrix = mat4.clone(t);
    }
    translate(t, e, i) {
        mat4.translate(this.activeMatrix, this.activeMatrix, [t, e, i]);
    }
    rotate(t, e, i, r) {
        mat4.rotate(this.activeMatrix, this.activeMatrix, t, [e, i, r]);
    }
    scale(t, e, i) {
        mat4.scale(this.activeMatrix, this.activeMatrix, [t, e, i]);
    }
    setEmission(t, e, i, r) {
        this.activeShader.setUniformsValues({ uFrontMaterial: { emission: [t, e, i, r] } });
    }
    setAmbient(t, e, i, r) {
        this.activeShader.setUniformsValues({ uFrontMaterial: { ambient: [t, e, i, r] } });
    }
    setDiffuse(t, e, i, r) {
        this.activeShader.setUniformsValues({ uFrontMaterial: { diffuse: [t, e, i, r] } });
    }
    setSpecular(t, e, i, r) {
        this.activeShader.setUniformsValues({ uFrontMaterial: { specular: [t, e, i, r] } });
    }
    setShininess(t) {
        this.activeShader.setUniformsValues({ uFrontMaterial: { shininess: t } });
    }
    getProjectionMatrix() {
        return this.camera.getProjectionMatrix(this.gl.canvas.width, this.gl.canvas.height);
    }
    updateProjectionMatrix() {
        this.pMatrix = this.getProjectionMatrix();
        this.activeShader.setUniformsValues({ uPMatrix: this.pMatrix });
    }
    applyViewMatrix() {
        mat4.mul(this.activeMatrix, this.activeMatrix, this.camera.getViewMatrix());
    }
    update(t) {}
    setUpdatePeriod(t) {
        this.updatePeriod = t;
    }
    checkUpdate() {
        if (this.updatePeriod > 0) {
            var t = Date.now();
            if (t - this.lastUpdate >= this.updatePeriod) {
                this.update(t);
                this.lastUpdate = t;
            }
        }
    }
    display() {
        this.gl.viewport(0, 0, this.gl.canvas.width, this.gl.canvas.height);
        this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);
        this.gl.clearColor(0, 0, 0, 1);
    }
    displayWithPick() {
        var t = this.getNextPickRequest();
        if (t != null) {
            var e = this.activeShader;
            var i = t[0][0];
            var r = t[0][1];
            this.setActiveShader(this.pickShader);
            var n = new Uint8Array(4);
            this.pickMode = true;
            var s = this.texturesEnabled;
            this.texturesEnabled = false;
            this.display();
            this.texturesEnabled = s;
            this.pickMode = false;
            this.gl.readPixels(i, r, 1, 1, this.gl.RGBA, this.gl.UNSIGNED_BYTE, n);
            if (n != null && n != undefined) {
                this.pickResults.splice(0, this.pickResults.length);
                var o = this.getPickData(n);
                if (o != null) {
                    this.pickResults.push([o[0], o[1]]);
                } else {
                    this.pickResults.push([undefined, undefined]);
                }
            }
            this.setActiveShader(e);
        }
        this.display();
    }
    setGlobalAmbientLight(t, e, i, r) {
        this.activeShader.bind();
        this.gl.uniform4f(this.activeShader.uniforms.uGlobalAmbient, t, e, i, r);
    }
    onPick(t) {
        if (this.pickEnabled == false) return;
        var e = t.clientX,
            i = t.clientY;
        var r = t.target.getBoundingClientRect();
        if (r.left <= e && e < r.right && r.top <= i && i < r.bottom) {
            var n = e - r.left;
            var s = r.bottom - i;
            this.picksRequests.push([n, s]);
        }
    }
    getNextPickRequest() {
        if (this.picksRequests.length == 0) return null;
        return this.picksRequests.splice(0, 1);
    }
    registerForPick(t, e) {
        if (this.pickMode) {
            var i = this.intToRGB(t);
            this.pickData[t] = [e, t, i];
            this.gl.uniform4fv(this.pickShader.uniforms.uPickColor, i);
        }
    }
    clearPickRegistration() {
        if (this.pickMode) this.gl.uniform4fv(this.pickShader.uniforms.uPickColor, [0, 0, 0, 0]);
    }
    intToRGB(t) {
        var e = t >> 16;
        var i = t % 65536 >> 8;
        var r = t % 256;
        return [e / 255, i / 255, r / 255, 1];
    }
    getPickData(t) {
        var e = 65536 * t[0] + 256 * t[1] + t[2];
        return this.pickData[e];
    }
    setPickEnabled(t) {
        this.pickEnabled = t;
    }
    setActiveShader(t) {
        if (this.pickMode == false) {
            t.importUniforms(this.activeShader);
            this.activeShader = t;
            this.activeShader.bind();
        }
        return;
    }
    setActiveShaderSimple(t) {
        if (this.pickMode == false) {
            var e = this.activeShader.getUniformValue("uPMatrix");
            this.activeShader = t;
            this.activeShader.bind();
            t.setUniformsValues({ uPMatrix: e });
        }
        return;
    }
    updateInverseMatrix() {
        mat4.invert(this.invMatrix, this.activeMatrix);
        mat4.transpose(this.invMatrix, this.invMatrix);
        return;
    }
}
var CGFcameraAxis = Object.freeze({ X: vec3.fromValues(1, 0, 0), Y: vec3.fromValues(0, 1, 0), Z: vec3.fromValues(0, 0, 1) });
var CGFcameraAxisID = Object.freeze({ X: 0, Y: 1, Z: 2 });
class CGFcamera {
    constructor(t, e, i, r, n) {
        this.fov = t;
        this.near = e;
        this.far = i;
        this.position = vec4.fromValues(r[0], r[1], r[2], 0);
        this.target = vec4.fromValues(n[0], n[1], n[2], 0);
        this.direction = this.calculateDirection();
        this._up = vec3.fromValues(0, 1, 0);
        this._viewMatrix = mat4.create();
        this._projectionMatrix = mat4.create();
    }
    getViewMatrix() {
        mat4.lookAt(this._viewMatrix, this.position, this.target, this._up);
        return this._viewMatrix;
    }
    getProjectionMatrix(t, e) {
        var i = t / e;
        mat4.perspective(this._projectionMatrix, this.fov, i, this.near, this.far);
        return this._projectionMatrix;
    }
    calculateDirection() {
        return vec4.normalize(vec4.create(), vec4.subtract(vec4.create(), this.target, this.position));
    }
    setPosition(t) {
        vec3.copy(this.position, t);
        this.direction = this.calculateDirection();
    }
    setTarget(t) {
        vec3.copy(this.target, t);
        this.direction = this.calculateDirection();
    }
    translate(t) {
        var e = vec4.scale(vec4.create(), this.direction, -t[2]);
        var i = vec4.fromValues(0, t[1], 0, 0);
        var r = vec3.create();
        vec3.scale(r, vec3.cross(r, vec3.fromValues(0, 1, 0), this.direction), t[0]);
        var n = vec4.fromValues(r[0], r[1], r[2], 0);
        var s = vec4.create();
        s = vec4.add(s, e, vec4.add(s, i, n));
        vec4.add(this.position, this.position, s);
        vec4.add(this.target, this.position, this.direction);
    }
    rotate(t, e) {
        vec4.transformMat4(this.direction, this.direction, mat4.rotate(mat4.create(), mat4.create(), e, t));
        vec4.add(this.target, this.position, this.direction);
    }
    orbit(t, e) {
        var i = vec4.sub(vec4.create(), this.position, this.target);
        i[3] = 0;
        var r;
        if (t == CGFcameraAxisID.X) {
            var n = vec3.create();
            vec3.normalize(n, vec3.cross(n, i, this._up));
            var s = mat4.rotate(mat4.create(), mat4.create(), e, n);
            r = vec4.transformMat4(vec4.create(), i, s);
            vec3.normalize(this._up, vec3.cross(this._up, n, r));
        } else r = vec4.transformMat4(vec4.create(), i, mat4.rotate(mat4.create(), mat4.create(), e, this._up));
        vec4.add(this.position, this.target, r);
        this.direction = this.calculateDirection();
    }
    pan(t) {
        var e = 0.05 * vec3.distance(this.target, this.position);
        var i = vec3.cross(vec3.create(), this.direction, this._up);
        var r = vec4.scale(vec4.create(), vec3.normalize(i, i), t[0] * e);
        r[3] = 0;
        var n = vec4.scale(vec4.create(), this._up, t[1] * e);
        n[3] = 0;
        vec4.add(this.position, this.position, r);
        vec4.add(this.target, this.target, r);
        vec4.add(this.position, this.position, n);
        vec4.add(this.target, this.target, n);
    }
    zoom(t) {
        if (vec4.distance(this.position, this.target) > t) vec4.add(this.position, this.position, vec4.scale(vec4.create(), this.direction, t));
        else console.warn("CGFcamera: zoom exceeds target position, ignoring request.");
    }
}
class CGFinterfaceCamera extends CGFcamera {
    constructor(t, e, i) {
        super(t, e, i, [10, 10, 10], [0, 0, 0]);
        this.translation = [0, 0, 0];
        this.rotation = [0.52, 0.79, 0];
        this.distance = 50;
        this._positionMatrix = mat4.create();
        this._invPositionMatrix = mat4.create();
    }
    getViewMatrix() {
        vec4.set(this.position, 0, 0, this.distance, 1);
        vec4.set(this.target, 0, 0, 0, 1);
        vec3.set(this._up, 0, 1, 0);
        vec4.set(this.direction, 0, 0, -1, 0);
        mat4.lookAt(this._viewMatrix, this.position, this.target, this._up);
        mat4.identity(this._positionMatrix);
        mat4.rotateZ(this._positionMatrix, this._positionMatrix, this.rotation[2]);
        mat4.rotateX(this._positionMatrix, this._positionMatrix, this.rotation[0]);
        mat4.rotateY(this._positionMatrix, this._positionMatrix, -this.rotation[1]);
        mat4.translate(this._positionMatrix, this._positionMatrix, this.translation);
        mat4.invert(this._invPositionMatrix, this._positionMatrix);
        vec4.transformMat4(this.position, this.position, this._invPositionMatrix);
        vec4.transformMat4(this.target, this.target, this._invPositionMatrix);
        vec4.transformMat4(this.direction, this.direction, this._invPositionMatrix);
        vec3.transformMat4(this._up, this._up, this._invPositionMatrix);
        mat4.multiply(this._viewMatrix, this._viewMatrix, this._positionMatrix);
        return this._viewMatrix;
    }
    setDistance(t) {
        this.distance = t;
        this.clampDistance();
    }
    clampDistance() {
        if (this.distance < this.near) this.distance = this.near;
        else if (this.distance > this.far) this.distance = this.far;
    }
    roll(t) {
        this.rotate(CGFcameraAxis.Z, t);
    }
    orbit(t, e) {
        this.rotation[t] += e;
    }
    rotate(t, e) {
        this.rotation[t] += e;
    }
    zoom(t) {
        this.distance -= t;
        this.clampDistance();
    }
    translate(t) {
        vec4.add(this.translation, this.translation, t);
    }
    pan(t) {
        t[3] = 0;
        vec4.transformMat4(t, t, this._invPositionMatrix);
        vec4.sub(this.translation, this.translation, t);
    }
}
class CGFcameraOrtho {
    constructor(t, e, i, r, n, s, o, a, c) {
        this.left = t;
        this.right = e;
        this.bottom = i;
        this.top = r;
        this.near = n;
        this.far = s;
        this.position = vec4.fromValues(o[0], o[1], o[2], 0);
        this.target = vec4.fromValues(a[0], a[1], a[2], 0);
        this.direction = this.calculateDirection();
        this._up = c;
        this._viewMatrix = mat4.create();
        this._projectionMatrix = mat4.create();
    }
    getViewMatrix() {
        mat4.lookAt(this._viewMatrix, this.position, this.target, this._up);
        return this._viewMatrix;
    }
    getProjectionMatrix(t, e) {
        var i = t / e;
        mat4.ortho(this._projectionMatrix, this.left, this.right, this.bottom, this.top, this.near, this.far);
        return this._projectionMatrix;
    }
    calculateDirection() {
        return vec4.normalize(vec4.create(), vec4.subtract(vec4.create(), this.target, this.position));
    }
    setPosition(t) {
        vec3.copy(this.position, t);
        this.direction = this.calculateDirection();
    }
    setTarget(t) {
        vec3.copy(this.target, t);
        this.direction = this.calculateDirection();
    }
    translate(t) {
        var e = vec4.scale(vec4.create(), this.direction, -t[2]);
        var i = vec4.fromValues(0, t[1], 0, 0);
        var r = vec3.create();
        vec3.scale(r, vec3.cross(r, vec3.fromValues(0, 1, 0), this.direction), t[0]);
        var n = vec4.fromValues(r[0], r[1], r[2], 0);
        var s = vec4.create();
        s = vec4.add(s, e, vec4.add(s, i, n));
        vec4.add(this.position, this.position, s);
        vec4.add(this.target, this.position, this.direction);
    }
    rotate(t, e) {
        vec4.transformMat4(this.direction, this.direction, mat4.rotate(mat4.create(), mat4.create(), e, t));
        vec4.add(this.target, this.position, this.direction);
    }
    orbit(t, e) {
        var i = vec4.sub(vec4.create(), this.position, this.target);
        i[3] = 0;
        var r;
        if (t == CGFcameraAxisID.X) {
            var n = vec3.create();
            vec3.normalize(n, vec3.cross(n, i, this._up));
            var s = mat4.rotate(mat4.create(), mat4.create(), e, n);
            r = vec4.transformMat4(vec4.create(), i, s);
            vec3.normalize(this._up, vec3.cross(this._up, n, r));
        } else r = vec4.transformMat4(vec4.create(), i, mat4.rotate(mat4.create(), mat4.create(), e, this._up));
        vec4.add(this.position, this.target, r);
        this.direction = this.calculateDirection();
    }
    pan(t) {
        var e = 0.05 * vec3.distance(this.target, this.position);
        var i = vec3.cross(vec3.create(), this.direction, this._up);
        var r = vec4.scale(vec4.create(), vec3.normalize(i, i), t[0] * e);
        r[3] = 0;
        var n = vec4.scale(vec4.create(), this._up, t[1] * e);
        n[3] = 0;
        vec4.add(this.position, this.position, r);
        vec4.add(this.target, this.target, r);
        vec4.add(this.position, this.position, n);
        vec4.add(this.target, this.target, n);
    }
    zoom(t) {
        if (vec4.distance(this.position, this.target) > t) vec4.add(this.position, this.position, vec4.scale(vec4.create(), this.direction, t));
        else console.warn("CGFcameraOrtho: zoom exceeds target position, ignoring request.");
    }
    setUp(t) {
        this._up = t;
    }
}
class CGFlight extends CGFobject {
    constructor(t, e) {
        super(t);
        this.scene = t;
        this.id = e;
        console.log("Created Light " + e);
        this.setPosition(0, 0, 0, 1);
        this.setAmbient(0.1, 0.1, 0.1, 1);
        this.setDiffuse(0.5, 0.5, 0.5, 1);
        this.setSpecular(0.5, 0.5, 0.5, 1);
        this.setSpotDirection(0, -1, 0);
        this.setSpotExponent(10);
        this.setSpotCutOff(180);
        this.setConstantAttenuation(1);
        this.setLinearAttenuation(0);
        this.setQuadraticAttenuation(0);
        this.visible = false;
        this.initBuffers();
    }
    initBuffers() {
        this.vertices = [-0.5, 0, 0, 0, 0.5, 0, 0.5, 0, 0, 0, -0.5, 0, 0, 0, 0.5, 0, 0, -0.5];
        this.indices = [1, 4, 0, 1, 2, 4, 1, 5, 2, 1, 0, 5, 3, 0, 4, 3, 4, 2, 3, 2, 5, 3, 5, 0];
        this.normals = [1, 0, 0, 0, -1, 0, -1, 0, 0, 0, 1, 0, 0, 0, -1, 0, 0, 1];
        this.primitiveType = this.scene.gl.TRIANGLES;
        this.initGLBuffers();
    }
    enable() {
        this.enabled = true;
    }
    disable() {
        this.enabled = false;
    }
    setPosition(t, e, i, r) {
        this.position = [t, e, i, r];
    }
    setAmbient(t, e, i, r) {
        this.ambient = [t, e, i, r];
    }
    setDiffuse(t, e, i, r) {
        this.diffuse = [t, e, i, r];
    }
    setSpecular(t, e, i, r) {
        this.specular = [t, e, i, r];
    }
    setSpotDirection(t, e, i) {
        this.spot_direction = [t, e, i, 1];
    }
    setSpotExponent(t) {
        this.spot_exponent = t;
    }
    setSpotCutOff(t) {
        this.spot_cutoff = t;
    }
    setConstantAttenuation(t) {
        this.constant_attenuation = t;
    }
    setLinearAttenuation(t) {
        this.linear_attenuation = t;
    }
    setQuadraticAttenuation(t) {
        this.quadratic_attenuation = t;
    }
    update() {
        this.tPosition = [0, 0, 0, 0];
        this.tDirection = [0, 0, 0, 0];
        this.scene.updateInverseMatrix();
        vec4.transformMat4(this.tDirection, this.spot_direction, this.scene.invMatrix);
        vec4.transformMat4(this.tPosition, this.position, this.scene.activeMatrix);
        this.updateShader();
        if (this.visible) {
            this.scene.setDiffuse(0.5, 0.5, 0.5, 1);
            this.scene.pushMatrix();
            this.scene.translate(this.position[0], this.position[1], this.position[2]);
            this.scene.scale(0.3, 0.3, 0.3);
            this.display();
            this.scene.popMatrix();
        }
    }
    updateShader() {
        var t = this.scene.gl;
        if (!this.scene.pickMode)
            try {
                var e = this.scene.activeShader.uniforms.uLight[this.id];
                t.uniform1i(e.enabled, this.enabled);
                t.uniform4fv(e.position, this.tPosition);
                t.uniform4fv(e.ambient, this.ambient);
                t.uniform4fv(e.diffuse, this.diffuse);
                t.uniform4fv(e.specular, this.specular);
                t.uniform3fv(e.spot_direction, [this.tDirection[0], this.tDirection[1], this.tDirection[2]]);
                t.uniform1f(e.spot_exponent, this.spot_exponent);
                t.uniform1f(e.spot_cutoff, this.spot_cutoff);
                t.uniform1f(e.constant_attenuation, this.constant_attenuation);
                t.uniform1f(e.linear_attenuation, this.linear_attenuation);
                t.uniform1f(e.quadratic_attenuation, this.quadratic_attenuation);
            } catch (t) {
                console.log("CGFlight.updateShader: Problem updating light " + this.id);
            }
    }
    setVisible(t) {
        this.visible = t;
    }
}
class CGFapplication {
    constructor(t) {
        this.element = t;
        this.initialized = false;
        this.gl = null;
    }
    init() {
        if (this.initialized) {
            return true;
        }
        var t = document.createElement("canvas");
        this.gl = t.getContext("webgl2", { antialias: true });
        if (!this.gl) {
            Detector.addGetWebGLMessage({ parent: this.element });
            return false;
        }
        this.initialized = true;
        this.element.appendChild(this.gl.canvas);
        this.initScene();
        this.initInterface();
        window.addEventListener("resize", this.resizeCanvas(this.gl));
        this.resizeCanvas(this.gl)();
        return true;
    }
    resizeCanvas(t) {
        return function() {
            console.log("resize");
            if (!t) return;
            var e = window.innerWidth;
            var i = window.innerHeight;
            console.log("clientWidth: " + e + ", clientHeight: " + i);
            if (t.canvas.width != e || t.canvas.height != i) {
                console.log("width: " + t.canvas.width + ", height: " + t.canvas.height);
                t.canvas.width = e;
                t.canvas.height = i;
            }
        };
    }
    setScene(t) {
        this.scene = t;
        if (this.initialized) {
            this.scene.init(this);
        }
    }
    setInterface(t) {
        this.interface = t;
        if (this.initialized) {
            this.interface.init(this);
        }
    }
    initScene() {
        if (this.scene && this.initialized) {
            return this.scene.init(this);
        }
        return false;
    }
    initInterface() {
        if (this.interface && this.initialized) {
            return this.interface.init(this);
        }
        return false;
    }
    run() {
        var t = this;
        function e() {
            requestAnimationFrame(e, t.gl.canvas);
            if (t.interface) {
                t.interface.update();
            }
            if (t.scene) {
                t.scene.checkUpdate();
                t.scene.displayWithPick();
            }
        }
        e();
    }
}
class CGFplane extends CGFobject {
    constructor(t, e) {
        super(t);
        this.numDivisions = e ? e + 1 : 2;
        this.initBuffers();
        this.wireframe = false;
    }
    initBuffers() {
        this.vertices = [];
        this.indices = [];
        this.normals = [];
        for (var t = 0; t < this.numDivisions; ++t) {
            for (var e = 0; e < this.numDivisions; ++e) {
                this.vertices.push(t, 0, e);
                this.normals.push(0, 1, 0);
            }
        }
        var i = 0;
        for (var t = 0; t < this.numDivisions - 1; ++t) {
            this.indices.push(i);
            var e;
            for (e = 0; e < this.numDivisions - 1; ++e) {
                this.indices.push(i + (e + 1));
                this.indices.push(i + this.numDivisions + e);
            }
            i += this.numDivisions;
            this.indices.push(i + e);
        }
        this.primitiveType = this.scene.gl.TRIANGLE_STRIP;
        this.initGLBuffers();
    }
    display() {
        this.scene.pushMatrix();
        this.scene.translate(-0.5, 0, -0.5);
        var t = 1 / (this.numDivisions - 1);
        this.scene.scale(t, 1, t);
        this.drawElements(this.primitiveType);
        this.scene.popMatrix();
    }
}
function indexOf(t) {
    if (typeof Array.prototype.indexOf === "function") {
        indexOf = Array.prototype.indexOf;
    } else {
        indexOf = function(t) {
            var e = -1,
                i = -1;
            for (e = 0; e < this.length; e++) {
                if (this[e] === t) {
                    i = e;
                    break;
                }
            }
            return i;
        };
    }
    return indexOf.call(this, t);
}
class CGFXMLreader {
    constructor() {
        this.xmlhttp = null;
        this.xmlDoc = null;
        this.xmlfile = null;
        this.parserObj = null;
        this.errorMessage = null;
    }
    getErrorMessage() {
        return this.errorMessage;
    }
    open(t, e) {
        this.xmlfile = t;
        if (typeof e.onXMLReady !== "function") console.error("CGFXMLReader.open: onXMLReady handler not defined.");
        if (typeof e.onXMLError !== "function") console.error("CGFXMLReader.open: onXMLError handler not defined.");
        this.parserObj = e;
        if (window.XMLHttpRequest) {
            this.xmlhttp = new XMLHttpRequest();
        } else if (window.ActiveXObject) {
            this.xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
        }
        if (this.xmlhttp != null) {
            var i = this;
            var r = this.xmlhttp;
            this.xmlhttp.onreadystatechange = function(n) {
                if (r.readyState == 4) {
                    if (r.status == 200) {
                        var s = new window.DOMParser();
                        i.xmlDoc = s.parseFromString(this.response, "text/xml");
                        if (i.xmlDoc.getElementsByTagNameNS("*", "parsererror") && i.xmlDoc.getElementsByTagNameNS("*", "parsererror").length > 0) {
                            if (typeof e.onXMLError === "function") {
                                e.onXMLError("File " + t + " has errors.");
                            }
                        }
                        if (typeof e.onXMLReady === "function") e.onXMLReady();
                        if (i.getErrorMessage() != null) {
                            if (typeof e.onXMLError === "function") e.onXMLError(i.getErrorMessage());
                            return;
                        }
                    } else {
                        if (typeof e.onXMLError === "function") e.onXMLError(r.status + ": " + i.xmlfile + ", " + r.statusText);
                    }
                }
            };
            this.xmlhttp.onerror = function(t) {
                if (typeof e.onXMLError === "function") e.onXMLError("[CGFXMLreader] Error", r.statusText);
            };
            this.xmlhttp.open("GET", t, true);
            this.xmlhttp.setRequestHeader("Content-Type", "text/xml");
            try {
                this.xmlhttp.send(null);
            } catch (t) {
                if (typeof e.onXMLError === "function") e.onXMLError("[CGFXMLreader] Error", r.statusText);
            }
        } else {
            if (typeof e.onXMLError === "function") e.onXMLError("The XMLHttpRequest is not supported");
            return;
        }
    }
    getRGBA(t, e, i) {
        if (i == undefined) i = true;
        if (t == null) {
            console.error("element is null.");
            return null;
        }
        if (e == null) {
            console.error("color (rgba) attribute name is null.");
            return null;
        }
        var r = t.getAttribute(e);
        if (r == null) {
            if (i) {
                console.error("color (rgba) value is null for attribute " + e + ".");
            }
            return null;
        }
        var n = r.split(" ");
        if (n.length != 4) {
            console.error("invalid " + n.length + " number of color components for color (rgba) in attribute " + e + ".");
            return null;
        }
        var s = new Array();
        for (var o = 0; o < 4; o++) {
            s.push(parseFloat(n[o]));
        }
        return s;
    }
    getVector3(t, e, i) {
        if (i == undefined) i = true;
        if (t == null) {
            console.error("element is null.");
            return null;
        }
        if (e == null) {
            console.error("vector3 attribute name is null.");
            return null;
        }
        var r = t.getAttribute(e);
        if (r == null) {
            if (i) {
                console.error("vector3 value is null for attribute " + e + ".");
            }
            return null;
        }
        var n = r.split(" ");
        if (n.length != 3) {
            console.error("invalid " + n.length + " number of components for a vector3, in attribute " + e + ".");
            return null;
        }
        var s = new Array();
        for (var o = 0; o < 3; o++) {
            s.push(parseFloat(n[o]));
        }
        return s;
    }
    getVector2(t, e, i) {
        if (i == undefined) i = true;
        if (t == null) {
            console.error("element is null.");
            return null;
        }
        if (e == null) {
            console.error("vector3 attribute name is null.");
            return null;
        }
        var r = t.getAttribute(e);
        if (r == null) {
            if (i) {
                console.error("vector2 value is null for attribute " + e + ".");
            }
            return null;
        }
        var n = r.split(" ");
        if (n.length != 2) {
            console.error("invalid " + n.length + " number of components for a vector2, in attribute " + e + ".");
            return null;
        }
        var s = new Array();
        for (var o = 0; o < 2; o++) {
            s.push(parseFloat(n[o]));
        }
        return s;
    }
    getItem(t, e, i, r) {
        if (r == undefined) r = true;
        if (t == null) {
            console.error("element is null.");
            return null;
        }
        if (e == null) {
            console.error("item attribute name is null.");
            return null;
        }
        var n = t.getAttribute(e);
        if (n == null) {
            if (r) {
                console.error("item value is null for attribute " + e + ".");
            }
            return null;
        }
        n = n.toLowerCase();
        var s = indexOf.call(i, n);
        if (s < 0) {
            console.error("value '" + n + "' is not a choice in [" + i.toString() + "]");
            return null;
        }
        return n;
    }
    getString(t, e, i) {
        if (i == undefined) i = true;
        if (t == null) {
            console.error("element is null.");
            return null;
        }
        if (e == null) {
            console.error("string attribute name is null.");
            return null;
        }
        var r = t.getAttribute(e);
        if (r == null && i) {
            console.error("string value is null for attribute " + e + ".");
            return null;
        }
        return r;
    }
    hasAttribute(t, e) {
        if (t == null) {
            console.error("element is null.");
            return null;
        }
        if (e == null) {
            console.error("string attribute name is null.");
            return null;
        }
        var i = t.getAttribute(e);
        return i != null;
    }
    getBoolean(t, e, i) {
        if (i == undefined) i = true;
        var r = this.getItem(t, e, ["true", "t", "1", "false", "f", "0"], i);
        if (r == null) {
            return null;
        }
        if (r == "1" || r == "true" || r == "t") return true;
        return false;
    }
    getInteger(t, e, i) {
        if (i == undefined) i = true;
        var r = this.getString(t, e, i);
        if (r == null) {
            return null;
        }
        return parseInt(r);
    }
    getFloat(t, e, i) {
        if (i == undefined) i = true;
        var r = this.getString(t, e, i);
        if (r == null) {
            return null;
        }
        return parseFloat(r);
    }
}
CGFnurbsUtils = {
    findSpan: function(t, e, i) {
        var r = i.length - t - 1;
        if (e >= i[r]) {
            return r - 1;
        }
        if (e <= i[t]) {
            return t;
        }
        var n = t;
        var s = r;
        var o = Math.floor((n + s) / 2);
        while (e < i[o] || e >= i[o + 1]) {
            if (e < i[o]) {
                s = o;
            } else {
                n = o;
            }
            o = Math.floor((n + s) / 2);
        }
        return o;
    },
    calcBasisFunctions: function(t, e, i, r) {
        var n = [];
        var s = [];
        var o = [];
        n[0] = 1;
        for (var a = 1; a <= i; ++a) {
            s[a] = e - r[t + 1 - a];
            o[a] = r[t + a] - e;
            var c = 0;
            for (var l = 0; l < a; ++l) {
                var u = o[l + 1];
                var h = s[a - l];
                var d = n[l] / (u + h);
                n[l] = c + u * d;
                c = h * d;
            }
            n[a] = c;
        }
        return n;
    },
    calcBSplinePoint: function(t, e, i, r) {
        var n = this.findSpan(t, r, e);
        var s = this.calcBasisFunctions(n, r, t, e);
        var o = new vec4.fromValues(0, 0, 0, 0);
        for (var a = 0; a <= t; ++a) {
            var c = i[n - t + a];
            var l = s[a];
            var u = c[3] * l;
            o[0] += c[0] * u;
            o[1] += c[1] * u;
            o[2] += c[2] * u;
            o[3] += c[3] * l;
        }
        return o;
    },
    calcBasisFunctionDerivatives: function(t, e, i, r, n) {
        var s = [];
        for (var o = 0; o <= i; ++o) s[o] = 0;
        var a = [];
        for (var o = 0; o <= r; ++o) a[o] = s.slice(0);
        var c = [];
        for (var o = 0; o <= i; ++o) c[o] = s.slice(0);
        c[0][0] = 1;
        var l = s.slice(0);
        var u = s.slice(0);
        for (var h = 1; h <= i; ++h) {
            l[h] = e - n[t + 1 - h];
            u[h] = n[t + h] - e;
            var d = 0;
            for (var f = 0; f < h; ++f) {
                var p = u[f + 1];
                var v = l[h - f];
                c[h][f] = p + v;
                var m = c[f][h - 1] / c[h][f];
                c[f][h] = d + p * m;
                d = v * m;
            }
            c[h][h] = d;
        }
        for (var h = 0; h <= i; ++h) {
            a[0][h] = c[h][i];
        }
        for (var f = 0; f <= i; ++f) {
            var _ = 0;
            var g = 1;
            var b = [];
            for (var o = 0; o <= i; ++o) {
                b[o] = s.slice(0);
            }
            b[0][0] = 1;
            for (var x = 1; x <= r; ++x) {
                var y = 0;
                var E = f - x;
                var w = i - x;
                if (f >= x) {
                    b[g][0] = b[_][0] / c[w + 1][E];
                    y = b[g][0] * c[E][w];
                }
                var A = E >= -1 ? 1 : -E;
                var T = f - 1 <= w ? x - 1 : i - f;
                for (var h = A; h <= T; ++h) {
                    b[g][h] = (b[_][h] - b[_][h - 1]) / c[w + 1][E + h];
                    y += b[g][h] * c[E + h][w];
                }
                if (f <= w) {
                    b[g][x] = -b[_][x - 1] / c[w + 1][f];
                    y += b[g][x] * c[f][w];
                }
                a[x][f] = y;
                var h = _;
                _ = g;
                g = h;
            }
        }
        var f = i;
        for (var x = 1; x <= r; ++x) {
            for (var h = 0; h <= i; ++h) {
                a[x][h] *= f;
            }
            f *= i - x;
        }
        return a;
    },
    calcBSplineDerivatives: function(t, e, i, r, n) {
        var s = n < t ? n : t;
        var o = [];
        var a = this.findSpan(t, r, e);
        var c = this.calcBasisFunctionDerivatives(a, r, t, s, e);
        var l = [];
        for (var u = 0; u < i.length; ++u) {
            var h = i[u].clone();
            var d = h[3];
            h[0] *= d;
            h[1] *= d;
            h[2] *= d;
            l[u] = h;
        }
        for (var f = 0; f <= s; ++f) {
            var h = l[a - t].clone().multiplyScalar(c[f][0]);
            for (var p = 1; p <= t; ++p) {
                h.add(l[a - t + p].clone().multiplyScalar(c[f][p]));
            }
            o[f] = h;
        }
        for (var f = s + 1; f <= n + 1; ++f) {
            o[f] = vec4.fromValues(0, 0, 0, 0);
        }
        return o;
    },
    calcKoverI: function(t, e) {
        var i = 1;
        for (var r = 2; r <= t; ++r) {
            i *= r;
        }
        var n = 1;
        for (var r = 2; r <= e; ++r) {
            n *= r;
        }
        for (var r = 2; r <= t - e; ++r) {
            n *= r;
        }
        return i / n;
    },
    calcRationalCurveDerivatives: function(t) {
        var e = t.length;
        var i = [];
        var r = [];
        for (var n = 0; n < e; ++n) {
            var s = t[n];
            i[n] = vec3.fromValues(s[0], s[1], s[2]);
            r[n] = s[3];
        }
        var o = [];
        for (var a = 0; a < e; ++a) {
            var c = i[a].clone();
            for (var n = 1; n <= a; ++n) {
                c.sub(o[a - n].clone().multiplyScalar(this.calcKoverI(a, n) * r[n]));
            }
            o[a] = c.divideScalar(r[0]);
        }
        return o;
    },
    calcNURBSDerivatives: function(t, e, i, r, n) {
        var s = this.calcBSplineDerivatives(t, e, i, r, n);
        return this.calcRationalCurveDerivatives(s);
    },
    calcSurfacePoint: function(t, e, i, r, n, s, o) {
        var a = this.findSpan(t, s, i);
        var c = this.findSpan(e, o, r);
        var l = this.calcBasisFunctions(a, s, t, i);
        var u = this.calcBasisFunctions(c, o, e, r);
        var h = [];
        for (var d = 0; d <= e; ++d) {
            h[d] = vec4.fromValues(0, 0, 0, 0);
            for (var f = 0; f <= t; ++f) {
                var p = vec4.clone(n[a - t + f][c - e + d]);
                var v = p[3];
                p[0] *= v;
                p[1] *= v;
                p[2] *= v;
                var m = [];
                vec4.scale(m, p, l[f]);
                vec4.add(h[d], h[d], m);
            }
        }
        var _ = new vec4.fromValues(0, 0, 0, 0);
        for (var d = 0; d <= e; ++d) {
            var g = [];
            vec4.scale(g, h[d], u[d]);
            vec4.add(_, _, g);
        }
        _[0] = _[0] / _[3];
        _[1] = _[1] / _[3];
        _[2] = _[2] / _[3];
        return new vec3.fromValues(_[0], _[1], _[2]);
    }
};
class CGFnurbsSurface {
    constructor(t, e, i) {
        this.degree1 = t;
        this.degree2 = e;
        this.knots1 = this.generateKnots(t);
        this.knots2 = this.generateKnots(e);
        this.controlPoints = [];
        var r = t + 1;
        var n = e + 1;
        for (var s = 0; s < r; ++s) {
            this.controlPoints[s] = [];
            for (var o = 0; o < n; ++o) {
                var a = i[s][o];
                this.controlPoints[s][o] = new vec4.fromValues(a[0], a[1], a[2], a[3]);
            }
        }
    }
    getPoint(t, e) {
        var i = this.knots1[0] + t * (this.knots1[this.knots1.length - 1] - this.knots1[0]);
        var r = this.knots2[0] + e * (this.knots2[this.knots2.length - 1] - this.knots2[0]);
        return CGFnurbsUtils.calcSurfacePoint(this.degree1, this.degree2, this.knots1, this.knots2, this.controlPoints, i, r);
    }
    generateKnots(t) {
        var e = t + 1;
        var i = [];
        for (var r = 0; r <= 1; r++) {
            for (var n = 0; n < e; n++) {
                i.push(r);
            }
        }
        return i;
    }
}
class CGFnurbsObject extends CGFobject {
    constructor(t, e, i, r) {
        super(t);
        this.evalObj = r;
        this.slices = e;
        this.stacks = i;
        this.initBuffers();
        this.wireframe = false;
        this.pickingEnabled = true;
    }
    initBuffers() {
        this.vertices = [];
        this.faceNormals = [];
        this.texCoords = [];
        this.colors = [];
        this.indices = [];
        this.faces = [];
        var t, e, i;
        var r, n;
        var s = this.slices + 1;
        var o;
        for (t = 0; t <= this.stacks; t++) {
            n = t / this.stacks;
            for (e = 0; e <= this.slices; e++) {
                r = e / this.slices;
                i = this.evalObj.getPoint(r, n);
                this.vertices.push(i[0]);
                this.vertices.push(i[1]);
                this.vertices.push(i[2]);
                o = vec2.fromValues(e / this.slices, t / this.stacks);
                this.texCoords.push(o[0]);
                this.texCoords.push(1 - o[1]);
            }
        }
        var a, c, l, u;
        for (t = 0; t < this.stacks; t++) {
            for (e = 0; e < this.slices; e++) {
                a = t * s + e;
                c = t * s + e + 1;
                l = (t + 1) * s + e + 1;
                u = (t + 1) * s + e;
                this.indices.push(a);
                this.indices.push(c);
                this.indices.push(u);
                this.faceNormals.push(this.computeFaceNormal(a, c, u, s));
                this.indices.push(c);
                this.indices.push(l);
                this.indices.push(u);
                this.faceNormals.push(this.computeFaceNormal(c, l, u, s));
            }
        }
        this.normals = this.computeVertexNormals();
        this.primitiveType = this.scene.gl.TRIANGLES;
        this.initGLBuffers();
    }
    computeFaceNormal(t, e, i, r) {
        var n = t * 3;
        var s = e * 3;
        var o = i * 3;
        var a = vec3.fromValues(this.vertices[n], this.vertices[n + 1], this.vertices[n + 2]);
        var c = vec3.fromValues(this.vertices[s], this.vertices[s + 1], this.vertices[s + 2]);
        var l = vec3.fromValues(this.vertices[o], this.vertices[o + 1], this.vertices[o + 2]);
        var u = vec3.create();
        var h = vec3.create();
        var d = vec3.create();
        vec3.subtract(u, c, a);
        vec3.subtract(h, l, a);
        vec3.cross(d, u, h);
        vec3.normalize(d, d);
        return d;
    }
    computeVertexNormals() {
        var t = this.vertices.length;
        var e = new Array(t);
        for (var i = 0; i < t; i++) {
            e[i] = vec3.fromValues(0, 0, 0);
        }
        var r, n, s;
        var o;
        var a = 0;
        var c = this.indices.length;
        for (var i = 0; i < c; i += 3) {
            o = this.faceNormals[a];
            r = this.indices[i + 0];
            n = this.indices[i + 1];
            s = this.indices[i + 2];
            vec3.add(e[r], e[r], o);
            vec3.add(e[n], e[n], o);
            vec3.add(e[s], e[s], o);
            a++;
        }
        var l = [];
        for (var i = 0; i < t; i++) {
            vec3.normalize(e[i], e[i]);
            l.push(e[i][0], e[i][1], e[i][2]);
        }
        return l;
    }
    display() {
        this.scene.pushMatrix();
        this.drawElements(this.primitiveType);
        this.scene.popMatrix();
    }
}
