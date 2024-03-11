// REPLACE ALL INSTANCES OF THE WORD "key" WITH DESIGNATED PROJECT TERM. ALSO CHANGE COLOR OPTIONS AND CLASSNAMES TO FOLLOW NEW PROJECT'S DESIGN.


import assign from 'lodash.assign';
import classnames from "classnames/dedupe";
import { CustomSelectControl } from '@wordpress/components';

const { createHigherOrderComponent } = wp.compose;
const { Fragment } = wp.element;
const { InspectorControls } = wp.blockEditor;
const { PanelBody, SelectControl } = wp.components;

const { addFilter } = wp.hooks;
const { __ } = wp.i18n;

// Enable themes on
const enableDividerControlOnBlocks  = [
	"key/text-block",
	"key/image-text-block",
	"key/quote-block",
	"key/stats-block",
	"key/columns-block",
];


const dividerControlOptions = [
	{
		label: __( "None" ),
		value: "default",
	},
	{
		label: __( "Wave" ),
		value: "wave",
	}
];

const dividerColorOptions = [
	{
		label: __( "Gray (Translucent)" ),
		value: "trans",
	},
	{
		label: __( "White" ),
		value: "white",
	},
	{
		label: __( "Purple" ),
		value: "purple",
	},
	{
		label: __( "Gray" ),
		value: "gray",
	},
	{
		label: __( "Light Gray" ),
		value: "light gray",
	},
];


const addDividerControlAttribute = ( settings, name ) => {
		// Do nothing if it's another block than our defined ones.
		if ( ! enableDividerControlOnBlocks.includes( name ) ) {
				return settings;
		}

		// Use Lodash's assign to gracefully handle if attributes are undefined
		settings.attributes = assign(
			settings.attributes,
			{
				topDivider: {
					type: 'string',
					default: dividerControlOptions[ 0 ].key,
				},
				bottomDivider: {
					type: 'string',
					default: dividerControlOptions[ 0 ].key,
				}
			}
		);

		return settings;
};

addFilter( 'blocks.registerBlockType', 'key/attribute/divider', addDividerControlAttribute );

const addDividerColorAttribute = ( settings, name ) => {
		// Do nothing if it's another block than our defined ones.
		if ( ! enableDividerControlOnBlocks.includes( name ) ) {
				return settings;
		}

		// Use Lodash's assign to gracefully handle if attributes are undefined
		settings.attributes = assign(
			settings.attributes,
			{
				topDividerColor: {
					type: 'string',
					default: dividerColorOptions[ 0 ].key,
				},
				bottomDividerColor: {
					type: 'string',
					default: dividerColorOptions[ 0 ].key,
				}
			}
		);

		return settings;
};

addFilter( 'blocks.registerBlockType', 'key/attribute/dividerColor', addDividerColorAttribute );


/**
 * Create HOC to add divider control to inspector controls of block.
 */
const withDividerControl = createHigherOrderComponent( ( BlockEdit ) => {
	return ( props ) => {
		// Do nothing if it"s another block than our defined ones.
		if ( ! enableDividerControlOnBlocks.includes( props.name ) ) {
			return (
				<BlockEdit { ...props } />
			);
		}

		let currentClasses = props.attributes.className;

		let topDivider = "default";
		let bottomDivider = "default";
		let topDividerColor = "default";
		let bottomDividerColor = "default";

		if(typeof props.attributes.topDivider !== "undefined") {
			topDivider = props.attributes.topDivider;
		} else {
			if(currentClasses && currentClasses.length > 0) {

				topDivider = dividerControlOptions.find(x => currentClasses.includes('divider-top-' + x));

				if ( typeof topDivider === "undefined" ) {
					topDivider = "default";
				}
			}
		}

		if(typeof props.attributes.bottomDivider !== "undefined") {
			bottomDivider = props.attributes.bottomDivider;
		} else {
			if(currentClasses && currentClasses.length > 0) {

				bottomDivider = dividerControlOptions.find(x => currentClasses.includes('divider-bottom-' + x));

				if ( typeof bottomDivider === "undefined" ) {
					bottomDivider = "default";
				}
			}
		}

		if(typeof props.attributes.topDividerColor !== "undefined") {
			topDividerColor = props.attributes.topDividerColor;
		} else {
			if(currentClasses && currentClasses.length > 0) {

				topDividerColor = dividerColorOptions.find(x => currentClasses.includes('divider-color-top-' + x));

				if ( typeof topDividerColor === "undefined" ) {
					topDividerColor = "default";
				}
			}
		}

		if(typeof props.attributes.bottomDividerColor !== "undefined") {
			bottomDividerColor = props.attributes.bottomDividerColor;
		} else {
			if(currentClasses && currentClasses.length > 0) {

				bottomDividerColor = dividerColorOptions.find(x => currentClasses.includes('divider-color-bottom-' + x));

				if ( typeof bottomDividerColor === "undefined" ) {
					bottomDividerColor = "default";
				}
			}
		}

		props.attributes.className = classnames(
			props.attributes.className,
			{
				"divider-top-none": topDivider === "none",
				"divider-top-wave": topDivider === "wave",
				"divider-bottom-none": bottomDivider === "none",
				"divider-bottom-wave": bottomDivider === "wave",

				"divider-color-top-white": topDividerColor === "white",
				"divider-color-top-trans": topDividerColor === "trans",

				"divider-color-bottom-white": bottomDividerColor === "white",
				"divider-color-bottom-trans": bottomDividerColor === "trans",
				"divider-color-bottom-purple": bottomDividerColor === "purple",
				"divider-color-bottom-gray": bottomDividerColor === "gray",
				"divider-color-bottom-light-gray": bottomDividerColor === "light-gray",
			}
		);

		return (
			<Fragment>
				<BlockEdit { ...props } />
				<InspectorControls>
					<PanelBody
						title={ __( "Divider Options" ) }
						initialOpen={ true }
					>
						<SelectControl
							label={ __( "Top Divider" ) }
							value={ topDivider }
							options={ dividerControlOptions }
							onChange={ ( selectedTopDividerOption ) => {
								props.setAttributes( {
									topDivider: selectedTopDividerOption,
								} );
							} }
						/>
						<SelectControl
							label={ __( "Bottom Divider" ) }
							value={ bottomDivider }
							options={ dividerControlOptions }
							onChange={ ( selectedBottomDividerOption ) => {
								props.setAttributes( {
									bottomDivider: selectedBottomDividerOption,
								} );
							} }
						/>
						<SelectControl
							label={ __( "Top Background Color" ) }
							value={ topDividerColor }
							options={ dividerColorOptions }
							onChange={ ( selectedTopDividerOption ) => {
								props.setAttributes( {
									topDividerColor: selectedTopDividerOption,
								} );
							} }
						/>
						<SelectControl
							label={ __( "Bottom Background Color" ) }
							value={ bottomDividerColor }
							options={ dividerColorOptions }
							onChange={ ( selectedBottomDividerOption ) => {
								props.setAttributes( {
									bottomDividerColor: selectedBottomDividerOption,
								} );
							} }
						/>
					</PanelBody>
				</InspectorControls>
			</Fragment>
		);
	};
}, "withDividerControl" );

addFilter( "editor.BlockEdit", "key/with-divider-control", withDividerControl );
