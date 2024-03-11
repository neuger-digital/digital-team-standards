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
	InnerBlocks,
	URLInput,
	URLInputButton,
} = wp.blockEditor;
const {
	PanelBody,
	ToggleControl,
} = wp.components;

/**
 * Callout Element
 */
registerBlockType( "key/callout-element", {
	title: "Callout Element",
	icon: "editor-insertmore",
	parent: ["key/callout-block"],
	attributes: {

	},

	edit: props => {
		const {
			setAttributes
		} = props;

		// console.info("edit");
		// console.log(props);

		const ALLOWED_BLOCKS = [
			// "key/icon-element",
			"core/paragraph",
			"core/heading",
			"core/list",
			"core/button",
			"core/buttons",
			"gravityforms/form",
			"core/embed",
			"core/spacer",
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
				placeholder: "Button",
				align: "center"
			}],

		];

		const className = classnames(
			props.className,
			{
				"column-callout": true,
			}
		);

		return (
			<>
				<InspectorControls></InspectorControls>
				<div className={className}>
					<div className="inner-callout">
						<InnerBlocks
							allowedBlocks={ALLOWED_BLOCKS}
							template={TEMPLATE}
						/>
					</div>
				</div>
			</>
		);
	},

	save: props => {
		const className = classnames(
			props.className,
			{
				"column-callout": true,
			}
		);

		return (
			<div className={className}>
				<div className="inner-callout">
					<InnerBlocks.Content />
				</div>
			</div>
		);
	}
});
