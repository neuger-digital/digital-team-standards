# Video Standards

We recommend embedding videos using Vimeo or YouTube for content-related videos.

For design assets, we recommend uploading those via the CMS (if they are editable) or putting them in an assets folder on the server.

## Accessibility

For all video with audio, we need captions and can't flash anything more than three times in one second. See related WCAG guidelines:

* [1.2.1 - Audio-only and Video-only (Prerecorded)](https://www.w3.org/WAI/WCAG21/quickref/#audio-only-and-video-only-prerecorded)
* [1.2.2 – Captions (Prerecorded)](https://www.w3.org/WAI/WCAG21/quickref/#captions-prerecorded)
* [1.2.3 – Audio Description or Media Alternative (Prerecorded)](https://www.w3.org/WAI/WCAG21/quickref/#audio-description-or-media-alternative-prerecorded)
* [1.2.5 – Audio Description (Prerecorded)
](https://www.w3.org/WAI/WCAG21/quickref/#audio-description-prerecorded)
* [2.3.1 – Three Flashes or Below Threshold](https://www.w3.org/WAI/WCAG21/quickref/#three-flashes-or-below-threshold)

If there is no audio, captions are not needed, but consider an `aria-label` attribute on the video tag to explain to users what's happening in the video.

## Captions

We create captions using the [WebVTT format (.vtt)](https://www.w3.org/TR/webvtt/).

### Does my video need captions or subtitles?

Read about the [difference between captions and subtitles](https://www.w3.org/WAI/media/av/captions/) and when to use them. In summary, captions are for the same language as the audio and subtitles are for different languages.

Transcripts are nice to have, but only required for video in WCAG 2.1 AAA (we usually only target AA). Transcripts have an added SEO benefit.

### Example

```
WEBVTT

00:01.000 --> 00:04.000
[Dramatic rock music]

00:05.000 --> 00:09.000
[whispering] What's that off in the distance?

00:10.000 --> 00:15.000
- What?
- Where are we now?
```

You can use YouTube's Automatic Caption feature, download the SRT file, [convert it to VTT](https://subtitletools.com/convert-to-vtt-online) and edit the captions from there. Note: SRT captions are not supported in HTML5.

## Video formats

Read [MDN's video codec guide](https://developer.mozilla.org/en-US/docs/Web/Media/Formats/Video_codecs) for more information on video codecs and containers.

In general, we should use the following:

| Browser Support   | Container | Video Codec | Audio Codec |
|-------------------|-----------|-------------|-------------|
| Chrome & Firefox  | MP4       | AV1         | Opus        |
| Safari & Edge     | MP4       | HEVC        | AAC         |
| Other Browsers    | MP4       | H.264       | AAC         |

Note: H.264 is compatible with Safari and Edge, but HEVC is a newer format and allows Safari and Edge to take advantage of it.

## Chroma subsampling

Chroma subsampling is a great way of reducing file size by keeping the luma (luminance) data, but reducing some of the color information. 4:4:4 considered no subsampling. 4:2:2 and 4:2:0 are common. If there is fine detail or fine text in the video, you might need to play around with the chroma subsampling to make it work.

Below, the `-pix_fmt` argument allows us to choose the chroma subsampling. For most web purposes 8-bit 4:2:0 should be fine. If you want to have the greatest amount of detail, consider 8-bit 4:4:4. Before going beyond 4:2:0, check the original chroma subsampling of the source video.

* [Understanding chroma subsampling](https://en.wikipedia.org/wiki/Chroma_subsampling)
* [Chroma subsampling options](https://trac.ffmpeg.org/wiki/Chroma%20Subsampling)

## CRF values

The Constant Rate Factor sets the size/quality balance. 0 is best quality and largest file size. Based on Facebook's research, below are roughly equivalent values for H.264 and AV1.


| H.264        | AV1          | HEVC         | Quality |
|--------------|--------------|--------------|---------|
| 0            | 0            |              | Best    |
| 19           | 27           |              |         |
|              | 30 (default) |              |         |
|              |              | 28 (default) |         |
| 23 (default) | 33           |              |         |
| 27           | 39           |              |         |
| 31           | 45           |              |         |
| 35           | 51           |              |         |
| 39           | 57           |              |         |
| 51           | 61           |              | Worst   |


## Video conversion

Ideally, convert using an uncompressed or high quality original. Much of this information comes from [Better Web Video with AV1 Codec](https://evilmartians.com/chronicles/better-web-video-with-av1-codec).

We will do video conversions using ffmpeg. On a Mac you can install using Homebrew:

```
brew install ffmpeg
```

Follow [this guide for Windows](https://www.wdiaz.org/how-to-install-ffmpeg-on-windows/).

For each of the conversions below, replace SOURCE.mov with your source file. Adjust the crf number as needed. Consider the chroma subsampling needed.

### AV1 conversion

```
ffmpeg -i SOURCE.mov -map_metadata -1 -c:a libopus -c:v libaom-av1 -crf 34 -b:v 0 -pix_fmt yuv420p -movflags +faststart -vf "scale=trunc(iw/2)*2:trunc(ih/2)*2" -strict experimental video.av1.mp4
```

### H.264 conversion

```
ffmpeg -i SOURCE.mov -map_metadata -1 -c:a libfdk_aac -c:v libx264 -crf 24 -preset veryslow -profile:v main -pix_fmt yuv420p -movflags +faststart -vf "scale=trunc(iw/2)*2:trunc(ih/2)*2" video.h264.mp4
```

### HEVC conversion

```
ffmpeg -i SOURCE.mov -map_metadata -1 -c:a libfdk_aac -c:v libx265 -crf 24 -preset veryslow -pix_fmt yuv420p -movflags +faststart -tag:v hvc1 -vf "scale=trunc(iw/2)*2:trunc(ih/2)*2" video.hevc.mp4
```

## Video HTML

Consider a poster file and making it 1280x720.

#### Recommended markup

```
<video controls poster="path/to/poster.jpg">
	<source src="video.hevc.mp4" type="video/mp4; codecs=hevc,mp4a.40.2">
	<source src="video.av1.mp4" type="video/mp4; codecs=av01.0.05M.08,opus">
	<source src="video.h264.mp4" type="video/mp4; codecs=avc1.4D401E,mp4a.40.2">
	<track label="English" kind="captions" srclang="en" src="captions/vtt/sintel-en.vtt" default>
</video>
```

## Video Metadata

### JSON-LD

* You can validate your JSON-LD with the [Rich Results Test](https://search.google.com/test/rich-results).
* You can test your structured data using the [URL Inspection Tool](https://support.google.com/webmasters/answer/9012289)
* If there are a lot of videos, consider a [video sitemap](https://support.google.com/webmasters/answer/80471)

#### Example

```
<script type="application/ld+json">
{
  "@context": "http://schema.org/",
  "@type": "VideoObject",
  "name": "VIDEO_NAME",
  "contentUrl": "VIDEO_URL",
  "duration": "PT00H00M00S",
  "thumbnailUrl": "VIDEO_THUMBNAIL",
  "uploadDate": "2020-01-01",
  "description": "VIDEO_DESCRIPTION"
}
</script>
```

### Open Graph
* [Open Graph Video Options](https://ogp.me/#type_video)

#### Example
```
<meta property="og:type" content="video.movie" />
<meta property="og:title" content="The Rock" />
<meta property="og:url" content="https://www.imdb.com/title/tt0117500/" />
<meta property="og:image" content="https://ia.media-imdb.com/images/rock.jpg" />
```

