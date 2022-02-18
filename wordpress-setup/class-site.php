<?php
/**
 * Timber starter-theme
 * https://github.com/timber/starter-theme
 *
 * @package  SiteName;
 */

namespace SiteName;

/**
 * Site configuration.
 *
 * Replace instances of the following with actual values:
 * SiteName (package and namespace)
 * sitename (CSS, JS)
 * logo.svg (logo file)
 * path-to-css.css (built CSS path)
 * path-to-js.js (built JS path)
 */
class Site extends \Timber\Site {
	/** Add timber support. */
	public function __construct() {
		// Include controller classes.
		// Store in includes/class-class-name.php and instantiate.

		// Theme setup.
		add_action( 'after_setup_theme', array( $this, 'theme_supports' ) );
		add_action( 'init', array( $this, 'define_image_sizes' ) );
		add_filter( 'image_size_names_choose', array( $this, 'name_image_sizes' ) );
		add_action( 'init', array( $this, 'remove_head_info' ) );
		add_action( 'wp_dashboard_setup', array( $this, 'edit_dashboard_metaboxes' ), 100 );
		add_action( 'init', array( $this, 'add_menus' ) );

		// Front-end includes.
		add_action( 'wp_default_scripts', array( $this, 'remove_jquery_migrate' ) );
		add_action( 'wp_enqueue_scripts', array( $this, 'register_assets' ) );

		// Custom styling for the login screen.
		add_action( 'login_enqueue_scripts', array( $this, 'login_logo' ) );
		add_filter( 'login_headerurl', array( $this, 'login_logo_url' ) );
		add_filter( 'login_headertext', array( $this, 'login_logo_url_title' ) );

		// Remove attachment pages.
		add_filter( 'rewrite_rules_array', array( $this, 'remove_attachment_rewrites' ), 10, 1 );
		add_filter( 'attachment_link', array( $this, 'remove_attachment_permalink' ) );
		add_action( 'wp', array( $this, 'attachment_set_404' ) );

		// Disable Comments.
		add_action( 'admin_init', array( $this, 'disable_comments_post_types_support' ) );
		add_filter( 'comments_open', array( $this, 'disable_comments_status' ), 20, 2 );
		add_filter( 'pings_open', array( $this, 'disable_comments_status' ), 20, 2 );
		add_filter( 'comments_array', array( $this, 'disable_comments_hide_existing_comments', 10, 2 ) );
		add_action( 'admin_menu', array( $this, 'disable_comments_admin_menu' ) );
		add_action( 'admin_init', array( $this, 'disable_comments_admin_menu_redirect' ) );
		add_action( 'admin_init', array( $this, 'disable_comments_dashboard' ) );
		add_action( 'wp_before_admin_bar_render', array( $this, 'remove_comments_admin_bar' ) );
		add_action( 'init', array( $this, 'disable_comments_admin_bar' ) );

		// Timber setup.
		add_filter( 'timber/context', array( $this, 'add_to_context' ) );
		add_filter( 'timber/twig', array( $this, 'add_to_twig' ) );

		// Register post types and taxonomies.
		add_action( 'init', array( $this, 'register_post_types' ) );
		add_action( 'init', array( $this, 'register_taxonomies' ) );

		parent::__construct();
	}
	/** This is where you can register custom post types. */
	public function register_post_types() {

	}
	/** This is where you can register custom taxonomies. */
	public function register_taxonomies() {

	}

	/**
	 * Register front-end files.
	 */
	public function register_assets() {
		wp_enqueue_style( 'sitename-css', get_template_directory_uri() . '/path-to-css.css', array(), filemtime( get_template_directory() . '/path-to-css.css' ) );

		wp_enqueue_script( 'sitename-js', get_template_directory_uri() . '/path-to-js.js', array( 'jquery' ), filemtime( get_template_directory() . '/path-to-js.js' ), true );

		wp_dequeue_style( 'wp-block-library' );
		wp_dequeue_style( 'wp-block-library-theme' );
	}

	/** This is where you add some context
	 *
	 * @param string $context context['this'] Being the Twig's {{ this }}.
	 */
	public function add_to_context( $context ) {
		$context['notes']     = 'Test';
		$context['main_menu'] = new \Timber\Menu( 'main' );
		$context['site']      = $this;
		return $context;
	}

	/**
	 * Add WordPress menus
	 */
	public function add_menus() {
		register_nav_menu( 'main', __( 'Main Menu' ) );
	}

	/**
	 * Define image sizes.
	 */
	public function define_image_sizes() {
		// add_image_size( 'image-name', 800, 640, true );
	}

