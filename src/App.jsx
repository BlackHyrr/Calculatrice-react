import { useReducer } from 'react'
import './App.css'
import Result from './component/Result.jsx'
import Input from "./component/Input.jsx"


const initialState = {
    num1: '',
    num2: '',
    result: '',
    operation: '',
};

const calculateResult = (num1, num2, operation) => {
    switch (operation) {
        case '+':
            return parseFloat(num1) + parseFloat(num2);
        case '-':
            return parseFloat(num1) - parseFloat(num2);
        case 'X':
            return parseFloat(num1) * parseFloat(num2);
        default:
            return 0;
    }
};


const reducer = (state, action) => {
    switch (action.type) {
        case 'set_value':
            const { name, value } = action.payload;
            return {
                ...state,
                [name]: state[name] + value,
                result: state.result + value,
            };

        case 'set_operation':
            const { payload: operator } = action;
            return {
                ...state,
                result: state.result + operator,
                operation: operator,
            };

        case 'calculate_result':
            case 'calculate_result':
                const result = calculateResult(state.num1, state.num2, state.operation);
                return {
                    ...state,
                result,
                num1: result,
                num2: 0
            };

        case 'reset':
            return initialState;

        default:
            return state;
    }
};

function App() {
    const [state, dispatch] = useReducer(reducer, initialState);

    const handleButtonClick = (value) => {
        if (value === '=') {
            dispatch({ type: 'calculate_result' });
        } else if (['+', '-', 'X'].includes(value)) {
            dispatch({ type: 'set_operation', payload: value });
        } else {
            const name = state.operation ? 'num2' : 'num1';
            dispatch({ type: 'set_value', payload: { name, value } });
        }
    };

    const renderNumericButtons = () => {
        const buttons = [];
        for (let i = 0; i <= 9; i++) {
            buttons.push(
                <Input key={i} value={i.toString()} changeValue={handleButtonClick} />
            );
        }
        return buttons;
    };

    return (
        <>
            <Result result={state.result} />
            <div>
                <div className="numpad">
                    {renderNumericButtons()}
                </div>
                <Input value="+" changeValue={handleButtonClick} />
                <Input value="-" changeValue={handleButtonClick} />
                <Input value="X" changeValue={handleButtonClick} />
                <Input value="=" changeValue={handleButtonClick} />
                <Input value="reset" changeValue={() => dispatch({ type: 'reset' })} />
            </div>
        </>
    );
}

export default App;