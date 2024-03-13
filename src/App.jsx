import { useState, useReducer } from 'react'
import Computer from "./component/Computer.jsx";
import Buttons from  './component/Buttons.jsx';
import './App.css'


const calculate = (state) => {
    const current = parseFloat(state.current)
    const prev = parseFloat(state.prev)

    switch (state.operator) {

        case '+':
            return prev + current;

        case '-':
            return prev - current;

        case '*':
            return prev * current;

        case '/':
            return current !== 0 ? prev / current : "Les division par 0 sont impossible"

        default:
            return 0;
    }
}

const initialState = {
    current: 0,
    prev: 0,
    operator: "",
    errorMessage: ""
}

const reducer = (state, action) => {
    switch(action.type) {
        case 'changeCurrent':
            return {
                ...state,
                current: state.current === 0 ?
                    action.payload : state.current.toString() + action.payload.toString(),
                errorMessage: ""
            }

        case 'setOperator':
            return {
                ...state,
                prev: state.prev == 0 ? parseFloat(state.current) : calculate(state),
                current: 0,
                operator: action.payload
            }

        case 'addFloatingPoint':
            return {
                ...state,
                current: state.current.toString().includes('.') ? state.current : state.current + '.'
            }

        case "calculate":
            const result = calculate(state);
            return isNaN(parseFloat(result)) ? {
                ...state,
                errorMessage: result
            } : {
                ...state,
                current: result,
                prev: 0,
                operator: '',
                errorMessage: ""
            }

        case 'reset':
            return initialState;

        default:
            return state;
    }
}

function App() {

    const [state, dispatch] = useReducer(reducer, initialState)
    console.log(state);

  return (
    <div className={"calculatrice"}>
        <div>
            {
                state.errorMessage !== "" && <span style={{color: 'red'}}>{state.errorMessage}</span>
            }
            <div className="calculatrice__head">
                <Computer value={state.current} />
            </div>
            <div className="calculatrice__button__wrapper">
                <Buttons dispatch={dispatch} />
            </div>
        </div>
    </div>
  )
}

export default App