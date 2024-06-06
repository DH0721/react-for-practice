import React from "react";
import "chartjs-plugin-zoom";
import styles from '../components/Home.module.css';
import { createGlobalState } from 'react-hooks-global-state';

// 전역 상태 생성
const { useGlobalState } = createGlobalState({ count: 0, stringtest: "test", booltest: false });

// CountDisplay 컴포넌트
const CountDisplay = () => {
    const [count] = useGlobalState('count');
    const [booltest] = useGlobalState('booltest');
    
    if (!booltest) {
        return null;
    }

    return (
        <div>
            <p>Count: {count}</p>
            <IncrementButton />
        </div>
    );
};

// ToggleButton 컴포넌트
const ToggleButton = () => {
    const [booltest, setBooltest] = useGlobalState('booltest');

    return (
        <button onClick={() => setBooltest(!booltest)}>
            {booltest ? 'Hide' : 'Show'}
        </button>
    );
};

// IncrementButton 컴포넌트
const IncrementButton = () => {
    const [count, setCount] = useGlobalState('count');

    return (
        <button onClick={() => setCount(count + 1)}>
            Increment
        </button>
    );
};

// Detail 컴포넌트
function Detail() {
    return (
        <div>
            <ToggleButton />
            <CountDisplay />
            <div className={styles.title}>
                Budget Growth Visualization
            </div>
            {/* 필요한 다른 컴포넌트나 JSX 요소를 추가 */}
        </div>
    );
}

export default Detail;