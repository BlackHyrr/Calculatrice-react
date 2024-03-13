const Input = ({ value, changeValue }) => {
    const handleClick = () => {
        changeValue(value);
    };

    return (
        <button onClick={handleClick}>{value}</button>
    );
};

export default Input;