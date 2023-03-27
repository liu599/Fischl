import Guide from '@/components/Guide';
import { trim } from '@/utils/format';
import { PageContainer } from '@ant-design/pro-components';
import { useModel } from '@umijs/max';
import styles from './index.less';

import { FC, useEffect, useRef, useState } from 'react';
import * as myFirstWasm from '@/wasm/mona';

const HomePage: FC = () => {
    const { name } = useModel('global');
    const [text, setText] = useState('');
    const [inputText, setInputText] = useState('');
    useEffect(() => {
        const timer = setTimeout(() => {
            let message = `${myFirstWasm.get_greeting(inputText)}`;
            setText(message);
        }, 100);
        return () => clearTimeout(timer);
    }, [inputText]);
    const handleChange = (event) => {
        console.log(myFirstWasm);
        setInputText(event.target.value);
    };

  return (
    <PageContainer ghost>
      <div className={styles.container}>
        <Guide name={trim(name)} />
      </div>
    <div className="App-header">
        <input type="text" value={inputText} onChange={handleChange} />
        <p>{text}</p>
    </div>
    </PageContainer>
  );
};

export default HomePage;
