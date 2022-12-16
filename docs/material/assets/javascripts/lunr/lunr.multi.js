!(function (e, i) {
  "function" == typeof define && define.amd
    ? define(i)
    : "object" == typeof exports
    ? (module.exports = i())
    : i()(e.lunr);
})(this, function () {
  return function (o) {
    o.multiLanguage = function () {
      for (
        var e = Array.prototype.slice.call(arguments),
          i = e.join("-"),
          t = "",
          r = [],
          n = [],
          s = 0;
        s < e.length;
        ++s
      )
        "en" == e[s]
          ? ((t += "\\w"),
            r.unshift(o.stopWordFilter),
            r.push(o.stemmer),
            n.push(o.stemmer))
          : ((t += o[e[s]].wordCharacters),
            r.unshift(o[e[s]].stopWordFilter),
            r.push(o[e[s]].stemmer),
            n.push(o[e[s]].stemmer));
      var p = o.trimmerSupport.generateTrimmer(t);
      return (
        o.Pipeline.registerFunction(p, "lunr-multi-trimmer-" + i),
        r.unshift(p),
        function () {
          this.pipeline.reset(),
            this.pipeline.add.apply(this.pipeline, r),
            this.searchPipeline &&
              (this.searchPipeline.reset(),
              this.searchPipeline.add.apply(this.searchPipeline, n));
        }
      );
    };
  };
});