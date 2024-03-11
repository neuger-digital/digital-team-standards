<!-- NOTE: REPLACE ALL INSTANCES OF "Northfield Union of Youth" OR "Key" WITH DESIGNATED TERMS FOR YOUR PROJECT. -->


<?php
/**
 * Northfield Union of Youth Blocks
 * Description: Custom blocks made for Northfield Union of Youth by Neuger.
 *
 * @package  Key
 * @since   Key 1.0
 */

namespace Key;

defined( 'ABSPATH' ) || exit;

/**
 * Register blocks for Northfield Union of Youth
 */
class Blocks {

	static $icon_count = 0;

	/**
	 * Constructor
	 */
	public function __construct() {
		add_filter( 'block_categories_all', array( $this, 'block_categories' ), 10, 2 );
		add_action( 'init', array( $this, 'register_blocks' ) );
		add_action( 'admin_head', array( $this, 'gutenberg_admin_styles' ) );

		// Remove h1.
		add_action( 'admin_head', array( $this, 'remove_h1_gutenberg_editor' ) );

		add_filter( 'block_editor_settings_all', array( $this, 'editor_settings' ), 10, 1 );
	}

	/**
	 * Add custom "Layout" block category
	 *
	 * @link https://wordpress.org/gutenberg/handbook/designers-developers/developers/filters/block-filters/#managing-block-categories
	 *
	 * @param array  $categories Categories array.
	 * @param object $post Post object.
	 */
	public function block_categories( $categories, $post ) {
		return array_merge(
			array(
				array(
					'slug'  => 'key-layout',
					'title' => __( 'Layout' ),
				),
			),
			$categories,
		);
	}

	public function gutenberg_admin_styles() {
		echo '
			<style>
				/* Main column width */
				.editor-styles-wrapper .wp-block {
					max-width: 1024px;
					/* padding-left: 2rem; */
					/* padding-right: 2rem; */
				}

				/* Width of "wide" blocks */
				.editor-styles-wrapper .wp-block[data-align="wide"] {
					max-width: 1200px;
				}

				/* Width of "full-wide" blocks */
				.editor-styles-wrapper .wp-block[data-align="full"] {
					max-width: none;
				}

				.editor-styles-wrapper .wp-block[data-align="left"] {
					text-align: left;
				}

				.editor-styles-wrapper .wp-block[data-align="center"] {
					text-align: center !important;
				}

				.editor-styles-wrapper .wp-block[data-align="right"] {
					text-align: right;
				}

				.editor-styles-wrapper .wp-block[data-align=left],
				.editor-styles-wrapper .wp-block[data-align=center],
				.editor-styles-wrapper .wp-block[data-align=right] {
					height: auto;
				}

				.editor-styles-wrapper .wp-block[data-align=left] > .component,
				.editor-styles-wrapper .wp-block[data-align=center] > .component,
				.editor-styles-wrapper .wp-block[data-align=right] > .component {
					float: none;
					margin-left: 0;
					margin-right: 0;
				}

				.editor-styles-wrapper .wp-block-button {
					margin-left: 0;
					margin-right: 0;
				}

				.editor-styles-wrapper .wp-block[data-align="left"] .wp-block-button {
					margin-right: auto;
				}

				.editor-styles-wrapper .wp-block[data-align="center"] .wp-block-button {
					margin-left: auto;
					margin-right: auto;
				}

				.editor-styles-wrapper .wp-block[data-align="right"] .wp-block-button {
					margin-left: auto;
				}



			</style>
		';
	}

