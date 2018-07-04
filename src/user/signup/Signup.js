import React, { Component } from 'react';
import { signup, checkEmailAvailability, checkUsernameAvailability } from "../../util/APIUtils";
import './signup.css';
import { Link } from 'react-router-dom';
import {
    NAME_MAX_LENGTH, NAME_MIN_LENGTH, EMAIL_MAX_LENGTH, USERNAME_MAX_LENGTH,
    USERNAME_MIN_LENGTH, PASSWORD_MAX_LENGTH, PASSWORD_MIN_LENGTH } from "../../constants";
import { Form, Input, Button, notification } from 'antd';
const FormItem = Form.Item;

class Signup extends Component{

    constructor(props) {
        super(props);
        this.state = {
            name: {
                value: ''
            },
            username: {
                value: ''
            },
            email: {
                value: ''
            },
            password: {
                value: ''
            }
        }

        this.handleInputChange = this.handleInputChange.bind(this);

        this.handleSubmit = this.handleSubmit.bind(this);

        this.validateUsernameAvailability = this.validateUsernameAvailability.bind(this);

        this.validateEmailAvailability = this.validateEmailAvailability.bind(this);

        this.isFormInvalid = this.isFormInvalid.bind(this);
    }

    handleInputChange(event, validationFun){
        const target = event.target;
        const inputName = target.name;
        const inputValue = target.value;

        this.setState({
            [inputName]: {
                value: inputValue,
                ...validationFun(inputValue)
            }
        });
    }

    // handleSubmit(event){
    //     event.preventDefault();
    //     const signupRequest = {
    //         name: this.state.name.value,
    //         username: this.state.username.value,
    //         email: this.state.email.value,
    //         password: this.state.password.value
    //     };
    //     signup(signupRequest).then(response => {
    //
    //         notification.success({
    //            message: 'Polling APP',
    //            description: "Thank you!  You're successfully registered. Please Login to container!!!",
    //         });;
    //         this.props.push("/login");
    //     }).catch(error => {
    //        notification.error({
    //            message: 'Polling App',
    //            description: error.message || 'Sorry! Something went wrong Please try again!'
    //        }) ;
    //     });
    // }

    handleSubmit(event) {
        event.preventDefault();

        const signUpRequest = {
            name: this.state.name.value,
            username: this.state.username.value,
            email: this.state.email.value,
            password: this.state.password.value
        };
        signup(signUpRequest).then(response => {
                notification.success({
                    message: 'Polling App',
                    description: "Thank you! You're successfully registered. Please Login to continue!",
                });
                this.props.history.push("/login");
            }).catch(error => {
            notification.error({
                message: 'Polling App',
                description: error.message || 'Sorry! Something went wrong. Please try again!'
            });
        });
    }

    isFormInvalid(){
        return !(this.state.name.validateStatus === 'success' &&
                this.state.email.validateStatus === 'success' &&
                this.state.username.validateStatus === 'success' &&
                this.state.password.validateStatus === 'success'
        );
    }

    render() {
        return (
            <div className="signup-container">
                <h1 className="page-title">Sign Up</h1>
                <div className="signup-content">
                    <Form onSubmit={this.handleSubmit} className="signup-form">
                        <FormItem label="Full Name"
                                  validateStatus={this.state.name.validateStatus}
                                  help={this.state.name.errorMessage}>
                            <Input size="large"
                                   name="name"
                                   autoComplete="off"
                                   placeholder="You full name"
                                   value={this.state.name.value}
                                   onChange={(event) => this.handleInputChange(event, this.validateName)}
                            />
                        </FormItem>
                        <FormItem label="Username" hasFeedback validateStatus={this.state.username.validateStatus}
                        help={this.state.username.errorMessage}>
                            <Input size="large"
                                   name="username"
                                   autoComplete="off"
                                   placeholder="A unique username"
                                   value={this.state.username.value}
                                   onBlur={this.validateUsernameAvailability}
                                   onChange={(event) => this.handleInputChange(event, this.validateUsername)}/>
                        </FormItem>
                        <FormItem label='Email'
                                  hasFeedback validateStatus={this.state.email.validateStatus}
                        help={this.state.email.errorMessage}>
                            <Input
                                size="large"
                                name="email"
                                type="email"
                                autoComplete="off"
                                placeholder="Your email"
                                value={this.state.email.value}
                                onBlur={this.validateEmailAvailability}
                                onChange={(event) => this.handleInputChange(event, this.validateEmail)}/>
                        </FormItem>
                        <FormItem label="Password" validateStatus={this.state.password.validateStatus}
                                  help={this.state.password.errorMessage}>
                            <Input size="large"
                                   name="password"
                                   type="password"
                                   autoComplete="off"
                                   placeholder="A password between 6 to 20 characters"
                                   value={this.state.password.value}
                                   onChange={(event) => this.handleInputChange(event, this.validatePassword)} />
                        </FormItem>
                        <FormItem>
                            <Button type="primary"
                                    htmlType="submit"
                                    size="large"
                                    className="signup-form-button"
                                    disabled={this.isFormInvalid()}> Sign Up </Button>
                            Already Register? <Link to="/login">Login now!</Link>
                        </FormItem>
                    </Form>
                </div>
            </div>
        );
    }

