/**
 * Anchor Linker v0.1
 * github repo link
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
				backgroundColor: '#00adef',	// available values: hex, rgb, rgba, color name (lightpink, lightblue, blue, yellow etc.)
				color: '#fff',	// available values: hex, rgb, rgba, color name (lightpink, lightblue, blue, yellow etc.)
				highlightClass: '',	//if enter the value this field, backgroundColor, color properties will be disable.
				scrollDelay: 500	//scroll animate delay
			};

			var options = $.extend(defaults, options),
					$permalink = $('<a class="' + options.anchorLinkClass + '" href="#">&para;</a>'),
					$highlight = $('<span class="anchor-highlighted" />');

			if(options.highlightClass.length){
				$highlight.addClass(options.highlightClass);
			}else{
				$highlight.css({
					'background-color': options.backgroundColor,
					'color': options.color,
				});
			}

			$highlight.css('display', 'inline-block');

			var $anchor, anchor, anchor_top, id, anchor_index = 0;

			this.each(function(index, element){
				var $this = $(this);

				if(!index && $('[data-anchor^="anchor"]').length){
					anchor_index = parseInt(/(\d+)/.exec($('[data-anchor^="anchor"]:last').attr('data-anchor'))[0]);
				}

				anchor_index++;

				$clone_permalink = $permalink.clone();
			
				if($this.attr('id')){
					id = $this.attr('id');
					$clone_permalink.attr('href', '#' + id);
				}else{
					$clone_permalink.attr('href', '#anchor' + anchor_index);
				}
			
				$clone_permalink.css({ 'font-size': '0.7em' });
				$this.append($clone_permalink);
				$this.attr('data-anchor', 'anchor' + anchor_index);
			});

			function slideAndAnimate(px){
				if(typeof px === 'undefined') px = null;
				$('html:not(:animated), body:not(:animated)').animate({
					scrollTop: anchor_top
				}, options.scrollDelay);				
			}
			
			if($.get_anchor()){
				$anchor = $.get_$anchor();
				anchor_top = $anchor.offset().top;
				$clone_highlight = $highlight.clone();
				$anchor.wrapInner($clone_highlight);
				slideAndAnimate();
			}
			
			$('.anchor-link').on('click', function(event){
				$highlighted = $('.anchor-highlighted');
				if($highlighted.length){
					$highlighted.parent().html($highlighted.html());
				}
				anchor = $(this).attr('href').replace('#', '');
				$anchor = $.get_$anchor(anchor);
				anchor_top = $anchor.offset().top;
				$anchor.wrapInner($highlight);
				slideAndAnimate(anchor_top);
			});
		}
	});


})(jQuery);

console.log("anchor linker successfully loaded!");