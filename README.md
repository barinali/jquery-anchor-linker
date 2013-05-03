jQuery Anchor Linker (jquery-anchor-linker)
====================

This plugin will make anchor link matched elements.

Sample http://alibarin.com.tr/jquery-anchor-linker/ for now.


Available Plugin Properties
---------------------

// call this function after scroll sliding	(function)<br />
__after__: function(){},<br />
// example: example.com/#anchor1, example.com/#anchor2	(string)<br />
__anchorName__: 'anchor',<br />
// add to anchor link 's class attribute	(string)<br />
__anchorLinkClass__: 'anchor-link',<br />
// anchor link 's content__	(string)<br />
__anchorLinkHtml__: '&para;',<br />
// auto hide anchor link	(boolean, true/false)<br />
__autoHide__: false,<br />
// call this function before scroll sliding	(function)<br />
__before__: function(){},<br />
// highlighted anchor 's background color	(color name as string, hex code, rgb, rgba)<br />
__backgroundColor__: '#00adef',<br />
// highlighted anchor 's text color	(color name as string, hex code, rgb, rgba)<br />
__color__: '',<br />
// highlighted anchor 's background color fade to this color (color name as string, hex code, rgb, rgba)<br />
__backgroundColorTo__: 'transparent',<br />
// background fade/transition duration	(s/ms as string. example: 300ms, 1s etc.)
__transitionDuration__: '500ms',<br />
// add to highlighted anchor 's class attribute<br />
__highlightClass__: '',<br />
// a number determining how long the animation will run<br />
__scrollDuration__: 500<br />
