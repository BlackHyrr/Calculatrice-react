import './calcButton.css'


const CalcButton = ({dispatch}) => {

    const handleOperatorClick = (value) => {
        dispatch({
            type: 'setOperator',
            payload: value
        })
    }

    const handleCalculate = () => {
        dispatch({
            type: 'calculate'
        })
    }

    return (
        <div className={'calcButton'}>
            <button onClick={() => handleOperatorClick('+')}>+</button>
            <button onClick={() => handleOperatorClick('-')}>-</button>
            <button onClick={() => handleOperatorClick('*')}>x</button>
            <button onClick={() => handleOperatorClick('/')}>/</button>
            <button onClick={handleCalculate}>=</button>
            <button onClick={() => dispatch({type: 'reset'})}>c</button>
            <button onClick={() => dispatch({type: 'addFloatingPoint'})}>.</button>
        </div>
    )
}

export default CalcButton