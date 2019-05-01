/**
 * Proximity Event
 * Generic class for allowing an object to determine if an element is in the viewport.
 */
var globallyAccessibleNamespace = globallyAccessibleNamespace || {};

(function($) {
    "use strict";

    /**
     * @param $ele - jquery object of the the element that proximityEvents will be bound with
     * @param eventNameEnter - Name of event that will be triggered by $(window).trigger( eventName, {$ele: element} )
     * @param configOverride - Configuration overrides such as viewingWindowBuffer
     * @returns {{checkVisibility: Function}}
     */
    globallyAccessibleNamespace.proximityEvent = function( $ele, eventNameEnter, eventNameExit, configOverride ) {

       var config = $.extend( { viewingWindowBuffer: 0 }, configOverride),
           $window = $(window),
           _winHeight = $window.height();

		// set events
		$window.scroll($.debounce(100, function () {

			var scrollTop = $window.scrollTop(), elementTop = $ele.offset().top, elementHeight = $ele.outerHeight();

			// check to see if this element has entered the viewport
			publicObj.checkVisibility(scrollTop, elementTop, elementHeight);

		}));

       /**
        * Public method return
        */
       var publicObj = {
           /**
            * Logic to determine if this element has entered the viewport
            * @param scrollTop
            * @param elementTop
            * @param elementHeight
            */
           checkVisibility: function(scrollTop, elementTop, elementHeight) {

               var inViewPort = (
               (elementTop < (scrollTop + _winHeight + config.viewingWindowBuffer)) &&
               (elementTop > (scrollTop - elementHeight - config.viewingWindowBuffer)));
               var previousStatus = $ele.data(eventNameEnter + 'prevStatus');

               // if we're already in viewport simply return
               if (inViewPort === previousStatus) {
                   return;
               }

               // otherwise, we are JUST entering the viewport
               if (inViewPort) {
                   // fire the global trigger
                   $window.trigger(eventNameEnter, {$ele: $ele});
               }

               // exiting the viewport
               else if (!inViewPort && previousStatus === true ) {
                   $window.trigger(eventNameExit, {$ele: $ele});
               }

               $ele.data(eventNameEnter + 'prevStatus', inViewPort);
           }
       };

       return publicObj;

    };

})(jQuery);
