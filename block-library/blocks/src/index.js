/**
	* Don't include the following blocks.
	*/
const excludeBlocks = [
	"core/shortcode",
	"core/more",
	"core/pullquote",
	"core/preformatted",
	"core/code",
	"core/freeform",
	"core/categories",
	"core/cover-image",
	"core/cover",
	"core/text-columns",
	"core/verse",
	"core/audio",
	"core/group",
	"core/media-text",
	"core/file",
	"core/columns",
	"core/column",
	"core/nextpage",
	"core/calendar",
	"core/search",
	"core/page-list",
	"core/site-logo",
	"core/site-tagline",
	"core/site-title",
	"core/post-template",
	"core/query-title",
	"core/query-pagination",
	"core/query-pagination-next",
	"core/query-pagination-numbers",
	"core/query-pagination-previous",
	"core/post-title",
	"core/post-content",
	"core/post-date",
	"core/post-featured-image",
	"core/post-terms",
	"core/loginout",
	"core/query",
	"core/rss",
	"core/social-link",
	"core/social-links",
	"core/latest-comments",
	"core/tag-cloud",
	"core/archives",
	"core/latest-posts",
	"core-embed/twitter",
	"core-embed/facebook",
	"core-embed/instagram",
	"core-embed/wordpress",
	"core-embed/soundcloud",
	"core-embed/spotify",
	"core-embed/flickr",
	"core-embed/animoto",
	"core-embed/cloudup",
	"core-embed/collegehumor",
	"core-embed/dailymotion",
	"core-embed/funnyordie",
	"core-embed/hulu",
	"core-embed/imgur",
	"core-embed/issuu",
	"core-embed/kickstarter",
	"core-embed/meetup-com",
	"core-embed/mixcloud",
	"core-embed/photobucket",
	"core-embed/polldaddy",
	"core-embed/reddit",
	"core-embed/reverbnation",
	"core-embed/screencast",
	"core-embed/scribd",
	"core-embed/slideshare",
	"core-embed/smugmug",
	"core-embed/speaker",
	"core-embed/ted",
	"core-embed/tumblr",
	"core-embed/videopress",
	"core-embed/wordpress-tv",
	"core-embed/tiktok",
	"core-embed/crowdsignal",
	"core-embed/speaker-deck",
	"core-embed/amazon-kindle",
];

wp.domReady( () => {
	wp.blocks.getBlockTypes().forEach( function( blockType ) {
		if ( -1 !== excludeBlocks.indexOf( blockType.name ) ) {
			wp.blocks.unregisterBlockType( blockType.name );
		}
	});

	wp.blocks.unregisterBlockStyle( 'core/quote', 'large' );
	wp.blocks.unregisterBlockStyle( 'core/quote', 'default' );
	wp.blocks.unregisterBlockStyle( 'core/image', 'rounded' );
	wp.blocks.unregisterBlockStyle( 'core/image', 'default' );
} );

wp.domReady( function() {
    const allowedEmbedBlocks = [
        'youtube', 'vimeo'
    ];

    wp.blocks.getBlockType( 'core/embed' ).variations.forEach( function( blockVariation ) {
        if (
            allowedEmbedBlocks.indexOf( blockVariation.name ) === -1
        ) {
            wp.blocks.unregisterBlockVariation( 'core/embed', blockVariation.name );
        }
    } );
} );

/**
 * Import blocks as components.
 */

// Blocks
import "./blocks/callout-block";
import "./blocks/columns-block";
import "./blocks/image-text-block";
import "./blocks/stats-block";
import "./blocks/quote-block";
import "./blocks/text-block";

// Elements
import "./elements/callout-element";
import "./elements/column-element";
import "./elements/stat-element";

// Utilities
import "./utilities/spacing-control";
import "./utilities/block-divider";
import "./utilities/themes";
