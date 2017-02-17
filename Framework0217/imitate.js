//引入构造函数F.
function F(selector) { 
	[].push.apply( this, F.select(selector) );
 };
 //在F原型添加实例each与map方法

 F.prototype.each = function ( callback ) { 
 	//遍历this,使用callback处理里面的每一个元素。
 	return F.each( this, callback );
 };

 F.prototype.map = function ( callback ) { 
 	return F.map( this, callback );
 };

 //在F上添加静态方法select(获取元素),each，map;

 F.select = function ( selector ) {  
 	return document.querySelectorAll( selector );
 }
 //判断数组的方法
 F.isArrayLike = function ( obj ) { 
 	if( Object.prototype.toString.call( obj ) == '[ object Array ]' ) {
 		return true;
 	};
 	var length = 'length' in obj && obj.length;
 	return typeof length === 'number' && length >= 0;
  };

 F.each = function ( arr, callback ) { 
 	if (F.isArrayLike( arr )) {
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

 F.map = function( arr, callback ) { 
 	var newArr = [], tmp;
 	if ( F.isArrayLike( arr ) ) { 
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

  //引入工厂函数

  function I( selector ) { 
  	return new F( selector );
   }