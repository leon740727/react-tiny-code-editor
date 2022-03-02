import * as React from 'react';
import { useState } from 'react';
import { render } from 'react-dom';
import Editor from './index';

function Root() {
    const [code, setCode] = useState('');
    
    return (
    <div style={{width: '500px', height: '400px'}}>
        <Editor code={code} syntax='js' onChange={setCode}
            placeholder='請輸入 code'
            style={{
                width: '100%',
                height: '5em',
                border: '1px solid gray',
                borderRadius: '5px',
                padding: '0.8em',
                fontSize: '1.2em',
            }}/>
    </div>);
}

render(<Root/>, document.getElementById('root'));
