import React, { useReducer } from 'react'

const inputReducer = (state, action) => {
    switch (action.type) {
        case "CHANGE":
            return {
                ...state,
                value:action.val,
                isValid:action.val
            };
        case "TOUCH":
            return {
                ...state,
                isTouched: true
            };
        default:
            return state
    }
}

const Input = (props) => {
    const [inputState, dispatch] = useReducer(inputReducer, {
        value: '',
        isValid: false,
        isTouched: false,
    });
    
    const changeInput = (e) => {
        dispatch({
            type: 'change',
            val: e.target.value
        })
    }

    const touchedInput = (e) => {
        dispatch({
            type: 'TOUCH'
        });
    }

    const {id, type, placeholder} = props;
    const {value, isValid, isTouched} = inputState;
    const element = (
        <input 
        id={id}
        type={type}
        placeholder={placeholder}
        onChange={changeInput}
        onBlur={touchedInput}
        value={value}
        />
    )

    return (
        <div className= {`form-container ${
            !isValid && isTouched
        }`}
        >
          <label htmlFor="">{props.label}</label>
          {element}  
          {!isValid && isTouched}
        </div>
    )
}

export default Input