	/**
	 * Register custom image size with sizes list to make it available.
	 *
	 * @param array $sizes Image size array.
	 */
	public function name_image_sizes( $sizes ) {
		return array_merge(
			$sizes,
			array(
				// 'image-name'   => __( 'Image Name' ),
			)
		);
	}

	/**
	 * This is where you can add your own functions to twig.
	 *
	 * @param string $twig get extension.
	 */
	public function add_to_twig( $twig ) {
		$twig->addExtension( new \Twig\Extension\StringLoaderExtension() );
		$twig->addFilter( new \Twig\TwigFilter( 'myfoo', array( $this, 'myfoo' ) ) );
		return $twig;
	}

	/**
	 * Theme Supports
	 */
	public function theme_supports() {
		// Add default posts and comments RSS feed links to head.
		add_theme_support( 'automatic-feed-links' );

		// add_theme_support( 'disable-custom-gradients' );
		// add_theme_support( 'disable-custom-colors' );
		// add_theme_support( 'disable-custom-font-sizes' );
		// add_theme_support( 'editor-gradient-presets', array() );
		// add_theme_support(
		// 	'editor-font-sizes',
		// 	array()
		// );

		// Define color palette.
		// add_theme_support(
		// 	'editor-color-palette',
		// 	array(
		// 		array(
		// 			'name'  => __( 'Black' ),
		// 			'slug'  => 'black',
		// 			'color' => '#000000',
		// 		),
		// 	)
		// );

		add_theme_support( 'title-tag' );
		add_theme_support( 'post-thumbnails' );
		add_theme_support(
			'html5',
			array(
				'comment-form',
				'comment-list',
				'gallery',
				'caption',
			)
		);

		add_theme_support(
			'post-formats',
			array(
				'aside',
				'image',
				'video',
				'quote',
				'link',
				'gallery',
				'audio',
			)
		);

		add_theme_support( 'menus' );
	}

	/**
	 * Shows the logo on the /wp-admin login screen
	 */
	public function login_logo() {
		?>
		<style type="text/css">
			#login h1 {
				width: 270px;
				height: 77px;
				padding: 8px;
				margin: 0 auto;
				text-align: center;
			}

