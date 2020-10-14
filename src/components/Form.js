import React, { useCallback, useReducer } from 'react'
import Input from './Input';

const formReducer = (state, action) => {
    switch(action.type) {
        case 'INPUT_CHANGE':
            let formIsValid = true;
            for(const inputId in state.inputs) {
                if(inputId === action.inputId) {
                    formIsValid = formIsValid && action.isValid;
                } else {
                    formIsValid = formIsValid && state.inputs[inputId].isValid;
                }
            }
            return {
                ...state,
                input: {
                    ...state.inputs,
                    [action.inputId]: {value: action.value, isValid: action.isValid},
                },
                isValid: formIsValid,
            };
        default:
            return state;
    }
    
};

const Form = () => {
    const [formState, dispatch] = useReducer(formReducer, {
        inputs: {
            title: {
                value: "",
                isValid: false,
            },
        },
        isValid: false,
    });

    const inputHandler = useCallback((id, value, isValid) => {
        dispatch({
            type: 'INPUT_CHANGE',
            value: value,
            isValid: isValid,
            inputId: id,
        });
    }, []);

    const createOrder = (e) => {
        e.preventDefault();
        
    }

    return(
        <form className="form-container" onSubmit={createOrder}>
            <Input 
            id='email'
            element='input'
            type='email'
            label='Email'
            onInput={inputHandler}
            />
            <Input 
            id='name'
            element='input'
            type='text'
            label='Name'
            onInput={inputHandler}
            />
            <Input 
            id='address'
            element='input'
            type='text'
            label='Address'
            onInput={inputHandler}
            />
            <button className='button primary' type='Checkout'>Submit</button>
        </form>
    )

}

export default Form;