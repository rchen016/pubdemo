/**
 * Ads that are dynamically created
 * Placements look like:
 * <div id="ad300x250" data-ad-device="desktop" data-ad-placeholder="ad300x250" class="dynamic-ad-proximity-load" data-ad-width="300" data-ad-height="250"></div>
 */
var globallyAccessibleNamespace = globallyAccessibleNamespace || {};

globallyAccessibleNamespace.debug = true;

(function($) {
	"use strict";

	globallyAccessibleNamespace.dynamicAd = function() {

        // bind proximity events to all placeholders
        $("div.dynamic-ad-proximity-load").each(function() {

			var $ele = $(this);

			// setting up to trigger $(window).trigger('enterviewport', $ele), 200px BEFORE it actually enters the viewport
			globallyAccessibleNamespace.proximityEvent( $ele, 'enterviewport', 'exitviewport', { viewingWindowBuffer: 200 } );

			// setup proximity events for an Ad that is fully in the viewport
			var placementHeight = ~~$ele.data("ad-height") ? ~~$ele.data("ad-height") : 50;
			globallyAccessibleNamespace.proximityEvent( $ele, 'adviewed', 'adviewedexit', { viewingWindowBuffer: -placementHeight } );

        });

        // setup listeners
        $(window)

            // functionality for anything needing to be done when the element enters the viewport
            .on('enterviewport', function ( e, params ) {

				if (globallyAccessibleNamespace.debug) {
					console.log('[jPat][dynAd] - ENTERING VIEWPORT... - ' + $(window).height() + ' -- ScrollTop: ' + $(window).scrollTop());
				}

                if ( params.$ele.data('adloaded') !== true ) {

                    // MAKE AD CALLS HERE!
                    params.$ele.data('adloaded', true );

					if (globallyAccessibleNamespace.debug) {
						console.log('[jPat][dynAd] - MAKING AD CALL...');
						console.log('[jPat][dynAd] ID: ' + params.$ele.context.attributes['data-ad-placeholder'].value + ' -- Width: ' + params.$ele.context.attributes['data-ad-width'].value + ' -- Height: ' + params.$ele.context.attributes['data-ad-height'].value + ' -- Window Height: ' + params.$ele.context.offsetTop);
					}

					if (params.$ele.context.attributes['data-ad-width'].value == '300' && params.$ele.context.attributes['data-ad-height'].value == '250') {

						// AD CALL - called from gpt_ads.js
						// addDynamicAd(divId, width, height, device)
						addDynamicAd(params.$ele.context.attributes['data-ad-placeholder'].value, params.$ele.context.attributes['data-ad-width'].value, params.$ele.context.attributes['data-ad-height'].value, params.$ele.context.attributes['data-ad-device'].value);

					}

					//
					// FOR DEMO PURPOSES ONLY - REMOVE FOR PRODUCTION
					//
					if (params.$ele.context.attributes['data-ad-width'].value == '728' && params.$ele.context.attributes['data-ad-height'].value == '90') {

						// AD CALL - DEMO ONLY - called from gpt_ads.js
						// addInfinity728Ad(divId, width, height, device)
						addInfinity728Ad(params.$ele.context.attributes['data-ad-placeholder'].value, params.$ele.context.attributes['data-ad-width'].value, params.$ele.context.attributes['data-ad-height'].value, params.$ele.context.attributes['data-ad-device'].value);

					}
					//
					//
					//

					// Google Analytics Event Tracking - Ad Called
					//ga('send', 'event', 'Ad Flow', 'Dynamic Ad Being Called', params.$ele.context.attributes['data-ad-placeholder'].value);

                }
            })

            // functionality for anything needing to be done when the element has been viewed
            .on('adviewed', function ( e, params ) {

				if (globallyAccessibleNamespace.debug) {
					console.log('[jPat][dynAd] ad viewed...');
				}

				// Google Analytics Event Tracking - Ad Loaded
				ga('send', 'event', 'Ad Flow', 'Dynamic Ad Viewed', params.$ele.context.attributes['data-ad-placeholder'].value);

                if ( params.$ele.data('adloaded') === true && params.$ele.data('adviewed') !== true ) {

                    // CALLS FOR WHEN YOUR ADD IS VIEWED
                    params.$ele.data('adviewed', true);

					if (globallyAccessibleNamespace.debug) {
						console.log('[jPat][dynAd] ad loaded and viewed...');
					}
					// Google Analytics Event Tracking - Ad Loaded & Viewed
					//ga('send', 'event', 'Ad Flow', 'Dynamic Ad Loaded and Viewed', params.$ele.context.attributes['data-ad-placeholder'].value);

                }
            });
    };

})(jQuery);
