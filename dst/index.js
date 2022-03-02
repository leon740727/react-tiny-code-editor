"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const React = __importStar(require("react"));
const react_1 = require("react");
function default_1({ syntax, code, onChange, placeholder, style }) {
    const inputRef = (0, react_1.useRef)(null);
    const viewerRef = (0, react_1.useRef)(null);
    (0, react_1.useEffect)(() => syncScroll(), [code]);
    const editor = {
        position: 'relative',
    };
    /** 讓重疊的二個元件維持一樣的尺寸 */
    const size = {
        boxSizing: 'border-box',
        width: '200px',
        height: '2.7em',
        margin: '0px',
        padding: '0.8em',
        border: '0px',
        fontSize: '1em',
        fontFamily: 'monospace',
        lineHeight: '1.2em',
    };
    const common = {
        position: 'absolute',
        overflow: 'auto',
    };
    const input = {
        /** 讓 input 透明地疊在 viewer 上面，只露出 caret */
        zIndex: 1,
        color: 'transparent',
        background: 'transparent',
        caretColor: 'black',
        whiteSpace: 'pre',
        resize: 'none',
    };
    const viewer = {
        /** 讓 input 透明地疊在 viewer 上面，只露出 caret */
        zIndex: 0,
    };
    return (React.createElement("div", { style: editor },
        React.createElement("textarea", { ref: inputRef, style: mergeRight([input, common, size, style || {}]), spellCheck: 'false', onChange: e => onChange(e.target.value), onScroll: () => syncScroll(), onKeyDown: e => {
                if (e.code === 'Tab') {
                    e.preventDefault();
                    insertText(e.target, '  ');
                    onChange(e.target.value);
                }
            }, placeholder: placeholder }),
        React.createElement("pre", { ref: viewerRef, style: mergeRight([viewer, common, size, style || {}]), "aria-hidden": true, dangerouslySetInnerHTML: { __html: highlight(syntax, code.endsWith('\n') ? code + ' ' : code) } })));
    function syncScroll() {
        viewerRef.current.scrollTop = inputRef.current.scrollTop;
        viewerRef.current.scrollLeft = inputRef.current.scrollLeft;
    }
}
exports.default = default_1;
function highlight(syntax, code) {
    return Prism.highlight(code, Prism.languages[syntax], syntax);
}
function mergeRight(objs) {
    const entries = objs
        .map(obj => Object.entries(obj))
        .reduce((acc, entries) => acc.concat(entries), []);
    return Object.fromEntries(entries);
}
function insertText(ta, text) {
    const [start, end] = [ta.selectionStart, ta.selectionEnd];
    const res = ta.value.slice(0, start)
        .concat(text)
        .concat(ta.value.slice(end));
    ta.value = res;
    ta.selectionStart = start + 2;
    ta.selectionEnd = start + 2;
}
