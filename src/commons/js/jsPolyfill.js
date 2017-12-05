/**
 * 旧浏览器javaScript Polyfill
 * 包含Array的filter(), map(), reduce()方法
 */

;(() => {
    // filter
    if (!Array.prototype.filter) {
      Array.prototype.filter = function(fun /* , thisArg*/) {
        if (this === void 0 || this === null)
          throw new TypeError();

        var t = Object(this);
        var len = t.length >>> 0;
        if (typeof fun !== "function")
          throw new TypeError();

        var res = [];
        var thisArg = arguments.length >= 2 ? arguments[1] : void 0;
        for (var i = 0; i < len; i++)
        {
          if (i in t)
          {
            var val = t[i];

            // NOTE: Technically this should Object.defineProperty at
            //       the next index, as push can be affected by
            //       properties on Object.prototype and Array.prototype.
            //       But that method's new, and collisions should be
            //       rare, so use the more-compatible alternative.
            if (fun.call(thisArg, val, i, t))
              res.push(val);
          }
        }

        return res;
      };
    }

    // map
    // 参考: http://es5.github.com/#x15.4.4.19
    if (!Array.prototype.map) {
      Array.prototype.map = function(callback, thisArg) {

        var T, A, k;

        if (this == null) {
          throw new TypeError(" this is null or not defined");
        }

        // 1. 将O赋值为调用map方法的数组.
        var O = Object(this);

        // 2.将len赋值为数组O的长度.
        var len = O.length >>> 0;

        // 3.如果callback不是函数,则抛出TypeError异常.
        if (Object.prototype.toString.call(callback) != "[object Function]") {
          throw new TypeError(callback + " is not a function");
        }

        // 4. 如果参数thisArg有值,则将T赋值为thisArg;否则T为undefined.
        if (thisArg) {
          T = thisArg;
        }

        // 5. 创建新数组A,长度为原数组O长度len
        A = new Array(len);

        // 6. 将k赋值为0
        k = 0;

        // 7. 当 k < len 时,执行循环.
        while(k < len) {

          var kValue, mappedValue;

          //遍历O,k为原数组索引
          if (k in O) {

            //kValue为索引k对应的值.
            kValue = O[ k ];

            // 执行callback,this指向T,参数有三个.分别是kValue:值,k:索引,O:原数组.
            mappedValue = callback.call(T, kValue, k, O);

            // 返回值添加到新数组A中.
            A[ k ] = mappedValue;
          }
          // k自增1
          k++;
        }

        // 8. 返回新数组A
        return A;
      };
    }

    // reduce
    // Reference: http://es5.github.io/#x15.4.4.21
    // https://tc39.github.io/ecma262/#sec-array.prototype.reduce
    if (!Array.prototype.reduce) {
      Object.defineProperty(Array.prototype, 'reduce', {
        value: function(callback /*, initialValue*/) {
          if (this === null) {
            throw new TypeError( 'Array.prototype.reduce ' +
              'called on null or undefined' );
          }
          if (typeof callback !== 'function') {
            throw new TypeError( callback +
              ' is not a function');
          }

          // 1. Let O be ? ToObject(this value).
          var o = Object(this);

          // 2. Let len be ? ToLength(? Get(O, "length")).
          var len = o.length >>> 0;

          // Steps 3, 4, 5, 6, 7
          var k = 0;
          var value;

          if (arguments.length >= 2) {
            value = arguments[1];
          } else {
            while (k < len && !(k in o)) {
              k++;
            }

            // 3. If len is 0 and initialValue is not present,
            //    throw a TypeError exception.
            if (k >= len) {
              throw new TypeError( 'Reduce of empty array ' +
                'with no initial value' );
            }
            value = o[k++];
          }

          // 8. Repeat, while k < len
          while (k < len) {
            // a. Let Pk be ! ToString(k).
            // b. Let kPresent be ? HasProperty(O, Pk).
            // c. If kPresent is true, then
            //    i.  Let kValue be ? Get(O, Pk).
            //    ii. Let accumulator be ? Call(
            //          callbackfn, undefined,
            //          « accumulator, kValue, k, O »).
            if (k in o) {
              value = callback(value, o[k], k, o);
            }

            // d. Increase k by 1.
            k++;
          }

          // 9. Return accumulator.
          return value;
        }
      });
    }
})();
