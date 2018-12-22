new Vue({
		el:'#app',
		data:{
			items:[{
					name:'第一项',
					isTouchMove:false
				},
				{
					name:'第二项',
					isTouchMove:false
				},
				{
					name:'第三项',
					isTouchMove:false
				},
				{
					name:'第四项',
					isTouchMove:false
				},
				{
					name:'第五项',
					isTouchMove:false
				}],
				startX: 0,
      			startY: 0
			},
			methods:{
		//手指触摸动作开始 记录起点X坐标
	    touchstart: function(event) {
	      //开始触摸时 重置所有删除
	      var that = this;
	      setTimeout(function() {
	        //延时用于处理touchstart事件先于click事件触发bug
	        that.items.forEach(function(v, i) {
	          if (v.isTouchMove) v.isTouchMove = false;
	        });
	      }, 50);
	      this.startX = event.changedTouches[0].clientX;
	      this.startY = event.changedTouches[0].clientY;
	    },
	    //滑动事件处理
	    touchmove: function(event, index) {
	      var that = this,
	        startX = that.startX, //开始X坐标
	        startY = that.startY, //开始Y坐标
	        touchMoveX = event.changedTouches[0].clientX, //滑动变化坐标
	        touchMoveY = event.changedTouches[0].clientY, //滑动变化坐标
	        //获取滑动角度
	        angle = that.angle(
	          {
	            X: startX,
	            Y: startY
	          },
	          {
	            X: touchMoveX,
	            Y: touchMoveY
	          }
	        );
	      that.items.forEach(function(v, i) {
	        v.isTouchMove = false;
	        //滑动超过30度角 return
	        if (Math.abs(angle) > 30) return;
	        if (i == index) {
	          if (touchMoveX > startX) {
	            //右滑
	            v.isTouchMove = false;
	          } else {
	            //左滑
	            v.isTouchMove = true;
	          }
	        }
	      });
	    },

	    //计算滑动角度
	    angle: function(start, end) {
	      var _X = end.X - start.X,
	        _Y = end.Y - start.Y;
	      //返回角度 /Math.atan()返回数字的反正切值
	      return (360 * Math.atan(_Y / _X)) / (2 * Math.PI);
	    },

	    //删除事件
	    del: function(index) {
	      this.items.splice(index, 1);
	    }
				
		}
	})