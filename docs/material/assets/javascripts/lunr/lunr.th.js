!(function (e, r) {
  "function" == typeof define && define.amd
    ? define(r)
    : "object" == typeof exports
    ? (module.exports = r())
    : r()(e.lunr);
})(this, function () {
  return function (t) {
    if (void 0 === t)
      throw new Error(
        "Lunr is not present. Please include / require Lunr before this script."
      );
    if (void 0 === t.stemmerSupport)
      throw new Error(
        "Lunr stemmer support is not present. Please include / require Lunr stemmer support before this script."
      );
    var i = "2" == t.version[0];
    (t.th = function () {
      this.pipeline.reset(),
        this.pipeline.add(t.th.trimmer),
        i
          ? (this.tokenizer = t.th.tokenizer)
          : (t.tokenizer && (t.tokenizer = t.th.tokenizer),
            this.tokenizerFn && (this.tokenizerFn = t.th.tokenizer));
    }),
      (t.th.wordCharacters = "[฀-๿]"),
      (t.th.trimmer = t.trimmerSupport.generateTrimmer(t.th.wordCharacters)),
      t.Pipeline.registerFunction(t.th.trimmer, "trimmer-th");
    var n = t.wordcut;
    n.init(),
      (t.th.tokenizer = function (e) {
        if (!arguments.length || null == e || null == e) return [];
        if (Array.isArray(e))
          return e.map(function (e) {
            return i ? new t.Token(e) : e;
          });
        var r = e.toString().replace(/^\s+/, "");
        return n.cut(r).split("|");
      });
  };
});
