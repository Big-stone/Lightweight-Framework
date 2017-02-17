(function (window) { 

	var arr = [],
		push = arr.push;

	//对外公开的函数
function Itimate ( selector ) { 
	return new Itimate.fn.init( selector );
 };

 	//共享原型
 	Itimate.fn.init.prototype = Itimate.fn;
 	//设置原型
 	Itimate.fn = Itimate.prototype = { 
 		constructor: Itimate,

 		init: function (selector) { 
	push.apply( this, Itimate.select(selector) )
 		},

 		each : function ( callback ) { 
 	//遍历this,使用callback处理里面的每一个元素。
 	return Itimate.each( this, callback );
 		},

		map : function ( callback ) { 
 	return Itimate.map( this, callback );
 		}

 	 };
					//上面为实例方法
//----------------------华丽分割线----------------------------
					//下面为静态方法

 Itimate.select = function ( selector ) {  
 	return document.querySelectorAll( selector );
 }
 //判断数组的方法
 Itimate.isArrayLike = function ( obj ) { 
 	if( Object.prototype.toString.call( obj ) == '[ object Array ]' ) {
 		return true;
 	};
 	var length = 'length' in obj && obj.length;
 	return typeof length === 'number' && length >= 0;
  };

 Itimate.each = function ( arr, callback ) { 
 	if (Itimate.isArrayLike( arr )) {
 		for( var i = 0; i < arr.length; i++ ) { 
 			if ( callback.call( arr[ i ], arr[ i ], i ) === false ) break;
		 };
 	} else {  
 		for( var k in arr ) { 
 			if ( callback.call( arr[ k ], arr[ k ], k ) === false ) break;
 		 };
 	   };
 	  return arr;
  };

 Itimate.map = function( arr, callback ) { 
 	var newArr = [], tmp;
 	if ( Itimate.isArrayLike( arr ) ) { 
 		for ( var i = 0; i < arr.length; i++ ) { 
 			tmp = callback( arr[ i ], i );
 			if( tmp != null ){ 
 				newArr.push(tmp);
 			 }
 		 }
 	 } else { 
 	 	for ( var k in arr ) { 
 	 		tmp = callback( arr[ k ], k );
 	 		if( tmp != null ) { 
 	 			newArr.push(tmp);
 	 		}
 	 	 }
 	  }
 	  return newArr;
  };



  window.Imitate = window.I = Imitate;

 })(window);