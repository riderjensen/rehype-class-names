import { Element, Nodes } from 'hast';
import { selectAll } from "hast-util-select";
import { classnames } from 'hast-util-classnames';

interface IncomingProperties {
  [ElementName: string]: string;
}

type Entry = [string, string];

export default (additions: IncomingProperties) => {
  const adders = Object.entries(additions).map((property: Entry) =>
    adder(property)
  );
  return (node: Nodes) => adders.forEach((a) => a(node));
};

const adder = ([selector, cName]: Entry) => {
  return (nodes: Nodes) =>
    selectAll(selector, nodes).forEach((elem: Element) => {
      classnames(elem, cName);
    });
};