			#login h1 a {
				background-image: url(/images/logo.svg);
				width: 72px;
				height: 77px;
				background-size: 100%;
				background-repeat: no-repeat;
				margin: 0;
				display: inline-block;
			}

			p.galogin-powered {
				display: none;
			}

			h3.galogin-or {
				margin-top: 0;
			}
		</style>
		<?php
	}

	/**
	 * Login logo goes to home page
	 */
	public function login_logo_url() {
		return home_url();
	}

	/**
	 * Login logo has appropriate url title
	 */
	public function login_logo_url_title() {
		return 'Site Name';
	}

	/**
	 * Remove unneccessary things from the page <head>.
	 */
	public function remove_head_info() {
		remove_action( 'wp_head', 'feed_links' );
		remove_action( 'wp_head', 'feed_links_extra', 3 );
		remove_action( 'wp_head', 'rsd_link' );
		remove_action( 'wp_head', 'wlwmanifest_link' );
		remove_action( 'wp_head', 'index_rel_link' );
		remove_action( 'wp_head', 'parent_post_rel_link' );
		remove_action( 'wp_head', 'start_post_rel_link' );
		remove_action( 'wp_head', 'adjacent_posts_rel_link' );
		remove_action( 'wp_head', 'wp_generator' );
		remove_action( 'wp_head', 'print_emoji_detection_script', 7 );
		remove_action( 'admin_print_scripts', 'print_emoji_detection_script' );
		remove_action( 'wp_print_styles', 'print_emoji_styles' );
		remove_action( 'admin_print_styles', 'print_emoji_styles' );
		remove_filter( 'the_content_feed', 'wp_staticize_emoji' );
		remove_filter( 'comment_text_rss', 'wp_staticize_emoji' );
		remove_filter( 'wp_mail', 'wp_staticize_emoji_for_email' );
	}

	/**
	 * Add and remove dashboard metaboxes.
	 */
	public function edit_dashboard_metaboxes() {
		global $wp_meta_boxes;
		wp_add_dashboard_widget( 'dashboard-links', 'Admin Quicklinks', array( $this, 'add_dashboard_links_widget_content' ) );
		wp_add_dashboard_widget( 'dashboard-notes', 'Website Notes', array( $this, 'add_dashboard_notes_widget_content' ), null, null, 'side' );

		remove_meta_box( 'dashboard_incoming_links', 'dashboard', 'normal' );
		remove_meta_box( 'dashboard_plugins', 'dashboard', 'normal' );
		remove_meta_box( 'dashboard_primary', 'dashboard', 'normal' );
		remove_meta_box( 'dashboard_primary', 'dashboard', 'side' );
		remove_meta_box( 'dashboard_secondary', 'dashboard', 'normal' );
		remove_meta_box( 'dashboard_secondary', 'dashboard', 'side' );
		remove_meta_box( 'dashboard_quick_press', 'dashboard', 'side' );
		remove_meta_box( 'dashboard_recent_drafts', 'dashboard', 'side' );
		remove_meta_box( 'dashboard_recent_comments', 'dashboard', 'normal' );
		remove_meta_box( 'dashboard_right_now', 'dashboard', 'normal' );
		remove_meta_box( 'dashboard_activity', 'dashboard', 'normal' );
		remove_meta_box( 'dashboard_site_health', 'dashboard', 'normal' );
		remove_meta_box( 'dashboard_quick_press', 'dashboard', 'side' );
		remove_meta_box( 'rg_forms_dashboard', 'dashboard', 'side' );
		remove_meta_box( 'wp_mail_smtp_reports_widget_lite', 'dashboard', 'normal' );
	}

	/**
	 * Dashboard Links Widget Content
	 *
	 * TODO: add dashboard-links editor field to options page in ACF.
	 */
	public function add_dashboard_links_widget_content() {
		the_field( 'dashboard-links', 'option' );
	}

	/**
	 * Dashboard Links Notes Content
	 *
	 * TODO: add dashboard-notes editor field to options page in ACF.
	 */
	public function add_dashboard_notes_widget_content() {
		the_field( 'dashboard-notes', 'option' );
	}

	/**
	 * Remove attachment rewrites (disallow attachment pages)
	 *
	 * @param array $rules WordPress rewrite rules.
	 */
	public function remove_attachment_rewrites( $rules ) {
		foreach ( $rules as $regex => $query ) {
			if ( strpos( $regex, 'attachment' ) || strpos( $query, 'attachment' ) ) {
				unset( $rules[ $regex ] );
			}
		}

		return $rules;
	}

	/**
	 * Remove attachment permalink from media
	 *
	 * @param string $link Link text.
	 */
	public function remove_attachment_permalink( $link ) {
		return;
	}

	/**
	 * Redirect attachments to 404
	 */
	public function attachment_set_404() {
		global $wp_query;
		if ( is_attachment() ) {
			$wp_query->set_404();
			status_header( 404 );
		}
	}

	/**
	 * Remove comments support
	 */
	public function disable_comments_post_types_support() {
		$post_types = get_post_types();
		foreach ( $post_types as $post_type ) {
			if ( post_type_supports( $post_type, 'comments' ) ) {
				remove_post_type_support( $post_type, 'comments' );
				remove_post_type_support( $post_type, 'trackbacks' );
			}
		}
	}

	/**
	 * Remove comments from the admin bar
	 */
	public function remove_comments_admin_bar() {
		global $wp_admin_bar;
		$wp_admin_bar->remove_menu( 'comments' );
	}

	/**
	 * Disable comments
	 */
	public function disable_comments_status() {
		return false;
	}

	/**
	 * Disable comments
	 */
	public function disable_comments_admin_menu() {
		remove_menu_page( 'edit-comments.php' );
	}

	/**
	 * Disable comments
	 */
	public function disable_comments_admin_menu_redirect() {
		global $pagenow;
		if ( 'edit-comments.php' === $pagenow ) {
			wp_safe_redirect( admin_url() );
			exit;
		}
	}

	/**
	 * Disable comments
	 */
	public function disable_comments_dashboard() {
		remove_meta_box( 'dashboard_recent_comments', 'dashboard', 'normal' );
	}

	/**
	 * Disable comments
	 */
	public function disable_comments_admin_bar() {
		if ( is_admin_bar_showing() ) {
			remove_action( 'admin_bar_menu', 'wp_admin_bar_comments_menu', 60 );
		}
	}


	/**
	 * This Would return 'foo bar!'.
	 *
	 * @param string $text being 'foo', then returned 'foo bar!'.
	 */
	public function myfoo( $text ) {
		$text .= ' bar!';
		return $text;
	}

	/**
	 * Remove jQuery Migrate
	 *
	 * @param object $scripts Scripts.
	 */
	public function remove_jquery_migrate( $scripts ) {
		if ( ! is_admin() && isset( $scripts->registered['jquery'] ) ) {

			$script = $scripts->registered['jquery'];

			if ( $script->deps ) {
				$script->deps = array_diff( $script->deps, array( 'jquery-migrate' ) );
			}
		}
	}
}

new Site();
