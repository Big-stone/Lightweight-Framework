//使用时需先加载core再加载dom
(function (window) {
    var arr = [],
        push = arr.push,
        slice = arr.slice;

    //extend
    Itimate.parseHTML = function (html) {
        //准备容器
        var div = document.createElement('div');
        //设置innerHTML
        div.innerHTML = html;
        //将数组取出来
        var arr = [];
        for (var i = 0; i < div.childNodes.length; i++) {
            arr.push(div.childNodes[i]);
        }
        return arr;
    };

    //工具方法
    var tmpDomMethod = {
        appendTo: function (currentNode, objNode) {
            objNode.appendChild(currentNode);
        },
        prependTo: function (currentNode, objNode) {
            if (objNode.childNodes.length == 0) {
                objNode.appendChild(currentNode);
            } else {
                objNode.insertBefore(currentNode, objNode.firstChild);
            }
        },
        insertBefore: function (currentNode, objNode) {
            var nextNode = objNode.nextSibling;
            if (nextNode) {
                nextNode.parentNode.insertBefore(currentNode, nextNode);
            } else {
                objNode.parentNode.appendChild(currentNode);
            }
        }
    };

    Itimate.extend(tmpDomMethod);

    Itimate.each(tmpDomMethod, function (k, v) {
        Itimate.fn[k] = function (selector) {
            var iObj = this.constructor(selector);
            var tmp = [], tmpNode;
            for (var i = 0; i < this.length; i++) {
                for (var j = 0; j < iObj.length; i++) {
                    tmpNode = j == iobj.length - 1 ? this[i] : this[i].cloneNode(true);
                    tmp.push(tmpNode);
                    v(tmpNode, iObj[j]);
                }
            }
            var tmpIobj = this.constructor();
            tmpIobj.prevObject = this;
            push.apply(tmpIobj, tmp);
            return tmpIobj;
        };
    });

    Itimate.each({
        'append': 'appendTo',
        'prepend': 'prependTo',
        'before': 'insertBefore',
        'after': 'insertAfter'
    }, function (k, v) {
        Itimate.fn[k] = function (selector) {
            this.constructor(selector)[v](this);
            return this;
        };
    });

})(window)