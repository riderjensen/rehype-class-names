import { selectAll } from "hast-util-select";
import { classnames } from 'hast-util-classnames';
export default (additions) => {
    const adders = Object.entries(additions).map((property) => adder(property));
    return (node) => adders.forEach((a) => a(node));
};
const adder = ([selector, cName]) => {
    return (nodes) => selectAll(selector, nodes).forEach((elem) => {
        classnames(elem, cName);
    });
};
