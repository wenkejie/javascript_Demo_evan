// windows
define(['widget','jquery','jqueryUI'],function(widget,$,$UI) {
	function Window() {
		this.cfg = {
			width : 500,
			height : 300,
			content: '',
			// handler: null,
			title: '弹窗',
			hasMask: true,
			isDraggable: true,
			dragHandle: null,
			skinClassName: null,
			text4AlertBtn: '确定',
			handler4AlertBtn: null,
			handler4CloseBtn: null
			// hasCloseBtn: false	
		};
		// this.handlers = {}
	}
	Window.prototype = $.extend({},new widget.Widget(),{
		alert:function(cfg){
			var CFG = $.extend(this.cfg,cfg);
			that = this;
			var boundingBox = 
				$('<div class="window_boundingBox">'
				+ '<div class="window_header">'+CFG.title+'</div>' 
				+ '<div class="window_body">'+CFG.content+'</div>'
				+ '<div class="window_footer"><a class="btn1" href="javascript:" >'+CFG.text4AlertBtn+'</a></div>'
				+ '</div>'),
				btn = boundingBox.find('.btn1')
			;
			boundingBox.appendTo("body");
			// boundingBox.html(CFG.content);
			// var btn = $('<input type="button" value="确定" />');
			// btn.appendTo(boundingBox);
			btn.click(function() {
				CFG.handler4AlertBtn && CFG.handler4AlertBtn();
				boundingBox.remove();
				that.fire("alert");
			});
			// $.extend(this.cfg, cfg);
			boundingBox.css({
				width: this.cfg.width + "px",
				height: this.cfg.height + "px",
				left:   (this.cfg.x || (window.innerWidth-this.cfg.width)/2) + "px",
				top:   (this.cfg.x || (window.innerHeight-this.cfg.height)/2) + "px"
			});
			if (CFG.hasCloseBtn) {
				var closeBtn = $('<span class="window_closeBtn">X</span>');
				closeBtn.appendTo(boundingBox);
				closeBtn.click(function() {
					CFG.handler4CloseBtn && CFG.handler4CloseBtn();
					boundingBox.remove();
				});
			};
			if (CFG.skinClassName) {
				boundingBox.addClass(CFG.skinClassName);
			}
			hasMask: null;
			if (CFG.hasMask) {
				mask = $('<div class="window_mask"></div>');
				mask.appendTo('body');
			}
			if (CFG.isDraggable) {
				if (CFG.dragHandle) {
					boundingBox.draggable({handle:CFG.dragHandle});
				} else{
					boundingBox.draggable();
				}
			}
			return this;
		},
		
		confirm:function(){},
		prompt:function(){},
		//监听
		// on: function(type, handler) {
		// 	if (typeof this.handlers[type] == "undefined") {
		// 		//判断了this.handlers[type]的类型
		// 		this.handlers[type] = [];
		// 	}
		// 	this.handlers[type].push(handler);
		// 	return this;
		// },
		// // 触发
		// fire: function(type, data) {
		// 	if (this.handlers[type] instanceof Array) {
		// 		var handlers = this.handlers[type];
		// 		for (var i = 0, len = handlers.length;i < len; i++) {
		// 			handlers[i](data);
		// 		}
		// 	}
		// }
	});
	return {
		Window:Window
	}
})