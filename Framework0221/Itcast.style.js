(function (window) { 

	Itcast.fn.extend({ 

		css:function ( key, value ) { 

			if( Itcast.isArrayLike( key ) ) { 

				var obj = {},
					target = this [ 0 ];
				Itcast.each( key, function( i, v ) { 
					//v表示要获得的样式名
					obj[ v ] =target.style[ v ] || window.getComputedStyle( target )[ v ];				
				 });
				return obj;

			 } else if ( Object.prototype.toString.call( key ) === '[object Object]' ) { 
			 	  return this.each( function () { 
			 	  	for( var k in key ){ 

			 	  		this.style[ k ] = key[ k ];
			 	  		//this 是dom对象
			 	  	 }

			 	   });
			  } else if ( typeof key === 'string' ) { 

			  	if( value === undefined ) { 
			  		//获得对应样式
			  		return this[ 0 ].style[ key ] || window.getComputedStyle( this[ 0 ] )[ key ];
			  	 } else if( typeof value === 'string' ) {
			  	 	//设置样式
			  	 	//给每一个dom元素都设置该样式
			  	 	return this.each( function () { 
			  	 		this.style[ key ] = value;
			  	 	 });
			  	 } else if ( typeof value === 'function' ) { 
			  	 	//条件设置
			  	 	//给每个dom元素都设置该样式，但是样式值由函数返回值决定
			  	 	return this.each( function (i) { 

			  	 		this.stylep[ key ] = value( i, this.style[ key ] || window.getComputedStyle(this)[key] )

			  	 	 });
			  	  }

			  }

		 },

		hasClass:function () { 
		 	//判断this中的所有dom元素，只要有一个含有该类样式的元素就返回true
		 	className = className.trim();
		 	for( var i = 0; i < this.length; i++ ) {
		 		var dom = this[ i ];
		 		 	className = dom.className && dom.className.split( ' ' );

		 		if( classNames && classNames.indexOf( className ) > -1 ){ 
		 		 		//存在
		 		 		return true;
		 		}
		 	}
		 	return false;

		},

		addClass: function ( className ) { 
			return this.each( function () { 
				if ( this.className ) { 
					this.className += ' ' + className;
				 } else { 
				 	this.className = className;
				  }
			 });

		 },

		removeClass: function ( className ) { 
			//将this中的每一个dom元素的classname属性中符合参数中描述的classname的类样式删除
			className = className.trim();
			return this.each( function () { 
				//删除this中的对应classname
				var classNames = this.className && this.className.split( " " );
				if ( !classNames ) return;
				//移除数组中负荷要求的字符串
				var index;
				while( (index = classNames.indexOf( className )) != -1 ) { 

					classNames.splice( index, 1 );

				 }
				 this.className = classNames.join( ' ' );
			 });

		 },

		 toggleClass: function ( className ) { 
		 	//给每一个dom 元素处理一下，有则减，无则加
		 	return this.each( function () { 
		 		if( I(this.hasClass( className )) { 
		 			I(this).removeClass( className );
		 		 } else { 
		 		 	I( this ).addClass( className );
		 		  }
		 	 });

		  }




	 })


 })(window)