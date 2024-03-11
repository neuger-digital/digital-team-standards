// REPLACE ALL INSTANCES OF THE WORD "key" WITH DESIGNATED PROJECT TERM


import classnames from "classnames";

/**
 * WordPress dependencies
 */
const { __ } = wp.i18n;
const { registerBlockType } = wp.blocks;
const {
	RichText,
	InspectorControls,
	InnerBlocks
} = wp.blockEditor;
const {
	PanelBody,
	ToggleControl,
} = wp.components;

/**
 * Column Element
 */
registerBlockType( "key/column-element", {
	title: "Column Element",
	icon: "columns",
	parent: [
		"key/columns"
	],
	supports: {
		align: true,
		anchor: true,
		html: false,
	},

	edit: props => {

		const ALLOWED_BLOCKS = [
			"core/paragraph",
			"core/heading",
			"core/list",
			"core/image",
			"core/buttons",
			"core/button",
			"core/quote",
			"core/embed",
			"core-embed/youtube",
			"core-embed/vimeo",
			"gravityforms/form",
			"core/spacer",

		];

		const TEMPLATE = [
			["core/heading", {
				level: 3,
				placeholder: "Heading..."
			}],
			["core/paragraph", {
				placeholder: "Description..."
			}],
			["core/button", {
				placeholder: "Button"
			}],
		];

		const className = classnames(
			props.className,
			{
				"column-inner": true,
			}
		);

		return (
			<article className={className}>
				<InnerBlocks
					allowedBlocks={ALLOWED_BLOCKS}
					template={TEMPLATE}
				/>
			</article>
		);
	},

	save: props => {
		const className = classnames(
			props.className,
			{
				"column-inner": true,
			}
		);

		return (
			<article className={className}>
				<InnerBlocks.Content />
			</article>
		);
	}
});
