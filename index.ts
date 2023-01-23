import { selectAll } from "hast-util-select";
import { Node, Properties } from "hast-util-select/lib/types";

type Property =
  | boolean
  | number
  | string
  | null
  | undefined
  | Array<string | number>;

type OneProperty = [string, Property];

export default (additions: Properties) => {
  const adders = Object.entries(additions).map((property: OneProperty) =>
    adder(property)
  );
  return (node: Node) => adders.forEach((a) => a(node));
};

const adder = ([selector, className]: OneProperty) => {
  return (node: Node) =>
    selectAll(selector, node).forEach((elem) => {
      if (!elem?.properties?.className) elem.properties = { className };
      else elem.properties.className += ` ${className}`;
    });
};
