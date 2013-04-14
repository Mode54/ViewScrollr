/**
 * ViewScrollr v1.0 - A Custom Scrollable View Module
 */

var navHeight       = 20,
	opacity         = 0.5,
	captionHeight   = 25,
	captionFontSize = 14,
	black           = "#000",
	white           = "#fff",
	scrollDelay     = 4000,
	NAV_STYLE       = {
		BLOCK  : "block",
		CIRCLE : "circle"
	};

/**
 * @method create
 * Creates a custom scrollable view component.
 * @param {Object} options Optional settings for view object (see http://m54.co/ViewScrollrDocs)
 * @return {Ti.UI.View}
 *
 */
exports.create = function(options){
	var container  = Ti.UI.createView({
			width  : options.width  || Ti.UI.FILL,
			height : options.height || Ti.UI.FILL,
			top    : options.top,
			right  : options.right,
			bottom : options.bottom,
			left   : options.left,
			backgroundColor : options.backgroundColor || black
		}),
		navigation = Ti.UI.createView({
			height    : navHeight,
			width     : Ti.UI.SIZE,
			textAlign : Ti.UI.TEXT_ALIGNMENT_CENTER,
			layout    : "horizontal"
		}),
		scrollableView = Ti.UI.createScrollableView({
			showPagingControl : false,
			width             : Ti.UI.FILL,
			height            : Ti.UI.FILL,
			disableBounce     : options.disableBounce || false,
			backgroundColor   : options.backgroundColor || black
		}),
		autoScroll = function(){
			if(isScrolling) return;

			if(currentPage<options.panels.length-1){
				scrollableView.scrollToView(currentPage+1);
			}
			else{
				scrollableView.scrollToView(0);
			}
		},
		setAutoScroll = function(){
			autoScrollTimeout && clearTimeout(autoScrollTimeout);
			autoScrollTimeout = setTimeout(autoScroll, options.delay || scrollDelay);
		},
		navigationPageControls = [],
		currentPage = 0,
		isScrolling = false,
		autoScrollTimeout, aView, aPanel, aCaption;

	if(options.panels){

		opacity = options.alpha || opacity;

		for(var i=0, len=options.panels.length; i<len; i++){
			aPanel = options.panels[i];

			if(aPanel.image){
				aView = aPanel.maxZoomScale ? 
					Ti.UI.createScrollView({
						width  : Ti.UI.FILL,
						height : Ti.UI.FILL,
						maxZoomScale : aPanel.maxZoomScale
					}) :
					Ti.UI.createView({
						width  : Ti.UI.FILL,
						height : Ti.UI.FILL
					});

				aView.add(
					Ti.UI.createImageView({
						image  : aPanel.image,
						width  : Ti.UI.SIZE
					})
				);
			}
			else if(aPanel.view){
				aView = aPanel.view;
			}

			if(aPanel.caption){
				aCaption = createCaptionView(
					aPanel.caption,
					options.navigation && options.navigation.backgroundColor || black
				);
				aCaption[options.navigation.onTop ? "top" : "bottom"] = options.navigation ? navHeight : 0;
				aView.add(aCaption);
			}

			scrollableView.addView(aView);

			if(options.navigation){
				navigationPageControls.push(
					createNavPage(
						(i==0) ? options.navigation.selectedColor : options.navigation.color,
						options.navigation.borderColor || options.navigation.selectedColor,
						options.navigation.showBorder,
						options.navigation.style || NAV_STYLE.CIRCLE
					)
				);
				navigation.add(navigationPageControls[i]);
			}
		}
	}

	scrollableView.addEventListener(
		"scrollEnd",
		function(e){
			isScrolling = false;
			if(options.auto && !isScrolling){ setAutoScroll(); }
		}
	);

	scrollableView.addEventListener(
		"scroll",
		function(e){
			if(currentPage!=e.currentPage && options.navigation){
				navigationPageControls[currentPage].backgroundColor = options.navigation.color;
				navigationPageControls[e.currentPage].backgroundColor = options.navigation.selectedColor;
			}

			currentPage = e.currentPage;
			isScrolling = true;
		}
	);

	Ti.Gesture.addEventListener(
		"orientationchange",
		function(e){
			isScrolling = false;
			if(options.auto){ setAutoScroll(); }
		}
	);

	container.add(scrollableView);

	if(options.navigation){
		aView = Ti.UI.createView({
			width   : Ti.UI.FILL,
			opacity : opacity,
			height  : navHeight,
			bottom  : 0,
			backgroundColor : options.navigation.backgroundColor || black
		});
		aView[options.navigation.onTop ? "top" : "bottom"] = 0;
		navigation[options.navigation.onTop ? "top" : "bottom"] = 0;
		container.add(aView);
		container.add(navigation);
		aView = null;
	}

	setTimeout(
		function(){
			if(options.auto && !isScrolling) setAutoScroll();
		},
		500
	);

	return container;
};

exports.NAV_STYLE = NAV_STYLE;

// Private Utility Funcitons
function createCaptionView(text, bgColor){
	var view = Ti.UI.createView({
		height : captionHeight,
		width  : Ti.UI.FILL
	});

	view.add(Ti.UI.createView({
		opacity : opacity,
		width   : Ti.UI.FILL,
		height  : Ti.UI.FILL,
		backgroundColor : bgColor
	}));

	view.add(Ti.UI.createLabel({
		text      : text,
		color     : white,
		font      : { fontSize : captionFontSize },
		height    : Ti.UI.FILL,
		width     : Ti.UI.FILL,
		textAlign : Ti.UI.TEXT_ALIGNMENT_CENTER
	}));

	return view;
}

function createNavPage(color, borderColor, showBorder, style){
	return Ti.UI.createView({
		backgroundColor : color,
		width           : 8,
		height          : 8,
		top             : 6,
		right           : 4,
		borderWidth     : 1,
		borderColor     : showBorder ? borderColor : color,
		borderRadius    : (style===NAV_STYLE.CIRCLE) ? 4 : 0
	});
}
