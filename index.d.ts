import { Nodes } from 'hast';
interface IncomingProperties {
    [ElementName: string]: string;
}
declare const _default: (additions: IncomingProperties) => (node: Nodes) => void;
export default _default;
