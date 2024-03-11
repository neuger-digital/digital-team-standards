// REPLACE ALL INSTANCES OF THE WORD "key" WITH DESIGNATED PROJECT TERM


import classnames from "classnames";
import { useBlockProps } from '@wordpress/block-editor';

/**
 * WordPress dependencies
 */
const { __ } = wp.i18n;
const { registerBlockType } = wp.blocks;
const {
	RichText,
	InspectorControls,
	InnerBlocks,
	BlockControls,
} = wp.blockEditor;
const {
	PanelBody,
	ToggleControl,
} = wp.components;
const { useSelect } = wp.data;

/**
 * Columns Block
 */
registerBlockType( "key/columns-block", {
	title: "Columns (1-3) Block",
	icon: "columns",
	category: "key-layout",
	supports: {
		align: true,
		anchor: true,
		html: false,
	},

	edit: props => {
		const {
			setAttributes
		} = props;

		const ALLOWED_BLOCKS = [
			"core/heading",
			"core/embed",
			"key/column-element"
		];

		const TEMPLATE = [
			["core/heading", {
				level: 2,
				placeholder: "Heading",
			}],
			["key/column-element", {}],
		];

		const { clientId } = props;
		const innerBlockCount = useSelect( ( select ) => select( 'core/block-editor' ).getBlock( clientId ).innerBlocks );
		console.log(innerBlockCount);
		const appenderToUse = () => {
			if ( innerBlockCount.filter(x => x.name === "key/column-element").length < 3 || innerBlockCount.filter(x => x.name === "core/heading").length === 0) {
				return (
					<InnerBlocks.ButtonBlockAppender/>
				);
			} else {
				return false;
			}
		}

		const className = classnames(
			props.className,
			{
				"blocks":true,
				"columns-block": true,
			}
		);

		return (
			<>
				<InspectorControls></InspectorControls>
				<section className={className}>
					<div className="container">
						<div className="row">
							<InnerBlocks
								renderAppender={appenderToUse}
								allowedBlocks={ALLOWED_BLOCKS}
								template={TEMPLATE}
							/>
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
				"blocks":true,
				"columns-block": true,
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
