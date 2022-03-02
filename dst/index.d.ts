import * as React from 'react';
export default function ({ syntax, code, onChange, placeholder, style }: {
    syntax: string;
    code: string;
    onChange: (code: string) => void;
    placeholder?: string;
    style?: React.CSSProperties;
}): JSX.Element;
