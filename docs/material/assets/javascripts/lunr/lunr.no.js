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
    var r, n, i;
    (e.no = function () {
      this.pipeline.reset(),
        this.pipeline.add(e.no.trimmer, e.no.stopWordFilter, e.no.stemmer),
        this.searchPipeline &&
          (this.searchPipeline.reset(), this.searchPipeline.add(e.no.stemmer));
    }),
      (e.no.wordCharacters =
        "A-Za-zªºÀ-ÖØ-öø-ʸˠ-ˤᴀ-ᴥᴬ-ᵜᵢ-ᵥᵫ-ᵷᵹ-ᶾḀ-ỿⁱⁿₐ-ₜKÅℲⅎⅠ-ↈⱠ-ⱿꜢ-ꞇꞋ-ꞭꞰ-ꞷꟷ-ꟿꬰ-ꭚꭜ-ꭤﬀ-ﬆＡ-Ｚａ-ｚ"),
      (e.no.trimmer = e.trimmerSupport.generateTrimmer(e.no.wordCharacters)),
      e.Pipeline.registerFunction(e.no.trimmer, "trimmer-no"),
      (e.no.stemmer =
        ((r = e.stemmerSupport.Among),
        (n = e.stemmerSupport.SnowballProgram),
        (i = new (function () {
          var o,
            s,
            a = [
              new r("a", -1, 1),
              new r("e", -1, 1),
              new r("ede", 1, 1),
              new r("ande", 1, 1),
              new r("ende", 1, 1),
              new r("ane", 1, 1),
              new r("ene", 1, 1),
              new r("hetene", 6, 1),
              new r("erte", 1, 3),
              new r("en", -1, 1),
              new r("heten", 9, 1),
              new r("ar", -1, 1),
              new r("er", -1, 1),
              new r("heter", 12, 1),
              new r("s", -1, 2),
              new r("as", 14, 1),
              new r("es", 14, 1),
              new r("edes", 16, 1),
              new r("endes", 16, 1),
              new r("enes", 16, 1),
              new r("hetenes", 19, 1),
              new r("ens", 14, 1),
              new r("hetens", 21, 1),
              new r("ers", 14, 1),
              new r("ets", 14, 1),
              new r("et", -1, 1),
              new r("het", 25, 1),
              new r("ert", -1, 3),
              new r("ast", -1, 1),
            ],
            m = [new r("dt", -1, -1), new r("vt", -1, -1)],
            l = [
              new r("leg", -1, 1),
              new r("eleg", 0, 1),
              new r("ig", -1, 1),
              new r("eig", 2, 1),
              new r("lig", 2, 1),
              new r("elig", 4, 1),
              new r("els", -1, 1),
              new r("lov", -1, 1),
              new r("elov", 7, 1),
              new r("slov", 7, 1),
              new r("hetslov", 9, 1),
            ],
            u = [17, 65, 16, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 48, 0, 128],
            d = [119, 125, 149, 1],
            c = new n();
          (this.setCurrent = function (e) {
            c.setCurrent(e);
          }),
            (this.getCurrent = function () {
              return c.getCurrent();
            }),
            (this.stem = function () {
              var e,
                r,
                n,
                i,
                t = c.cursor;
              return (
                (function () {
                  var e,
                    r = c.cursor + 3;
                  if (((s = c.limit), 0 <= r || r <= c.limit)) {
                    for (o = r; ; ) {
                      if (((e = c.cursor), c.in_grouping(u, 97, 248))) {
                        c.cursor = e;
                        break;
                      }
                      if (e >= c.limit) return;
                      c.cursor = e + 1;
                    }
                    for (; !c.out_grouping(u, 97, 248); ) {
                      if (c.cursor >= c.limit) return;
                      c.cursor++;
                    }
                    (s = c.cursor) < o && (s = o);
                  }
                })(),
                (c.limit_backward = t),
                (c.cursor = c.limit),
                (function () {
                  var e, r, n;
                  if (
                    c.cursor >= s &&
                    ((r = c.limit_backward),
                    (c.limit_backward = s),
                    (c.ket = c.cursor),
                    (e = c.find_among_b(a, 29)),
                    (c.limit_backward = r),
                    e)
                  )
                    switch (((c.bra = c.cursor), e)) {
                      case 1:
                        c.slice_del();
                        break;
                      case 2:
                        (n = c.limit - c.cursor),
                          c.in_grouping_b(d, 98, 122)
                            ? c.slice_del()
                            : ((c.cursor = c.limit - n),
                              c.eq_s_b(1, "k") &&
                                c.out_grouping_b(u, 97, 248) &&
                                c.slice_del());
                        break;
                      case 3:
                        c.slice_from("er");
                    }
                })(),
                (c.cursor = c.limit),
                (r = c.limit - c.cursor),
                c.cursor >= s &&
                  ((e = c.limit_backward),
                  (c.limit_backward = s),
                  (c.ket = c.cursor),
                  c.find_among_b(m, 2)
                    ? ((c.bra = c.cursor),
                      (c.limit_backward = e),
                      (c.cursor = c.limit - r),
                      c.cursor > c.limit_backward &&
                        (c.cursor--, (c.bra = c.cursor), c.slice_del()))
                    : (c.limit_backward = e)),
                (c.cursor = c.limit),
                c.cursor >= s &&
                  ((i = c.limit_backward),
                  (c.limit_backward = s),
                  (c.ket = c.cursor),
                  (n = c.find_among_b(l, 11))
                    ? ((c.bra = c.cursor),
                      (c.limit_backward = i),
                      1 == n && c.slice_del())
                    : (c.limit_backward = i)),
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
      e.Pipeline.registerFunction(e.no.stemmer, "stemmer-no"),
      (e.no.stopWordFilter = e.generateStopWordFilter(
        "alle at av bare begge ble blei bli blir blihub både båe da de deg dei deim deira deires dem den denne der dere deres det dette di din disse dihub du dykk dykkar då eg ein eit eihub eller elles en enn er et ehub etter for fordi fra før ha hadde han hans har hennar henne hennes her hjå ho hoe honom hoss hossen hun hva hvem hver hvilke hvilken hvis hvor hvordan hvorfor i ikke ikkje ikkje ingen ingi inkje inn inni ja jeg kan kom korleis korso kun kunne kva kvar kvarhelst kven kvi kvifor man mange me med medan meg meget mellom men mi min mine mihub mot mykje ned no noe noen noka noko nokon nokor nokre nå når og også om opp oss over på samme seg selv si si sia sidan siden sin sine sihub sjøl skal skulle slik so som som somme somt så sånn til um upp ut uten var vart varte ved vere verte vi vil ville vore vors vort vår være være vært å".split(
          " "
        )
      )),
      e.Pipeline.registerFunction(e.no.stopWordFilter, "stopWordFilter-no");
  };
});
