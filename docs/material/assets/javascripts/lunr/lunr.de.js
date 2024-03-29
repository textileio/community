!(function (e, r) {
  "function" == typeof define && define.amd
    ? define(r)
    : "object" == typeof exports
    ? (module.exports = r())
    : r()(e.lunr);
})(this, function () {
  return function (e) {
    if (void 0 === e)
      throw new Error(
        "Lunr is not present. Please include / require Lunr before this script."
      );
    if (void 0 === e.stemmerSupport)
      throw new Error(
        "Lunr stemmer support is not present. Please include / require Lunr stemmer support before this script."
      );
    var _, p, r;
    (e.de = function () {
      this.pipeline.reset(),
        this.pipeline.add(e.de.trimmer, e.de.stopWordFilter, e.de.stemmer),
        this.searchPipeline &&
          (this.searchPipeline.reset(), this.searchPipeline.add(e.de.stemmer));
    }),
      (e.de.wordCharacters =
        "A-Za-zªºÀ-ÖØ-öø-ʸˠ-ˤᴀ-ᴥᴬ-ᵜᵢ-ᵥᵫ-ᵷᵹ-ᶾḀ-ỿⁱⁿₐ-ₜKÅℲⅎⅠ-ↈⱠ-ⱿꜢ-ꞇꞋ-ꞭꞰ-ꞷꟷ-ꟿꬰ-ꭚꭜ-ꭤﬀ-ﬆＡ-Ｚａ-ｚ"),
      (e.de.trimmer = e.trimmerSupport.generateTrimmer(e.de.wordCharacters)),
      e.Pipeline.registerFunction(e.de.trimmer, "trimmer-de"),
      (e.de.stemmer =
        ((_ = e.stemmerSupport.Among),
        (p = e.stemmerSupport.SnowballProgram),
        (r = new (function () {
          var r,
            n,
            i,
            s = [
              new _("", -1, 6),
              new _("U", 0, 2),
              new _("Y", 0, 1),
              new _("ä", 0, 3),
              new _("ö", 0, 4),
              new _("ü", 0, 5),
            ],
            o = [
              new _("e", -1, 2),
              new _("em", -1, 1),
              new _("en", -1, 2),
              new _("ern", -1, 1),
              new _("er", -1, 1),
              new _("s", -1, 3),
              new _("es", 5, 2),
            ],
            c = [
              new _("en", -1, 1),
              new _("er", -1, 1),
              new _("st", -1, 2),
              new _("est", 2, 1),
            ],
            u = [new _("ig", -1, 1), new _("lich", -1, 1)],
            a = [
              new _("end", -1, 1),
              new _("ig", -1, 2),
              new _("ung", -1, 1),
              new _("lich", -1, 3),
              new _("isch", -1, 2),
              new _("ik", -1, 2),
              new _("heit", -1, 3),
              new _("keit", -1, 4),
            ],
            t = [
              17, 65, 16, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 8, 0, 32, 8,
            ],
            d = [117, 30, 5],
            l = [117, 30, 4],
            m = new p();
          function h(e, r, n) {
            return (
              !(
                !m.eq_s(1, e) ||
                ((m.ket = m.cursor), !m.in_grouping(t, 97, 252))
              ) && (m.slice_from(r), (m.cursor = n), !0)
            );
          }
          function w() {
            for (; !m.in_grouping(t, 97, 252); ) {
              if (m.cursor >= m.limit) return !0;
              m.cursor++;
            }
            for (; !m.out_grouping(t, 97, 252); ) {
              if (m.cursor >= m.limit) return !0;
              m.cursor++;
            }
            return !1;
          }
          function f() {
            return i <= m.cursor;
          }
          function b() {
            return n <= m.cursor;
          }
          (this.setCurrent = function (e) {
            m.setCurrent(e);
          }),
            (this.getCurrent = function () {
              return m.getCurrent();
            }),
            (this.stem = function () {
              var e = m.cursor;
              return (
                (function () {
                  for (var e, r, n, i, s = m.cursor; ; )
                    if (((e = m.cursor), (m.bra = e), m.eq_s(1, "ß")))
                      (m.ket = m.cursor), m.slice_from("ss");
                    else {
                      if (e >= m.limit) break;
                      m.cursor = e + 1;
                    }
                  for (m.cursor = s; ; )
                    for (r = m.cursor; ; ) {
                      if (((n = m.cursor), m.in_grouping(t, 97, 252))) {
                        if (((i = m.cursor), (m.bra = i), h("u", "U", n)))
                          break;
                        if (((m.cursor = i), h("y", "Y", n))) break;
                      }
                      if (n >= m.limit) return (m.cursor = r);
                      m.cursor = n + 1;
                    }
                })(),
                (m.cursor = e),
                (function () {
                  (i = m.limit), (n = i);
                  var e = m.cursor + 3;
                  0 <= e &&
                    e <= m.limit &&
                    ((r = e),
                    w() ||
                      ((i = m.cursor) < r && (i = r), w() || (n = m.cursor)));
                })(),
                (m.limit_backward = e),
                (m.cursor = m.limit),
                (function () {
                  var e,
                    r,
                    n,
                    i,
                    s = m.limit - m.cursor;
                  if (
                    ((m.ket = m.cursor),
                    (e = m.find_among_b(o, 7)) && ((m.bra = m.cursor), f()))
                  )
                    switch (e) {
                      case 1:
                        m.slice_del();
                        break;
                      case 2:
                        m.slice_del(),
                          (m.ket = m.cursor),
                          m.eq_s_b(1, "s") &&
                            ((m.bra = m.cursor),
                            m.eq_s_b(3, "nis") && m.slice_del());
                        break;
                      case 3:
                        m.in_grouping_b(d, 98, 116) && m.slice_del();
                    }
                  if (
                    ((m.cursor = m.limit - s),
                    (m.ket = m.cursor),
                    (e = m.find_among_b(c, 4)) && ((m.bra = m.cursor), f()))
                  )
                    switch (e) {
                      case 1:
                        m.slice_del();
                        break;
                      case 2:
                        if (m.in_grouping_b(l, 98, 116)) {
                          var t = m.cursor - 3;
                          m.limit_backward <= t &&
                            t <= m.limit &&
                            ((m.cursor = t), m.slice_del());
                        }
                    }
                  if (
                    ((m.cursor = m.limit - s),
                    (m.ket = m.cursor),
                    (e = m.find_among_b(a, 8)) && ((m.bra = m.cursor), b()))
                  )
                    switch (e) {
                      case 1:
                        m.slice_del(),
                          (m.ket = m.cursor),
                          m.eq_s_b(2, "ig") &&
                            ((m.bra = m.cursor),
                            (r = m.limit - m.cursor),
                            m.eq_s_b(1, "e") ||
                              ((m.cursor = m.limit - r), b() && m.slice_del()));
                        break;
                      case 2:
                        (n = m.limit - m.cursor),
                          m.eq_s_b(1, "e") ||
                            ((m.cursor = m.limit - n), m.slice_del());
                        break;
                      case 3:
                        if (
                          (m.slice_del(),
                          (m.ket = m.cursor),
                          (i = m.limit - m.cursor),
                          !m.eq_s_b(2, "er") &&
                            ((m.cursor = m.limit - i), !m.eq_s_b(2, "en")))
                        )
                          break;
                        (m.bra = m.cursor), f() && m.slice_del();
                        break;
                      case 4:
                        m.slice_del(),
                          (m.ket = m.cursor),
                          (e = m.find_among_b(u, 2)) &&
                            ((m.bra = m.cursor),
                            b() && 1 == e && m.slice_del());
                    }
                })(),
                (m.cursor = m.limit_backward),
                (function () {
                  for (var e, r; ; ) {
                    if (
                      ((r = m.cursor), (m.bra = r), !(e = m.find_among(s, 6)))
                    )
                      return;
                    switch (((m.ket = m.cursor), e)) {
                      case 1:
                        m.slice_from("y");
                        break;
                      case 2:
                      case 5:
                        m.slice_from("u");
                        break;
                      case 3:
                        m.slice_from("a");
                        break;
                      case 4:
                        m.slice_from("o");
                        break;
                      case 6:
                        if (m.cursor >= m.limit) return;
                        m.cursor++;
                    }
                  }
                })(),
                !0
              );
            });
        })()),
        function (e) {
          return "function" == typeof e.update
            ? e.update(function (e) {
                return r.setCurrent(e), r.stem(), r.getCurrent();
              })
            : (r.setCurrent(e), r.stem(), r.getCurrent());
        })),
      e.Pipeline.registerFunction(e.de.stemmer, "stemmer-de"),
      (e.de.stopWordFilter = e.generateStopWordFilter(
        "aber alle allem allen aller alles als also am an ander andere anderem anderen anderer anderes anderm andern anderr anders auch auf aus bei bin bis bist da damit dann das dasselbe dazu daß dein deine deinem deinen deiner deines dem demselben den denn denselben der derer derselbe derselben des desselben dessen dich die dies diese dieselbe dieselben diesem diesen dieser dieses dir doch dort du durch ein eine einem einen einer eines einig einige einigem einigen einiger einiges einmal er es etwas euch euer eure eurem euren eurer eures für gegen gewesen hab habe haben hat hatte hatten hier hin hinter ich ihm ihn ihnen ihr ihre ihrem ihren ihrer ihres im in indem ins ist jede jedem jeden jeder jedes jene jenem jenen jener jenes jetzt kann kein keine keinem keinen keiner keines können könnte machen man manche manchem manchen mancher manches mein meine meinem meinen meiner meines mich mir mit muss musste nach nicht nichts noch nun nur ob oder ohne sehr sein seine seinem seinen seiner seines selbst sich sie sind so solche solchem solchen solcher solches soll sollte sondern sonst um und uns unse unsem unsen unser unses unter viel vom von vor war waren warst was weg weil weiter welche welchem welchen welcher welches wenn werde werden wie wieder will wir wird wirst wo wollen wollte während würde würden zu zum zur zwar zwischen über".split(
          " "
        )
      )),
      e.Pipeline.registerFunction(e.de.stopWordFilter, "stopWordFilter-de");
  };
});
