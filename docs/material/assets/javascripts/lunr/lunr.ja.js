!(function (e, r) {
  "function" == typeof define && define.amd
    ? define(r)
    : "object" == typeof exports
    ? (module.exports = r())
    : r()(e.lunr);
})(this, function () {
  return function (m) {
    if (void 0 === m)
      throw new Error(
        "Lunr is not present. Please include / require Lunr before this script."
      );
    if (void 0 === m.stemmerSupport)
      throw new Error(
        "Lunr stemmer support is not present. Please include / require Lunr stemmer support before this script."
      );
    var l = "2" == m.version[0];
    m.ja = function () {
      this.pipeline.reset(),
        this.pipeline.add(m.ja.trimmer, m.ja.stopWordFilter, m.ja.stemmer),
        l
          ? (this.tokenizer = m.ja.tokenizer)
          : (m.tokenizer && (m.tokenizer = m.ja.tokenizer),
            this.tokenizerFn && (this.tokenizerFn = m.ja.tokenizer));
    };
    var j = new m.TinySegmenter();
    (m.ja.tokenizer = function (e) {
      var r, t, i, n, o, s, p, a, u;
      if (!arguments.length || null == e || null == e) return [];
      if (Array.isArray(e))
        return e.map(function (e) {
          return l ? new m.Token(e.toLowerCase()) : e.toLowerCase();
        });
      for (
        r = (t = e.toString().toLowerCase().replace(/^\s+/, "")).length - 1;
        0 <= r;
        r--
      )
        if (/\S/.test(t.charAt(r))) {
          t = t.substring(0, r + 1);
          break;
        }
      for (o = [], i = t.length, p = a = 0; a <= i; a++)
        if (((s = a - p), t.charAt(a).match(/\s/) || a == i)) {
          if (0 < s)
            for (
              n = j.segment(t.slice(p, a)).filter(function (e) {
                return !!e;
              }),
                u = p,
                r = 0;
              r < n.length;
              r++
            )
              l
                ? o.push(
                    new m.Token(n[r], {
                      position: [u, n[r].length],
                      index: o.length,
                    })
                  )
                : o.push(n[r]),
                (u += n[r].length);
          p = a + 1;
        }
      return o;
    }),
      (m.ja.stemmer = function (e) {
        return e;
      }),
      m.Pipeline.registerFunction(m.ja.stemmer, "stemmer-ja"),
      (m.ja.wordCharacters =
        "一二三四五六七八九十百千万億兆一-龠々〆ヵヶぁ-んァ-ヴーｱ-ﾝﾞa-zA-Zａ-ｚＡ-Ｚ0-9０-９"),
      (m.ja.trimmer = m.trimmerSupport.generateTrimmer(m.ja.wordCharacters)),
      m.Pipeline.registerFunction(m.ja.trimmer, "trimmer-ja"),
      (m.ja.stopWordFilter = m.generateStopWordFilter(
        "これ それ あれ この その あの ここ そこ あそこ こちら どこ だれ なに なん 何 私 貴方 貴方方 我々 私達 あの人 あのかた 彼女 彼 です あります おります います は が の に を で え から まで より も どの と し それで しかし".split(
          " "
        )
      )),
      m.Pipeline.registerFunction(m.ja.stopWordFilter, "stopWordFilter-ja"),
      (m.jp = m.ja),
      m.Pipeline.registerFunction(m.jp.stemmer, "stemmer-jp"),
      m.Pipeline.registerFunction(m.jp.trimmer, "trimmer-jp"),
      m.Pipeline.registerFunction(m.jp.stopWordFilter, "stopWordFilter-jp");
  };
});
