import matter from "gray-matter";
import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import rehypeFormat from "rehype-format";
import rehypeStringify from "rehype-stringify";
import rehypeClassNames from "./index.js";

const testString = `
# header
## sub 2
### sub 3
#### sub 4
##### Sub 5
Profile pictures are important.
[Rider Jensen](riderjensen.com)

1. Create a Github repository
2. Pushed up code
3. Connect account to Github
`;

test('the classes are added', async () => {
  const matterResult = matter(testString);

  // Use remark to convert markdown into HTML string
  const processedContent = await unified()
    .use(remarkParse)
    .use(remarkRehype)
    .use(rehypeFormat)
    .use(rehypeStringify)
    .use(rehypeClassNames, {
      'h1,h2,h3': 'title',
      h1: 'is-1',
      h2: 'is-2',
      h3: { 'hello': false, 32: true },
      h4: 10,
      h5: [],
      p: 'one two',
      a: "test",
      ol: "list-decimal",
      li: ['test', 'mega'],
    })
    .process(matterResult.content);
  
  const contentHtml = processedContent.toString();
  
  expect(contentHtml).toMatch(/(<h1 class="title is-1">)/i);
  expect(contentHtml).toMatch(/(<h2 class="title is-2">)/i);
  expect(contentHtml).toMatch(/(<h3 class="title 32">)/i);
  expect(contentHtml).toMatch(/(<h4 class="10">)/i);
  expect(contentHtml).toMatch(/(<h5 class="">)/i);
  expect(contentHtml).toMatch(/(<p class="one two">)/i);
  expect(contentHtml).toMatch(/(<a href="riderjensen.com" class="test">)/i);
  expect(contentHtml).toMatch(/(<ol class="list-decimal">)/i);
  expect(contentHtml).toMatch(/(<li class="test mega">)/i);
})

test('no classes are added with an empty object', async () => {
  const matterResult = matter(testString);

  // Use remark to convert markdown into HTML string
  const processedContent = await unified()
    .use(remarkParse)
    .use(remarkRehype)
    .use(rehypeFormat)
    .use(rehypeStringify)
    .use(rehypeClassNames, {})
    .process(matterResult.content);
  
  const contentHtml = processedContent.toString();
  
  expect(contentHtml).toMatch(/(<h1>)/i);
  expect(contentHtml).toMatch(/(<h2>)/i);
  expect(contentHtml).toMatch(/(<h3>)/i);
  expect(contentHtml).toMatch(/(<h4>)/i);
  expect(contentHtml).toMatch(/(<h5>)/i);
  expect(contentHtml).toMatch(/(<p>)/i);
  expect(contentHtml).toMatch(/(<a href="riderjensen.com">)/i);
  expect(contentHtml).toMatch(/(<ol>)/i);
  expect(contentHtml).toMatch(/(<li>)/i);
})

test('no classes are added with a missing object', async () => {
  const matterResult = matter(testString);

  // Use remark to convert markdown into HTML string
  const processedContent = await unified()
    .use(remarkParse)
    .use(remarkRehype)
    .use(rehypeFormat)
    .use(rehypeStringify)
    .use(rehypeClassNames)
    .process(matterResult.content);
  
  const contentHtml = processedContent.toString();
  
  expect(contentHtml).toMatch(/(<h1>)/i);
  expect(contentHtml).toMatch(/(<h2>)/i);
  expect(contentHtml).toMatch(/(<h3>)/i);
  expect(contentHtml).toMatch(/(<h4>)/i);
  expect(contentHtml).toMatch(/(<h5>)/i);
  expect(contentHtml).toMatch(/(<p>)/i);
  expect(contentHtml).toMatch(/(<a href="riderjensen.com">)/i);
  expect(contentHtml).toMatch(/(<ol>)/i);
  expect(contentHtml).toMatch(/(<li>)/i);
})

test('it can work in the middle of a pipeline', async () => {
  const matterResult = matter(testString);

  // Use remark to convert markdown into HTML string
  const processedContent = await unified()
    .use(remarkParse)
    .use(remarkRehype)
    .use(rehypeFormat)
    .use(rehypeStringify)
    .use(rehypeClassNames)
    .use(rehypeStringify)
    .use(rehypeFormat)
    .process(matterResult.content);
  
  const contentHtml = processedContent.toString();
  
  expect(contentHtml).toMatch(/(<h1>)/i);
  expect(contentHtml).toMatch(/(<h2>)/i);
  expect(contentHtml).toMatch(/(<h3>)/i);
  expect(contentHtml).toMatch(/(<h4>)/i);
  expect(contentHtml).toMatch(/(<h5>)/i);
  expect(contentHtml).toMatch(/(<p>)/i);
  expect(contentHtml).toMatch(/(<a href="riderjensen.com">)/i);
  expect(contentHtml).toMatch(/(<ol>)/i);
  expect(contentHtml).toMatch(/(<li>)/i);
})