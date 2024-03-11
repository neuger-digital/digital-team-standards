// REPLACE ALL INSTANCES OF THE WORD "key" WITH DESIGNATED PROJECT TERM


import classnames from "classnames";

/**
	* WordPress dependencies
	*/
const { __ } = wp.i18n;
const { registerBlockType } = wp.blocks;
const {
	BlockControls,
	InspectorControls,
	MediaUpload,
	InnerBlocks
} = wp.blockEditor;
const {
	Button,
	PanelBody,
	ToggleControl,
	ToolbarGroup
} = wp.components;

import { ReactComponent as icon } from "./media-text-icon.svg";
import { ReactComponent as pullRight } from "./text-left.svg";
import { ReactComponent as pullLeft } from "./text-right.svg";

/**
	* Text & Image Block
	*/
registerBlockType( "key/image-text-block", {
	title: "Image & Text Block",
	category: "key-layout",
	icon,
	supports: {
		anchor: true,
		html: false,
	},
	attributes: {
		mediaId: {
			type: "number"
		},
		mediaSrc: {
			type: "string",
			source: "attribute",
			selector: ".image-wrapper img",
			attribute: "src",
			default: ""
		},
		mediaAlt: {
			type: "string",
			source: "attribute",
			selector: ".image-wrapper img",
			attribute: "alt",
			default: ""
		},
		mediaPosition: {
			type: "string",
			default: "right"
		},
	},

	edit: props => {
		const {
			attributes: {
				mediaId,
				mediaSrc,
				mediaAlt,
				mediaPosition,
			},
			setAttributes
		} = props;

		const ALLOWED_BLOCKS = [
			"core/heading",
			"core/paragraph",
			"core/buttons",
			"core/list",
		];

		const TEMPLATE = [
			["core/heading", {
				level: 2,
				placeholder: "Heading",
			}],
			["core/paragraph", {
				placeholder: "Description...",
			}],
			["core/button", {
				}
			],
		];

		const toolbarControls = [
			{
				icon: pullLeft,
				title: __( "Show image on left" ),
				isActive: mediaPosition === "left",
				onClick: () => setAttributes( { mediaPosition: "left" } ),
			},
			{
				icon: pullRight,
				title: __( "Show image on right" ),
				isActive: mediaPosition === "right",
				onClick: () => setAttributes( { mediaPosition: "right" } ),
			},
		];

		const onMediaSelect = imageObject => {
			console.info(imageObject);

			setAttributes({
				mediaId: imageObject.id,
				mediaSrc: imageObject.sizes["image-text"].url,
				mediaAlt: imageObject.alt
			});
		};

		const className = classnames(
			props.className,
			{
				"blocks": true,
				"image-text-block": true,
				"has-image-on-the-left": "left" === mediaPosition,
			}
		);

		return (
			<>
				<BlockControls>
					<ToolbarGroup controls={toolbarControls} />
				</BlockControls>
				<section className={className}>
					<div className="container">
						<div className="row">
							<div className="column-text">
								<InnerBlocks
									allowedBlocks={ALLOWED_BLOCKS}
									template={TEMPLATE}
								/>
							</div>
							<div className="column-image">
								<figure className="image-wrapper">
									<img className={`wp-image-${mediaId}`} src={mediaSrc} alt={mediaAlt} />
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
				"image-text-block": true,
				"has-image-on-the-left": "left" === props.attributes.mediaPosition,
			}
		);

		return (
			<section className={className}>
				<div className="container">
					<div className="row">
						<div className="column-text">
							<InnerBlocks.Content />
						</div>
						<div className="column-image">
							<figure className="image-wrapper">
								<img className={`wp-image-${props.attributes.mediaId}`} src={props.attributes.mediaSrc} alt={props.attributes.mediaAlt} />
							</figure>
						</div>
					</div>
				</div>
			</section>
		);
	}
});
