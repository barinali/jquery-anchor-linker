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
				after: function(){},
				anchorName: 'anchor',
				anchorLinkClass: 'anchor-link',	//will be add anchor link 's class property
				autoHide: false,
				before: function(){},
				backgroundColor: '#00adef',	// available values: hex, rgb, rgba, color name (lightpink, lightblue, blue, yellow etc.)
				color: '',	// available values: hex, rgb, rgba, color name (lightpink, lightblue, blue, yellow etc.)
				backgroundColorTo: 'transparent',
				transitionDuration: '500ms',
				highlightClass: '',	//if enter the value this field, backgroundColor, color properties will be disable.
				scrollDuration: 500	//scroll animate duration
			};

			var options = $.extend(defaults, options),
					$permalink = $('<a class="' + options.anchorLinkClass + '" href="#">&para;</a>'),
					$highlight = $('<span class="anchor-highlighted" />');

			window.animated = 0;

			if(options.autoHide) $permalink.hide();

			if(options.highlightClass.length){
				$highlight.addClass(options.highlightClass);
			}else{
				$highlight.css({
					'background-color': options.backgroundColor,
					'color': options.color,
				});
			}

			$highlight.css({
				'transition': 'color ' + options.transitionDuration + ', background ' + options.transitionDuration,
				'mozTransition': 'color ' + options.transitionDuration + ', background ' + options.transitionDuration,
				'webkitTransition': 'color ' + options.transitionDuration + ', background ' + options.transitionDuration,
				'display': 'inline-block'
			});

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

				options.before();

				var i = 0;

				$('html:not(:animated), body:not(:animated)').stop().animate(
				{
					scrollTop: anchorTop
				},
				{
					duration: options.scrollDuration,
					complete: function(){
						i++;
						if(i === $('html, body').length){
							$('.anchor-highlighted').css({
								'background': options.backgroundColorTo,
								'color': 'inherit'
							});
							options.after();
						}
					}
				});
			}
			
			if($.get_anchor()){
				$anchor = $.get_$anchor();
				if($anchor.length){
					anchorTop = $anchor.offset().top;
					$cloneHighlight = $highlight.clone();
					$anchor.wrapInner($cloneHighlight);
					slideAndAnimate();
				}
			}

			$(document).off('click', '.anchor-link').on('click', '.anchor-link', function(event){
				$highlighted = $('.anchor-highlighted');

				if($highlighted.length) $highlighted.parent().html($highlighted.html());
				
				anchor = $(this).attr('href').replace('#', '');
				$anchor = $.get_$anchor(anchor);
				anchorTop = $anchor.offset().top;
				$cloneHighlight = $highlight.clone();
				$anchor.wrapInner($cloneHighlight);
				slideAndAnimate(anchorTop);
			});
		}
	});


})(jQuery);

console.log("anchor linker successfully loaded!");
