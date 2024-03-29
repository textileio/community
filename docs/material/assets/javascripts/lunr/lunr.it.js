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
    var z, P, r;
    (e.it = function () {
      this.pipeline.reset(),
        this.pipeline.add(e.it.trimmer, e.it.stopWordFilter, e.it.stemmer),
        this.searchPipeline &&
          (this.searchPipeline.reset(), this.searchPipeline.add(e.it.stemmer));
    }),
      (e.it.wordCharacters =
        "A-Za-zªºÀ-ÖØ-öø-ʸˠ-ˤᴀ-ᴥᴬ-ᵜᵢ-ᵥᵫ-ᵷᵹ-ᶾḀ-ỿⁱⁿₐ-ₜKÅℲⅎⅠ-ↈⱠ-ⱿꜢ-ꞇꞋ-ꞭꞰ-ꞷꟷ-ꟿꬰ-ꭚꭜ-ꭤﬀ-ﬆＡ-Ｚａ-ｚ"),
      (e.it.trimmer = e.trimmerSupport.generateTrimmer(e.it.wordCharacters)),
      e.Pipeline.registerFunction(e.it.trimmer, "trimmer-it"),
      (e.it.stemmer =
        ((z = e.stemmerSupport.Among),
        (P = e.stemmerSupport.SnowballProgram),
        (r = new (function () {
          var o,
            t,
            s,
            a = [
              new z("", -1, 7),
              new z("qu", 0, 6),
              new z("á", 0, 1),
              new z("é", 0, 2),
              new z("í", 0, 3),
              new z("ó", 0, 4),
              new z("ú", 0, 5),
            ],
            u = [new z("", -1, 3), new z("I", 0, 1), new z("U", 0, 2)],
            c = [
              new z("la", -1, -1),
              new z("cela", 0, -1),
              new z("gliela", 0, -1),
              new z("mela", 0, -1),
              new z("tela", 0, -1),
              new z("vela", 0, -1),
              new z("le", -1, -1),
              new z("cele", 6, -1),
              new z("gliele", 6, -1),
              new z("mele", 6, -1),
              new z("tele", 6, -1),
              new z("vele", 6, -1),
              new z("ne", -1, -1),
              new z("cene", 12, -1),
              new z("gliene", 12, -1),
              new z("mene", 12, -1),
              new z("sene", 12, -1),
              new z("tene", 12, -1),
              new z("vene", 12, -1),
              new z("ci", -1, -1),
              new z("li", -1, -1),
              new z("celi", 20, -1),
              new z("glieli", 20, -1),
              new z("meli", 20, -1),
              new z("teli", 20, -1),
              new z("veli", 20, -1),
              new z("gli", 20, -1),
              new z("mi", -1, -1),
              new z("si", -1, -1),
              new z("ti", -1, -1),
              new z("vi", -1, -1),
              new z("lo", -1, -1),
              new z("celo", 31, -1),
              new z("glielo", 31, -1),
              new z("melo", 31, -1),
              new z("telo", 31, -1),
              new z("velo", 31, -1),
            ],
            w = [
              new z("ando", -1, 1),
              new z("endo", -1, 1),
              new z("ar", -1, 2),
              new z("er", -1, 2),
              new z("ir", -1, 2),
            ],
            r = [
              new z("ic", -1, -1),
              new z("abil", -1, -1),
              new z("os", -1, -1),
              new z("iv", -1, 1),
            ],
            n = [new z("ic", -1, 1), new z("abil", -1, 1), new z("iv", -1, 1)],
            i = [
              new z("ica", -1, 1),
              new z("logia", -1, 3),
              new z("osa", -1, 1),
              new z("ista", -1, 1),
              new z("iva", -1, 9),
              new z("anza", -1, 1),
              new z("enza", -1, 5),
              new z("ice", -1, 1),
              new z("atrice", 7, 1),
              new z("iche", -1, 1),
              new z("logie", -1, 3),
              new z("abile", -1, 1),
              new z("ibile", -1, 1),
              new z("usione", -1, 4),
              new z("azione", -1, 2),
              new z("uzione", -1, 4),
              new z("atore", -1, 2),
              new z("ose", -1, 1),
              new z("ante", -1, 1),
              new z("mente", -1, 1),
              new z("amente", 19, 7),
              new z("iste", -1, 1),
              new z("ive", -1, 9),
              new z("anze", -1, 1),
              new z("enze", -1, 5),
              new z("ici", -1, 1),
              new z("atrici", 25, 1),
              new z("ichi", -1, 1),
              new z("abili", -1, 1),
              new z("ibili", -1, 1),
              new z("ismi", -1, 1),
              new z("usioni", -1, 4),
              new z("azioni", -1, 2),
              new z("uzioni", -1, 4),
              new z("atori", -1, 2),
              new z("osi", -1, 1),
              new z("anti", -1, 1),
              new z("amenti", -1, 6),
              new z("imenti", -1, 6),
              new z("isti", -1, 1),
              new z("ivi", -1, 9),
              new z("ico", -1, 1),
              new z("ismo", -1, 1),
              new z("oso", -1, 1),
              new z("amento", -1, 6),
              new z("imento", -1, 6),
              new z("ivo", -1, 9),
              new z("ità", -1, 8),
              new z("istà", -1, 1),
              new z("istè", -1, 1),
              new z("istì", -1, 1),
            ],
            l = [
              new z("isca", -1, 1),
              new z("enda", -1, 1),
              new z("ata", -1, 1),
              new z("ita", -1, 1),
              new z("uta", -1, 1),
              new z("ava", -1, 1),
              new z("eva", -1, 1),
              new z("iva", -1, 1),
              new z("erebbe", -1, 1),
              new z("irebbe", -1, 1),
              new z("isce", -1, 1),
              new z("ende", -1, 1),
              new z("are", -1, 1),
              new z("ere", -1, 1),
              new z("ire", -1, 1),
              new z("asse", -1, 1),
              new z("ate", -1, 1),
              new z("avate", 16, 1),
              new z("evate", 16, 1),
              new z("ivate", 16, 1),
              new z("ete", -1, 1),
              new z("erete", 20, 1),
              new z("irete", 20, 1),
              new z("ite", -1, 1),
              new z("ereste", -1, 1),
              new z("ireste", -1, 1),
              new z("ute", -1, 1),
              new z("erai", -1, 1),
              new z("irai", -1, 1),
              new z("isci", -1, 1),
              new z("endi", -1, 1),
              new z("erei", -1, 1),
              new z("irei", -1, 1),
              new z("assi", -1, 1),
              new z("ati", -1, 1),
              new z("iti", -1, 1),
              new z("eresti", -1, 1),
              new z("iresti", -1, 1),
              new z("uti", -1, 1),
              new z("avi", -1, 1),
              new z("evi", -1, 1),
              new z("ivi", -1, 1),
              new z("isco", -1, 1),
              new z("ando", -1, 1),
              new z("endo", -1, 1),
              new z("Yamo", -1, 1),
              new z("iamo", -1, 1),
              new z("avamo", -1, 1),
              new z("evamo", -1, 1),
              new z("ivamo", -1, 1),
              new z("eremo", -1, 1),
              new z("iremo", -1, 1),
              new z("assimo", -1, 1),
              new z("ammo", -1, 1),
              new z("emmo", -1, 1),
              new z("eremmo", 54, 1),
              new z("iremmo", 54, 1),
              new z("immo", -1, 1),
              new z("ano", -1, 1),
              new z("iscano", 58, 1),
              new z("avano", 58, 1),
              new z("evano", 58, 1),
              new z("ivano", 58, 1),
              new z("eranno", -1, 1),
              new z("iranno", -1, 1),
              new z("ono", -1, 1),
              new z("iscono", 65, 1),
              new z("arono", 65, 1),
              new z("erono", 65, 1),
              new z("irono", 65, 1),
              new z("erebbero", -1, 1),
              new z("irebbero", -1, 1),
              new z("assero", -1, 1),
              new z("essero", -1, 1),
              new z("issero", -1, 1),
              new z("ato", -1, 1),
              new z("ito", -1, 1),
              new z("uto", -1, 1),
              new z("avo", -1, 1),
              new z("evo", -1, 1),
              new z("ivo", -1, 1),
              new z("ar", -1, 1),
              new z("ir", -1, 1),
              new z("erà", -1, 1),
              new z("irà", -1, 1),
              new z("erò", -1, 1),
              new z("irò", -1, 1),
            ],
            m = [
              17, 65, 16, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 128, 128, 8, 2, 1,
            ],
            f = [17, 65, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 128, 128, 8, 2],
            v = [17],
            b = new P();
          function d(e, r, n) {
            return (
              !(
                !b.eq_s(1, e) ||
                ((b.ket = b.cursor), !b.in_grouping(m, 97, 249))
              ) && (b.slice_from(r), (b.cursor = n), !0)
            );
          }
          function _(e) {
            if (((b.cursor = e), !b.in_grouping(m, 97, 249))) return !1;
            for (; !b.out_grouping(m, 97, 249); ) {
              if (b.cursor >= b.limit) return !1;
              b.cursor++;
            }
            return !0;
          }
          function g() {
            var e,
              r = b.cursor;
            if (
              !(function () {
                if (b.in_grouping(m, 97, 249)) {
                  var e = b.cursor;
                  if (b.out_grouping(m, 97, 249)) {
                    for (; !b.in_grouping(m, 97, 249); ) {
                      if (b.cursor >= b.limit) return _(e);
                      b.cursor++;
                    }
                    return !0;
                  }
                  return _(e);
                }
                return !1;
              })()
            ) {
              if (((b.cursor = r), !b.out_grouping(m, 97, 249))) return;
              if (((e = b.cursor), b.out_grouping(m, 97, 249))) {
                for (; !b.in_grouping(m, 97, 249); ) {
                  if (b.cursor >= b.limit)
                    return (
                      (b.cursor = e),
                      void (
                        b.in_grouping(m, 97, 249) &&
                        b.cursor < b.limit &&
                        b.cursor++
                      )
                    );
                  b.cursor++;
                }
                return void (s = b.cursor);
              }
              if (
                ((b.cursor = e),
                !b.in_grouping(m, 97, 249) || b.cursor >= b.limit)
              )
                return;
              b.cursor++;
            }
            s = b.cursor;
          }
          function p() {
            for (; !b.in_grouping(m, 97, 249); ) {
              if (b.cursor >= b.limit) return !1;
              b.cursor++;
            }
            for (; !b.out_grouping(m, 97, 249); ) {
              if (b.cursor >= b.limit) return !1;
              b.cursor++;
            }
            return !0;
          }
          function k() {
            return s <= b.cursor;
          }
          function h() {
            return o <= b.cursor;
          }
          function q() {
            var e;
            if (((b.ket = b.cursor), !(e = b.find_among_b(i, 51)))) return !1;
            switch (((b.bra = b.cursor), e)) {
              case 1:
                if (!h()) return !1;
                b.slice_del();
                break;
              case 2:
                if (!h()) return !1;
                b.slice_del(),
                  (b.ket = b.cursor),
                  b.eq_s_b(2, "ic") &&
                    ((b.bra = b.cursor), h() && b.slice_del());
                break;
              case 3:
                if (!h()) return !1;
                b.slice_from("log");
                break;
              case 4:
                if (!h()) return !1;
                b.slice_from("u");
                break;
              case 5:
                if (!h()) return !1;
                b.slice_from("ente");
                break;
              case 6:
                if (!k()) return !1;
                b.slice_del();
                break;
              case 7:
                if (!(t <= b.cursor)) return !1;
                b.slice_del(),
                  (b.ket = b.cursor),
                  (e = b.find_among_b(r, 4)) &&
                    ((b.bra = b.cursor),
                    h() &&
                      (b.slice_del(),
                      1 == e &&
                        ((b.ket = b.cursor),
                        b.eq_s_b(2, "at") &&
                          ((b.bra = b.cursor), h() && b.slice_del()))));
                break;
              case 8:
                if (!h()) return !1;
                b.slice_del(),
                  (b.ket = b.cursor),
                  (e = b.find_among_b(n, 3)) &&
                    ((b.bra = b.cursor), 1 == e && h() && b.slice_del());
                break;
              case 9:
                if (!h()) return !1;
                b.slice_del(),
                  (b.ket = b.cursor),
                  b.eq_s_b(2, "at") &&
                    ((b.bra = b.cursor),
                    h() &&
                      (b.slice_del(),
                      (b.ket = b.cursor),
                      b.eq_s_b(2, "ic") &&
                        ((b.bra = b.cursor), h() && b.slice_del())));
            }
            return !0;
          }
          function C() {
            var e;
            (e = b.limit - b.cursor),
              (b.ket = b.cursor),
              b.in_grouping_b(f, 97, 242) &&
              ((b.bra = b.cursor),
              k() &&
                (b.slice_del(),
                (b.ket = b.cursor),
                b.eq_s_b(1, "i") && ((b.bra = b.cursor), k())))
                ? b.slice_del()
                : (b.cursor = b.limit - e),
              (b.ket = b.cursor),
              b.eq_s_b(1, "h") &&
                ((b.bra = b.cursor),
                b.in_grouping_b(v, 99, 103) && k() && b.slice_del());
          }
          (this.setCurrent = function (e) {
            b.setCurrent(e);
          }),
            (this.getCurrent = function () {
              return b.getCurrent();
            }),
            (this.stem = function () {
              var e,
                r,
                n,
                i = b.cursor;
              return (
                (function () {
                  for (var e, r, n, i, o = b.cursor; ; ) {
                    if (((b.bra = b.cursor), (e = b.find_among(a, 7))))
                      switch (((b.ket = b.cursor), e)) {
                        case 1:
                          b.slice_from("à");
                          continue;
                        case 2:
                          b.slice_from("è");
                          continue;
                        case 3:
                          b.slice_from("ì");
                          continue;
                        case 4:
                          b.slice_from("ò");
                          continue;
                        case 5:
                          b.slice_from("ù");
                          continue;
                        case 6:
                          b.slice_from("qU");
                          continue;
                        case 7:
                          if (b.cursor >= b.limit) break;
                          b.cursor++;
                          continue;
                      }
                    break;
                  }
                  for (b.cursor = o; ; )
                    for (r = b.cursor; ; ) {
                      if (((n = b.cursor), b.in_grouping(m, 97, 249))) {
                        if (
                          ((b.bra = b.cursor), (i = b.cursor), d("u", "U", n))
                        )
                          break;
                        if (((b.cursor = i), d("i", "I", n))) break;
                      }
                      if (((b.cursor = n), b.cursor >= b.limit))
                        return (b.cursor = r);
                      b.cursor++;
                    }
                })(),
                (b.cursor = i),
                (e = b.cursor),
                (s = b.limit),
                (o = t = s),
                g(),
                (b.cursor = e),
                p() && ((t = b.cursor), p() && (o = b.cursor)),
                (b.limit_backward = i),
                (b.cursor = b.limit),
                (function () {
                  var e;
                  if (
                    ((b.ket = b.cursor),
                    b.find_among_b(c, 37) &&
                      ((b.bra = b.cursor), (e = b.find_among_b(w, 5)) && k()))
                  )
                    switch (e) {
                      case 1:
                        b.slice_del();
                        break;
                      case 2:
                        b.slice_from("e");
                    }
                })(),
                (b.cursor = b.limit),
                q() ||
                  ((b.cursor = b.limit),
                  b.cursor >= s &&
                    ((n = b.limit_backward),
                    (b.limit_backward = s),
                    (b.ket = b.cursor),
                    (r = b.find_among_b(l, 87)) &&
                      ((b.bra = b.cursor), 1 == r && b.slice_del()),
                    (b.limit_backward = n))),
                (b.cursor = b.limit),
                C(),
                (b.cursor = b.limit_backward),
                (function () {
                  for (var e; (b.bra = b.cursor), (e = b.find_among(u, 3)); )
                    switch (((b.ket = b.cursor), e)) {
                      case 1:
                        b.slice_from("i");
                        break;
                      case 2:
                        b.slice_from("u");
                        break;
                      case 3:
                        if (b.cursor >= b.limit) return;
                        b.cursor++;
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
      e.Pipeline.registerFunction(e.it.stemmer, "stemmer-it"),
      (e.it.stopWordFilter = e.generateStopWordFilter(
        "a abbia abbiamo abbiano abbiate ad agl agli ai al all alla alle allo anche avemmo avendo avesse avessero avessi avessimo aveste avesti avete aveva avevamo avevano avevate avevi avevo avrai avranno avrebbe avrebbero avrei avremmo avremo avreste avresti avrete avrà avrò avuta avute avuti avuto c che chi ci coi col come con contro cui da dagl dagli dai dal dall dalla dalle dallo degl degli dei del dell della delle dello di dov dove e ebbe ebbero ebbi ed era erano eravamo eravate eri ero essendo faccia facciamo facciano facciate faccio facemmo facendo facesse facessero facessi facessimo faceste facesti faceva facevamo facevano facevate facevi facevo fai fanno farai faranno farebbe farebbero farei faremmo faremo fareste faresti farete farà farò fece fecero feci fosse fossero fossi fossimo foste fosti fu fui fummo furono gli ha hai hanno ho i il in io l la le lei li lo loro lui ma mi mia mie miei mio ne negl negli nei nel nell nella nelle nello noi non nostra nostre nostri nostro o per perché più quale quanta quante quanti quanto quella quelle quelli quello questa queste questi questo sarai saranno sarebbe sarebbero sarei saremmo saremo sareste saresti sarete sarà sarò se sei si sia siamo siano siate siete sono sta stai stando stanno starai staranno starebbe starebbero starei staremmo staremo stareste staresti starete starà starò stava stavamo stavano stavate stavi stavo stemmo stesse stessero stessi stessimo steste stesti stette stettero stetti stia stiamo stiano stiate sto su sua sue sugl sugli sui sul sull sulla sulle sullo suo suoi ti tra tu tua tue tuo tuoi tutti tutto un una uno vi voi vostra vostre vostri vostro è".split(
          " "
        )
      )),
      e.Pipeline.registerFunction(e.it.stopWordFilter, "stopWordFilter-it");
  };
});
