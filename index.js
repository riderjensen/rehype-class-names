import { selectAll } from "hast-util-select";
export default (additions) => {
    const adders = Object.entries(additions).map((property) => adder(property));
    return (node) => adders.forEach((a) => a(node));
};
const adder = ([selector, className]) => {
    return (node) => selectAll(selector, node).forEach((elem) => {
        if (!elem?.properties?.className)
            elem.properties = { className };
        else
            elem.properties.className += ` ${className}`;
    });
};
