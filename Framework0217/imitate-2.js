//优化-引入extend
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
 			//获取元素，设置this指向
	push.apply( this, Itimate.select(selector) )
 		}

 	 };

  //添加扩展方法

  Itimate.extend = Itimate.fn.extend = function ( obj ) { 

  		for( var k in obj ) { 
  			this[ k ] = obj[ k ];
  		 }

  		 return this;

   };


 //已经写好的工具方法
 Itimate.extend({

 	select : function ( selector ) {  
 	return document.querySelectorAll( selector );
 },
 //判断数组的方法
 	isArrayLike : function ( obj ) { 
 	if( Object.prototype.toString.call( obj ) == '[ object Array ]' ) {
 		return true;
 	};
 	var length = 'length' in obj && obj.length;
 	return typeof length === 'number' && length >= 0;
  },
 	each : function ( arr, callback ) { 
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
  },
 	map : function( arr, callback ) { 
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
  }

 });

	
//核心方法
 Itimate.fn.extend( {  

 	each : function ( callback ) { n
 	//遍历this,使用callback处理里面的每一个元素。
 	return Itimate.each( this, callback );
 		},

	map : function ( callback ) { 
 	return Itimate.map( this, callback );b
 		}

 });


 //添加核心方法
 Itimate.fn.extend( {  

 	toArray: function () { 
 		//需求:要返回的是数组,并且由this中的每一个Dom元素组成的数组
 		//方案1
 		// var  arr = [];
 		// for ( var i = 0; i < this.length; i++ ) { 
 		// 	arr.push( this[ i ] )

 		//  }
 		//  return arr;
 		//方案2
 		// return this.map( function ( v ) { 
 		// 	return v;
 		//  })
 		//方案3
 		return slice.call( this );
 	 },
 	 get: function ( index ) { 
 	 		if ( index === undefined) { 
 	 			return this.toArray();
 	 		 }

 	 		if( index < 0 ) { 
 	 			return this[ this.length + index ];
 	 		 } else { 
 	 		 	return this [ index];
 	 		 }
 	  },
 	  first: function ( ) { 
 	  	var iobj = this.constructor();
 	  	var dom = this.get( 0 );
 	  	iobj[ 0 ] = dom;
 	  	iobj.length = 1;
 	  	return iobj;
 	   }
 });


  window.Imitate = window.I = Imitate;

 })(window);