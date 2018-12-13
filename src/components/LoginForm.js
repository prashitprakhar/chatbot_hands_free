import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';
import { Card, CardSection, TextInputBar, Button, Spinner } from './common';
import { emailChanged, passwordChanged, loginUser } from '../actions';

class LoginForm extends Component {
    onEmailChange(text) {
        this.props.emailChanged(text);
    }

    onPasswordChange(text) {
        this.props.passwordChanged(text);
    }

    onButtonPress() {
        //console.log("On Button Press : ",this.props)
        const { email, password } = this.props;
        this.props.loginUser({ email, password });
    }

    renderError() {
        const { errorTextStyle } = styles;
        if (this.props.error) {
            return (
                <View style={{ backgroundColor: 'red' }}>
                    <Text style={errorTextStyle}>{this.props.error}</Text>
                </View>
            )
        }
    }

    renderButton() {
        const { spinnerAuthCheckStyle } = styles;

        if (this.props.loginProgress) {
            //console.log("true")
            return (
                <Spinner spinnerSize="large" />
            );
        }
        else {
            return (
                <Button onPressEvent={this.onButtonPress.bind(this)}>
                    Login
                </Button>
            );
        }
    }

    render() {
        return (
            <Card>
                <CardSection>
                    <TextInputBar
                        placeholder="user@email.com"
                        label="Email"
                        onChangeText={this.onEmailChange.bind(this)}
                        value={this.props.email} />
                </CardSection>
                <CardSection>
                    <TextInputBar
                        secureTextEntry
                        placeholder="password"
                        label="Password"
                        onChangeText={this.onPasswordChange.bind(this)}
                        value={this.props.password}
                    />
                </CardSection>
                {this.renderError()}
                <CardSection>
                    {this.renderButton()}
                </CardSection>
            </Card>
        );
    }
}

const mapStateToProps = state => {
    const { email,
        password,
        error,
        loginProgress } = state.auth;
    return {
        email,
        password,
        error,
        loginProgress
    }
    // return {
    //     email : state.auth.email,
    //     password : state.auth.password,
    //     error : state.auth.error
    // }
}

export default connect(mapStateToProps, {
    emailChanged,
    passwordChanged,
    loginUser
})(LoginForm);

const styles = {
    errorTextStyle: {
        fontSize: 20,
        alignSelf: 'center',
        color: '#000'
    },
    spinnerAuthCheckStyle: {
        flex: 1,
        justifyContent: 'space-around',
        backgroundColor: '#fff',
        height: 200,
        padding: 5,
        //flexDirection: 'column',
        position: 'relative'
    }
}