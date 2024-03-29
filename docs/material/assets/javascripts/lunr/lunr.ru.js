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
    var h, g, n;
    (e.ru = function () {
      this.pipeline.reset(),
        this.pipeline.add(e.ru.trimmer, e.ru.stopWordFilter, e.ru.stemmer),
        this.searchPipeline &&
          (this.searchPipeline.reset(), this.searchPipeline.add(e.ru.stemmer));
    }),
      (e.ru.wordCharacters = "Ѐ-҄҇-ԯᴫᵸⷠ-ⷿꙀ-ꚟ︮︯"),
      (e.ru.trimmer = e.trimmerSupport.generateTrimmer(e.ru.wordCharacters)),
      e.Pipeline.registerFunction(e.ru.trimmer, "trimmer-ru"),
      (e.ru.stemmer =
        ((h = e.stemmerSupport.Among),
        (g = e.stemmerSupport.SnowballProgram),
        (n = new (function () {
          var n,
            e,
            r = [
              new h("в", -1, 1),
              new h("ив", 0, 2),
              new h("ыв", 0, 2),
              new h("вши", -1, 1),
              new h("ивши", 3, 2),
              new h("ывши", 3, 2),
              new h("вшись", -1, 1),
              new h("ившись", 6, 2),
              new h("ывшись", 6, 2),
            ],
            t = [
              new h("ее", -1, 1),
              new h("ие", -1, 1),
              new h("ое", -1, 1),
              new h("ые", -1, 1),
              new h("ими", -1, 1),
              new h("ыми", -1, 1),
              new h("ей", -1, 1),
              new h("ий", -1, 1),
              new h("ой", -1, 1),
              new h("ый", -1, 1),
              new h("ем", -1, 1),
              new h("им", -1, 1),
              new h("ом", -1, 1),
              new h("ым", -1, 1),
              new h("его", -1, 1),
              new h("ого", -1, 1),
              new h("ему", -1, 1),
              new h("ому", -1, 1),
              new h("их", -1, 1),
              new h("ых", -1, 1),
              new h("ею", -1, 1),
              new h("ою", -1, 1),
              new h("ую", -1, 1),
              new h("юю", -1, 1),
              new h("ая", -1, 1),
              new h("яя", -1, 1),
            ],
            w = [
              new h("ем", -1, 1),
              new h("нн", -1, 1),
              new h("вш", -1, 1),
              new h("ивш", 2, 2),
              new h("ывш", 2, 2),
              new h("щ", -1, 1),
              new h("ющ", 5, 1),
              new h("ующ", 6, 2),
            ],
            i = [new h("сь", -1, 1), new h("ся", -1, 1)],
            u = [
              new h("ла", -1, 1),
              new h("ила", 0, 2),
              new h("ыла", 0, 2),
              new h("на", -1, 1),
              new h("ена", 3, 2),
              new h("ете", -1, 1),
              new h("ите", -1, 2),
              new h("йте", -1, 1),
              new h("ейте", 7, 2),
              new h("уйте", 7, 2),
              new h("ли", -1, 1),
              new h("или", 10, 2),
              new h("ыли", 10, 2),
              new h("й", -1, 1),
              new h("ей", 13, 2),
              new h("уй", 13, 2),
              new h("л", -1, 1),
              new h("ил", 16, 2),
              new h("ыл", 16, 2),
              new h("ем", -1, 1),
              new h("им", -1, 2),
              new h("ым", -1, 2),
              new h("н", -1, 1),
              new h("ен", 22, 2),
              new h("ло", -1, 1),
              new h("ило", 24, 2),
              new h("ыло", 24, 2),
              new h("но", -1, 1),
              new h("ено", 27, 2),
              new h("нно", 27, 1),
              new h("ет", -1, 1),
              new h("ует", 30, 2),
              new h("ит", -1, 2),
              new h("ыт", -1, 2),
              new h("ют", -1, 1),
              new h("уют", 34, 2),
              new h("ят", -1, 2),
              new h("ны", -1, 1),
              new h("ены", 37, 2),
              new h("ть", -1, 1),
              new h("ить", 39, 2),
              new h("ыть", 39, 2),
              new h("ешь", -1, 1),
              new h("ишь", -1, 2),
              new h("ю", -1, 2),
              new h("ую", 44, 2),
            ],
            s = [
              new h("а", -1, 1),
              new h("ев", -1, 1),
              new h("ов", -1, 1),
              new h("е", -1, 1),
              new h("ие", 3, 1),
              new h("ье", 3, 1),
              new h("и", -1, 1),
              new h("еи", 6, 1),
              new h("ии", 6, 1),
              new h("ами", 6, 1),
              new h("ями", 6, 1),
              new h("иями", 10, 1),
              new h("й", -1, 1),
              new h("ей", 12, 1),
              new h("ией", 13, 1),
              new h("ий", 12, 1),
              new h("ой", 12, 1),
              new h("ам", -1, 1),
              new h("ем", -1, 1),
              new h("ием", 18, 1),
              new h("ом", -1, 1),
              new h("ям", -1, 1),
              new h("иям", 21, 1),
              new h("о", -1, 1),
              new h("у", -1, 1),
              new h("ах", -1, 1),
              new h("ях", -1, 1),
              new h("иях", 26, 1),
              new h("ы", -1, 1),
              new h("ь", -1, 1),
              new h("ю", -1, 1),
              new h("ию", 30, 1),
              new h("ью", 30, 1),
              new h("я", -1, 1),
              new h("ия", 33, 1),
              new h("ья", 33, 1),
            ],
            o = [new h("ост", -1, 1), new h("ость", -1, 1)],
            c = [
              new h("ейше", -1, 1),
              new h("н", -1, 2),
              new h("ейш", -1, 1),
              new h("ь", -1, 3),
            ],
            m = [33, 65, 8, 232],
            l = new g();
          function f() {
            for (; !l.in_grouping(m, 1072, 1103); ) {
              if (l.cursor >= l.limit) return !1;
              l.cursor++;
            }
            return !0;
          }
          function a() {
            for (; !l.out_grouping(m, 1072, 1103); ) {
              if (l.cursor >= l.limit) return !1;
              l.cursor++;
            }
            return !0;
          }
          function p(e, n) {
            var r, t;
            if (((l.ket = l.cursor), (r = l.find_among_b(e, n)))) {
              switch (((l.bra = l.cursor), r)) {
                case 1:
                  if (
                    ((t = l.limit - l.cursor),
                    !l.eq_s_b(1, "а") &&
                      ((l.cursor = l.limit - t), !l.eq_s_b(1, "я")))
                  )
                    return !1;
                case 2:
                  l.slice_del();
              }
              return !0;
            }
            return !1;
          }
          function d(e, n) {
            var r;
            return (
              (l.ket = l.cursor),
              !!(r = l.find_among_b(e, n)) &&
                ((l.bra = l.cursor), 1 == r && l.slice_del(), !0)
            );
          }
          function _() {
            return !!d(t, 26) && (p(w, 8), !0);
          }
          function b() {
            var e;
            (l.ket = l.cursor),
              (e = l.find_among_b(o, 2)) &&
                ((l.bra = l.cursor), n <= l.cursor && 1 == e && l.slice_del());
          }
          (this.setCurrent = function (e) {
            l.setCurrent(e);
          }),
            (this.getCurrent = function () {
              return l.getCurrent();
            }),
            (this.stem = function () {
              return (
                (e = l.limit),
                (n = e),
                f() && ((e = l.cursor), a() && f() && a() && (n = l.cursor)),
                (l.cursor = l.limit),
                !(l.cursor < e) &&
                  ((l.limit_backward = e),
                  p(r, 9) ||
                    ((l.cursor = l.limit),
                    d(i, 2) || (l.cursor = l.limit),
                    _() ||
                      ((l.cursor = l.limit),
                      p(u, 46) || ((l.cursor = l.limit), d(s, 36)))),
                  (l.cursor = l.limit),
                  (l.ket = l.cursor),
                  l.eq_s_b(1, "и")
                    ? ((l.bra = l.cursor), l.slice_del())
                    : (l.cursor = l.limit),
                  b(),
                  (l.cursor = l.limit),
                  (function () {
                    var e;
                    if (((l.ket = l.cursor), (e = l.find_among_b(c, 4))))
                      switch (((l.bra = l.cursor), e)) {
                        case 1:
                          if (
                            (l.slice_del(),
                            (l.ket = l.cursor),
                            !l.eq_s_b(1, "н"))
                          )
                            break;
                          l.bra = l.cursor;
                        case 2:
                          if (!l.eq_s_b(1, "н")) break;
                        case 3:
                          l.slice_del();
                      }
                  })(),
                  !0)
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
      e.Pipeline.registerFunction(e.ru.stemmer, "stemmer-ru"),
      (e.ru.stopWordFilter = e.generateStopWordFilter(
        "алло без близко более больше будем будет будете будешь будто буду будут будь бы бывает бывь был была были было быть в важная важное важные важный вам вами вас ваш ваша ваше ваши вверх вдали вдруг ведь везде весь вниз внизу во вокруг вон восемнадцатый восемнадцать восемь восьмой вот впрочем времени время все всегда всего всем всеми всему всех всею всю всюду вся всё второй вы г где говорил говорит год года году да давно даже далеко дальше даром два двадцатый двадцать две двенадцатый двенадцать двух девятнадцатый девятнадцать девятый девять действительно дел день десятый десять для до довольно долго должно другая другие других друго другое другой е его ее ей ему если есть еще ещё ею её ж же жизнь за занят занята занято заняты затем зато зачем здесь значит и из или им именно иметь ими имя иногда их к каждая каждое каждые каждый кажется как какая какой кем когда кого ком кому конечно которая которого которой которые который которых кроме кругом кто куда лет ли лишь лучше люди м мало между меля менее меньше меня миллионов мимо мира мне много многочисленная многочисленное многочисленные многочисленный мной мною мог могут мож может можно можхо мои мой мор мочь моя моё мы на наверху над надо назад наиболее наконец нам нами нас начала наш наша наше наши не него недавно недалеко нее ней нельзя нем немного нему непрерывно нередко несколько нет нею неё ни нибудь ниже низко никогда никуда ними них ничего но ну нужно нх о об оба обычно один одиннадцатый одиннадцать однажды однако одного одной около он она они оно опять особенно от отовсюду отсюда очень первый перед по под пожалуйста позже пока пор пора после посреди потом потому почему почти прекрасно при про просто против процентов пятнадцатый пятнадцать пятый пять раз разве рано раньше рядом с сам сама сами самим самими самих само самого самой самом самому саму свое своего своей свои своих свою сеаой себе себя сегодня седьмой сейчас семнадцатый семнадцать семь сих сказал сказала сказать сколько слишком сначала снова со собой собою совсем спасибо стал суть т та так такая также такие такое такой там твой твоя твоё те тебе тебя тем теми теперь тех то тобой тобою тогда того тоже только том тому тот тою третий три тринадцатый тринадцать ту туда тут ты тысяч у уж уже уметь хорошо хотеть хоть хотя хочешь часто чаще чего человек чем чему через четвертый четыре четырнадцатый четырнадцать что чтоб чтобы чуть шестнадцатый шестнадцать шестой шесть эта эти этим этими этих это этого этой этом этому этот эту я \ufeffа".split(
          " "
        )
      )),
      e.Pipeline.registerFunction(e.ru.stopWordFilter, "stopWordFilter-ru");
  };
});
