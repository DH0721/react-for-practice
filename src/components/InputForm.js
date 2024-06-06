import React from "react";
import PropTypes from "prop-types";
import Button from './Button';
import styles from './Home.module.css';

class InputForm extends React.Component {
    handleChange = (e) => {
        this.props.onChange(e);
    };

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.onSubmit(e);
    };

    render() {
        const { years, percentValues, initialBudget, annualAddition } = this.props;

        return (
            <form onSubmit={this.handleSubmit} className={styles.formContainer}>
                <div className={styles.formGroup}>
                    <label>Years:
                        <input type="number" name="years" value={years} onChange={this.handleChange} />
                    </label>
                </div>
                <div className={styles.formGroup}>
                    <label>Percent Values (comma separated):
                        <input type="text" name="percentValues" value={percentValues} onChange={this.handleChange} />
                    </label>
                </div>
                <div className={styles.formGroup}>
                    <label>Initial Budget:
                        <input type="number" name="initialBudget" value={initialBudget} onChange={this.handleChange} />
                    </label>
                </div>
                <div className={styles.formGroup}>
                    <label>Annual Addition:
                        <input type="number" name="annualAddition" value={annualAddition} onChange={this.handleChange} />
                    </label>
                </div>
                <div className={styles.submitButton}>
                    <Button text="Submit" />
                </div>
            </form>
        );
    }
}

InputForm.propTypes = {
    years: PropTypes.number.isRequired,
    percentValues: PropTypes.string.isRequired,
    initialBudget: PropTypes.number.isRequired,
    annualAddition: PropTypes.number.isRequired,
    onChange: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
};

export default InputForm;