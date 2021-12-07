import React, { useContext, useState } from 'react';
import { Form, Button } from 'semantic-ui-react';
import { useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import  { useNavigate } from 'react-router-dom';
import { AuthContext } from '../auth.js';

//import { AuthContext } from '../context/auth';
//import { useForm } from '../util/hooks';

// const useForm = (callback, initialState = {}) => {
//     const [values, setValues] = useState(initialState);
//     const onChange = (event) => {
//         setValues({ ...values, [event.target.name]: event.target.value});
//     };

//     const onSubmit = event => {
//         event.preventDefault();
//         callback();
//     }

//     return {
//         onChange,
//         onSubmit,
//         values
//     }
// }

function Register(props) {
    const context = useContext(AuthContext);
    let navigate = useNavigate();
    //const context = useContext(AuthContext);
    const [errors, setErrors] = useState({});
    const [values, setValues] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
    })

    // const { onChange, onSubmit, values } = useForm(registerUser, {
    //     username: '',
    //     password: '',
    //     confirmPassword: '',
    //     email: ''
    // });

    const onChange = (event) => {
        setValues({...values, [event.target.name]: event.target.value})
    }

    const[addUser, { loading }] = useMutation(REGISTER_USER, {
        update(_, result){
            console.log(result);
            //context.login(userData);
            context.login(result.data.register);
            //props.history.push('/')
            navigate('/')
        },
        onError(err){
            //console.log(err.graphQLErrors[0].extensions.exception.errors);
            setErrors(err.graphQLErrors[0].extensions.errors);
        },
        variables: values
    });

    const onSubmit = (event) => {
        event.preventDefault();
        addUser();
    }

    // function registerUser() {
    //     addUser();
    // } 

    return (
        <div className="form-container">
            <Form onSubmit={onSubmit} noValidate className={loading ? 'loading' : ''}>
                <h1 style={{color:'green'}}>why tf aren't you signed up already ??</h1>
                <Form.Input
                    //label="Username"
                    placeholder="your dumb new username"
                    name="username"
                    type="text"
                    value={values.username}
                    error={errors.username ? true : false}
                    onChange={onChange}
                />
                <Form.Input
                    //label="Password"
                    placeholder="probably 123456"
                    name="password"
                    type="password"
                    value={values.password}
                    error={errors.password ? true : false}
                    onChange={onChange}
                />
                <Form.Input
                    //label="Confirm Password"
                    placeholder="definitey 123456"
                    name="confirmPassword"
                    type="password"
                    value={values.confirmPassword}
                    error={errors.confirmPassword ? true : false}
                    onChange={onChange}
                />
                <Form.Input
                    //label="Email"
                    placeholder="email info give me email"
                    name="email"
                    type="email"
                    value={values.email}
                    error={errors.email ? true : false}
                    onChange={onChange}
                />
                <Button type="submit" style={{color:'green'}}>
                    Register
                </Button>
            </Form>
            {Object.keys(errors).length > 0 && (
                <div className="ui error message">
                <ul className="list">
                    {Object.values(errors).map((value) => (
                        <li key={value}>{value}</li>
                    ))}
                </ul>
            </div>
            )}
        </div>
    );
}

const REGISTER_USER = gql`
    mutation register(
        $username: String!
        $password: String!
        $confirmPassword: String!
        $email: String!
    ) {
        register(
            registerInput: {
                username: $username
                password: $password
                confirmPassword: $confirmPassword
                email: $email
            }
        ) {
            id 
            email 
            username 
            createdAt 
            token 
        }
    }
`

export default Register;

// import React from 'react'

// function Register() {
//     return (
//         <div>
//             <h1>Register Page</h1>
//         </div>
//     )
// }

// export default Register