/**
 * ViewScrollr Demo App
 */

Ti.UI.setBackgroundColor("#000");

var ViewScrollr = require("ViewScrollr"),
	App = Ti.UI.createWindow({
		navBarHidden : true,
	    backgroundColor : "#fff"
	}),
	introView = Ti.UI.createView({
		width  : Ti.UI.FILL,
		height : Ti.UI.FILL,
		backgroundColor : "#eee"
	}),
	appNameLbl = Ti.UI.createLabel({
		text  : "ViewScrollr Demo",
		width : Ti.UI.FILL,
		top   : 10,
		color : "#000",
		font  : { fontWeight : "bold", fontSize : 20 },
		textAlign : Ti.UI.TEXT_ALIGNMENT_CENTER
	}),
	theEndLbl = Ti.UI.createLabel({
		text  : "The End!",
		color : "#fff",
		font  : { fontWeight : "bold", fontSize : 26 },
		textAlign : Ti.UI.TEXT_ALIGNMENT_CENTER
	}),
	imageContainer = Ti.UI.createView({
		layout : "horizontal",
		width  : Ti.UI.SIZE,
		height : Ti.UI.SIZE,
		top    : 40
	}),
	outroView = Ti.UI.createView({
		width  : Ti.UI.FILL,
		height : Ti.UI.FILL,
		backgroundColor : "#000"
	}),
	createImageCircle = function(img){
		return Ti.UI.createImageView({
			image  : img,
			width  : 100,
			height : 100,
			borderWidth  : 2,
			borderColor  : "#42bcbc",
			borderRadius : 50
		});
	},
	imgOne   = createImageCircle("/images/cove.jpg"),
	imgTwo   = createImageCircle("/images/bermuda.jpg"),
	imgThree = createImageCircle("/images/beach.jpg"),
	Banner;

imgOne.left = 0;
imgTwo.left = -10;
imgThree.left = -10;

introView.add(appNameLbl);
imageContainer.add(imgOne);
imageContainer.add(imgTwo);
imageContainer.add(imgThree);
introView.add(imageContainer);
outroView.add(theEndLbl);

Banner = ViewScrollr.create({
	top        : 0,
	height     : 180,
	auto       : true,
	delay      : 3000,
	alpha      : 0.7,
	backgroundColor : "#000",
	navigation : {
		onTop           : false,
		style           : ViewScrollr.NAV_STYLE.BLOCK,
		selectedColor   : "#fff",
		color           : "#000",
		showBorder      : true,
		borderColor     : "#fff",
		backgroundColor : "#000"
	},
	panels : [
		{
			view : introView
		},
		{
			image : "/images/sunset_houses.jpg",
			maxZoomScale : 4.0
		},
		{
			image : "/images/beach.jpg"
		},
		{
			image : "/images/lizard.jpg"
		},
		{
			image : "/images/cove.jpg",
			caption : "Beautiful big rocks and water."
		},
		{
			image : "/images/bermuda.jpg",
			caption : "Life is a beach chair"
		},
		{
			view : outroView
		}
	]
});

Ti.Gesture.addEventListener(
	"orientationchange",
	function(e){
		if(e.source.isPortrait()){
			Banner.height = 180;
		}
		else {
			Banner.height = Ti.UI.FILL;
		}
	}
);

App.add(Banner);

App.open();
