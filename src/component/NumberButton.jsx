import './numberButton.css';

const NumberButton = ({dispatch}) => {

    const numbers = [0,1,2,3,4,5,6,7,8,9];
    numbers.reverse();

    const handleClick = (value) => {
        dispatch({
            type: 'changeCurrent',
            payload: value
        })
    }

    return (
        <div className={"numberGrid"}>
            {
                numbers.map((val, key) => {
                    return <button key={key} onClick={() => handleClick(val)} >{val}</button>
                })
            }
        </div>
    )
}
export default NumberButton