import React, { useState, useEffect } from "react";
import "chartjs-plugin-zoom";
import styles from '../components/Home.module.css';

// ToggleButton 컴포넌트
const ToggleButton = ({ booltest, setBooltest }) => {
    return (
        <button onClick={() => setBooltest(!booltest)}>
            {booltest ? 'Hide' : 'Show'}
        </button>
    );
};

// IncrementButton 컴포넌트
const IncrementButton = ({ setCount }) => {
    return (
        <button onClick={() => setCount(prevCount => prevCount + 1)}>
            Increment
        </button>
    );
};

// Detail 컴포넌트
function Detail() {
    const [count, setCount] = useState(0);
    // const [stringtest, setStringtest] = useState("test");
    const [booltest, setBooltest] = useState(false);
    const [selectedOption, setSelectedOption] = useState('option1');

    // useEffect 훅을 사용하여 selectedOption 값이 변경될 때마다 로그 출력
    useEffect(() => {
        console.log(selectedOption);
    }, [selectedOption]);

    return (
        <div>
            {/* 토글 버튼: booltest 상태를 토글 */}
            <ToggleButton booltest={booltest} setBooltest={setBooltest} />

            {/* 카운트 표시 및 증가 버튼 */}
            {booltest && (
                <div>
                    <p>Count: {count}</p>
                    <IncrementButton setCount={setCount} />

                    <div>
                    <label htmlFor="options">Choose an option:</label>
                    <select
                        id="options"
                        value={selectedOption}
                        onChange={(e) => setSelectedOption(e.target.value)}
                    >
                        <option value="option1">Option 1</option>
                        <option value="option2">Option 2</option>
                        <option value="option3">Option 3</option>
                    </select>
                    <p>Selected Option: {selectedOption}</p>
                    </div>

                    <div className={styles.title}>
                        Spinex Test
                    </div>
                </div>
            )}

            {/* 드롭다운 메뉴 (select 요소) */}
            {/* <div>
                <label htmlFor="options">Choose an option:</label>
                <select
                    id="options"
                    value={selectedOption}
                    onChange={(e) => setSelectedOption(e.target.value)}
                >
                    <option value="option1">Option 1</option>
                    <option value="option2">Option 2</option>
                    <option value="option3">Option 3</option>
                </select>
                <p>Selected Option: {selectedOption}</p>
            </div> */}

            {/* 페이지 제목 */}
            {/* <div className={styles.title}>
                Spinex Test
            </div> */}

        </div>
    );
}

export default Detail;
