import * as React from 'react';
import { useState, useEffect, useRef } from 'react';

declare const Prism: any;

export default function ({syntax, code, onChange, autoResizeWidth, autoResizeHeight, placeholder, style}: {
    syntax: string,
    code: string,
    onChange: (code: string) => void,
    autoResizeWidth?: boolean,
    autoResizeHeight?: boolean,
    placeholder?: string,
    style?: React.CSSProperties,
}) {
    const inputRef = useRef<HTMLTextAreaElement>(null);
    const viewerRef = useRef<HTMLPreElement>(null);
    const [autoSize, setAutoSize] = useState<React.CSSProperties>({});

    useEffect(() => syncScroll(), [code]);
    useEffect(() => {
        const scrollWidth = inputRef.current!.scrollWidth;
        const scrollHeight = inputRef.current!.scrollHeight;
        let style: React.CSSProperties = {};
        if (autoResizeWidth) {
            style.minWidth = scrollWidth;
            style.overflowX = 'hidden';
        }
        if (autoResizeHeight) {
            style.minHeight = scrollHeight;
            style.overflowY = 'hidden';
        }
        setAutoSize(style)
    }, [code]);

    /** 讓重疊的二個元件維持一樣的尺寸 */
    const size: React.CSSProperties = {
        boxSizing: 'border-box',
        width: '100%',
        height: '3em',
        margin: '0px',
        padding: '0.8em',
        border: '0px',
        fontSize: '1.1em',
        fontFamily: 'monospace',
        lineHeight: '1.2em',
    }

    const common: React.CSSProperties = {
        overflow: 'auto',
    }
    
    const input: React.CSSProperties = {
        /** 讓 input 透明地疊在 viewer 上面，只露出 caret */
        position: 'absolute',
        
        color: 'transparent',
        background: 'transparent',
        caretColor: 'black',

        whiteSpace: 'pre',          // for firefox
        resize: 'none',
    }

    return (
    <>
        <div style={{position: 'relative'}}>

            {/* 沒有這一行，當 Editor 前面沒有可顯示的東西，且有設 margin 時，二個元件不會重疊 */}
            <div style={{width: '1px', height: '1px'}}/>

            <textarea ref={inputRef}
                style={mergeRight([input, common, size, style || {}, autoSize])} spellCheck='false'
                value={code}
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
            />
        </div>
        <pre ref={viewerRef}
            style={mergeRight([common, size, style || {}, autoSize])} aria-hidden
            dangerouslySetInnerHTML={{__html: highlight(syntax, code.endsWith('\n') ? code + ' ' : code)}}
        />
    </>);

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
