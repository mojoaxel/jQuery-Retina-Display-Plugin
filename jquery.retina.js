/*
	Authors: Troy Mcilvena (http://troymcilvena.com), @mcilvena
	Authors: Michael Bianco (http://mabblog.com/), @iloveitaly
	Authors: Alexander Wunschik (http://wunschik.it), @wunschik
	Date: 11 Mai 2014
	Version: 1.4.1
	
	Revision History:
		1.0   (23/08/2010)	- Initial release.
		1.1   (27/08/2010)	- Made plugin chainable
		1.2   (10/11/2010)	- Fixed broken retina_part setting. Wrapped in self executing function (closure)
		1.3   (29/10/2011)	- Checked if source has already been updated (via mattbilson)
		1.3.1 (30/01/2013)	- (iloveitaly)
		1.4   (30/04/2014)	- added support for "background-image" (mojoaxel)
		1.4.1 (11/05/2014)	- added option to force high resolution images (mojoaxel)
*/

(function( $ ){
	$.fn.retina = function(settings) {
		settings = $.extend({
			suffix: "@2x",
			save_size: true,
			strip_fingerprint: false,
			force: false
		}, (typeof settings === "undefined") ? {} : settings);

		// check if retina; method pulled from retinajs
		var retinaQuery = "(-webkit-min-device-pixel-ratio: 1.5)," +
						"(min--moz-device-pixel-ratio: 1.5)," +
						"(-o-min-device-pixel-ratio: 3/2)," +
						"(min-resolution: 1.5dppx)";

		if (window.devicePixelRatio > 1 || (window.matchMedia && matchMedia(retinaQuery).matches) || settings.force) {
			this.each(function(index, element) {
				var src = $(element).attr('src');
				var bgSrc = $(element).css('background-image').replace("url(", "").replace(")", "");
				if(!src && !bgSrc) { return; }

				if(settings.save_size) {
					var width = $(element).width();
					var height = $(element).height();
				}
				
				var new_image_src = src;
				var new_image_bgSrc = bgSrc;

				if(settings.strip_fingerprint) {
					new_image_src = new_image_src.replace(/-\b[0-9a-f]{5,40}\b\./g, '.');
					new_image_bgSrc = new_image_bgSrc.replace(/-\b[0-9a-f]{5,40}\b\./g, '.');
				}

				var checkForRetina = new RegExp("(.+)("+settings.retina_part+"\\.\\w{3,4})");
				if(!checkForRetina.test(src) && src) {
					var pos = new_image_src.lastIndexOf('.');
					new_image_src = new_image_src.substring(0, pos) + settings.suffix + new_image_src.substring(pos);
					$.ajax({
						url: new_image_src,
						type: "HEAD",
						success: function() {
							$(element).attr('src', new_image_src);
	
							if(settings.save_size) {
								if (width)  $(element).width(width);
								if (height) $(element).height(height);
							}
						}
					});
				}
				
				if(!checkForRetina.test(bgSrc) && bgSrc) {
					var pos = new_image_bgSrc.lastIndexOf('.');
					new_image_bgSrc = new_image_bgSrc.substring(0, pos) + settings.suffix + new_image_bgSrc.substring(pos);
					$.ajax({
						url: new_image_bgSrc,
						type: "HEAD",
						success: function() {
							console.log(new_image_bgSrc);
							$(element).css('background-image', "url(" + new_image_bgSrc + ")");
							
							if(settings.save_size) {
								if (width)  $(element).width(width);
								if (height) $(element).height(height);
							}
						}
					});
				}
			});
		}
		return this;
	};
})( jQuery );