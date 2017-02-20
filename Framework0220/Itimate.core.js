(function (window) {

    var arr = [],
        push = arr.push,
        slice = arr.slice;

    //对外公开的函数，
    function Itimate(selector) {
        return new Itimate.fn.init(selector);
    }

    //原型设置(核心成员)
    Itimate.fn = Itimate.prototype = {
        constructor: Itimate,
        length: 0,
        init: function (selector) {
            //判断如果传入的是0,'',null,undefined
            if (!selector) return this;

            if (typeof selector === 'string') {
                if (/^\s*</.test(selector)) {
                    //html格式的字符串
                    push.apply(this, Itimate, ParseHTML(selector));
                } else {
                    //选择器
                    push.apply(this, Itimate.select(selector));
                }
                return this;
            }
            //dom
            if (selector.nodeType) {
                //将该dom元素转换成Itimate对象
                this[0] = selector;
                this.length = 1;
                return this;
            }
            //Itimate
            if (selector.constructor == Itimate) {
                //保留this,但需要利用selector构造一个新的Itimate对象
                push.apply(this, selector);
                return this;
            }
        }
    };
    //共享原型
    Itimate.fn.init.prototype = Itimate.fn;
    //添加扩展的方法
    Itimate.extend = Itimate.fn.extend = function (obj) {
        for (var k in obj) {
            this[k] = obj[k];
        }
        return this;
    };
    //已经写好的方法
    Itimate.extend({
        select: function (selector) {
            return document.querySelectorAll(selector);
        },
        isArrayLike: function (obj) {
            if (Object.prototype.toString.call(obj) == '[object Array]') {
                return true
            }
            var length = 'length' in obj && obj.length;
            return typeof length === 'number' && length >= 0;
        },
        each: function (arr, callback) {
            if (Itimate.isArrayLike(arr)) {
                for (var i = 0; i < arr.length; i++) {
                    if (callback.call(arr[i], i, arr[i]) === false) break;
                }
            } else {
                for (var k in arr) {
                    if (callback.call(arr[k], k, arr[k]) === false) break;
                }
            }
            return arr;
        },
        map: function (arr, callback) {
            var newArr = [], tmp;
            if (Itimate.isArrayLike(arr)) {
                for (var i = 0; i < arr.length; i++) {
                    tmp = callback(arr[i], i);
                    if (tmp != null) {
                        newArr.push(tmp);
                    }
                }
            } else {
                for (var k in arr) {
                    tmp = callback(arr[k], k);
                    if (tmp != null) {
                        newArr.push(tmp);
                    }
                }
            }
            return newArr;
        }
    });
    Itimate.fn.extend({
        each: function (callback) {
            return Itimate.each(this, callback);
        },
        map: function (callback) {
            return Itimate.map(this, callback);
        }
    });

    //添加核心方法
    Itimate.fn.extend({
        toArray: function () {
            //要返回的是数组，且由this中的每一个dom元素组成
            //方案1
            // var arr=[];
            //for(var i=0;i<this.length;i++){
            //    arr.push(this[i]);
            //}
            //return arr;
            //方案2
            return this.map(function (v) {
                return v;
            });
            //方案3
            return slice.call(this);
        },
        get: function (index) {
            if (index === undefined) {
                return this.toArray();
            }
            //判断正负数
            if (index < 0) {
                return this[this.length + index];
            } else {
                return this[index];
            }
        },
        first: function () {
            return this.eq(0);
        },
        eq: function (index) {
            var iobj = this.constructor();
            if (index == null)return iobj;
            var dom = this.get(index);
            if (dom) {
                iobj[0] = dom;
                iobj.length = 1;
            }
            return iobj;
        },
        last: function () {
            return this.eq(-1);
        },
        end: function () {
            return this.prevObject || this.constructor();
        }
    });


    window.Itimate = window.I = Itimate;


})(window);