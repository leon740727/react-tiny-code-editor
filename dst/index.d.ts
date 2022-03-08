import * as React from 'react';
export default function ({ syntax, code, onChange, autoResizeWidth, autoResizeHeight, placeholder, style }: {
    syntax: string;
    code: string;
    onChange: (code: string) => void;
    autoResizeWidth?: boolean;
    autoResizeHeight?: boolean;
    placeholder?: string;
    style?: React.CSSProperties;
}): JSX.Element;
