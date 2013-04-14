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