    validateName = (name) => {
        if (name.leading < NAME_MIN_LENGTH){
            return {
                validateStatus: 'error',
                errorMessage: 'Name is  too short (Minimum ${NAME_MIN_LENGTH} characters needed.)'
            }
        }else if (name.length > NAME_MAX_LENGTH){
            return {
                validateStatus: 'error',
                errorMessage: 'Name is too long (Maximum ${NAME_MAX_LENGTH} characters allowed.}'
            }
        } else {
            return {
                validateStatus: 'success',
                errorMessage: null
            };
        }
    }

    validateEmail = (email) => {
        if (!email){
            return {
                validateStatus: 'error',
                errorMessage: 'Email may not be empty'
            }
        }

        const EMAIL_REGEX = RegExp('[^@ ] + @[^@ ] + \\.[^@ ] +');
        if (!EMAIL_REGEX.test(email)){
            return {
                validateStatus: 'error',
                errorMessage: 'Email not valid'
            }
        }

        if (email.length > EMAIL_MAX_LENGTH){
            return{
                validateStatus: 'error',
                errorMessage: 'Email is too long (Maximum ${EMAIL_MAX_LENGTH} characters allowed.)'
            }
        }

        return {
            validateStatus: null,
            errorMessage: null
        }

    }

    validateUsername = (username) => {
        if (username.length < USERNAME_MIN_LENGTH){
            return {
                validateStatus: 'error',
                errorMessage: 'Username is too short (Minimum ${USERNAME_MIN_LENGTH} characters needed.'
            }
        }else if (username.length > USERNAME_MAX_LENGTH){
            return {
                validateStatus: 'error',
                errorMessage: 'Username is too long (Maximum ${USERNAME_MAX_LENGTH} characters allowed.'
            }
        }else
        {
            return {
                validateStatus: null,
                errorMessage: null
            }
        }
    }

    validatePassword = (password) => {
        if (password.length < PASSWORD_MIN_LENGTH){
            return{
                validateStatus: 'error',
                errorMessage: 'Password is too short (Minimum ${PASSWORD_MIN_LENGTH} characters needed.)'
            }
        }else if (password.length > PASSWORD_MAX_LENGTH){

            return {
                validateStatus: 'error',
                errorMessage: 'Username is too long (Maximum ${USERNAME_MAX_LENGTH} characters allowed.'
            }
        } else{
            return{
                validateStatus: 'success',
                errorMessage: null
            };
        }
    }

    validateUsernameAvailability() {

        const usernameValue = this.state.username.value
        const usernameValidation = this.validateUsername(usernameValue);

        if (usernameValidation.validateStatus === 'error') {
            this.setState({
                username: {
                    value: usernameValue,
                    ...usernameValidation
                }
            });
            return;
        }

        this.setState({
            username: {
                value: usernameValue,
                validateStatus: 'validating',
                errorMessage: null
            }
        });

        checkUsernameAvailability(usernameValue).then(response => {
            if (response.available) {
                this.setState({
                    username: {
                        value: usernameValue,
                        validateStatus: 'success',
                        errorMessage: null
                    }
                });
            } else {
                this.setState({
                    username: {
                        value: usernameValue,
                        validateStatus: 'error',
                        errorMessage: 'This username is already taken'
                    }
                });
            }
        }).catch(error => {

            this.setState({
                username: {
                    value: usernameValue,
                    validateStatus: 'success',
                    errorMessage: null
                }
            });
        });

    }

    validateEmailAvailability() {

        const emailValue = this.state.email.value;
        const emailValidation = this.validateEmail(emailValue);

        if (emailValidation.validateStatus === 'error') {
            this.setState({
                email: {
                    value: emailValue,
                    ...emailValidation
                }
            });
        }

        this.setState({
            email: {
                value: emailValue,
                validateStatus: 'validating',
                error: null
            }
        });

        checkEmailAvailability(emailValue).then(
            response => {
                if (response.available) {
                    this.setState({
                        email: {
                            value: emailValue,
                            validateStatus: 'success',
                            errorMessage: null
                        }
                    });
                } else {
                    this.setState({
                        email: {
                            value: emailValue,
                            validateStatus: 'error',
                            errorMessage: 'This Email is already registered'
                        }
                    });
                }
            }).catch(error => {
                this.setState(
                    {
                        email: {
                            value: emailValue,
                            validateStatus: 'success',
                            errorMessage: null
                        }
                    });
        });
    }
}
export default Signup;