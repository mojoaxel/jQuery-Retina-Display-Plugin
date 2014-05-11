## jQuery Retina
Retina images for your website. Main differences from [retinajs](http://retinajs.com) are:

* You can select which images you want to retinify
* Optionally retain original image size
* Configurable image suffix
* Optionally strip asset fingerprint
* jQuery dependency

## Installation
Download the zip from GitHub or install via bower:
```
bower install --save jquery.retina
```
## Usage

```javascript
$(window).load(function() {
	$('img.retina').retina();

	$(element).retina({
		save_size: false,
		suffix: '-some-crazy-2x-suffix',
		strip_fingerprint: true
	});
});
```

## Authors

* Original author: Troy Mcilvena, http://www.troymcilvena.com, @mcilvena
* Michael Bianco (@iloveitaly)
* Alexander Wunschik http://wunschik.it, (@wunschik)
 
