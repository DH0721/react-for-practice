import React from "react";
import { Line } from "react-chartjs-2";
import "chartjs-plugin-zoom";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from "chart.js";
// import Button from '../components/Button'; // Button 컴포넌트 경로 수정
import InputForm from '../components/InputForm';
import styles from '../components/Home.module.css';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            years: 10,                 // 기간(년) 설정
            percentValues: "2,5,8",    // 매년 수익률
            initialBudget: 300,        // 초기자금
            annualAddition: 0,         // 매 년 추가 투자금
            graphData: null,           // 그래프 데이터
            multipliers: [],           // 몇 배가 올랐는지 저장
        };
    }

    // 숫자여야 하는 값들(initialBudget, annualAddition, years)은 숫자로 변환하여 저장하고, 그 외의 값은 그대로 저장
    handleChange = (e) => {
        const { name, value } = e.target;
        this.setState({ 
            [name]: name === "initialBudget" || name === "annualAddition" || name === "years" ? parseFloat(value) : value 
        });
    };

    handleSubmit = (e) => {
        e.preventDefault();
        this.setState({
            years: parseInt(this.state.years, 10),
            percentValues: this.state.percentValues,
            initialBudget: parseFloat(this.state.initialBudget),
            annualAddition: parseFloat(this.state.annualAddition),
        }, () => {
            const graphData = this.generateData();  // 상태가 업데이트 된 후 데이터 생성
            this.setState({ graphData });
        });
    };

    generateData() {
        const { years, percentValues, initialBudget, annualAddition } = this.state;
        const percentArray = percentValues.split(',').map(Number);
        const multipliers = []; // 각 연도별 몇 배가 올랐는지 저장할 배열
        const datasets = percentArray.map((percent) => {
            const calPercent = 1 + percent / 100;
            const data = [];

            for (let i = 0; i <= years; i++) {
                let budget = initialBudget;

                if (i > 0) {
                    for (let j = 0; j < i; j++) {
                        budget *= calPercent;
                        budget += annualAddition;
                    }
                }

                data.push(parseFloat(budget.toFixed(2)));
            }

            // 마지막 연도의 값을 초기값과 비교하여 몇 배가 올랐는지 계산
            const finalValue = data[data.length - 1];
            const multiplier = (finalValue / initialBudget).toFixed(2);
            multipliers.push({ percent, multiplier });

            return {
                label: `${percent}%`,
                data,
                fill: false,
                borderColor: this.getRandomColor(),
                tension: 0.1,
            };
        });

        // 상태에 몇 배가 올랐는지 저장
        this.setState({ multipliers });

        return {
            labels: Array.from({ length: years + 1 }, (_, i) => i),
            datasets,
        };
    }

    getRandomColor() {
        const letters = "0123456789ABCDEF";
        let color = "#";
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }

    render() {
        const { years, percentValues, initialBudget, annualAddition, graphData, multipliers } = this.state;

        const options = {
            scales: {
                x: {
                    type: "category",
                    title: {
                        display: true,
                        text: "Years",
                    },
                },
                y: {
                    type: "linear",
                    title: {
                        display: true,
                        text: "Budget ( units : 万円 )",
                    },
                },
            },
            plugins: {
                title: {
                    display: true,
                    text: `Budget Growth Over ${years} Years at Various Compound Interest Rates (Annual Addition: ${annualAddition})`,
                    font: {
                        size: 30,
                    },
                },
                legend: {
                    display: true,
                    position: "top",
                },
            },
        };

        return (
            <div>
                <div className={styles.title}>Budget Growth Visualization</div>
                <InputForm
                years={years}
                percentValues={percentValues}
                initialBudget={initialBudget}
                annualAddition={annualAddition}
                onChange={this.handleChange}
                onSubmit={this.handleSubmit}
                />
                {graphData && (
                    <div className={styles.graphContainer}>
                        <Line data={graphData} options={options} />
                    </div>
                )}
                <div>
                    {graphData && (
                        <div className={styles.multipleContainer}>
                            <h2>-Multiplier Results-</h2>
                            <table className={styles.table}>
                                <thead>
                                    <tr>
                                        <th className={styles.th}>Interest Rate</th>
                                        <th className={styles.th}>Multiplier</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {multipliers.map((item, index) => (
                                        <tr key={index}>
                                            <td className={styles.td}>{`${item.percent}%`}</td>
                                            <td className={styles.td}>{`${item.multiplier} times`}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </div>
        );
    }
}

export default Home;
