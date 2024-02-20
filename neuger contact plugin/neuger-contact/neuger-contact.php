<?php
/*
Plugin Name: Neuger Dashboard Contact Information
Plugin URI:
Description: Adds a panel to the WP Dashboard with Neuger's contact information
Author: Neuger
Author URI: https://neuger.com
Version: 1.0
License:
License URI:
*/

if ( ! class_exists( 'Neuger_Contact_Plugin' ) ) {
	class Neuger_Contact_Plugin {

		public function __construct() {
			add_action('wp_dashboard_setup', array ( $this, 'dashboard_info'),  );
		}

		function dashboard_info() {
			wp_add_dashboard_widget( 'neuger_contact_info_widget', 'Website Assistance', array( $this, 'contact_info_content' ), null, null, 'normal', 'high' );
		}

		function contact_info_content() {
			echo <<<EOFT
				<p style="font-size: 20px; font-weight: bold;"><a href="https://neuger.com/">Neuger</a></p>
				<p><strong>Call</strong>: 507.664.0700 and ask for a web team member</p>
				<p><strong>Email</strong>: <a href="mailto:webdev@neuger.com">webdev@neuger.com</a></p>
				<p><strong>Northfield</strong>:<br />
				25 Bridge Square, Northfield, MN 55057</p>
				<p><strong>Minneapolis</strong>:<br />
				800 North Washington Ave, Suite 506, Minneapolis, MN 55401</p><br />
			EOFT;
		}
	}

	$contact_widget = new Neuger_Contact_Plugin();
}