	function remove_h1_gutenberg_editor() {
		echo '<style>
		#editor .block-library-heading-level-toolbar .components-toolbar-group button:first-child {
			width: 3px;
			min-width: auto;
			padding: 3px 0;
			pointer-events: none;
			visibility: hidden;
		}
		</style>';
	}

	function editor_settings( $editor_settings ) {
		$editor_settings['__experimentalFeatures']['color']['background'] = false;
			$editor_settings['__experimentalFeatures']['color']['customDuotone'] = false;
			$editor_settings['__experimentalFeatures']['color']['duotone'] = [];
			$editor_settings['__experimentalFeatures']['color']['gradients'] = [];
			$editor_settings['__experimentalFeatures']['color']['palette'] = [];
			$editor_settings['__experimentalFeatures']['color']['text'] = [];
			$editor_settings['__experimentalFeatures']['typography']['dropCap'] = false;
			$editor_settings['__experimentalFeatures']['typography']['fontSizes'] = [];
			$editor_settings['__experimentalFeatures']['typography']['fontStyle'] = false;
			$editor_settings['__experimentalFeatures']['typography']['fontWeight'] = false;
			$editor_settings['__experimentalFeatures']['typography']['letterSpacing'] = false;
			$editor_settings['__experimentalFeatures']['typography']['textDecoration'] = false;
			$editor_settings['__experimentalFeatures']['typography']['textTransform'] = false;
			$editor_settings['__experimentalFeatures']['blocks']['core/button']['border']['radius'] = false;
			$editor_settings['__experimentalFeatures']['blocks']['core/button']['width'] = false;
			$editor_settings['__experimentalFeatures']['blocks']['core/button']['textColor'] = false;
			$editor_settings['__experimentalFeatures']['blocks']['core/button']['backgroundColor'] = false;
			$editor_settings['__experimentalFeatures']['blocks']['core/pullquote']['border']['color'] = false;
			$editor_settings['__experimentalFeatures']['blocks']['core/pullquote']['border']['radius'] = false;
			$editor_settings['__experimentalFeatures']['blocks']['core/pullquote']['border']['style'] = false;
			$editor_settings['__experimentalFeatures']['blocks']['core/pullquote']['border']['width'] = false;
		return $editor_settings;
	}

	/**
	 * Registers all block assets so that they can be enqueued through the Block Editor in
	 * the corresponding context.
	 *
	 * @link https://wordpress.org/gutenberg/handbook/designers-developers/developers/block-api/block-registration/
	 */
	public function register_blocks() {

		// If Block Editor is not active, bail.
		if ( ! function_exists( 'register_block_type' ) ) {
			return;
		}

		// Retister the block editor script.
		wp_register_script(
			'key-editor-script',
			get_stylesheet_directory_uri() . '/blocks/build/index.js',
			array( 'wp-blocks', 'wp-element', 'wp-editor', 'wp-data' ),
			filemtime( get_stylesheet_directory() . '/blocks/build/index.js' ),
			true
		);

		// Register the block editor stylesheet.
		wp_register_style(
			'key-editor-styles',
			get_stylesheet_directory_uri() . '/build/css/editor.bundle.development.css',
			array( 'wp-edit-blocks' ),
			filemtime( get_stylesheet_directory() . '/build/css/editor.bundle.development.css' )
		);

		$blocks = array(
			'key/text-block',
			'key/columns-block',
			'key/column-element',
			'key/callout-element',
			'key/image-text-block',
			'key/stats-block',
			'key/stat-element',
			'key/quote-block',
		);

		// Loop through $blocks and register each block with the same script and styles.
		foreach ( $blocks as $block ) {
			register_block_type(
				$block,
				array(
					'editor_script' => 'key-editor-script',
					'editor_style'  => 'key-editor-styles',
					'style'         => 'key-front-end-styles',
				)
			);
		}

		// Register Example Dynamic Block.
		// register_block_type(
		// 	'key/dynamic-block-example',
		// 	array(
		// 		'attributes'      => array(
		// 			'topSpacing' => array(
		// 				'type'    => 'string',
		// 				'default' => 'default',
		// 			),
		// 			'bottomSpacing' => array(
		// 				'type'    => 'string',
		// 				'default' => 'default',
		// 			),
		// 		),
		// 		'render_callback' => array( $this, 'dynamic_block_render_callback' ),
		// 	)
		// );

		//Register Callout Dynamic Block.
		register_block_type(
			'key/callout-block',
			array(
				'attributes'      => array(
					'mediaId' => array(
						'type'    => 'number',
						'default' => '',
					),
					'mediaSrc' => array(
						'type'    => 'string',
						'default' => '',
					),
					'topSpacing' => array(
						'type'    => 'string',
						'default' => 'default',
					),
					'bottomSpacing' => array(
						'type'    => 'string',
						'default' => 'default',
					),
				),
				'render_callback' => array( $this, 'key_callout_block_render_callback' ),
			)
		);
	}

	// public function key_dynamic_block_render_callback( $block_attributes, $content ) {
	// 	$context = array('post' => $post);
	// 	return \Timber::compile( array( 'blocks/block-calendar.twig' ), $context);
	// }

	// render_callback function for Callout Block
	public function key_callout_block_render_callback( $block_attributes, $content ) {
		$context = array(
			'block'   => $block_attributes,
			'content' => $content,
			'image'   => array(),
		);


		if ( ! empty( $block_attributes['mediaId'] ) ) {
			$image = wp_get_attachment_image_src( $block_attributes['mediaId'], 'callout-image-large' );
			$image_mobile = wp_get_attachment_image_src( $block_attributes['mediaId'], 'image-standard-mobile' );

			if ( ! empty( $image[0] ) ) {
				$context['image']['src'] = $image[0];
				$context['image']['alt'] = get_post_meta( $block_attributes['mediaId'], '_wp_attachment_image_alt', true );
			} else {
				$context['image']['src'] = '/images/placeholder-large.png';
			}

			if ( ! empty( $image_mobile[0] ) ) {
				$context['image_mobile']['src'] = $image_mobile[0];
			} else {
				$context['image_mobile']['src'] = '/images/placeholder-large.png';
			}
		}

		return \Timber::compile( array( 'blocks/callout-block.twig' ), $context);
	}
}

new Blocks();
