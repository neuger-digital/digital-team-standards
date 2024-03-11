// REPLACE ALL INSTANCES OF THE WORD "key" WITH DESIGNATED PROJECT TERM


/*
 This is based off of the following repo by Team Jazz, Liip AG:
 https://github.com/liip/extend-block-example-wp-plugin
 */

import assign from 'lodash.assign';
import classnames from "classnames/dedupe";

const { createHigherOrderComponent } = wp.compose;
const { Fragment } = wp.element;
const { InspectorControls } = wp.blockEditor;
const { PanelBody, SelectControl } = wp.components;
const { addFilter } = wp.hooks;
const { __ } = wp.i18n;

// Enable spacing control on the following blocks
const enableSpacingControlOnBlocks = [
	"key/text-block",
	"key/image-text-block",
	"key/quote-block",
	"key/stats-block",
	"key/columns-block",
	"key/callout-block",
];

// Available spacing control options
const spacingControlOptions = [
	{
		label: __( "Default" ),
		value: "default",
	},
	{
		label: __( "Reduced" ),
		value: "reduced",
	},
	{
		label: __( "None" ),
		value: "none",
	}
];

const addSpacingControlAttribute = ( settings, name ) => {
		// Do nothing if it's another block than our defined ones.
		if ( ! enableSpacingControlOnBlocks.includes( name ) ) {
				return settings;
		}

		// Use Lodash's assign to gracefully handle if attributes are undefined
		settings.attributes = assign(
			settings.attributes,
			{
				topSpacing: {
					type: 'string',
					default: spacingControlOptions[ 0 ].value,
				},
				bottomSpacing: {
					type: 'string',
					default: spacingControlOptions[ 0 ].value,
				}
			}
		);

		return settings;
};

addFilter( 'blocks.registerBlockType', 'key/attribute/spacing', addSpacingControlAttribute );



/**
 * Create HOC to add spacing control to inspector controls of block.
 */
const withSpacingControl = createHigherOrderComponent( ( BlockEdit ) => {
	return ( props ) => {
		// Do nothing if it"s another block than our defined ones.
		if ( ! enableSpacingControlOnBlocks.includes( props.name ) ) {
			return (
				<BlockEdit { ...props } />
			);
		}

		let currentClasses = props.attributes.className;

		let topSpacing = "default";
		let bottomSpacing = "default";

		if(typeof props.attributes.topSpacing !== "undefined") {
			topSpacing = props.attributes.topSpacing;
		} else {
			if(currentClasses && currentClasses.length > 0) {
				if(false !== currentClasses.includes("spacing-top-default")) {
					topSpacing = "default";
				}

				if(false !== currentClasses.includes("spacing-top-reduced")) {
					topSpacing = "reduced";
				}

				if(false !== currentClasses.includes("spacing-top-none")) {
					topSpacing = "none";
				}
			}
		}

		if(typeof props.attributes.bottomSpacing !== "undefined") {
			bottomSpacing = props.attributes.bottomSpacing;
		} else {
			if(currentClasses && currentClasses.length > 0) {
				if(false !== currentClasses.includes("spacing-bottom-default")) {
					bottomSpacing = "default";
				}

				if(false !== currentClasses.includes("spacing-bottom-reduced")) {
					bottomSpacing = "reduced";
				}

				if(false !== currentClasses.includes("spacing-bottom-none")) {
					bottomSpacing = "none";
				}
			}
		}

		props.attributes.className = classnames(
			props.attributes.className,
			{
				"spacing-top-none": topSpacing === "none",
				"spacing-top-reduced": topSpacing === "reduced",
				"spacing-top-default": topSpacing === "default",
				"spacing-bottom-none": bottomSpacing === "none",
				"spacing-bottom-reduced": bottomSpacing === "reduced",
				"spacing-bottom-default": bottomSpacing === "default",
			}
		);

		return (
			<Fragment>
				<BlockEdit { ...props } />
				<InspectorControls>
					<PanelBody
						title={ __( "Spacing Options" ) }
						initialOpen={ true }
					>
						<SelectControl
							label={ __( "Top Spacing" ) }
							value={ topSpacing }
							options={ spacingControlOptions }
							onChange={ ( selectedTopSpacingOption ) => {
								props.setAttributes( {
									topSpacing: selectedTopSpacingOption,
								} );
							} }
						/>
						<SelectControl
							label={ __( "Bottom Spacing" ) }
							value={ bottomSpacing }
							options={ spacingControlOptions }
							onChange={ ( selectedBottomSpacingOption ) => {
								props.setAttributes( {
									bottomSpacing: selectedBottomSpacingOption,
								} );
							} }
						/>
					</PanelBody>
				</InspectorControls>
			</Fragment>
		);
	};
}, "withSpacingControl" );

addFilter( "editor.BlockEdit", "key/with-spacing-control", withSpacingControl );
