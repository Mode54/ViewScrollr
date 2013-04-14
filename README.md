#ViewScrollr by [Mode54](http://m54.co/home)

A Custom Titanium Scrollable View Module

##About

This module is a custom wrapper around the Ti.UI.ScrollableView object to provide extra features. The two main features are auto scrolling and custom paging controls.

Visit our [Titanium blog](http://TiHelp.me) for more code, tips & tricks. You can also checkout [Mode54.com](http://m54.co/home) for our products and services. Code Strong!

##Usage

Here is a quick example of how to use ViewScrollr

```javascript
var ViewScrollr = require("ViewScrollr");

var Banner = ViewScrollr.create({
	top        : 0,
	height     : 180,
	auto       : true,
	navigation : {
		selectedColor   : "#fff",
		color           : "#000",
		backgroundColor : "#000"
	},
	panels : [
		{ image : "/images/sunset_houses.jpg" },
		{ image : "/images/beach.jpg" },
		{ image : "/images/lizard.jpg" },
		{ image : "/images/cove.jpg" },
		{ image : "/images/bermuda.jpg" }
	]
});

win.add(Banner);
```
## Configuration

The `create()` method can take a number of parameters to customize the appearance and behavior of the ViewScrollr.

* **top, bottom, left, right** _[OPTIONAL]_ 
** Position of ViewScrollr relative to the parent. Same as [Ti.UI.View](http://docs.appcelerator.com/titanium/latest/#!/api/Titanium.UI.View) properties.
* **width, height** _[OPTIONAL]_ Size of ViewScrollr in platform-specific units. Same as [Ti.UI.View](http://docs.appcelerator.com/titanium/latest/#!/api/Titanium.UI.View) properties. *_(default: Ti.UI.FILL)_*
* **backgroundColor** _[OPTIONAL]_ The background color of the container. If you view or image is smaller then the width or height then you will see this color in the background. *_(default: #000)_*
* **auto** _[OPTIONAL]_ Enable/Disable auto scroll feature. *_(default: false)_*
* **delay** _[OPTIONAL]_ Delay between panel auto scroll in milliseconds. *_(default: 4000)_*
* **alpha** _[OPTIONAL]_ Alpha (opacity) value of navigation background. *_(default: 0.5)_*
* **navigation** _[OPTIONAL]_ Navigation (page control) settings. Settings object is required to display navigation.
* **panels** _[REQUIRED]_ Panels (Views) to display in the ViewScrollr. This are required for this module to function.


## Got Bugs?

Log them in the [Issues section](https://github.com/Mode54/ViewScrollr/issues). Please provide details reproducible test cases if possible.
