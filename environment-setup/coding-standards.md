# Coding Standards

When creating WordPress websites, we generally follow the WordPress coding standards.

* [CSS Standards](https://developer.wordpress.org/coding-standards/wordpress-coding-standards/css/)
* [HTML Standards](https://developer.wordpress.org/coding-standards/wordpress-coding-standards/html/)
* [JavaScript Standards](https://developer.wordpress.org/coding-standards/wordpress-coding-standards/javascript/)
* [PHP Standards](https://developer.wordpress.org/coding-standards/wordpress-coding-standards/php/)

To help enforce these standards, we use linters in SublimeText:

* PHP CodeSniffer
* Stylelint (CSS)
* ESLint (JS)

## Sublime Text Setup

### Editor Settings

In Sublime Text > Preferences > Settings, make sure you have the following defined:

	"default_line_ending": "LF",
	"draw_white_space": "all",
	"ensure_newline_at_eof_on_save": true,
	"trim_trailing_white_space_on_save": true,

### Editor Config

In each project root directory, create an `.editorconfig` file.

* [.editorconfig file](.editorconfig) – starter settings for our projects

### Install Packages

You will need the following packages. Press `cmd p` in Sublime Text and type install package to install the following packages:

* EditorConfig
* ESLint
* Phpcs
* SublimeLinter
* SublimeLinter-eslint
* SublimeLinter-phpcs
* SublimeLinter-stylelint

## PHP CodeSniffer Setup

Install PHP CodeSniffer

	brew doctor
	brew install php-code-sniffer

After that is done, you should be able to check that things installed correctly.

	phpcs -i

Install wpcs and add to PHP CodeSniffer

	mkdir ~/lib
	cd ~/lib
	git clone https://github.com/WordPress-Coding-Standards/WordPress-Coding-Standards.git ~/wpcs
	phpcs --config-set installed_paths ~/lib/wpcs

Add wpcs and PHP CodeSniffer to your current project in the composer.json file

	"require-dev": {
	  "squizlabs/php_codesniffer": "*",
	  "wp-coding-standards/wpcs": "*"
	}

Then install these packages

	composer install

Go to SublimeText > Preferences > Package Settings > SublimeLinter > Settings

	{
		"debug": true,
		"linters": {
			"phpcs": {
				"args": [
					"--standard=WordPress"
				],
				"executable": "/usr/local/bin/phpcs",
				"excludes": "vendor/"
			}
		}
	}

## Set up CSS Linting with Stylelint

Add the linting package to your project's `package.json` file:

	"dependencies": {
		"stylelint": "*",
		"stylelint-config-wordpress": "*",
		...
	}

In the same directory as your `package.json` file, add the linter settings:

* [.stylelintrc.json](.stylelintrc.json) – starter settings for our projects

## Set up JS Linting with ESLint

Add the linting package to your project's `package.json` file:

	"devDependencies": {
		"@wordpress/eslint-plugin": "*",
		...
	},
	"dependencies": {
		"eslint": "*",
		...
	}

In the same directory as your `package.json` file, add the linter settings:

* [.eslintrc.json](.eslintrc.json) – starter settings for our projects

# Sass/CSS

Use Sass for client projects and practice [atomic design](https://bradfrost.com/blog/post/atomic-web-design/).

Use [BEM](http://getbem.com/introduction/) as a naming convention.

# JavaScript

Write JS code using ES6 and be sure to transpile to ES2015. Our preferred method is using webpack and and babel `@babel/preset-env`.

* [js-example.js](js-example.js) – starter JavaScript file for our projects

If you are using React, create separate JS files for each react component, import the components into the main JavaScript file and render the component in the main JavaScript file. Here is an example:

	import Component from './Component';
	...
	init() {
		...
		this._initComponent();
	},
	...
	_initComponent() {
		if ( 0 < $( '.component-container' ).length ) {
			ReactDOM.render( <Component />, $('.component-container')[0] );
		}
	}
	...
