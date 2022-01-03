import 'bootstrap';

jQuery( document ).ready( ( $ ) => {
	const SiteNameScripts = {
		init() {
			this._initJs();
			// Add more init functions
		},
		_initJs() {
			$( document.documentElement )
				.removeClass( 'no-js' )
				.addClass( 'js' );

		},
	};

	SiteNameScripts.init();
} );
