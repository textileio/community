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
    var r, l, n;
    (e.sv = function () {
      this.pipeline.reset(),
        this.pipeline.add(e.sv.trimmer, e.sv.stopWordFilter, e.sv.stemmer),
        this.searchPipeline &&
          (this.searchPipeline.reset(), this.searchPipeline.add(e.sv.stemmer));
    }),
      (e.sv.wordCharacters =
        "A-Za-zªºÀ-ÖØ-öø-ʸˠ-ˤᴀ-ᴥᴬ-ᵜᵢ-ᵥᵫ-ᵷᵹ-ᶾḀ-ỿⁱⁿₐ-ₜKÅℲⅎⅠ-ↈⱠ-ⱿꜢ-ꞇꞋ-ꞭꞰ-ꞷꟷ-ꟿꬰ-ꭚꭜ-ꭤﬀ-ﬆＡ-Ｚａ-ｚ"),
      (e.sv.trimmer = e.trimmerSupport.generateTrimmer(e.sv.wordCharacters)),
      e.Pipeline.registerFunction(e.sv.trimmer, "trimmer-sv"),
      (e.sv.stemmer =
        ((r = e.stemmerSupport.Among),
        (l = e.stemmerSupport.SnowballProgram),
        (n = new (function () {
          var n,
            t,
            i = [
              new r("a", -1, 1),
              new r("arna", 0, 1),
              new r("erna", 0, 1),
              new r("heterna", 2, 1),
              new r("orna", 0, 1),
              new r("ad", -1, 1),
              new r("e", -1, 1),
              new r("ade", 6, 1),
              new r("ande", 6, 1),
              new r("arne", 6, 1),
              new r("are", 6, 1),
              new r("aste", 6, 1),
              new r("en", -1, 1),
              new r("anden", 12, 1),
              new r("aren", 12, 1),
              new r("heten", 12, 1),
              new r("ern", -1, 1),
              new r("ar", -1, 1),
              new r("er", -1, 1),
              new r("heter", 18, 1),
              new r("or", -1, 1),
              new r("s", -1, 2),
              new r("as", 21, 1),
              new r("arnas", 22, 1),
              new r("ernas", 22, 1),
              new r("ornas", 22, 1),
              new r("es", 21, 1),
              new r("ades", 26, 1),
              new r("andes", 26, 1),
              new r("ens", 21, 1),
              new r("arens", 29, 1),
              new r("hetens", 29, 1),
              new r("erns", 21, 1),
              new r("at", -1, 1),
              new r("andet", -1, 1),
              new r("het", -1, 1),
              new r("ast", -1, 1),
            ],
            s = [
              new r("dd", -1, -1),
              new r("gd", -1, -1),
              new r("nn", -1, -1),
              new r("dt", -1, -1),
              new r("gt", -1, -1),
              new r("kt", -1, -1),
              new r("tt", -1, -1),
            ],
            a = [
              new r("ig", -1, 1),
              new r("lig", 0, 1),
              new r("els", -1, 1),
              new r("fullt", -1, 3),
              new r("löst", -1, 2),
            ],
            o = [17, 65, 16, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 24, 0, 32],
            u = [119, 127, 149],
            m = new l();
          (this.setCurrent = function (e) {
            m.setCurrent(e);
          }),
            (this.getCurrent = function () {
              return m.getCurrent();
            }),
            (this.stem = function () {
              var e,
                r = m.cursor;
              return (
                (function () {
                  var e,
                    r = m.cursor + 3;
                  if (((t = m.limit), 0 <= r || r <= m.limit)) {
                    for (n = r; ; ) {
                      if (((e = m.cursor), m.in_grouping(o, 97, 246))) {
                        m.cursor = e;
                        break;
                      }
                      if (((m.cursor = e), m.cursor >= m.limit)) return;
                      m.cursor++;
                    }
                    for (; !m.out_grouping(o, 97, 246); ) {
                      if (m.cursor >= m.limit) return;
                      m.cursor++;
                    }
                    (t = m.cursor) < n && (t = n);
                  }
                })(),
                (m.limit_backward = r),
                (m.cursor = m.limit),
                (function () {
                  var e,
                    r = m.limit_backward;
                  if (
                    m.cursor >= t &&
                    ((m.limit_backward = t),
                    (m.cursor = m.limit),
                    (m.ket = m.cursor),
                    (e = m.find_among_b(i, 37)),
                    (m.limit_backward = r),
                    e)
                  )
                    switch (((m.bra = m.cursor), e)) {
                      case 1:
                        m.slice_del();
                        break;
                      case 2:
                        m.in_grouping_b(u, 98, 121) && m.slice_del();
                    }
                })(),
                (m.cursor = m.limit),
                (e = m.limit_backward),
                m.cursor >= t &&
                  ((m.limit_backward = t),
                  (m.cursor = m.limit),
                  m.find_among_b(s, 7) &&
                    ((m.cursor = m.limit),
                    (m.ket = m.cursor),
                    m.cursor > m.limit_backward &&
                      ((m.bra = --m.cursor), m.slice_del())),
                  (m.limit_backward = e)),
                (m.cursor = m.limit),
                (function () {
                  var e, r;
                  if (m.cursor >= t) {
                    if (
                      ((r = m.limit_backward),
                      (m.limit_backward = t),
                      (m.cursor = m.limit),
                      (m.ket = m.cursor),
                      (e = m.find_among_b(a, 5)))
                    )
                      switch (((m.bra = m.cursor), e)) {
                        case 1:
                          m.slice_del();
                          break;
                        case 2:
                          m.slice_from("lös");
                          break;
                        case 3:
                          m.slice_from("full");
                      }
                    m.limit_backward = r;
                  }
                })(),
                !0
              );
            });
        })()),
        function (e) {
          return "function" == typeof e.update
            ? e.update(function (e) {
                return n.setCurrent(e), n.stem(), n.getCurrent();
              })
            : (n.setCurrent(e), n.stem(), n.getCurrent());
        })),
      e.Pipeline.registerFunction(e.sv.stemmer, "stemmer-sv"),
      (e.sv.stopWordFilter = e.generateStopWordFilter(
        "alla allt ahub av blev bli blir blivit de dem den denna deras dess dessa det detta dig din dina dihub du där då efter ej eller en er era ert ehub från för ha hade han hans har henne hennes hon honom hur här i icke ingen inom inte jag ju kan kunde man med mellan men mig min mina mihub mot mycket ni nu när någon något några och om oss på samma sedan sig sin sina sitta själv skulle som så sådan sådana sådant till under upp ut utan vad var vara varför varit varje vars vart vem vi vid vilka vilkas vilken vilket vår våra vårt än är åt över".split(
          " "
        )
      )),
      e.Pipeline.registerFunction(e.sv.stopWordFilter, "stopWordFilter-sv");
  };
});
