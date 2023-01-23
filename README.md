# Rehype Class Names

Adding classes to elements with rehype. All credit goes to [rehype-add-classes](https://github.com/martypdx/rehype-add-classes) but with fixed dependencies, added typescript support, plus I wanted to make an npm package :shrug:.

## Installation

```
npm install rehype-class-names
```

## Usage

Example of changing markdown to html with classes

```
import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import rehypeDocument from "rehype-document";
import rehypeFormat from "rehype-format";
import rehypeStringify from "rehype-stringify";

const markDown = `
# header
## sub 1
### sub 2
Profile pictures are important.
`

const processedContent = await unified()
  .use(remarkParse)
  .use(remarkRehype)
  .use(rehypeDocument)
  .use(rehypeFormat)
  .use(rehypeStringify)
  .use(addClasses, {
    'h1,h2,h3': 'title',
    h1: 'is-1',
    h2: 'is-2',
    p: 'one two'
  })
  .process(matterResult.content);

```

This will output

```
<h1 class="title is-1">header</h1>
<h2 class="title is-2">sub 1</h2>
<h3 class="title">sub 2</h3>
<p class="one two"></p>
```

## API

### `rehype().use(addClasses, additions])`

Add to `rehype` or `unified` pipeline with `.use`, where `additions` is an object
with keys that are the css selectors and the values are a string to add to
the `class` of each found node.

Example:

```js
{
    pre: 'hljs',
    'h1,h2,h3': 'title',
    h1: 'is-1',
    h2: 'is-2',
    p: 'one two'
}
```

- Results are cumulative: `<h1 class="title is-1">`
- `value` is added to existing classes: `<h2 class="existing title is-2">sub 2</h2>`
- Whole of string indicated by `value` is added: `<p class="one two">`

This library uses `hast-util-select` under the hood. See [supported selectors](https://github.com/syntax-tree/hast-util-select#support).
