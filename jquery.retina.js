/*
	Authors: Troy Mcilvena (http://troymcilvena.com), @mcilvena
	Authors: Michael Bianco (http://mabblog.com/), @iloveitaly
	Authors: Alexander Wunschik (http://wunschik.it), @wunschik
	Date: 30 April 2014
	Version: 1.4
	
	Revision History:
		1.0   (23/08/2010)	- Initial release.
		1.1   (27/08/2010)	- Made plugin chainable
		1.2   (10/11/2010)	- Fixed broken retina_part setting. Wrapped in self executing function (closure)
		1.3   (29/10/2011)	- Checked if source has already been updated (via mattbilson)
		1.3.1 (30/01/2013)	- via iloveitaly
		1.4   (30/04/2014)	- via mojoaxel
*/

(function( $ ){
	$.fn.retina = function(settings) {
		settings = $.extend({
			suffix: "@2x",
			save_size: true,
			strip_fingerprint: false
		}, (typeof settings === "undefined") ? {} : settings)

		// check if retina; method pulled from retinajs
		var retinaQuery = "(-webkit-min-device-pixel-ratio: 1.5),\
						(min--moz-device-pixel-ratio: 1.5),\
						(-o-min-device-pixel-ratio: 3/2),\
						(min-resolution: 1.5dppx)";

		if(window.devicePixelRatio > 1 || (window.matchMedia && matchMedia(retinaQuery).matches)) {
			this.each(function(index, element) {
				var src = $(element).attr('src');
				if(!src) return;

				if(settings['save_size']) {
					var width = $(element).width();
					var height = $(element).height();
				}

				var new_image_src = src;

				if(settings['strip_fingerprint']) {
					new_image_src = new_image_src.replace(/-\b[0-9a-f]{5,40}\b\./g, '.')
				}

				var pos = new_image_src.lastIndexOf('.');
				new_image_src = new_image_src.substring(0, pos) + settings['suffix'] + new_image_src.substring(pos);

				$.ajax({
					url: new_image_src,
					type: "HEAD",
					success: function() {
						$(element).attr('src', new_image_src);

						if(settings['save_size']) {
							$(element).width(width);
							$(element).height(height);
						}
					}
				});
			});
		}
		return this;
	}
})( jQuery );