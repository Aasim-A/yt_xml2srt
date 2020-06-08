# yt_xml2srt

A tiny package to convert YouTube caption format from XML to SRT with ZERO dependencies.

Intended to be used in Deno

# Usage

## parse() - returns a Promise

```js
import { parse } from 'https://deno.land/x/yt_xml2srt/mod.ts'

parse(XML_STRING)
  .then(srt => /* DO SOMETHING WITH SRT */)
  .catch(err => console.log(`Error while converting XML to SRT : ${err}`));
```

Or you can use async await

```js
import { parse } from 'https://deno.land/x/yt_xml2srt/mod.ts';

try {
  const srt = await parse(XML_STRING);
  /* DO SOMETHING WITH SRT */
} catch (err) {
  console.log(`Error while converting XML to SRT : ${err}`);
}
```

## parseSync()

```js
import { parseSync } from 'https://deno.land/x/yt_xml2srt/mod.ts';

try {
  const srt = parseSync(XML_STRING);
  /* DO SOMETHING WITH SRT */
} catch (err) {
  console.log(`Error while converting XML to SRT : ${err}`);
}
```

# Tests

```bash
deno test test/test.ts
```
