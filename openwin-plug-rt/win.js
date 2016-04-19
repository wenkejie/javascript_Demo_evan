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
		renderUi: function(){
			this.boundingBox = $(
				'<div class="window_boundingBox">'
				+ '<div class="window_header">'+CFG.title+'</div>' 
				+ '<div class="window_body">'+CFG.content+'</div>'
				+ '<div class="window_footer"><a class="btn1" href="javascript:" >'+CFG.text4AlertBtn+'</a></div>'
				+ '</div>'
			);
			if (CFG.hasMask) {
				mask = $('<div class="window_mask"></div>');
				mask.appendTo('body');
			};
			if (CFG.hasCloseBtn) {
				var closeBtn = $('<span class="window_closeBtn">X</span>');
				closeBtn.appendTo(boundingBox);
				closeBtn.click(function() {
					CFG.handler4CloseBtn && CFG.handler4CloseBtn();
					boundingBox.remove();
				});
			};
		},
		bindUi : function(){
			var that = this;
			this.boundingBox.delegate('.window_alertBtn', 'click', function() {
				that.fire("alert");
				that.destray();
			}).delegate('.window_closeBtn', 'click', function() {
				that.fire("close");
				that.destray();
			});
			if (this.CFG.handler4AlertBtn) {
				this.on("alert",this.cfg.h)
			}
			if (this.CFG.handler4CloseBtn) {
				this.on("close",this.cfg.handler4CloseBtn);
			}

		},
		syncUi : function(){
			this.boundingBox.css({
				width:this.cfg.width + "px",
				height:this.cfg.height + "px",
				left: (this.cfg.x || (window.innerWidth - this.cfg.width) / 2) + "pc",
				top: (this.cfg.y ||  (window.innerHeight - this.cfg.height) / 2) + "px"
			});
			if (this.cfg.skinClassName) {
				this.boundingBox.addClass(this.cfg.skinClassName);
			}
			if (this.cfg.isDraggable) {
				if (this.cfg.draggable) {
					this.boundingBox.draggable({handle:this.cfg.dragHandle});
				}
				else{
					this.boundingBox.draggable();
				}
			}
		},
		destrwctar: function(){
			this._mask && this._mask.remove();
		},
		alert:function(cfg){
			$.extend(this.cfg.cfg);
			this.render();
			return this;
		},
		
		confirm:function(){},
		prompt:function(){},
		
	});
	return {
		Window:Window
	}
})