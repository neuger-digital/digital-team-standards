// REPLACE ALL INSTANCES OF THE WORD "key" WITH DESIGNATED PROJECT TERM


import classnames from "classnames";

/**
 * WordPress dependencies
 */
const { __ } = wp.i18n;
const { registerBlockType } = wp.blocks;
const {
	InnerBlocks,
	InspectorControls,
	BlockControls,
	MediaUpload,
	URLInput,
	URLInputButton,
 } = wp.blockEditor;
const {
	Button,
	PanelBody,
	ToggleControl,
} = wp.components;
const { serverSideRender: ServerSideRender } = wp;

/**
 * Callout Block
 */
registerBlockType( "key/quote-block", {
	title: "Quote Block",
	category: "key-layout",
	icon: "editor-quote",
	attributes: {
	},

	edit: props => {
		const {
			attributes: {
			},
			setAttributes
		} = props;

		const ALLOWED_BLOCKS = [
			"core/quote",
		];

		const TEMPLATE = [
			["core/quote"],
		];

		const className = classnames(
			props.className,
			{
				"blocks": true,
				"quote-block":true,
			}
		);

		return (
			<div className={className}>
				<div className="container">
					<div className="row">
						<div className="quote-wrapper">
							<InnerBlocks
								allowedBlocks={ALLOWED_BLOCKS}
								template={TEMPLATE}
								templateLock={true}
							/>
						</div>
					</div>
				</div>
			</div>
		);
	},

	save: props => {
		const className = classnames(
			props.className,
			{
				"blocks": true,
				"quote-block":true,
			}
		);

		return (
			<div className={className}>
				<div className="container">
					<div className="row">
						<div className="quote-wrapper">
							<InnerBlocks.Content />
						</div>
					</div>
				</div>
			</div>
		);
	}
});
