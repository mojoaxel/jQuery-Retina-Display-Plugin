## jQuery Retina
Retina images for your website. Main differences from [retinajs](http://retinajs.com) are:

* You can select which images you want to retinify
* Optionally retain original image size
* Configurable image suffix
* jQuery dependency

## Installation
Download the zip from GitHub or install via bower:
```
bower install --save jquery.retina
```
## Usage

```javascript
$('img.retina').retina();

$(element).retina({
	save_size: false,
	suffix: '-some-crazy-2x-suffix'
});
```

## Authors

* Michael Bianco (@iloveitaly)
* Original author: Troy Mcilvena, http://www.troymcilvena.com, @mcilvena
 
