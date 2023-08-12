import matter from "gray-matter";
import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import rehypeFormat from "rehype-format";
import rehypeStringify from "rehype-stringify";
import addClasses from "./index.js";

const testString = `
# header
## sub 1
### sub 2
Profile pictures are important.
[Yale Medicine](riderjensen.com)

1. Create a Github repository
2. Pushed up code
3. Connect account to Github
`;

test('the addClasses adds classes', async () => {
  const matterResult = matter(testString);

  // Use remark to convert markdown into HTML string
  const processedContent = await unified()
    .use(remarkParse)
    .use(remarkRehype)
    .use(rehypeFormat)
    .use(rehypeStringify)
    .use(addClasses, {
      'h1,h2,h3': 'title',
      h1: 'is-1',
      h2: 'is-2',
      p: 'one two',
      a: "test",
      ol: "list-decimal"
    })
    .process(matterResult.content);
  
  const contentHtml = processedContent.toString();
  
  expect(contentHtml).toMatch(/(<h1 class="title is-1">)/i);
  expect(contentHtml).toMatch(/(<h2 class="title is-2">)/i);
  expect(contentHtml).toMatch(/(<h3 class="title">)/i);
  expect(contentHtml).toMatch(/(<p class="one two">)/i);
  expect(contentHtml).toMatch(/(<a href="riderjensen.com" class="test">)/i);
  expect(contentHtml).toMatch(/(<ol class="list-decimal">)/i);
})