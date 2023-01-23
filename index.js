"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const hast_util_select_1 = require("hast-util-select");
exports.default = (additions) => {
    const adders = Object.entries(additions).map((property) => adder(property));
    return (node) => adders.forEach((a) => a(node));
};
const adder = ([selector, className]) => {
    return (node) => (0, hast_util_select_1.selectAll)(selector, node).forEach((elem) => {
        var _a;
        if (!((_a = elem === null || elem === void 0 ? void 0 : elem.properties) === null || _a === void 0 ? void 0 : _a.className))
            elem.properties = { className };
        else
            elem.properties.className += ` ${className}`;
    });
};
