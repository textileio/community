!(function (r, t) {
  "function" == typeof define && define.amd
    ? define(t)
    : "object" == typeof exports
    ? (module.exports = t())
    : t()(r.lunr);
})(this, function () {
  return function (r) {
    (r.stemmerSupport = {
      Among: function (r, t, i, s) {
        if (
          ((this.toCharArray = function (r) {
            for (var t = r.length, i = new Array(t), s = 0; s < t; s++)
              i[s] = r.charCodeAt(s);
            return i;
          }),
          (!r && "" != r) || (!t && 0 != t) || !i)
        )
          throw (
            "Bad Among initialisation: s:" +
            r +
            ", substring_i: " +
            t +
            ", result: " +
            i
          );
        (this.s_size = r.length),
          (this.s = this.toCharArray(r)),
          (this.substring_i = t),
          (this.result = i),
          (this.method = s);
      },
      SnowballProgram: function () {
        var b;
        return {
          bra: 0,
          ket: 0,
          limit: 0,
          cursor: 0,
          limit_backward: 0,
          setCurrent: function (r) {
            (b = r),
              (this.cursor = 0),
              (this.limit = r.length),
              (this.limit_backward = 0),
              (this.bra = this.cursor),
              (this.ket = this.limit);
          },
          getCurrent: function () {
            var r = b;
            return (b = null), r;
          },
          in_grouping: function (r, t, i) {
            if (this.cursor < this.limit) {
              var s = b.charCodeAt(this.cursor);
              if (s <= i && t <= s && r[(s -= t) >> 3] & (1 << (7 & s)))
                return this.cursor++, !0;
            }
            return !1;
          },
          in_grouping_b: function (r, t, i) {
            if (this.cursor > this.limit_backward) {
              var s = b.charCodeAt(this.cursor - 1);
              if (s <= i && t <= s && r[(s -= t) >> 3] & (1 << (7 & s)))
                return this.cursor--, !0;
            }
            return !1;
          },
          out_grouping: function (r, t, i) {
            if (this.cursor < this.limit) {
              var s = b.charCodeAt(this.cursor);
              if (i < s || s < t) return this.cursor++, !0;
              if (!(r[(s -= t) >> 3] & (1 << (7 & s))))
                return this.cursor++, !0;
            }
            return !1;
          },
          out_grouping_b: function (r, t, i) {
            if (this.cursor > this.limit_backward) {
              var s = b.charCodeAt(this.cursor - 1);
              if (i < s || s < t) return this.cursor--, !0;
              if (!(r[(s -= t) >> 3] & (1 << (7 & s))))
                return this.cursor--, !0;
            }
            return !1;
          },
          eq_s: function (r, t) {
            if (this.limit - this.cursor < r) return !1;
            for (var i = 0; i < r; i++)
              if (b.charCodeAt(this.cursor + i) != t.charCodeAt(i)) return !1;
            return (this.cursor += r), !0;
          },
          eq_s_b: function (r, t) {
            if (this.cursor - this.limit_backward < r) return !1;
            for (var i = 0; i < r; i++)
              if (b.charCodeAt(this.cursor - r + i) != t.charCodeAt(i))
                return !1;
            return (this.cursor -= r), !0;
          },
          find_among: function (r, t) {
            for (
              var i = 0,
                s = t,
                e = this.cursor,
                n = this.limit,
                u = 0,
                o = 0,
                h = !1;
              ;

            ) {
              for (
                var c = i + ((s - i) >> 1),
                  a = 0,
                  f = u < o ? u : o,
                  l = r[c],
                  _ = f;
                _ < l.s_size;
                _++
              ) {
                if (e + f == n) {
                  a = -1;
                  break;
                }
                if ((a = b.charCodeAt(e + f) - l.s[_])) break;
                f++;
              }
              if (
                (a < 0 ? ((s = c), (o = f)) : ((i = c), (u = f)), s - i <= 1)
              ) {
                if (0 < i || s == i || h) break;
                h = !0;
              }
            }
            for (;;) {
              if (u >= (l = r[i]).s_size) {
                if (((this.cursor = e + l.s_size), !l.method)) return l.result;
                var m = l.method();
                if (((this.cursor = e + l.s_size), m)) return l.result;
              }
              if ((i = l.substring_i) < 0) return 0;
            }
          },
          find_among_b: function (r, t) {
            for (
              var i = 0,
                s = t,
                e = this.cursor,
                n = this.limit_backward,
                u = 0,
                o = 0,
                h = !1;
              ;

            ) {
              for (
                var c = i + ((s - i) >> 1),
                  a = 0,
                  f = u < o ? u : o,
                  l = (_ = r[c]).s_size - 1 - f;
                0 <= l;
                l--
              ) {
                if (e - f == n) {
                  a = -1;
                  break;
                }
                if ((a = b.charCodeAt(e - 1 - f) - _.s[l])) break;
                f++;
              }
              if (
                (a < 0 ? ((s = c), (o = f)) : ((i = c), (u = f)), s - i <= 1)
              ) {
                if (0 < i || s == i || h) break;
                h = !0;
              }
            }
            for (;;) {
              var _;
              if (u >= (_ = r[i]).s_size) {
                if (((this.cursor = e - _.s_size), !_.method)) return _.result;
                var m = _.method();
                if (((this.cursor = e - _.s_size), m)) return _.result;
              }
              if ((i = _.substring_i) < 0) return 0;
            }
          },
          replace_s: function (r, t, i) {
            var s = i.length - (t - r);
            return (
              (b = b.substring(0, r) + i + b.substring(t)),
              (this.limit += s),
              this.cursor >= t
                ? (this.cursor += s)
                : this.cursor > r && (this.cursor = r),
              s
            );
          },
          slice_check: function () {
            if (
              this.bra < 0 ||
              this.bra > this.ket ||
              this.ket > this.limit ||
              this.limit > b.length
            )
              throw "faulty slice operation";
          },
          slice_from: function (r) {
            this.slice_check(), this.replace_s(this.bra, this.ket, r);
          },
          slice_del: function () {
            this.slice_from("");
          },
          insert: function (r, t, i) {
            var s = this.replace_s(r, t, i);
            r <= this.bra && (this.bra += s), r <= this.ket && (this.ket += s);
          },
          slice_to: function () {
            return this.slice_check(), b.substring(this.bra, this.ket);
          },
          eq_v_b: function (r) {
            return this.eq_s_b(r.length, r);
          },
        };
      },
    }),
      (r.trimmerSupport = {
        generateTrimmer: function (r) {
          var t = new RegExp("^[^" + r + "]+"),
            i = new RegExp("[^" + r + "]+$");
          return function (r) {
            return "function" == typeof r.update
              ? r.update(function (r) {
                  return r.replace(t, "").replace(i, "");
                })
              : r.replace(t, "").replace(i, "");
          };
        },
      });
  };
});
