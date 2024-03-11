// REPLACE ALL INSTANCES OF THE WORD "key" WITH DESIGNATED PROJECT TERM. CHANGE COLOR NAMES TO MATCH THE PROJECT DESIGN.



import assign from 'lodash.assign';
const { addFilter } = wp.hooks;
const { __ } = wp.i18n;

// Enable themes on
const enableDefaultThemesForTheseBlocks = [
	"key/text-block",
	"key/image-text-block",
	"key/quote-block",
	"key/stats-block",
	"key/columns-block",
	"key/callout-block",
];

enableDefaultThemesForTheseBlocks.map((block) => {
	wp.blocks.registerBlockStyle(
		block,
		[
			{
				name: "white",
				label: __( "White (default)" ),
				isDefault: true
			},
			{
				name: "light-gray",
				label: __( "Light Gray" )
			},
			{
				name: "gray",
				label: __( "Gray" )
			},
			{
				name: "purple",
				label: __( "Purple" )
			},
			{
				name: "purple-pattern",
				label: __( "Purple Pattern" )
			},
		]
	);
});
