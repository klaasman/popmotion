"use strict";

var styleDOM = function () {
	var testElement,
		prefixes = ['Webkit','Moz','O','ms', ''],
		prefixesLength = prefixes.length,
		cache = {},
		
		/*
			Test style property for prefixed version
			
			@param [string]: Style property
			@return [string]: Cached property name
		*/
		testPrefix = function (key) {
			cache[key] = key;

			for (var i = 0; i < prefixesLength; i++) {
				var prefixed = prefixes[i] + key.charAt(0).toUpperCase() + key.slice(1);

				if (testElement.style.hasOwnProperty(prefixed)) {
					cache[key] = prefixed;
				}
			}
			
			return cache[key];
		},

	    // Cache body tag if we haven't already
		cacheTestElement = function () {
			testElement = testElement || document.getElementsByTagName('body')[0];
		};
	
	/*
		Style DOM functions
	*/
	return {

		/*
			Get DOM styles

			@param [DOM Element]: Element to get styles from
			@param [string]: Name of style to read
		*/
		get: function (element, name) {
			testElement = cacheTestElement();
			return window.getComputedStyle(element, null)[cache[name] || testPrefix(name)];
		},

		/*
			Set DOM styles

			@param [DOM Element]: Element to set styles on
			@param [object]: DOM styles to set
		*/
		set: function (element, props) {
			testElement = cacheTestElement();
		    for (var key in props) {
				if (props.hasOwnProperty(key)) {
					element.style[cache[key] || testPrefix(key)] = props[key];
				}
			}
		}

	};
};

module.exports = new styleDOM();