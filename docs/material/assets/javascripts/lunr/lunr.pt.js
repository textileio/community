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
    var j, C, r;
    (e.pt = function () {
      this.pipeline.reset(),
        this.pipeline.add(e.pt.trimmer, e.pt.stopWordFilter, e.pt.stemmer),
        this.searchPipeline &&
          (this.searchPipeline.reset(), this.searchPipeline.add(e.pt.stemmer));
    }),
      (e.pt.wordCharacters =
        "A-Za-zªºÀ-ÖØ-öø-ʸˠ-ˤᴀ-ᴥᴬ-ᵜᵢ-ᵥᵫ-ᵷᵹ-ᶾḀ-ỿⁱⁿₐ-ₜKÅℲⅎⅠ-ↈⱠ-ⱿꜢ-ꞇꞋ-ꞭꞰ-ꞷꟷ-ꟿꬰ-ꭚꭜ-ꭤﬀ-ﬆＡ-Ｚａ-ｚ"),
      (e.pt.trimmer = e.trimmerSupport.generateTrimmer(e.pt.wordCharacters)),
      e.Pipeline.registerFunction(e.pt.trimmer, "trimmer-pt"),
      (e.pt.stemmer =
        ((j = e.stemmerSupport.Among),
        (C = e.stemmerSupport.SnowballProgram),
        (r = new (function () {
          var s,
            n,
            i,
            o = [new j("", -1, 3), new j("ã", 0, 1), new j("õ", 0, 2)],
            a = [new j("", -1, 3), new j("a~", 0, 1), new j("o~", 0, 2)],
            r = [
              new j("ic", -1, -1),
              new j("ad", -1, -1),
              new j("os", -1, -1),
              new j("iv", -1, 1),
            ],
            t = [
              new j("ante", -1, 1),
              new j("avel", -1, 1),
              new j("ível", -1, 1),
            ],
            u = [new j("ic", -1, 1), new j("abil", -1, 1), new j("iv", -1, 1)],
            w = [
              new j("ica", -1, 1),
              new j("ância", -1, 1),
              new j("ência", -1, 4),
              new j("ira", -1, 9),
              new j("adora", -1, 1),
              new j("osa", -1, 1),
              new j("ista", -1, 1),
              new j("iva", -1, 8),
              new j("eza", -1, 1),
              new j("logía", -1, 2),
              new j("idade", -1, 7),
              new j("ante", -1, 1),
              new j("mente", -1, 6),
              new j("amente", 12, 5),
              new j("ável", -1, 1),
              new j("ível", -1, 1),
              new j("ución", -1, 3),
              new j("ico", -1, 1),
              new j("ismo", -1, 1),
              new j("oso", -1, 1),
              new j("amento", -1, 1),
              new j("imento", -1, 1),
              new j("ivo", -1, 8),
              new j("aça~o", -1, 1),
              new j("ador", -1, 1),
              new j("icas", -1, 1),
              new j("ências", -1, 4),
              new j("iras", -1, 9),
              new j("adoras", -1, 1),
              new j("osas", -1, 1),
              new j("istas", -1, 1),
              new j("ivas", -1, 8),
              new j("ezas", -1, 1),
              new j("logías", -1, 2),
              new j("idades", -1, 7),
              new j("uciones", -1, 3),
              new j("adores", -1, 1),
              new j("antes", -1, 1),
              new j("aço~es", -1, 1),
              new j("icos", -1, 1),
              new j("ismos", -1, 1),
              new j("osos", -1, 1),
              new j("amentos", -1, 1),
              new j("imentos", -1, 1),
              new j("ivos", -1, 8),
            ],
            m = [
              new j("ada", -1, 1),
              new j("ida", -1, 1),
              new j("ia", -1, 1),
              new j("aria", 2, 1),
              new j("eria", 2, 1),
              new j("iria", 2, 1),
              new j("ara", -1, 1),
              new j("era", -1, 1),
              new j("ira", -1, 1),
              new j("ava", -1, 1),
              new j("asse", -1, 1),
              new j("esse", -1, 1),
              new j("isse", -1, 1),
              new j("aste", -1, 1),
              new j("este", -1, 1),
              new j("iste", -1, 1),
              new j("ei", -1, 1),
              new j("arei", 16, 1),
              new j("erei", 16, 1),
              new j("irei", 16, 1),
              new j("am", -1, 1),
              new j("iam", 20, 1),
              new j("ariam", 21, 1),
              new j("eriam", 21, 1),
              new j("iriam", 21, 1),
              new j("aram", 20, 1),
              new j("eram", 20, 1),
              new j("iram", 20, 1),
              new j("avam", 20, 1),
              new j("em", -1, 1),
              new j("arem", 29, 1),
              new j("erem", 29, 1),
              new j("irem", 29, 1),
              new j("assem", 29, 1),
              new j("essem", 29, 1),
              new j("issem", 29, 1),
              new j("ado", -1, 1),
              new j("ido", -1, 1),
              new j("ando", -1, 1),
              new j("endo", -1, 1),
              new j("indo", -1, 1),
              new j("ara~o", -1, 1),
              new j("era~o", -1, 1),
              new j("ira~o", -1, 1),
              new j("ar", -1, 1),
              new j("er", -1, 1),
              new j("ir", -1, 1),
              new j("as", -1, 1),
              new j("adas", 47, 1),
              new j("idas", 47, 1),
              new j("ias", 47, 1),
              new j("arias", 50, 1),
              new j("erias", 50, 1),
              new j("irias", 50, 1),
              new j("aras", 47, 1),
              new j("eras", 47, 1),
              new j("iras", 47, 1),
              new j("avas", 47, 1),
              new j("es", -1, 1),
              new j("ardes", 58, 1),
              new j("erdes", 58, 1),
              new j("irdes", 58, 1),
              new j("ares", 58, 1),
              new j("eres", 58, 1),
              new j("ires", 58, 1),
              new j("asses", 58, 1),
              new j("esses", 58, 1),
              new j("isses", 58, 1),
              new j("astes", 58, 1),
              new j("estes", 58, 1),
              new j("istes", 58, 1),
              new j("is", -1, 1),
              new j("ais", 71, 1),
              new j("eis", 71, 1),
              new j("areis", 73, 1),
              new j("ereis", 73, 1),
              new j("ireis", 73, 1),
              new j("áreis", 73, 1),
              new j("éreis", 73, 1),
              new j("íreis", 73, 1),
              new j("ásseis", 73, 1),
              new j("ésseis", 73, 1),
              new j("ísseis", 73, 1),
              new j("áveis", 73, 1),
              new j("íeis", 73, 1),
              new j("aríeis", 84, 1),
              new j("eríeis", 84, 1),
              new j("iríeis", 84, 1),
              new j("ados", -1, 1),
              new j("idos", -1, 1),
              new j("amos", -1, 1),
              new j("áramos", 90, 1),
              new j("éramos", 90, 1),
              new j("íramos", 90, 1),
              new j("ávamos", 90, 1),
              new j("íamos", 90, 1),
              new j("aríamos", 95, 1),
              new j("eríamos", 95, 1),
              new j("iríamos", 95, 1),
              new j("emos", -1, 1),
              new j("aremos", 99, 1),
              new j("eremos", 99, 1),
              new j("iremos", 99, 1),
              new j("ássemos", 99, 1),
              new j("êssemos", 99, 1),
              new j("íssemos", 99, 1),
              new j("imos", -1, 1),
              new j("armos", -1, 1),
              new j("ermos", -1, 1),
              new j("irmos", -1, 1),
              new j("ámos", -1, 1),
              new j("arás", -1, 1),
              new j("erás", -1, 1),
              new j("irás", -1, 1),
              new j("eu", -1, 1),
              new j("iu", -1, 1),
              new j("ou", -1, 1),
              new j("ará", -1, 1),
              new j("erá", -1, 1),
              new j("irá", -1, 1),
            ],
            c = [
              new j("a", -1, 1),
              new j("i", -1, 1),
              new j("o", -1, 1),
              new j("os", -1, 1),
              new j("á", -1, 1),
              new j("í", -1, 1),
              new j("ó", -1, 1),
            ],
            l = [
              new j("e", -1, 1),
              new j("ç", -1, 2),
              new j("é", -1, 1),
              new j("ê", -1, 1),
            ],
            f = [
              17, 65, 16, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 19, 12, 2,
            ],
            d = new C();
          function v() {
            if (d.out_grouping(f, 97, 250)) {
              for (; !d.in_grouping(f, 97, 250); ) {
                if (d.cursor >= d.limit) return !0;
                d.cursor++;
              }
              return !1;
            }
            return !0;
          }
          function p() {
            var e,
              r,
              s = d.cursor;
            if (d.in_grouping(f, 97, 250))
              if (((e = d.cursor), v())) {
                if (
                  ((d.cursor = e),
                  (function () {
                    if (d.in_grouping(f, 97, 250))
                      for (; !d.out_grouping(f, 97, 250); ) {
                        if (d.cursor >= d.limit) return !1;
                        d.cursor++;
                      }
                    return (i = d.cursor), !0;
                  })())
                )
                  return;
              } else i = d.cursor;
            if (((d.cursor = s), d.out_grouping(f, 97, 250))) {
              if (((r = d.cursor), v())) {
                if (
                  ((d.cursor = r),
                  !d.in_grouping(f, 97, 250) || d.cursor >= d.limit)
                )
                  return;
                d.cursor++;
              }
              i = d.cursor;
            }
          }
          function _() {
            for (; !d.in_grouping(f, 97, 250); ) {
              if (d.cursor >= d.limit) return !1;
              d.cursor++;
            }
            for (; !d.out_grouping(f, 97, 250); ) {
              if (d.cursor >= d.limit) return !1;
              d.cursor++;
            }
            return !0;
          }
          function h() {
            return i <= d.cursor;
          }
          function b() {
            return s <= d.cursor;
          }
          function g() {
            var e;
            if (((d.ket = d.cursor), !(e = d.find_among_b(w, 45)))) return !1;
            switch (((d.bra = d.cursor), e)) {
              case 1:
                if (!b()) return !1;
                d.slice_del();
                break;
              case 2:
                if (!b()) return !1;
                d.slice_from("log");
                break;
              case 3:
                if (!b()) return !1;
                d.slice_from("u");
                break;
              case 4:
                if (!b()) return !1;
                d.slice_from("ente");
                break;
              case 5:
                if (!(n <= d.cursor)) return !1;
                d.slice_del(),
                  (d.ket = d.cursor),
                  (e = d.find_among_b(r, 4)) &&
                    ((d.bra = d.cursor),
                    b() &&
                      (d.slice_del(),
                      1 == e &&
                        ((d.ket = d.cursor),
                        d.eq_s_b(2, "at") &&
                          ((d.bra = d.cursor), b() && d.slice_del()))));
                break;
              case 6:
                if (!b()) return !1;
                d.slice_del(),
                  (d.ket = d.cursor),
                  (e = d.find_among_b(t, 3)) &&
                    ((d.bra = d.cursor), 1 == e && b() && d.slice_del());
                break;
              case 7:
                if (!b()) return !1;
                d.slice_del(),
                  (d.ket = d.cursor),
                  (e = d.find_among_b(u, 3)) &&
                    ((d.bra = d.cursor), 1 == e && b() && d.slice_del());
                break;
              case 8:
                if (!b()) return !1;
                d.slice_del(),
                  (d.ket = d.cursor),
                  d.eq_s_b(2, "at") &&
                    ((d.bra = d.cursor), b() && d.slice_del());
                break;
              case 9:
                if (!h() || !d.eq_s_b(1, "e")) return !1;
                d.slice_from("ir");
            }
            return !0;
          }
          function k(e, r) {
            if (d.eq_s_b(1, e)) {
              d.bra = d.cursor;
              var s = d.limit - d.cursor;
              if (d.eq_s_b(1, r))
                return (d.cursor = d.limit - s), h() && d.slice_del(), !1;
            }
            return !0;
          }
          function q() {
            if (
              !g() &&
              ((d.cursor = d.limit),
              !(function () {
                var e, r;
                if (d.cursor >= i) {
                  if (
                    ((r = d.limit_backward),
                    (d.limit_backward = i),
                    (d.ket = d.cursor),
                    (e = d.find_among_b(m, 120)))
                  )
                    return (
                      (d.bra = d.cursor),
                      1 == e && d.slice_del(),
                      (d.limit_backward = r),
                      !0
                    );
                  d.limit_backward = r;
                }
                return !1;
              })())
            )
              return (
                (d.cursor = d.limit),
                (d.ket = d.cursor),
                void (
                  (e = d.find_among_b(c, 7)) &&
                  ((d.bra = d.cursor), 1 == e && h() && d.slice_del())
                )
              );
            var e;
            (d.cursor = d.limit),
              (d.ket = d.cursor),
              d.eq_s_b(1, "i") &&
                ((d.bra = d.cursor),
                d.eq_s_b(1, "c") &&
                  ((d.cursor = d.limit), h() && d.slice_del()));
          }
          (this.setCurrent = function (e) {
            d.setCurrent(e);
          }),
            (this.getCurrent = function () {
              return d.getCurrent();
            }),
            (this.stem = function () {
              var e,
                r = d.cursor;
              return (
                (function () {
                  for (var e; ; ) {
                    if (((d.bra = d.cursor), (e = d.find_among(o, 3))))
                      switch (((d.ket = d.cursor), e)) {
                        case 1:
                          d.slice_from("a~");
                          continue;
                        case 2:
                          d.slice_from("o~");
                          continue;
                        case 3:
                          if (d.cursor >= d.limit) break;
                          d.cursor++;
                          continue;
                      }
                    break;
                  }
                })(),
                (d.cursor = r),
                (e = d.cursor),
                (i = d.limit),
                (s = n = i),
                p(),
                (d.cursor = e),
                _() && ((n = d.cursor), _() && (s = d.cursor)),
                (d.limit_backward = r),
                (d.cursor = d.limit),
                q(),
                (d.cursor = d.limit),
                (function () {
                  var e;
                  if (((d.ket = d.cursor), (e = d.find_among_b(l, 4))))
                    switch (((d.bra = d.cursor), e)) {
                      case 1:
                        h() &&
                          (d.slice_del(),
                          (d.ket = d.cursor),
                          d.limit,
                          d.cursor,
                          k("u", "g") && k("i", "c"));
                        break;
                      case 2:
                        d.slice_from("c");
                    }
                })(),
                (d.cursor = d.limit_backward),
                (function () {
                  for (var e; ; ) {
                    if (((d.bra = d.cursor), (e = d.find_among(a, 3))))
                      switch (((d.ket = d.cursor), e)) {
                        case 1:
                          d.slice_from("ã");
                          continue;
                        case 2:
                          d.slice_from("õ");
                          continue;
                        case 3:
                          if (d.cursor >= d.limit) break;
                          d.cursor++;
                          continue;
                      }
                    break;
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
      e.Pipeline.registerFunction(e.pt.stemmer, "stemmer-pt"),
      (e.pt.stopWordFilter = e.generateStopWordFilter(
        "a ao aos aquela aquelas aquele aqueles aquilo as até com como da das de dela delas dele deles depois do dos e ela elas ele eles em entre era eram essa essas esse esses esta estamos estas estava estavam este esteja estejam estejamos estes esteve estive estivemos estiver estivera estiveram estiverem estivermos estivesse estivessem estivéramos estivéssemos estou está estávamos estão eu foi fomos for fora foram forem formos fosse fossem fui fôramos fôssemos haja hajam hajamos havemos hei houve houvemos houver houvera houveram houverei houverem houveremos houveria houveriam houvermos houverá houverão houveríamos houvesse houvessem houvéramos houvéssemos há hão isso isto já lhe lhes mais mas me mesmo meu meus minha minhas muito na nas nem no nos nossa nossas nosso nossos num numa não nós o os ou para pela pelas pelo pelos por qual quando que quem se seja sejam sejamos sem serei seremos seria seriam será serão seríamos seu seus somos sou sua suas são só também te tem temos tenha tenham tenhamos tenho terei teremos teria teriam terá terão teríamos teu teus teve tinha tinham tive tivemos tiver tivera tiveram tiverem tivermos tivesse tivessem tivéramos tivéssemos tu tua tuas tém tínhamos um uma você vocês vos à às éramos".split(
          " "
        )
      )),
      e.Pipeline.registerFunction(e.pt.stopWordFilter, "stopWordFilter-pt");
  };
});
