import * as React from 'react';
import { useState, useEffect, useLayoutEffect, useRef } from 'react';

declare const Prism: any;

export default function ({syntax, code, onChange, placeholder, style}: {
    syntax: string,
    code: string,
    onChange: (code: string) => void,
    placeholder?: string,
    style?: React.CSSProperties,
}) {
    const inputRef = useRef<HTMLTextAreaElement>(null);
    const viewerRef = useRef<HTMLPreElement>(null);

    useEffect(() => syncScroll(), [code]);

    const editor: React.CSSProperties = {
        position: 'relative',
    };

    /** 讓重疊的二個元件維持一樣的尺寸 */
    const size: React.CSSProperties = {
        boxSizing: 'border-box',
        width: '200px',
        height: '2.7em',
        margin: '0px',
        padding: '0.8em',
        border: '0px',
        fontSize: '1em',
        fontFamily: 'monospace',
        lineHeight: '1.2em',
    }

    const common: React.CSSProperties = {
        position: 'absolute',
        overflow: 'auto',
    }
    
    const input: React.CSSProperties = {
        /** 讓 input 透明地疊在 viewer 上面，只露出 caret */
        zIndex: 1,
        color: 'transparent',
        background: 'transparent',
        caretColor: 'black',

        whiteSpace: 'pre',          // for firefox
        resize: 'none',
    }

    const viewer: React.CSSProperties = {
        /** 讓 input 透明地疊在 viewer 上面，只露出 caret */
        zIndex: 0,
    }

    return (
    <div style={editor}>
        <textarea ref={inputRef}
            style={mergeRight([input, common, size, style || {}])} spellCheck='false'
            onChange={e => onChange(e.target.value)}
            onScroll={() => syncScroll()}
            onKeyDown={e => {
                if (e.code === 'Tab') {
                    e.preventDefault();
                    insertText(e.target as HTMLTextAreaElement, '  ');
                    onChange((e.target as HTMLTextAreaElement).value)
                }
            }}
            placeholder={placeholder}
        >{code}</textarea>
        <pre ref={viewerRef}
            style={mergeRight([viewer, common, size, style || {}])} aria-hidden
            dangerouslySetInnerHTML={{__html: highlight(syntax, code.endsWith('\n') ? code + ' ' : code)}}
        />
    </div>);

    function syncScroll() {
        viewerRef.current!.scrollTop = inputRef.current!.scrollTop;
        viewerRef.current!.scrollLeft = inputRef.current!.scrollLeft;
    }
}

function highlight(syntax: string, code: string): string {
    return Prism.highlight(code, Prism.languages[syntax], syntax);
}

function mergeRight(objs: {[f: string]: any}[]) {
    const entries = objs
    .map(obj => Object.entries(obj))
    .reduce((acc, entries) => acc.concat(entries), []);
    return Object.fromEntries(entries);
}

function insertText(ta: HTMLTextAreaElement, text: string) {
    const [start, end] = [ta.selectionStart, ta.selectionEnd];
    const res = ta.value.slice(0, start)
    .concat(text)
    .concat(ta.value.slice(end));
    ta.value = res;
    ta.selectionStart = start+2;
    ta.selectionEnd = start+2;
}
