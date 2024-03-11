// REPLACE ALL INSTANCES OF THE WORD "key" WITH DESIGNATED PROJECT TERM



import classnames from "classnames/dedupe";
// import { useBlockProps } from '@wordpress/block-editor';

/**
	* WordPress dependencies
	*/
const { __ } = wp.i18n;
const { registerBlockType } = wp.blocks;
const {
	InnerBlocks,
	InspectorControls,
	BlockControls,
} = wp.blockEditor;
const {
	PanelBody,
	ToggleControl,
	SelectControl
} = wp.components;

/**
* Text Block
*/
registerBlockType( "key/text-block", {
	title: "Text Block",
	category: "key-layout",
	icon: "editor-aligncenter",
	supports: {
		anchor: true,
		align: [ "left", "center", "right" ]
	},
	attributes: {
		columnWidth: {
			type: "string",
			default: ""
		}
	},

	edit: props => {
		const {
			setAttributes,
			attributes: {
				columnWidth
			},
		} = props;

		const ALLOWED_BLOCKS = [
			"core/heading",
			"core/paragraph",
			"core/list",
			"core/buttons",
			"core/button",
			"core/embed",
			"core/html",
			"core/spacer",
			"core/image",
			"tribe/events-list"
		];

		const TEMPLATE = [
			["core/heading", {
				level: 2,
				placeholder: "Heading...",
			}],
			["core/paragraph", {
				placeholder: "Description...",
			}],
			["core/button", {
			}],
		];
		// TODO: how do we adjust classes
		const className = classnames(
			props.className,
			{
				"blocks": true,
				"text-block": true,
				"width-12": (columnWidth === "width-12") ? true: false,
				"width-10": (columnWidth === "width-10") ? true: false,
				"width-9": (columnWidth === "width-9") ? true: false,
				"width-8": (columnWidth === "width-8") ? true: false,
				"width-6": (columnWidth === "width-6") ? true: false
			}
		);

		return (
			<>
				<InspectorControls>
					<PanelBody title={ __( "Block Settings" ) }>
						<SelectControl
							label={ __( "Content Width" ) }
							value={columnWidth}
							options={ [
								{ label: 'Full', value: 'width-12' },
								{ label: '83%', value: 'width-10' },
								{ label: '75%', value: 'width-9' },
								{ label: '67%', value: 'width-8' },
								{ label: '50%', value: 'width-6' },
							] }
							onChange={(value) => {
								setAttributes( {
									columnWidth: value,
								} );
							}}
						/>
					</PanelBody>
				</InspectorControls>
				<section className={className}>
					<div className="container">
						<div className="row">
							<div className="text-column">
								<InnerBlocks
									allowedBlocks={ALLOWED_BLOCKS}
									template={TEMPLATE}
								/>
							</div>
						</div>
					</div>
				</section>
			</>
		);
	},

	save: props => {
		const className = classnames(
			props.className,
			{
				"blocks": true,
				"text-block": true,
				"width-12": (props.attributes.columnWidth === "width-12") ? true: false,
				"width-10": (props.attributes.columnWidth === "width-10") ? true: false,
				"width-9": (props.attributes.columnWidth === "width-9") ? true: false,
				"width-8": (props.attributes.columnWidth === "width-8") ? true: false,
				"width-6": (props.attributes.columnWidth === "width-6") ? true: false
			}
		);

		return (
			<section className={className}>
				<div className="container">
					<div className="row">
						<div className="text-column">
							<InnerBlocks.Content />
						</div>
					</div>
				</div>
			</section>
		);
	}
});
