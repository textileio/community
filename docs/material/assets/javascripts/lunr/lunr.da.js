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
    var r, m, i;
    (e.da = function () {
      this.pipeline.reset(),
        this.pipeline.add(e.da.trimmer, e.da.stopWordFilter, e.da.stemmer),
        this.searchPipeline &&
          (this.searchPipeline.reset(), this.searchPipeline.add(e.da.stemmer));
    }),
      (e.da.wordCharacters =
        "A-Za-zªºÀ-ÖØ-öø-ʸˠ-ˤᴀ-ᴥᴬ-ᵜᵢ-ᵥᵫ-ᵷᵹ-ᶾḀ-ỿⁱⁿₐ-ₜKÅℲⅎⅠ-ↈⱠ-ⱿꜢ-ꞇꞋ-ꞭꞰ-ꞷꟷ-ꟿꬰ-ꭚꭜ-ꭤﬀ-ﬆＡ-Ｚａ-ｚ"),
      (e.da.trimmer = e.trimmerSupport.generateTrimmer(e.da.wordCharacters)),
      e.Pipeline.registerFunction(e.da.trimmer, "trimmer-da"),
      (e.da.stemmer =
        ((r = e.stemmerSupport.Among),
        (m = e.stemmerSupport.SnowballProgram),
        (i = new (function () {
          var i,
            t,
            n,
            s = [
              new r("hed", -1, 1),
              new r("ethed", 0, 1),
              new r("ered", -1, 1),
              new r("e", -1, 1),
              new r("erede", 3, 1),
              new r("ende", 3, 1),
              new r("erende", 5, 1),
              new r("ene", 3, 1),
              new r("erne", 3, 1),
              new r("ere", 3, 1),
              new r("en", -1, 1),
              new r("heden", 10, 1),
              new r("eren", 10, 1),
              new r("er", -1, 1),
              new r("heder", 13, 1),
              new r("erer", 13, 1),
              new r("s", -1, 2),
              new r("heds", 16, 1),
              new r("es", 16, 1),
              new r("endes", 18, 1),
              new r("erendes", 19, 1),
              new r("enes", 18, 1),
              new r("ernes", 18, 1),
              new r("eres", 18, 1),
              new r("ens", 16, 1),
              new r("hedens", 24, 1),
              new r("erens", 24, 1),
              new r("ers", 16, 1),
              new r("ets", 16, 1),
              new r("erets", 28, 1),
              new r("et", -1, 1),
              new r("eret", 30, 1),
            ],
            o = [
              new r("gd", -1, -1),
              new r("dt", -1, -1),
              new r("gt", -1, -1),
              new r("kt", -1, -1),
            ],
            a = [
              new r("ig", -1, 1),
              new r("lig", 0, 1),
              new r("elig", 1, 1),
              new r("els", -1, 1),
              new r("løst", -1, 2),
            ],
            d = [17, 65, 16, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 48, 0, 128],
            u = [239, 254, 42, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 16],
            c = new m();
          function l() {
            var e,
              r = c.limit - c.cursor;
            c.cursor >= t &&
              ((e = c.limit_backward),
              (c.limit_backward = t),
              (c.ket = c.cursor),
              c.find_among_b(o, 4)
                ? ((c.bra = c.cursor),
                  (c.limit_backward = e),
                  (c.cursor = c.limit - r),
                  c.cursor > c.limit_backward &&
                    (c.cursor--, (c.bra = c.cursor), c.slice_del()))
                : (c.limit_backward = e));
          }
          (this.setCurrent = function (e) {
            c.setCurrent(e);
          }),
            (this.getCurrent = function () {
              return c.getCurrent();
            }),
            (this.stem = function () {
              var e,
                r = c.cursor;
              return (
                (function () {
                  var e,
                    r = c.cursor + 3;
                  if (((t = c.limit), 0 <= r && r <= c.limit)) {
                    for (i = r; ; ) {
                      if (((e = c.cursor), c.in_grouping(d, 97, 248))) {
                        c.cursor = e;
                        break;
                      }
                      if ((c.cursor = e) >= c.limit) return;
                      c.cursor++;
                    }
                    for (; !c.out_grouping(d, 97, 248); ) {
                      if (c.cursor >= c.limit) return;
                      c.cursor++;
                    }
                    (t = c.cursor) < i && (t = i);
                  }
                })(),
                (c.limit_backward = r),
                (c.cursor = c.limit),
                (function () {
                  var e, r;
                  if (
                    c.cursor >= t &&
                    ((r = c.limit_backward),
                    (c.limit_backward = t),
                    (c.ket = c.cursor),
                    (e = c.find_among_b(s, 32)),
                    (c.limit_backward = r),
                    e)
                  )
                    switch (((c.bra = c.cursor), e)) {
                      case 1:
                        c.slice_del();
                        break;
                      case 2:
                        c.in_grouping_b(u, 97, 229) && c.slice_del();
                    }
                })(),
                (c.cursor = c.limit),
                l(),
                (c.cursor = c.limit),
                (function () {
                  var e,
                    r,
                    i,
                    n = c.limit - c.cursor;
                  if (
                    ((c.ket = c.cursor),
                    c.eq_s_b(2, "st") &&
                      ((c.bra = c.cursor), c.eq_s_b(2, "ig") && c.slice_del()),
                    (c.cursor = c.limit - n),
                    c.cursor >= t &&
                      ((r = c.limit_backward),
                      (c.limit_backward = t),
                      (c.ket = c.cursor),
                      (e = c.find_among_b(a, 5)),
                      (c.limit_backward = r),
                      e))
                  )
                    switch (((c.bra = c.cursor), e)) {
                      case 1:
                        c.slice_del(),
                          (i = c.limit - c.cursor),
                          l(),
                          (c.cursor = c.limit - i);
                        break;
                      case 2:
                        c.slice_from("løs");
                    }
                })(),
                (c.cursor = c.limit),
                c.cursor >= t &&
                  ((e = c.limit_backward),
                  (c.limit_backward = t),
                  (c.ket = c.cursor),
                  c.out_grouping_b(d, 97, 248)
                    ? ((c.bra = c.cursor),
                      (n = c.slice_to(n)),
                      (c.limit_backward = e),
                      c.eq_v_b(n) && c.slice_del())
                    : (c.limit_backward = e)),
                !0
              );
            });
        })()),
        function (e) {
          return "function" == typeof e.update
            ? e.update(function (e) {
                return i.setCurrent(e), i.stem(), i.getCurrent();
              })
            : (i.setCurrent(e), i.stem(), i.getCurrent());
        })),
      e.Pipeline.registerFunction(e.da.stemmer, "stemmer-da"),
      (e.da.stopWordFilter = e.generateStopWordFilter(
        "ad af alle alt anden at blev blive bliver da de dem den denne der deres det dette dig din disse dog du efter eller en end er et for fra ham han hans har havde have hende hendes her hos hun hvad hvis hvor i ikke ind jeg jer jo kunne man mange med meget men mig min mine mit mod ned noget nogle nu når og også om op os over på selv sig sin sine sit skal skulle som sådan thi til ud under var vi vil ville vor være været".split(
          " "
        )
      )),
      e.Pipeline.registerFunction(e.da.stopWordFilter, "stopWordFilter-da");
  };
});
