(function (window) {

    var arr = [],
        push = arr.push,
        slice = arr.slice;

    //���⹫���ĺ�����
    function Itimate(selector) {
        return new Itimate.fn.init(selector);
    }

    //ԭ������(���ĳ�Ա)
    Itimate.fn = Itimate.prototype = {
        constructor: Itimate,
        length: 0,
        init: function (selector) {
            //�ж�����������0,'',null,undefined
            if (!selector) return this;

            if (typeof selector === 'string') {
                if (/^\s*</.test(selector)) {
                    //html��ʽ���ַ���
                    push.apply(this, Itimate, ParseHTML(selector));
                } else {
                    //ѡ����
                    push.apply(this, Itimate.select(selector));
                }
                return this;
            }
            //dom
            if (selector.nodeType) {
                //����domԪ��ת����Itimate����
                this[0] = selector;
                this.length = 1;
                return this;
            }
            //Itimate
            if (selector.constructor == Itimate) {
                //����this,����Ҫ����selector����һ���µ�Itimate����
                push.apply(this, selector);
                return this;
            }
        }
    };
    //����ԭ��
    Itimate.fn.init.prototype = Itimate.fn;
    //�����չ�ķ���
    Itimate.extend = Itimate.fn.extend = function (obj) {
        for (var k in obj) {
            this[k] = obj[k];
        }
        return this;
    };
    //�Ѿ�д�õķ���
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

    //��Ӻ��ķ���
    Itimate.fn.extend({
        toArray: function () {
            //Ҫ���ص������飬����this�е�ÿһ��domԪ�����
            //����1
            // var arr=[];
            //for(var i=0;i<this.length;i++){
            //    arr.push(this[i]);
            //}
            //return arr;
            //����2
            return this.map(function (v) {
                return v;
            });
            //����3
            return slice.call(this);
        },
        get: function (index) {
            if (index === undefined) {
                return this.toArray();
            }
            //�ж�������
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