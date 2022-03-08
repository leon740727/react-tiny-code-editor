import * as React from 'react';
import { useState } from 'react';
import { render } from 'react-dom';
import Editor from './index';

function Root() {
    const [code1, setCode1] = useState('');
    const [code2, setCode2] = useState('');
    
    return (
    <div>
        <Editor code={code1} syntax='js' onChange={setCode1}
            placeholder='請輸入 code'
            autoResizeHeight
            autoResizeWidth
            style={{
                width: '30%',
                height: '3em',
                border: '1px solid gray',
                borderRadius: '5px',
                padding: '0.8em',
                fontSize: '1.2em',
                marginTop: '10px',
                marginBottom: '10px',
        }}/>
        <hr/>
        <Editor code={code2} syntax='js' onChange={setCode2}
            placeholder='請輸入 code'
            style={{
                width: '30%',
                height: '3em',
                border: '1px solid gray',
                borderRadius: '5px',
                padding: '0.8em',
                fontSize: '1.2em',
                marginTop: '10px',
                marginBottom: '10px',
        }}/>
    </div>);
}

render(<Root/>, document.getElementById('root'));
