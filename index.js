import { selectAll } from "hast-util-select";
export default (additions) => {
    const adders = Object.entries(additions).map((property) => adder(property));
    return (node) => adders.forEach((a) => a(node));
};
const adder = ([selector, cName]) => {
    return (node) => selectAll(selector, node).forEach((elem) => {
        if (!elem?.properties?.className)
            elem.properties = { ...elem.properties, className: cName };
        else
            elem.properties.className += ` ${cName}`;
    });
};
