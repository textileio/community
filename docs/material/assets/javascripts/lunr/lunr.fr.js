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
    var r, y, s;
    (e.fr = function () {
      this.pipeline.reset(),
        this.pipeline.add(e.fr.trimmer, e.fr.stopWordFilter, e.fr.stemmer),
        this.searchPipeline &&
          (this.searchPipeline.reset(), this.searchPipeline.add(e.fr.stemmer));
    }),
      (e.fr.wordCharacters =
        "A-Za-zªºÀ-ÖØ-öø-ʸˠ-ˤᴀ-ᴥᴬ-ᵜᵢ-ᵥᵫ-ᵷᵹ-ᶾḀ-ỿⁱⁿₐ-ₜKÅℲⅎⅠ-ↈⱠ-ⱿꜢ-ꞇꞋ-ꞭꞰ-ꞷꟷ-ꟿꬰ-ꭚꭜ-ꭤﬀ-ﬆＡ-Ｚａ-ｚ"),
      (e.fr.trimmer = e.trimmerSupport.generateTrimmer(e.fr.wordCharacters)),
      e.Pipeline.registerFunction(e.fr.trimmer, "trimmer-fr"),
      (e.fr.stemmer =
        ((r = e.stemmerSupport.Among),
        (y = e.stemmerSupport.SnowballProgram),
        (s = new (function () {
          var s,
            i,
            t,
            n = [
              new r("col", -1, -1),
              new r("par", -1, -1),
              new r("tap", -1, -1),
            ],
            u = [
              new r("", -1, 4),
              new r("I", 0, 1),
              new r("U", 0, 2),
              new r("Y", 0, 3),
            ],
            o = [
              new r("iqU", -1, 3),
              new r("abl", -1, 3),
              new r("Ièr", -1, 4),
              new r("ièr", -1, 4),
              new r("eus", -1, 2),
              new r("iv", -1, 1),
            ],
            c = [new r("ic", -1, 2), new r("abil", -1, 1), new r("iv", -1, 3)],
            a = [
              new r("iqUe", -1, 1),
              new r("atrice", -1, 2),
              new r("ance", -1, 1),
              new r("ence", -1, 5),
              new r("logie", -1, 3),
              new r("able", -1, 1),
              new r("isme", -1, 1),
              new r("euse", -1, 11),
              new r("iste", -1, 1),
              new r("ive", -1, 8),
              new r("if", -1, 8),
              new r("usion", -1, 4),
              new r("ation", -1, 2),
              new r("ution", -1, 4),
              new r("ateur", -1, 2),
              new r("iqUes", -1, 1),
              new r("atrices", -1, 2),
              new r("ances", -1, 1),
              new r("ences", -1, 5),
              new r("logies", -1, 3),
              new r("ables", -1, 1),
              new r("ismes", -1, 1),
              new r("euses", -1, 11),
              new r("istes", -1, 1),
              new r("ives", -1, 8),
              new r("ifs", -1, 8),
              new r("usions", -1, 4),
              new r("ations", -1, 2),
              new r("utions", -1, 4),
              new r("ateurs", -1, 2),
              new r("ments", -1, 15),
              new r("ements", 30, 6),
              new r("issements", 31, 12),
              new r("ités", -1, 7),
              new r("ment", -1, 15),
              new r("ement", 34, 6),
              new r("issement", 35, 12),
              new r("amment", 34, 13),
              new r("emment", 34, 14),
              new r("aux", -1, 10),
              new r("eaux", 39, 9),
              new r("eux", -1, 1),
              new r("ité", -1, 7),
            ],
            l = [
              new r("ira", -1, 1),
              new r("ie", -1, 1),
              new r("isse", -1, 1),
              new r("issante", -1, 1),
              new r("i", -1, 1),
              new r("irai", 4, 1),
              new r("ir", -1, 1),
              new r("iras", -1, 1),
              new r("ies", -1, 1),
              new r("îmes", -1, 1),
              new r("isses", -1, 1),
              new r("issantes", -1, 1),
              new r("îtes", -1, 1),
              new r("is", -1, 1),
              new r("irais", 13, 1),
              new r("issais", 13, 1),
              new r("irions", -1, 1),
              new r("issions", -1, 1),
              new r("irons", -1, 1),
              new r("issons", -1, 1),
              new r("issants", -1, 1),
              new r("it", -1, 1),
              new r("irait", 21, 1),
              new r("issait", 21, 1),
              new r("issant", -1, 1),
              new r("iraIent", -1, 1),
              new r("issaIent", -1, 1),
              new r("irent", -1, 1),
              new r("issent", -1, 1),
              new r("iront", -1, 1),
              new r("ît", -1, 1),
              new r("iriez", -1, 1),
              new r("issiez", -1, 1),
              new r("irez", -1, 1),
              new r("issez", -1, 1),
            ],
            w = [
              new r("a", -1, 3),
              new r("era", 0, 2),
              new r("asse", -1, 3),
              new r("ante", -1, 3),
              new r("ée", -1, 2),
              new r("ai", -1, 3),
              new r("erai", 5, 2),
              new r("er", -1, 2),
              new r("as", -1, 3),
              new r("eras", 8, 2),
              new r("âmes", -1, 3),
              new r("asses", -1, 3),
              new r("antes", -1, 3),
              new r("âtes", -1, 3),
              new r("ées", -1, 2),
              new r("ais", -1, 3),
              new r("erais", 15, 2),
              new r("ions", -1, 1),
              new r("erions", 17, 2),
              new r("assions", 17, 3),
              new r("erons", -1, 2),
              new r("ants", -1, 3),
              new r("és", -1, 2),
              new r("ait", -1, 3),
              new r("erait", 23, 2),
              new r("ant", -1, 3),
              new r("aIent", -1, 3),
              new r("eraIent", 26, 2),
              new r("èrent", -1, 2),
              new r("assent", -1, 3),
              new r("eront", -1, 2),
              new r("ât", -1, 3),
              new r("ez", -1, 2),
              new r("iez", 32, 2),
              new r("eriez", 33, 2),
              new r("assiez", 33, 3),
              new r("erez", 32, 2),
              new r("é", -1, 2),
            ],
            f = [
              new r("e", -1, 3),
              new r("Ière", 0, 2),
              new r("ière", 0, 2),
              new r("ion", -1, 1),
              new r("Ier", -1, 2),
              new r("ier", -1, 2),
              new r("ë", -1, 4),
            ],
            m = [
              new r("ell", -1, -1),
              new r("eill", -1, -1),
              new r("enn", -1, -1),
              new r("onn", -1, -1),
              new r("ett", -1, -1),
            ],
            _ = [
              17, 65, 16, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 128, 130, 103, 8,
              5,
            ],
            b = [1, 65, 20, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 128],
            d = new y();
          function k(e, r, s) {
            return (
              !(
                !d.eq_s(1, e) ||
                ((d.ket = d.cursor), !d.in_grouping(_, 97, 251))
              ) && (d.slice_from(r), (d.cursor = s), !0)
            );
          }
          function p(e, r, s) {
            return (
              !!d.eq_s(1, e) &&
              ((d.ket = d.cursor), d.slice_from(r), (d.cursor = s), !0)
            );
          }
          function g() {
            for (; !d.in_grouping(_, 97, 251); ) {
              if (d.cursor >= d.limit) return !0;
              d.cursor++;
            }
            for (; !d.out_grouping(_, 97, 251); ) {
              if (d.cursor >= d.limit) return !0;
              d.cursor++;
            }
            return !1;
          }
          function q() {
            return t <= d.cursor;
          }
          function v() {
            return i <= d.cursor;
          }
          function h() {
            return s <= d.cursor;
          }
          function z() {
            if (
              !(function () {
                var e, r;
                if (((d.ket = d.cursor), (e = d.find_among_b(a, 43)))) {
                  switch (((d.bra = d.cursor), e)) {
                    case 1:
                      if (!h()) return !1;
                      d.slice_del();
                      break;
                    case 2:
                      if (!h()) return !1;
                      d.slice_del(),
                        (d.ket = d.cursor),
                        d.eq_s_b(2, "ic") &&
                          ((d.bra = d.cursor),
                          h() ? d.slice_del() : d.slice_from("iqU"));
                      break;
                    case 3:
                      if (!h()) return !1;
                      d.slice_from("log");
                      break;
                    case 4:
                      if (!h()) return !1;
                      d.slice_from("u");
                      break;
                    case 5:
                      if (!h()) return !1;
                      d.slice_from("ent");
                      break;
                    case 6:
                      if (!q()) return !1;
                      if (
                        (d.slice_del(),
                        (d.ket = d.cursor),
                        (e = d.find_among_b(o, 6)))
                      )
                        switch (((d.bra = d.cursor), e)) {
                          case 1:
                            h() &&
                              (d.slice_del(),
                              (d.ket = d.cursor),
                              d.eq_s_b(2, "at") &&
                                ((d.bra = d.cursor), h() && d.slice_del()));
                            break;
                          case 2:
                            h() ? d.slice_del() : v() && d.slice_from("eux");
                            break;
                          case 3:
                            h() && d.slice_del();
                            break;
                          case 4:
                            q() && d.slice_from("i");
                        }
                      break;
                    case 7:
                      if (!h()) return !1;
                      if (
                        (d.slice_del(),
                        (d.ket = d.cursor),
                        (e = d.find_among_b(c, 3)))
                      )
                        switch (((d.bra = d.cursor), e)) {
                          case 1:
                            h() ? d.slice_del() : d.slice_from("abl");
                            break;
                          case 2:
                            h() ? d.slice_del() : d.slice_from("iqU");
                            break;
                          case 3:
                            h() && d.slice_del();
                        }
                      break;
                    case 8:
                      if (!h()) return !1;
                      if (
                        (d.slice_del(),
                        (d.ket = d.cursor),
                        d.eq_s_b(2, "at") &&
                          ((d.bra = d.cursor),
                          h() &&
                            (d.slice_del(),
                            (d.ket = d.cursor),
                            d.eq_s_b(2, "ic"))))
                      ) {
                        (d.bra = d.cursor),
                          h() ? d.slice_del() : d.slice_from("iqU");
                        break;
                      }
                      break;
                    case 9:
                      d.slice_from("eau");
                      break;
                    case 10:
                      if (!v()) return !1;
                      d.slice_from("al");
                      break;
                    case 11:
                      if (h()) d.slice_del();
                      else {
                        if (!v()) return !1;
                        d.slice_from("eux");
                      }
                      break;
                    case 12:
                      if (!v() || !d.out_grouping_b(_, 97, 251)) return !1;
                      d.slice_del();
                      break;
                    case 13:
                      return q() && d.slice_from("ant"), !1;
                    case 14:
                      return q() && d.slice_from("ent"), !1;
                    case 15:
                      return (
                        (r = d.limit - d.cursor),
                        d.in_grouping_b(_, 97, 251) &&
                          q() &&
                          ((d.cursor = d.limit - r), d.slice_del()),
                        !1
                      );
                  }
                  return !0;
                }
                return !1;
              })() &&
              ((d.cursor = d.limit),
              !(function () {
                var e, r;
                if (d.cursor < t) return !1;
                if (
                  ((r = d.limit_backward),
                  (d.limit_backward = t),
                  (d.ket = d.cursor),
                  !(e = d.find_among_b(l, 35)))
                )
                  return (d.limit_backward = r), !1;
                if (((d.bra = d.cursor), 1 == e)) {
                  if (!d.out_grouping_b(_, 97, 251))
                    return (d.limit_backward = r), !1;
                  d.slice_del();
                }
                return (d.limit_backward = r), !0;
              })() &&
                ((d.cursor = d.limit),
                !(function () {
                  var e, r, s;
                  if (d.cursor < t) return !1;
                  if (
                    ((r = d.limit_backward),
                    (d.limit_backward = t),
                    (d.ket = d.cursor),
                    !(e = d.find_among_b(w, 38)))
                  )
                    return (d.limit_backward = r), !1;
                  switch (((d.bra = d.cursor), e)) {
                    case 1:
                      if (!h()) return (d.limit_backward = r), !1;
                      d.slice_del();
                      break;
                    case 2:
                      d.slice_del();
                      break;
                    case 3:
                      d.slice_del(),
                        (s = d.limit - d.cursor),
                        (d.ket = d.cursor),
                        d.eq_s_b(1, "e")
                          ? ((d.bra = d.cursor), d.slice_del())
                          : (d.cursor = d.limit - s);
                  }
                  return (d.limit_backward = r), !0;
                })()))
            )
              return (
                (d.cursor = d.limit),
                void (function () {
                  var e,
                    r,
                    s,
                    i,
                    n = d.limit - d.cursor;
                  if (
                    ((d.ket = d.cursor),
                    d.eq_s_b(1, "s")
                      ? ((d.bra = d.cursor),
                        (r = d.limit - d.cursor),
                        d.out_grouping_b(b, 97, 232)
                          ? ((d.cursor = d.limit - r), d.slice_del())
                          : (d.cursor = d.limit - n))
                      : (d.cursor = d.limit - n),
                    d.cursor >= t)
                  ) {
                    if (
                      ((s = d.limit_backward),
                      (d.limit_backward = t),
                      (d.ket = d.cursor),
                      (e = d.find_among_b(f, 7)))
                    )
                      switch (((d.bra = d.cursor), e)) {
                        case 1:
                          if (h()) {
                            if (
                              ((i = d.limit - d.cursor),
                              !d.eq_s_b(1, "s") &&
                                ((d.cursor = d.limit - i), !d.eq_s_b(1, "t")))
                            )
                              break;
                            d.slice_del();
                          }
                          break;
                        case 2:
                          d.slice_from("i");
                          break;
                        case 3:
                          d.slice_del();
                          break;
                        case 4:
                          d.eq_s_b(2, "gu") && d.slice_del();
                      }
                    d.limit_backward = s;
                  }
                })()
              );
            (d.cursor = d.limit),
              (d.ket = d.cursor),
              d.eq_s_b(1, "Y")
                ? ((d.bra = d.cursor), d.slice_from("i"))
                : ((d.cursor = d.limit),
                  d.eq_s_b(1, "ç") && ((d.bra = d.cursor), d.slice_from("c")));
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
                  for (var e, r; ; ) {
                    if (((e = d.cursor), d.in_grouping(_, 97, 251))) {
                      if (((d.bra = d.cursor), (r = d.cursor), k("u", "U", e)))
                        continue;
                      if (((d.cursor = r), k("i", "I", e))) continue;
                      if (((d.cursor = r), p("y", "Y", e))) continue;
                    }
                    if (((d.cursor = e), !k("y", "Y", (d.bra = e)))) {
                      if (
                        ((d.cursor = e),
                        d.eq_s(1, "q") && ((d.bra = d.cursor), p("u", "U", e)))
                      )
                        continue;
                      if ((d.cursor = e) >= d.limit) return;
                      d.cursor++;
                    }
                  }
                })(),
                (d.cursor = r),
                (function () {
                  var e = d.cursor;
                  if (
                    ((t = d.limit),
                    (s = i = t),
                    d.in_grouping(_, 97, 251) &&
                      d.in_grouping(_, 97, 251) &&
                      d.cursor < d.limit)
                  )
                    d.cursor++;
                  else if (((d.cursor = e), !d.find_among(n, 3))) {
                    d.cursor = e;
                    do {
                      if (d.cursor >= d.limit) {
                        d.cursor = t;
                        break;
                      }
                      d.cursor++;
                    } while (!d.in_grouping(_, 97, 251));
                  }
                  (t = d.cursor),
                    (d.cursor = e),
                    g() || ((i = d.cursor), g() || (s = d.cursor));
                })(),
                (d.limit_backward = r),
                (d.cursor = d.limit),
                z(),
                (d.cursor = d.limit),
                (e = d.limit - d.cursor),
                d.find_among_b(m, 5) &&
                  ((d.cursor = d.limit - e),
                  (d.ket = d.cursor),
                  d.cursor > d.limit_backward &&
                    (d.cursor--, (d.bra = d.cursor), d.slice_del())),
                (d.cursor = d.limit),
                (function () {
                  for (var e, r = 1; d.out_grouping_b(_, 97, 251); ) r--;
                  if (r <= 0) {
                    if (
                      ((d.ket = d.cursor),
                      (e = d.limit - d.cursor),
                      !d.eq_s_b(1, "é") &&
                        ((d.cursor = d.limit - e), !d.eq_s_b(1, "è")))
                    )
                      return;
                    (d.bra = d.cursor), d.slice_from("e");
                  }
                })(),
                (d.cursor = d.limit_backward),
                (function () {
                  for (
                    var e, r;
                    (r = d.cursor), (d.bra = r), (e = d.find_among(u, 4));

                  )
                    switch (((d.ket = d.cursor), e)) {
                      case 1:
                        d.slice_from("i");
                        break;
                      case 2:
                        d.slice_from("u");
                        break;
                      case 3:
                        d.slice_from("y");
                        break;
                      case 4:
                        if (d.cursor >= d.limit) return;
                        d.cursor++;
                    }
                })(),
                !0
              );
            });
        })()),
        function (e) {
          return "function" == typeof e.update
            ? e.update(function (e) {
                return s.setCurrent(e), s.stem(), s.getCurrent();
              })
            : (s.setCurrent(e), s.stem(), s.getCurrent());
        })),
      e.Pipeline.registerFunction(e.fr.stemmer, "stemmer-fr"),
      (e.fr.stopWordFilter = e.generateStopWordFilter(
        "ai aie aient aies ait as au aura aurai auraient aurais aurait auras aurez auriez aurions aurons auront aux avaient avais avait avec avez aviez avions avons ayant ayez ayons c ce ceci celà ces cet cette d dans de des du elle en es est et eu eue eues eurent eus eusse eussent eusses eussiez eussions eut eux eûmes eût eûtes furent fus fusse fussent fusses fussiez fussions fut fûmes fût fûtes ici il ils j je l la le les leur leurs lui m ma mais me mes moi mon même n ne nos notre nous on ont ou par pas pour qu que quel quelle quelles quels qui s sa sans se sera serai seraient serais serait seras serez seriez serions serons seront ses soi soient sois soit sommes son sont soyez soyons suis sur t ta te tes toi ton tu un une vos votre vous y à étaient étais était étant étiez étions été étée étées étés êtes".split(
          " "
        )
      )),
      e.Pipeline.registerFunction(e.fr.stopWordFilter, "stopWordFilter-fr");
  };
});
