---
title: CSS aspect ratio property
description: How to use CSS aspect-ratio property to prevent layout shift
pubDate: 2026-02-15T14:11:22Z
slug: 2026/css-aspect-ratio
---

I recently learned that I can use CSS aspect ratio property to tell browser how tall should image be responsively:

```css
img {
    width: '100%',
    aspect-ratio: "333 / 298" /* width / height of image */
}
```

Thanks to that browser will know how tall the image should be without hardcoding image height. It also prevents layout shift ([CLS](https://web.dev/articles/cls)) because browser reserves the correct space before image loads.
