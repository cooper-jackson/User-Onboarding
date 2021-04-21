import React, { useState, useEffect } from 'react';
import * as yup from 'yup';
import axios from 'axios';
import './Form.css'

const schema = yup.object().shape({
    name: yup.string().required('username is required').min(4, 'user needs to be 4 characters minimum'),
    email: yup.string().required('email is required').min(4, 'user needs to be 4 characters minimum'),
    password: yup.string().required('password is required').min(4, 'user needs to be 4 characters minimum'),
    agree: yup.boolean().oneOf([true], 'you must give us all of your data ;)'),

})

export default function Form(){
    
    const [formValues, setFormValues] = useState({name: '', email: '', password: '', agree: false})
    const [errors, setErrors] = useState({name: '', email: '', password: '', agree: false})
    const [users, setUsers] = useState ([])
    const [disabled, setDisabled] = useState(true)
    const apiURL = `https://reqres.in/api/users`
    
    const setFormErrors = (name, value) => {
        yup.reach(schema, name).validate(value)
        .then(() => setErrors({...errors, [name]: ''}))
        .catch(err => setErrors ({...errors, [name]: err.errors[0]}))
    }

    const onChange = event => {
        const {name, value, type, checked} = event.target
        const valueToUse = type === 'checkbox' ? checked : value
        setFormErrors(name, valueToUse)
        setFormValues({...formValues, [name]: valueToUse})
    }

    const onSubmit = event => {
        event.preventDefault();
        const newUser = { name: formValues.name.trim(), email: formValues.email.trim(), password: formValues.password.trim(), agree: formValues.agree}
        axios.post(apiURL, {newUser})
        .then(res => {
            setUsers([...users, newUser])
        })
        .catch(err => {
            console.log(err)
        })
    }

    


    useEffect(() => {
        schema.isValid(formValues).then(valid => setDisabled(!valid))
    }, [formValues])

    return (
        <div className="App">
            <form onSubmit={onSubmit}>
                <div className = "error-container" style={{color:'red'}}>
                    <div>{errors.name}</div> <div>{errors.email}</div> <div>{errors.password}</div> <div>{errors.agree}</div>
                </div>
                <div className="input-container">
                    <label>Username: </label>
                    <input 
                        value={formValues.name}
                        name="name"
                        type="text"
                        onChange={onChange}
                    />
                </div>
                <div className="input-container">
                    <label>User Email: </label>
                    <input 
                        value={formValues.email}
                        name="email"
                        type="text"
                        onChange={onChange}
                    />
                </div>
                <div className="input-container">
                    <label>Password: </label>
                    <input 
                        value={formValues.password}
                        name="password"
                        type="text"
                        onChange={onChange}
                    />
                </div>
                <div className="input-container">
                    <label>Agree to Terms of Service: </label>
                    <input 
                        value={formValues.agree}
                        name="agree"
                        type="checkbox"
                        onChange={onChange}
                    />
                </div>
                <button className="submit-button" disabled={disabled}>Submit</button>
            </form>

            <ul className="memberList">
                {users.map((member, index) => {
                return <div className = "userCard" key={index}>
                    <p>Username: {member.name}</p>
                    <p>User Email: {member.email}</p>
                </div>
                })}
            </ul>
      </div>
    )
}