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

If there is no audio, captions are not needed, but consider an `aria-label` attribute on the video element to explain to users what's happening in the video.

## Captions

We create captions using the [WebVTT format (.vtt)](https://www.w3.org/TR/webvtt/).

You can use YouTube's Automatic Caption feature, download the SRT file, [convert it to VTT](https://subtitletools.com/convert-to-vtt-online) and edit the captions from there. Note: SRT captions are not supported in HTML5.

### Does my video need captions or subtitles?

Read about the [difference between captions and subtitles](https://www.w3.org/WAI/media/av/captions/) and when to use them. In summary, captions are for the same language as the audio and subtitles are for different languages.

Transcripts are nice to have, but only required for video in WCAG 2.1 AAA (we usually only target AA). Transcripts have an added SEO benefit.

When creating subtitles, you can create a separate VTT file for each language.

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

## Third-party services

* [Vimeo's compression guidelines](https://vimeo.com/help/compression)
* [YouTube's compression guidelines](https://support.google.com/youtube/answer/1722171?hl=en)

## Video formats

Read [MDN's video codec guide](https://developer.mozilla.org/en-US/docs/Web/Media/Formats/Video_codecs) for more information on video codecs and containers.

In general, we should use the following:

| Browser Support   | Container | Video Codec  | Audio Codec |
|-------------------|-----------|--------------|-------------|
| Chrome & Firefox  | MP4       | AV1          | Opus        |
| Safari & Edge     | MP4       | HEVC (H.265) | AAC         |
| Other Browsers    | MP4       | H.264        | AAC         |

Note: H.264 is compatible with Safari and Edge, but HEVC is a newer format that offers a better quality/size ratio than H.264.

### Chroma subsampling

Chroma subsampling is a great way of reducing file size by keeping the luma data, but reducing some of the color information. 4:4:4 has no subsampling and has better quality but larger file sizes. 4:2:2 and 4:2:0 are common subsampling methods. If there is fine detail or fine text in the video, you might need to play around with the chroma subsampling to make it work.

Below, the `-pix_fmt` argument allows us to choose the chroma subsampling. For most web purposes 8-bit 4:2:0 should be fine. If you want to have the greatest amount of detail, consider 8-bit 4:4:4. Before going beyond 4:2:0, check the original chroma subsampling of the source video. 10-bit is also an option and is great for video production, but it likely too large for practical use on websites.

* [Understanding chroma subsampling](https://en.wikipedia.org/wiki/Chroma_subsampling)
* [Chroma subsampling options](https://trac.ffmpeg.org/wiki/Chroma%20Subsampling)

### CRF values

The Constant Rate Factor sets the size/quality balance. 0 is best quality and largest file size. Based on Facebook's research, below are roughly equivalent values for H.264 and AV1. Our recommendations are labeled **rec**.


| H.264        | AV1          | HEVC (H.265)          | Quality |
|--------------|--------------|-----------------------|---------|
| 0            | 0            | 0                     | Best    |
| 19           | 27           |                       |         |
|              | 30 (default) |                       |         |
| 23 (default) | 33           | **28 (rec, default)** |         |
| **24 (rec)** |              |                       |         |
| 27           | 39           |                       |         |
|              | **42 (rec)** |                       |         |
| 31           | 45           |                       |         |
| 35           | 51           |                       |         |
| 39           | 57           |                       |         |
| 51           | 61           | 51                    | Worst   |


### Video encoding

Ideally, convert using an uncompressed or high quality original. Much of this information comes from [Better Web Video with AV1 Codec](https://evilmartians.com/chronicles/better-web-video-with-av1-codec).

We will do video encoding using ffmpeg. On a Mac you can install using Homebrew on the Mac:

```
brew install ffmpeg
```

Follow [this guide for Windows](https://www.wdiaz.org/how-to-install-ffmpeg-on-windows/).

For each of the conversions below, replace SOURCE.mov with your source file. Adjust the crf number as needed. Consider the chroma subsampling needed.

If you want to visualize the loss in quality, you can blend the original and compressed videos together:

```
ffmpeg -i original.mp4 -i compressed.mp4 -filter_complex "blend=all_mode=difference" \
-c:v libx264 -crf 10 -c:a copy diff.mp4
```

View diff.mp4 to see the difference. You can use this to test different encodings, CRF values and chroma subsamplings.

#### Compression comparison

Test clip: 1920x1080, MP4, H.264, AAC, 5.67 seconds, 10.2 MB

|Quality | Codec (CRF)  | File size |
|--------|--------------|-----------|
|Great   | H.264 (24)   | 1615 KB   |
|Great   | HEVC (28)    | 944 KB    |
|Great   | AV1 (42)     | 606 KB    |
|Good    | H.264 (28)   | 836 KB    |
|Good    | HEVC (30)    | 703 KB    |

#### AV1 encoding

AV1 is impressive! CRF at 42 still looks great based on our tests and is far smaller in file size. Currently, libaom is very slow, so only compress using at 42 for now. If you run into quality issues, you can always lower the CRF. As AV1 becomes more popular, we will find the best library to use for encoding.

```
ffmpeg -i SOURCE.mov -map_metadata -1 -c:a libopus -b:a 128k \
-c:v libaom-av1 -crf 42 -b:v 0 -pix_fmt yuv420p -movflags +faststart \
-vf "scale=trunc(iw/2)*2:trunc(ih/2)*2" -strict experimental video.av1.42.mp4
```

#### H.264 encoding

CRF at 24 looked great on tests we've done. CRF at 31 was acceptable but artifacts are starting to become noticeable. CRF at 28 produced great quality without much quality loss. We would recommend trying both 24 and 28.


```
ffmpeg -i SOURCE.mov -map_metadata -1 -c:a libfdk_aac -b:a 128k \
-c:v libx264 -crf 24 -preset veryslow -profile:v main -pix_fmt yuv420p \
-movflags +faststart -vf "scale=trunc(iw/2)*2:trunc(ih/2)*2" video.h264.24.mp4

ffmpeg -i SOURCE.mov -map_metadata -1 -c:a libfdk_aac -b:a 128k \
-c:v libx264 -crf 28 -preset veryslow -profile:v main -pix_fmt yuv420p \
-movflags +faststart -vf "scale=trunc(iw/2)*2:trunc(ih/2)*2" video.h264.28.mp4
```

Note: libfdk_aac is better than aac, but you might need to install libfdk_aac separately.

#### HEVC (H.265) encoding

CRF at 28 had great results. CRF at 32 started to have some artifacts, but they weren't too noticeable. We would recommend trying both 28 and 30.

```
ffmpeg -i SOURCE.mov -map_metadata -1 -c:a libfdk_aac -b:a 128k \
-c:v libx265 -crf 28 -preset veryslow -pix_fmt yuv420p -movflags +faststart \
-tag:v hvc1 -vf "scale=trunc(iw/2)*2:trunc(ih/2)*2" video.hevc.28.mp4

ffmpeg -i SOURCE.mov -map_metadata -1 -c:a libfdk_aac -b:a 128k \
-c:v libx265 -crf 30 -preset veryslow -pix_fmt yuv420p -movflags +faststart \
-tag:v hvc1 -vf "scale=trunc(iw/2)*2:trunc(ih/2)*2" video.hevc.30.mp4
```

Note: libfdk_aac is better than aac, but you might need to install libfdk_aac separately.

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

## Video metadata

### JSON-LD

* You can validate your JSON-LD with the [Rich Results Test](https://search.google.com/test/rich-results).
* You can test your structured data using the [URL Inspection Tool](https://support.google.com/webmasters/answer/9012289)
* If there are a lot of videos, consider a [video sitemap](https://support.google.com/webmasters/answer/80471)

#### Example

Add the `VIDEO_NAME`, `VIDEO_URL`, `VIDEO_THUMBNAIL`, `VIDEO_DESCRIPTION` and update the `duration` and `uploadDate`.

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

