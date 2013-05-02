/**
 * jQuery Anchor Linker v0.1
 * https://github.com/alibarin/jquery-anchor-linker
 *
 * Licensed under the MIT license.
 * Copyright 2012 Ali BARIN
 */

;(function($){
	$.extend({
		get_anchor: function(){
			return window.location.hash.length ? window.location.hash.replace("#", "") : false;
		},
		get_$anchor: function(anchor){
			var anchor = anchor || $.get_anchor();
			return $('#' + anchor).length ? $('#' + anchor) : $('[data-anchor="' + anchor + '"]');
		}
	});

	$.fn.extend({
		anchorlinker: function(options){
			var defaults = {
				anchorName: 'anchor',
				anchorLinkClass: 'anchor-link',	//will be add anchor link 's class property
				autoHide: false,
				backgroundColor: '#00adef',	// available values: hex, rgb, rgba, color name (lightpink, lightblue, blue, yellow etc.)
				color: '#fff',	// available values: hex, rgb, rgba, color name (lightpink, lightblue, blue, yellow etc.)
				highlightClass: '',	//if enter the value this field, backgroundColor, color properties will be disable.
				scrollDelay: 500	//scroll animate delay
			};

			var options = $.extend(defaults, options),
					$permalink = $('<a class="' + options.anchorLinkClass + '" href="#">&para;</a>'),
					$highlight = $('<span class="anchor-highlighted" />');

			if(options.autoHide) $permalink.hide();

			if(options.highlightClass.length){
				$highlight.addClass(options.highlightClass);
			}else{
				$highlight.css({
					'background-color': options.backgroundColor,
					'color': options.color,
				});
			}

			$highlight.css('display', 'inline-block');

			var $anchor, anchor, anchorTop, id, anchorIndex = 0;

			this.each(function(index, element){
				var $this = $(this);

				if(!index && $('[data-anchor^="anchor"]').length){
					anchorIndex = parseInt(/(\d+)/.exec($('[data-anchor^="anchor"]:last').attr('data-anchor'))[0]);
				}

				anchorIndex++;

				$clonePermalink = $permalink.clone();
			
				if($this.attr('id')){
					id = $this.attr('id');
					$clonePermalink.attr('href', '#' + id);
				}else{
					$clonePermalink.attr('href', '#anchor' + anchorIndex);
				}
			
				$clonePermalink.css({ 'font-size': '0.7em' });
				$this.append($clonePermalink);
				$this.attr('data-anchor', 'anchor' + anchorIndex);

				var hideActive = 0, $p;
				$this.hover(function(){
					$p = $('.' + options.anchorLinkClass, this);
					if($p.is(':hidden')){
						hideActive = 1;
						$p.show();
					}
				}, function(){
					if(hideActive){
						$p.hide();
						hideActive = 0;						
					}
				});
			});

			function slideAndAnimate(px){
				if(typeof px === 'undefined') px = null;
				$('html:not(:animated), body:not(:animated)').animate({
					scrollTop: anchorTop
				}, options.scrollDelay);				
			}
			
			if($.get_anchor()){
				$anchor = $.get_$anchor();
				anchorTop = $anchor.offset().top;
				$cloneHighlight = $highlight.clone();
				$anchor.wrapInner($cloneHighlight);
				slideAndAnimate();
			}
			
			$('.anchor-link').on('click', function(event){
				$highlighted = $('.anchor-highlighted');
				if($highlighted.length){
					$highlighted.parent().html($highlighted.html());
				}
				anchor = $(this).attr('href').replace('#', '');
				$anchor = $.get_$anchor(anchor);
				anchorTop = $anchor.offset().top;
				$anchor.wrapInner($highlight);
				slideAndAnimate(anchorTop);
			});
		}
	});


})(jQuery);

console.log("anchor linker successfully loaded!");
