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
 * Stats Component
 */
registerBlockType( "key/stats-block", {
	title: "Stats Block",
	icon: "editor-insertmore",
	category: "key-layout",

	edit: props => {
		const {
			setAttributes
		} = props;

		const ALLOWED_BLOCKS = [
			"core/heading",
			"key/stat-element",
		];

		const TEMPLATE = [
			["core/heading", {
				placeholder: "Heading",
			}],
			["key/stat-element", {}]
		];

		const className = classnames(
			props.className,
			{
				"blocks": true,
				"stats-block": true,
			}
		);

		return (
			<section className={className}>
				<div className="container">
					<div className="row">
						<InnerBlocks
							allowedBlocks={ALLOWED_BLOCKS}
							template={TEMPLATE}
						/>
					</div>
				</div>
			</section>
		);
	},

	save: props => {

		const className = classnames(
			props.className,
			{
				"blocks": true,
				"stats-block": true,
			}
		);

		return (
			<section className={className}>
				<div className="container">
					<div className="row">
						<InnerBlocks.Content />
					</div>
				</div>
			</section>
		);
	}
});
