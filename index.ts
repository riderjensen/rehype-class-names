import { Plugin } from 'unified';
import { Element, Nodes, Root } from 'hast';
import { selectAll } from "hast-util-select";
import { classnames, Conditional } from 'hast-util-classnames';

export interface Options {
  [selector: string]: Conditional;
}

type Entry = [string, Conditional];

const rehypeClassNames: Plugin<[(Options | null | undefined)?], Root> = (additions: Options | null | undefined) => {
  return (tree: Nodes) => {
    if (additions)
      Object.entries(additions).map(([selector, cName]: Entry) => {
        return (nodes: Nodes) =>
          selectAll(selector, nodes).forEach((elem: Element) => {
            classnames(elem, cName);
          });
      }).forEach((a) => a(tree))
  }
}

export default rehypeClassNames;
