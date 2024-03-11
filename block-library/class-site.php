<!-- THIS FILE WILL CONTAIN A LOT OF OTHER IMPORTANT FUNCTIONS PERTAINING TO THE SITE. FOR THIS EXAMPLE I HAVE ONLY INCLUDED FUNCTIONS RELATED TO BLOCKS. ADJUST AS NEEDED FOR NEW PROJECTS AND REMEMBER TO REPLACE ANY REFERENCE TO "Northfield Union of Youth" OR "Key". -->


<?php

/**
 * Northfield Union of Youth Site Class
 *
 * @package Key
 * @since   Key 1.0
 */

namespace Key;

/**
 * This class initializes the site
 */
class Site extends \Timber\Site {

	public function define_image_sizes() {
		// add_image_size( 'image-text', 100, 100, true );
		add_image_size( 'callout-image', 1200, 675, true ); // 1.77:1
		add_image_size( 'callout-image-large', 1485, 550, true ); // 1.77:1
		add_image_size( 'carousel-image-xlarge', 1500, 600, true ); // 2.5:1
		add_image_size( 'carousel-large-image', 1200, 480, true ); // 2.5:1
		add_image_size( 'carousel-mobile', 992, 620, true ); // 1.6:1
		add_image_size( 'image-text', 620, 440, false ); // 1.8:1
		add_image_size( 'card-image-16x9', 720, 405, true ); // 1.05:1.
		add_image_size( 'people-image', 380, 380, true); // 1:1
	}

	/**
	 * Register custom image size with sizes list to make it available.
	 *
	 * @link https://codex.wordpress.org/Plugin_API/Filter_Reference/image_size_names_choose
	 *
	 * @param array $sizes Image size array.
	 */
	public function name_image_sizes( $sizes ) {
		return array_merge(
			$sizes,
			array(
				// 'image-text'           => __( 'Image & Text' ),
				'callout-image'        => __( 'Callout Image' ),
				'callout-image-large'  => __( 'Callout Image Large' ),
				'carousel-image-xlarge'  => __( 'Carousel Image X-Large' ),
				'carousel-image-mobile'  => __( 'Carousel Image Mobile' ),
				'callout-image-large'  => __( 'Callout Image Large' ),
				'card-image-16x9'  => __( 'Card Image 16x9' ),
				'image-text'  => __( 'Image & Text' ),
			)
		);
	}

	/**
	 * This is where you add some context
	 *
	 * @param string $context context['this'] Being the Twig's {{ this }}.
	 */
	public function add_to_context( $context ) {

		$context['button_text']           = get_field( 'button_text', 'options' );
		$context['button_link']           = get_field( 'button_link', 'options' );


		if ( defined( 'PANTHEON_ENVIRONMENT' ) ) {
			$context['environment'] = PANTHEON_ENVIRONMENT;
		}

		return $context;
	}


}

new Site();
