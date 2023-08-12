import { selectAll } from "hast-util-select";
import { Node, Properties } from "hast-util-select/lib/types.js";

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

const adder = ([selector, cName]: OneProperty) => {
  return (node: Node) =>
    selectAll(selector, node).forEach((elem) => {
      if (!elem?.properties?.className) elem.properties = { ...elem.properties, className: cName };
      else elem.properties.className += ` ${cName}`;
    });
};
