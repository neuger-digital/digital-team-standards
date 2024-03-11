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
registerBlockType( "key/callout-block", {
	title: "Callout Block",
	category: "key-layout",
	icon: "editor-insertmore",
	attributes: {
		mediaId: {
			type: "number"
		},
		mediaSrc: {
			type: "string"
		},
		mediaAlt: {
			type: "string",
			default: ""
		},
	},

	edit: props => {
		const {
			attributes: {
				mediaId,
				mediaSrc,
				mediaAlt,
			},
			setAttributes
		} = props;
		// console.log(props);

		const ALLOWED_BLOCKS = [
			"key/callout-element",
		];

		const TEMPLATE = [
			['key/callout-element', {}],
		];

		const onMediaSelect = imageObject => {
			console.info(imageObject);

			setAttributes({
				mediaId: imageObject.id,
				mediaSrc: imageObject.sizes["callout-image-large"].url,
				mediaAlt: imageObject.alt
			});
		};

		const className = classnames(
			props.className,
			{
				"blocks": true,
				"callout-block":true,
			}
		);



		return (
			<section className={className}>
				<div className="container">
					<div className="row">
						<div class="callout-overlay">
							<figure className="img-wrapper">
								<img className={`callout-image wp-image-${mediaId}`} src={mediaSrc} alt={mediaAlt} />
								 <MediaUpload
									onSelect={onMediaSelect}
									type="image"
									value={mediaId}
									render={({open}) => (
										<Button
											className="img--button change-image"
											onClick={open}
											icon="format-image"
											showTooltip="true"
											label={__("Change image.")}
										>Change Image</Button>
									)}
								/>
							</figure>
						</div>
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
		return (
			<InnerBlocks.Content />
		);
	}
});
