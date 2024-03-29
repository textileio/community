!(function (i, e) {
  "function" == typeof define && define.amd
    ? define(e)
    : "object" == typeof exports
    ? (module.exports = e())
    : e()(i.lunr);
})(this, function () {
  return function (i) {
    if (void 0 === i)
      throw new Error(
        "Lunr is not present. Please include / require Lunr before this script."
      );
    if (void 0 === i.stemmerSupport)
      throw new Error(
        "Lunr stemmer support is not present. Please include / require Lunr stemmer support before this script."
      );
    var v, C, e;
    (i.fi = function () {
      this.pipeline.reset(),
        this.pipeline.add(i.fi.trimmer, i.fi.stopWordFilter, i.fi.stemmer),
        this.searchPipeline &&
          (this.searchPipeline.reset(), this.searchPipeline.add(i.fi.stemmer));
    }),
      (i.fi.wordCharacters =
        "A-Za-zªºÀ-ÖØ-öø-ʸˠ-ˤᴀ-ᴥᴬ-ᵜᵢ-ᵥᵫ-ᵷᵹ-ᶾḀ-ỿⁱⁿₐ-ₜKÅℲⅎⅠ-ↈⱠ-ⱿꜢ-ꞇꞋ-ꞭꞰ-ꞷꟷ-ꟿꬰ-ꭚꭜ-ꭤﬀ-ﬆＡ-Ｚａ-ｚ"),
      (i.fi.trimmer = i.trimmerSupport.generateTrimmer(i.fi.wordCharacters)),
      i.Pipeline.registerFunction(i.fi.trimmer, "trimmer-fi"),
      (i.fi.stemmer =
        ((v = i.stemmerSupport.Among),
        (C = i.stemmerSupport.SnowballProgram),
        (e = new (function () {
          var n,
            t,
            l,
            o,
            r = [
              new v("pa", -1, 1),
              new v("sti", -1, 2),
              new v("kaan", -1, 1),
              new v("han", -1, 1),
              new v("kin", -1, 1),
              new v("hän", -1, 1),
              new v("kään", -1, 1),
              new v("ko", -1, 1),
              new v("pä", -1, 1),
              new v("kö", -1, 1),
            ],
            s = [
              new v("lla", -1, -1),
              new v("na", -1, -1),
              new v("ssa", -1, -1),
              new v("ta", -1, -1),
              new v("lta", 3, -1),
              new v("sta", 3, -1),
            ],
            a = [
              new v("llä", -1, -1),
              new v("nä", -1, -1),
              new v("ssä", -1, -1),
              new v("tä", -1, -1),
              new v("ltä", 3, -1),
              new v("stä", 3, -1),
            ],
            u = [new v("lle", -1, -1), new v("ine", -1, -1)],
            c = [
              new v("nsa", -1, 3),
              new v("mme", -1, 3),
              new v("nne", -1, 3),
              new v("ni", -1, 2),
              new v("si", -1, 1),
              new v("an", -1, 4),
              new v("en", -1, 6),
              new v("än", -1, 5),
              new v("nsä", -1, 3),
            ],
            i = [
              new v("aa", -1, -1),
              new v("ee", -1, -1),
              new v("ii", -1, -1),
              new v("oo", -1, -1),
              new v("uu", -1, -1),
              new v("ää", -1, -1),
              new v("öö", -1, -1),
            ],
            m = [
              new v("a", -1, 8),
              new v("lla", 0, -1),
              new v("na", 0, -1),
              new v("ssa", 0, -1),
              new v("ta", 0, -1),
              new v("lta", 4, -1),
              new v("sta", 4, -1),
              new v("tta", 4, 9),
              new v("lle", -1, -1),
              new v("ine", -1, -1),
              new v("ksi", -1, -1),
              new v("n", -1, 7),
              new v("han", 11, 1),
              new v("den", 11, -1, q),
              new v("seen", 11, -1, j),
              new v("hen", 11, 2),
              new v("tten", 11, -1, q),
              new v("hin", 11, 3),
              new v("siin", 11, -1, q),
              new v("hon", 11, 4),
              new v("hän", 11, 5),
              new v("hön", 11, 6),
              new v("ä", -1, 8),
              new v("llä", 22, -1),
              new v("nä", 22, -1),
              new v("ssä", 22, -1),
              new v("tä", 22, -1),
              new v("ltä", 26, -1),
              new v("stä", 26, -1),
              new v("ttä", 26, 9),
            ],
            w = [
              new v("eja", -1, -1),
              new v("mma", -1, 1),
              new v("imma", 1, -1),
              new v("mpa", -1, 1),
              new v("impa", 3, -1),
              new v("mmi", -1, 1),
              new v("immi", 5, -1),
              new v("mpi", -1, 1),
              new v("impi", 7, -1),
              new v("ejä", -1, -1),
              new v("mmä", -1, 1),
              new v("immä", 10, -1),
              new v("mpä", -1, 1),
              new v("impä", 12, -1),
            ],
            _ = [new v("i", -1, -1), new v("j", -1, -1)],
            k = [new v("mma", -1, 1), new v("imma", 0, -1)],
            b = [17, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 8],
            d = [17, 65, 16, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 8, 0, 32],
            e = [17, 65, 16, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 8, 0, 32],
            f = [17, 97, 24, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 8, 0, 32],
            h = new C();
          function p() {
            for (var i; (i = h.cursor), !h.in_grouping(d, 97, 246); ) {
              if ((h.cursor = i) >= h.limit) return !0;
              h.cursor++;
            }
            for (h.cursor = i; !h.out_grouping(d, 97, 246); ) {
              if (h.cursor >= h.limit) return !0;
              h.cursor++;
            }
            return !1;
          }
          function g() {
            var i, e;
            if (h.cursor >= o)
              if (
                ((e = h.limit_backward),
                (h.limit_backward = o),
                (h.ket = h.cursor),
                (i = h.find_among_b(r, 10)))
              ) {
                switch (((h.bra = h.cursor), (h.limit_backward = e), i)) {
                  case 1:
                    if (!h.in_grouping_b(f, 97, 246)) return;
                    break;
                  case 2:
                    if (!(l <= h.cursor)) return;
                }
                h.slice_del();
              } else h.limit_backward = e;
          }
          function j() {
            return h.find_among_b(i, 7);
          }
          function q() {
            return h.eq_s_b(1, "i") && h.in_grouping_b(e, 97, 246);
          }
          (this.setCurrent = function (i) {
            h.setCurrent(i);
          }),
            (this.getCurrent = function () {
              return h.getCurrent();
            }),
            (this.stem = function () {
              var i,
                e = h.cursor;
              return (
                (o = h.limit),
                (l = o),
                p() || ((o = h.cursor), p() || (l = h.cursor)),
                (n = !1),
                (h.limit_backward = e),
                (h.cursor = h.limit),
                g(),
                (h.cursor = h.limit),
                (function () {
                  var i, e, r;
                  if (h.cursor >= o)
                    if (
                      ((e = h.limit_backward),
                      (h.limit_backward = o),
                      (h.ket = h.cursor),
                      (i = h.find_among_b(c, 9)))
                    )
                      switch (((h.bra = h.cursor), (h.limit_backward = e), i)) {
                        case 1:
                          (r = h.limit - h.cursor),
                            h.eq_s_b(1, "k") ||
                              ((h.cursor = h.limit - r), h.slice_del());
                          break;
                        case 2:
                          h.slice_del(),
                            (h.ket = h.cursor),
                            h.eq_s_b(3, "kse") &&
                              ((h.bra = h.cursor), h.slice_from("ksi"));
                          break;
                        case 3:
                          h.slice_del();
                          break;
                        case 4:
                          h.find_among_b(s, 6) && h.slice_del();
                          break;
                        case 5:
                          h.find_among_b(a, 6) && h.slice_del();
                          break;
                        case 6:
                          h.find_among_b(u, 2) && h.slice_del();
                      }
                    else h.limit_backward = e;
                })(),
                (h.cursor = h.limit),
                (function () {
                  var i, e, r;
                  if (h.cursor >= o)
                    if (
                      ((e = h.limit_backward),
                      (h.limit_backward = o),
                      (h.ket = h.cursor),
                      (i = h.find_among_b(m, 30)))
                    ) {
                      switch (((h.bra = h.cursor), (h.limit_backward = e), i)) {
                        case 1:
                          if (!h.eq_s_b(1, "a")) return;
                          break;
                        case 2:
                        case 9:
                          if (!h.eq_s_b(1, "e")) return;
                          break;
                        case 3:
                          if (!h.eq_s_b(1, "i")) return;
                          break;
                        case 4:
                          if (!h.eq_s_b(1, "o")) return;
                          break;
                        case 5:
                          if (!h.eq_s_b(1, "ä")) return;
                          break;
                        case 6:
                          if (!h.eq_s_b(1, "ö")) return;
                          break;
                        case 7:
                          if (
                            ((r = h.limit - h.cursor),
                            !j() &&
                              ((h.cursor = h.limit - r), !h.eq_s_b(2, "ie")))
                          ) {
                            h.cursor = h.limit - r;
                            break;
                          }
                          if (
                            ((h.cursor = h.limit - r),
                            h.cursor <= h.limit_backward)
                          ) {
                            h.cursor = h.limit - r;
                            break;
                          }
                          h.cursor--, (h.bra = h.cursor);
                          break;
                        case 8:
                          if (
                            !h.in_grouping_b(d, 97, 246) ||
                            !h.out_grouping_b(d, 97, 246)
                          )
                            return;
                      }
                      h.slice_del(), (n = !0);
                    } else h.limit_backward = e;
                })(),
                (h.cursor = h.limit),
                (function () {
                  var i, e, r;
                  if (h.cursor >= l)
                    if (
                      ((e = h.limit_backward),
                      (h.limit_backward = l),
                      (h.ket = h.cursor),
                      (i = h.find_among_b(w, 14)))
                    ) {
                      if (
                        ((h.bra = h.cursor), (h.limit_backward = e), 1 == i)
                      ) {
                        if (((r = h.limit - h.cursor), h.eq_s_b(2, "po")))
                          return;
                        h.cursor = h.limit - r;
                      }
                      h.slice_del();
                    } else h.limit_backward = e;
                })(),
                (h.cursor = h.limit),
                (h.cursor =
                  (n
                    ? h.cursor >= o &&
                      ((i = h.limit_backward),
                      (h.limit_backward = o),
                      (h.ket = h.cursor),
                      h.find_among_b(_, 2)
                        ? ((h.bra = h.cursor),
                          (h.limit_backward = i),
                          h.slice_del())
                        : (h.limit_backward = i))
                    : ((h.cursor = h.limit),
                      (function () {
                        var i, e, r, n, t, s;
                        if (h.cursor >= o) {
                          if (
                            ((e = h.limit_backward),
                            (h.limit_backward = o),
                            (h.ket = h.cursor),
                            h.eq_s_b(1, "t") &&
                              ((h.bra = h.cursor),
                              (r = h.limit - h.cursor),
                              h.in_grouping_b(d, 97, 246) &&
                                ((h.cursor = h.limit - r),
                                h.slice_del(),
                                (h.limit_backward = e),
                                (n = h.limit - h.cursor),
                                h.cursor >= l &&
                                  ((h.cursor = l),
                                  (t = h.limit_backward),
                                  (h.limit_backward = h.cursor),
                                  (h.cursor = h.limit - n),
                                  (h.ket = h.cursor),
                                  (i = h.find_among_b(k, 2))))))
                          ) {
                            if (
                              ((h.bra = h.cursor),
                              (h.limit_backward = t),
                              1 == i)
                            ) {
                              if (((s = h.limit - h.cursor), h.eq_s_b(2, "po")))
                                return;
                              h.cursor = h.limit - s;
                            }
                            return h.slice_del();
                          }
                          h.limit_backward = e;
                        }
                      })()),
                  h.limit)),
                (function () {
                  var i, e, r, n;
                  if (h.cursor >= o) {
                    for (
                      i = h.limit_backward,
                        h.limit_backward = o,
                        e = h.limit - h.cursor,
                        j() &&
                          ((h.cursor = h.limit - e),
                          (h.ket = h.cursor),
                          h.cursor > h.limit_backward &&
                            (h.cursor--, (h.bra = h.cursor), h.slice_del())),
                        h.cursor = h.limit - e,
                        h.ket = h.cursor,
                        h.in_grouping_b(b, 97, 228) &&
                          ((h.bra = h.cursor),
                          h.out_grouping_b(d, 97, 246) && h.slice_del()),
                        h.cursor = h.limit - e,
                        h.ket = h.cursor,
                        h.eq_s_b(1, "j") &&
                          ((h.bra = h.cursor),
                          (r = h.limit - h.cursor),
                          h.eq_s_b(1, "o")
                            ? h.slice_del()
                            : ((h.cursor = h.limit - r),
                              h.eq_s_b(1, "u") && h.slice_del())),
                        h.cursor = h.limit - e,
                        h.ket = h.cursor,
                        h.eq_s_b(1, "o") &&
                          ((h.bra = h.cursor),
                          h.eq_s_b(1, "j") && h.slice_del()),
                        h.cursor = h.limit - e,
                        h.limit_backward = i;
                      ;

                    ) {
                      if (
                        ((n = h.limit - h.cursor), h.out_grouping_b(d, 97, 246))
                      ) {
                        h.cursor = h.limit - n;
                        break;
                      }
                      if (
                        ((h.cursor = h.limit - n), h.cursor <= h.limit_backward)
                      )
                        return;
                      h.cursor--;
                    }
                    (h.ket = h.cursor),
                      h.cursor > h.limit_backward &&
                        (h.cursor--,
                        (h.bra = h.cursor),
                        (t = h.slice_to()),
                        h.eq_v_b(t) && h.slice_del());
                  }
                })(),
                !0
              );
            });
        })()),
        function (i) {
          return "function" == typeof i.update
            ? i.update(function (i) {
                return e.setCurrent(i), e.stem(), e.getCurrent();
              })
            : (e.setCurrent(i), e.stem(), e.getCurrent());
        })),
      i.Pipeline.registerFunction(i.fi.stemmer, "stemmer-fi"),
      (i.fi.stopWordFilter = i.generateStopWordFilter(
        "ei eivät emme en et ette että he heidän heidät heihin heille heillä heiltä heissä heistä heitä hän häneen hänelle hänellä häneltä hänen hänessä hänestä hänet häntä itse ja johon joiden joihin joiksi joilla joille joilta joina joissa joista joita joka joksi jolla jolle jolta jona jonka jos jossa josta jota jotka kanssa keiden keihin keiksi keille keillä keiltä keinä keissä keistä keitä keneen keneksi kenelle kenellä keneltä kenen kenenä kenessä kenestä kenet ketkä ketkä ketä koska kuin kuka kun me meidän meidät meihin meille meillä meiltä meissä meistä meitä mihin miksi mikä mille millä miltä minkä minkä minua minulla minulle minulta minun minussa minusta minut minuun minä minä missä mistä mitkä mitä mukaan mutta ne niiden niihin niiksi niille niillä niiltä niin niin niinä niissä niistä niitä noiden noihin noiksi noilla noille noilta noin noina noissa noista noita nuo nyt näiden näihin näiksi näille näillä näiltä näinä näissä näistä näitä nämä ole olemme olen olet olette oli olimme olin olisi olisimme olisin olisit olisitte olisivat olit olitte olivat olla olleet ollut on ovat poikki se sekä sen siihen siinä siitä siksi sille sillä sillä siltä sinua sinulla sinulle sinulta sinun sinussa sinusta sinut sinuun sinä sinä sitä tai te teidän teidät teihin teille teillä teiltä teissä teistä teitä tuo tuohon tuoksi tuolla tuolle tuolta tuon tuona tuossa tuosta tuota tähän täksi tälle tällä tältä tämä tämän tänä tässä tästä tätä vaan vai vaikka yli".split(
          " "
        )
      )),
      i.Pipeline.registerFunction(i.fi.stopWordFilter, "stopWordFilter-fi");
  };
});
