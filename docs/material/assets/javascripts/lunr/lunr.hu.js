!(function (e, n) {
  "function" == typeof define && define.amd
    ? define(n)
    : "object" == typeof exports
    ? (module.exports = n())
    : n()(e.lunr);
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
    var p, _, n;
    (e.hu = function () {
      this.pipeline.reset(),
        this.pipeline.add(e.hu.trimmer, e.hu.stopWordFilter, e.hu.stemmer),
        this.searchPipeline &&
          (this.searchPipeline.reset(), this.searchPipeline.add(e.hu.stemmer));
    }),
      (e.hu.wordCharacters =
        "A-Za-zªºÀ-ÖØ-öø-ʸˠ-ˤᴀ-ᴥᴬ-ᵜᵢ-ᵥᵫ-ᵷᵹ-ᶾḀ-ỿⁱⁿₐ-ₜKÅℲⅎⅠ-ↈⱠ-ⱿꜢ-ꞇꞋ-ꞭꞰ-ꞷꟷ-ꟿꬰ-ꭚꭜ-ꭤﬀ-ﬆＡ-Ｚａ-ｚ"),
      (e.hu.trimmer = e.trimmerSupport.generateTrimmer(e.hu.wordCharacters)),
      e.Pipeline.registerFunction(e.hu.trimmer, "trimmer-hu"),
      (e.hu.stemmer =
        ((p = e.stemmerSupport.Among),
        (_ = e.stemmerSupport.SnowballProgram),
        (n = new (function () {
          var r,
            i = [
              new p("cs", -1, -1),
              new p("dzs", -1, -1),
              new p("gy", -1, -1),
              new p("ly", -1, -1),
              new p("ny", -1, -1),
              new p("sz", -1, -1),
              new p("ty", -1, -1),
              new p("zs", -1, -1),
            ],
            n = [new p("á", -1, 1), new p("é", -1, 2)],
            a = [
              new p("bb", -1, -1),
              new p("cc", -1, -1),
              new p("dd", -1, -1),
              new p("ff", -1, -1),
              new p("gg", -1, -1),
              new p("jj", -1, -1),
              new p("kk", -1, -1),
              new p("ll", -1, -1),
              new p("mm", -1, -1),
              new p("nn", -1, -1),
              new p("pp", -1, -1),
              new p("rr", -1, -1),
              new p("ccs", -1, -1),
              new p("ss", -1, -1),
              new p("zzs", -1, -1),
              new p("tt", -1, -1),
              new p("vv", -1, -1),
              new p("ggy", -1, -1),
              new p("lly", -1, -1),
              new p("nny", -1, -1),
              new p("tty", -1, -1),
              new p("ssz", -1, -1),
              new p("zz", -1, -1),
            ],
            t = [new p("al", -1, 1), new p("el", -1, 2)],
            e = [
              new p("ba", -1, -1),
              new p("ra", -1, -1),
              new p("be", -1, -1),
              new p("re", -1, -1),
              new p("ig", -1, -1),
              new p("nak", -1, -1),
              new p("nek", -1, -1),
              new p("val", -1, -1),
              new p("vel", -1, -1),
              new p("ul", -1, -1),
              new p("nál", -1, -1),
              new p("nél", -1, -1),
              new p("ból", -1, -1),
              new p("ról", -1, -1),
              new p("tól", -1, -1),
              new p("bõl", -1, -1),
              new p("rõl", -1, -1),
              new p("tõl", -1, -1),
              new p("ül", -1, -1),
              new p("n", -1, -1),
              new p("an", 19, -1),
              new p("ban", 20, -1),
              new p("en", 19, -1),
              new p("ben", 22, -1),
              new p("képpen", 22, -1),
              new p("on", 19, -1),
              new p("ön", 19, -1),
              new p("képp", -1, -1),
              new p("kor", -1, -1),
              new p("t", -1, -1),
              new p("at", 29, -1),
              new p("et", 29, -1),
              new p("ként", 29, -1),
              new p("anként", 32, -1),
              new p("enként", 32, -1),
              new p("onként", 32, -1),
              new p("ot", 29, -1),
              new p("ért", 29, -1),
              new p("öt", 29, -1),
              new p("hez", -1, -1),
              new p("hoz", -1, -1),
              new p("höz", -1, -1),
              new p("vá", -1, -1),
              new p("vé", -1, -1),
            ],
            s = [
              new p("án", -1, 2),
              new p("én", -1, 1),
              new p("ánként", -1, 3),
            ],
            c = [
              new p("stul", -1, 2),
              new p("astul", 0, 1),
              new p("ástul", 0, 3),
              new p("stül", -1, 2),
              new p("estül", 3, 1),
              new p("éstül", 3, 4),
            ],
            w = [new p("á", -1, 1), new p("é", -1, 2)],
            o = [
              new p("k", -1, 7),
              new p("ak", 0, 4),
              new p("ek", 0, 6),
              new p("ok", 0, 5),
              new p("ák", 0, 1),
              new p("ék", 0, 2),
              new p("ök", 0, 3),
            ],
            l = [
              new p("éi", -1, 7),
              new p("áéi", 0, 6),
              new p("ééi", 0, 5),
              new p("é", -1, 9),
              new p("ké", 3, 4),
              new p("aké", 4, 1),
              new p("eké", 4, 1),
              new p("oké", 4, 1),
              new p("áké", 4, 3),
              new p("éké", 4, 2),
              new p("öké", 4, 1),
              new p("éé", 3, 8),
            ],
            u = [
              new p("a", -1, 18),
              new p("ja", 0, 17),
              new p("d", -1, 16),
              new p("ad", 2, 13),
              new p("ed", 2, 13),
              new p("od", 2, 13),
              new p("ád", 2, 14),
              new p("éd", 2, 15),
              new p("öd", 2, 13),
              new p("e", -1, 18),
              new p("je", 9, 17),
              new p("nk", -1, 4),
              new p("unk", 11, 1),
              new p("ánk", 11, 2),
              new p("énk", 11, 3),
              new p("ünk", 11, 1),
              new p("uk", -1, 8),
              new p("juk", 16, 7),
              new p("ájuk", 17, 5),
              new p("ük", -1, 8),
              new p("jük", 19, 7),
              new p("éjük", 20, 6),
              new p("m", -1, 12),
              new p("am", 22, 9),
              new p("em", 22, 9),
              new p("om", 22, 9),
              new p("ám", 22, 10),
              new p("ém", 22, 11),
              new p("o", -1, 18),
              new p("á", -1, 19),
              new p("é", -1, 20),
            ],
            m = [
              new p("id", -1, 10),
              new p("aid", 0, 9),
              new p("jaid", 1, 6),
              new p("eid", 0, 9),
              new p("jeid", 3, 6),
              new p("áid", 0, 7),
              new p("éid", 0, 8),
              new p("i", -1, 15),
              new p("ai", 7, 14),
              new p("jai", 8, 11),
              new p("ei", 7, 14),
              new p("jei", 10, 11),
              new p("ái", 7, 12),
              new p("éi", 7, 13),
              new p("itek", -1, 24),
              new p("eitek", 14, 21),
              new p("jeitek", 15, 20),
              new p("éitek", 14, 23),
              new p("ik", -1, 29),
              new p("aik", 18, 26),
              new p("jaik", 19, 25),
              new p("eik", 18, 26),
              new p("jeik", 21, 25),
              new p("áik", 18, 27),
              new p("éik", 18, 28),
              new p("ink", -1, 20),
              new p("aink", 25, 17),
              new p("jaink", 26, 16),
              new p("eink", 25, 17),
              new p("jeink", 28, 16),
              new p("áink", 25, 18),
              new p("éink", 25, 19),
              new p("aitok", -1, 21),
              new p("jaitok", 32, 20),
              new p("áitok", -1, 22),
              new p("im", -1, 5),
              new p("aim", 35, 4),
              new p("jaim", 36, 1),
              new p("eim", 35, 4),
              new p("jeim", 38, 1),
              new p("áim", 35, 2),
              new p("éim", 35, 3),
            ],
            k = [
              17, 65, 16, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 17, 52, 14,
            ],
            f = new _();
          function b() {
            return r <= f.cursor;
          }
          function d() {
            var e = f.limit - f.cursor;
            return !!f.find_among_b(a, 23) && ((f.cursor = f.limit - e), !0);
          }
          function g() {
            if (f.cursor > f.limit_backward) {
              f.cursor--, (f.ket = f.cursor);
              var e = f.cursor - 1;
              f.limit_backward <= e &&
                e <= f.limit &&
                ((f.cursor = e), (f.bra = e), f.slice_del());
            }
          }
          function h() {
            (f.ket = f.cursor),
              f.find_among_b(e, 44) &&
                ((f.bra = f.cursor),
                b() &&
                  (f.slice_del(),
                  (function () {
                    var e;
                    if (
                      ((f.ket = f.cursor),
                      (e = f.find_among_b(n, 2)) && ((f.bra = f.cursor), b()))
                    )
                      switch (e) {
                        case 1:
                          f.slice_from("a");
                          break;
                        case 2:
                          f.slice_from("e");
                      }
                  })()));
          }
          (this.setCurrent = function (e) {
            f.setCurrent(e);
          }),
            (this.getCurrent = function () {
              return f.getCurrent();
            }),
            (this.stem = function () {
              var e = f.cursor;
              return (
                (function () {
                  var e,
                    n = f.cursor;
                  if (((r = f.limit), f.in_grouping(k, 97, 252)))
                    for (;;) {
                      if (((e = f.cursor), f.out_grouping(k, 97, 252)))
                        return (
                          (f.cursor = e),
                          f.find_among(i, 8) ||
                            ((f.cursor = e) < f.limit && f.cursor++),
                          (r = f.cursor)
                        );
                      if ((f.cursor = e) >= f.limit) return (r = e);
                      f.cursor++;
                    }
                  if (((f.cursor = n), f.out_grouping(k, 97, 252))) {
                    for (; !f.in_grouping(k, 97, 252); ) {
                      if (f.cursor >= f.limit) return;
                      f.cursor++;
                    }
                    r = f.cursor;
                  }
                })(),
                (f.limit_backward = e),
                (f.cursor = f.limit),
                (function () {
                  var e;
                  if (
                    ((f.ket = f.cursor),
                    (e = f.find_among_b(t, 2)) && ((f.bra = f.cursor), b()))
                  ) {
                    if ((1 == e || 2 == e) && !d()) return;
                    f.slice_del(), g();
                  }
                })(),
                (f.cursor = f.limit),
                h(),
                (f.cursor = f.limit),
                (function () {
                  var e;
                  if (
                    ((f.ket = f.cursor),
                    (e = f.find_among_b(s, 3)) && ((f.bra = f.cursor), b()))
                  )
                    switch (e) {
                      case 1:
                        f.slice_from("e");
                        break;
                      case 2:
                      case 3:
                        f.slice_from("a");
                    }
                })(),
                (f.cursor = f.limit),
                (function () {
                  var e;
                  if (
                    ((f.ket = f.cursor),
                    (e = f.find_among_b(c, 6)) && ((f.bra = f.cursor), b()))
                  )
                    switch (e) {
                      case 1:
                      case 2:
                        f.slice_del();
                        break;
                      case 3:
                        f.slice_from("a");
                        break;
                      case 4:
                        f.slice_from("e");
                    }
                })(),
                (f.cursor = f.limit),
                (function () {
                  var e;
                  if (
                    ((f.ket = f.cursor),
                    (e = f.find_among_b(w, 2)) && ((f.bra = f.cursor), b()))
                  ) {
                    if ((1 == e || 2 == e) && !d()) return;
                    f.slice_del(), g();
                  }
                })(),
                (f.cursor = f.limit),
                (function () {
                  var e;
                  if (
                    ((f.ket = f.cursor),
                    (e = f.find_among_b(l, 12)) && ((f.bra = f.cursor), b()))
                  )
                    switch (e) {
                      case 1:
                      case 4:
                      case 7:
                      case 9:
                        f.slice_del();
                        break;
                      case 2:
                      case 5:
                      case 8:
                        f.slice_from("e");
                        break;
                      case 3:
                      case 6:
                        f.slice_from("a");
                    }
                })(),
                (f.cursor = f.limit),
                (function () {
                  var e;
                  if (
                    ((f.ket = f.cursor),
                    (e = f.find_among_b(u, 31)) && ((f.bra = f.cursor), b()))
                  )
                    switch (e) {
                      case 1:
                      case 4:
                      case 7:
                      case 8:
                      case 9:
                      case 12:
                      case 13:
                      case 16:
                      case 17:
                      case 18:
                        f.slice_del();
                        break;
                      case 2:
                      case 5:
                      case 10:
                      case 14:
                      case 19:
                        f.slice_from("a");
                        break;
                      case 3:
                      case 6:
                      case 11:
                      case 15:
                      case 20:
                        f.slice_from("e");
                    }
                })(),
                (f.cursor = f.limit),
                (function () {
                  var e;
                  if (
                    ((f.ket = f.cursor),
                    (e = f.find_among_b(m, 42)) && ((f.bra = f.cursor), b()))
                  )
                    switch (e) {
                      case 1:
                      case 4:
                      case 5:
                      case 6:
                      case 9:
                      case 10:
                      case 11:
                      case 14:
                      case 15:
                      case 16:
                      case 17:
                      case 20:
                      case 21:
                      case 24:
                      case 25:
                      case 26:
                      case 29:
                        f.slice_del();
                        break;
                      case 2:
                      case 7:
                      case 12:
                      case 18:
                      case 22:
                      case 27:
                        f.slice_from("a");
                        break;
                      case 3:
                      case 8:
                      case 13:
                      case 19:
                      case 23:
                      case 28:
                        f.slice_from("e");
                    }
                })(),
                (f.cursor = f.limit),
                (function () {
                  var e;
                  if (
                    ((f.ket = f.cursor),
                    (e = f.find_among_b(o, 7)) && ((f.bra = f.cursor), b()))
                  )
                    switch (e) {
                      case 1:
                        f.slice_from("a");
                        break;
                      case 2:
                        f.slice_from("e");
                        break;
                      case 3:
                      case 4:
                      case 5:
                      case 6:
                      case 7:
                        f.slice_del();
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
      e.Pipeline.registerFunction(e.hu.stemmer, "stemmer-hu"),
      (e.hu.stopWordFilter = e.generateStopWordFilter(
        "a abban ahhoz ahogy ahol aki akik akkor alahub amely amelyek amelyekben amelyeket amelyet amelynek ami amikor amit amolyan amíg annak arra arról az azok azon azonban azt aztán azután azzal azért be belül benne bár cikk cikkek cikkeket csak de e ebben eddig egy egyes egyetlen egyik egyre egyéb egész ehhez ekkor el ellen elsõ elég elõ elõször elõhub emilyen ennek erre ez ezek ezen ezt ezzel ezért fel felé hanem hiszen hogy hogyan igen ill ill. illetve ilyen ilyenkor ismét ison ihub jobban jó jól kell kellehub keressünk keresztül ki kívül közöhub közül legalább legyen lehet lehetehub lenne lenni lesz lehub maga magát majd majd meg mellehub mely melyek mert mi mikor milyen minden mindenki mindent mindig mint mintha mit mivel miért most már más másik még míg nagy nagyobb nagyon ne nekem neki nem nincs néha néhány nélkül olyan ohub pedig persze rá s saját sem semmi sok sokat sokkal szemben szerint szinte számára talán tehát teljes tovább továbbá több ugyanis utolsó után utána vagy vagyis vagyok valaki valami valamint való van vannak vele vissza viszont volna volt voltak voltam voltunk által általában át én éppen és így õ õk õket össze úgy új újabb újra".split(
          " "
        )
      )),
      e.Pipeline.registerFunction(e.hu.stopWordFilter, "stopWordFilter-hu");
  };
});
