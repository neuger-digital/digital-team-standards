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
} = wp.blockEditor;
const {
	PanelBody,
	ToggleControl,
} = wp.components;

/**
 * Stat Element
 */
registerBlockType( "key/stat-element", {
	title: "Stat Element",
	icon: "editor-insertmore",
	parent: [
		"key/stats-block"
	],

	edit: props => {
		const {
			className,
			setAttributes
		} = props;

		const ALLOWED_BLOCKS = [
			"core/paragraph",
			"core/heading",
			"core/image",
			"core/button",
		];

		const TEMPLATE = [
			["core/paragraph", {
				placeholder: "XX%",
			}],
			["core/button", {
			}],
		];

		return (
			<div className="column-stat">
				<InnerBlocks
					allowedBlocks={ALLOWED_BLOCKS}
					template={TEMPLATE}
				/>
			</div>
		);
	},

	save: props => {
		return (
			<div className="column-stat">
				<InnerBlocks.Content />
			</div>
		);
	}
});
