import React, { Component } from 'react';

export class Login extends Component {

    state = {username: undefined, password: undefined, showAlert: false};
    
    // Handle the inputs value change, and save them to state
    handleOnChange = (value, type) => {
        this.setState({[type]: value});
    }

    // Submit the form, attempt to log in
    handleOnSubmit = async e => {
        e.preventDefault();
        if (!this.state.username || !this.state.password) return;
        
        const credentials = {
            username: this.state.username.toLowerCase(),
            password: this.state.password
        }

        const loggedIn = await this.props.login(credentials);

        // Login failed
        if (!loggedIn){
            this.setState({showAlert: true});
        }
    }

    alertWrongCredentials = () => {

        return (
            <div className="d-flex justify-content-center">
                <div id="credentialsAlert" className={`w-25 p-3 alert alert-danger alert-dismissible fade ${this.state.showAlert ? 'show' : ''}`} role="alert">
                    <strong>Oops!<br/></strong>Seems like you've used an incorrect username or password.
                    <button onClick={() => this.setState({showAlert: false})} type="button" className="close" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
            </div>)
    }

    render() {
        return (
            <div className="d-flex flex-column">

                {this.alertWrongCredentials()}

                <div className="justify-content-center d-flex align-items-center min-vh-100">
                    <div className="login border rounded pt-5 pb-3 px-2">
                        <form onSubmit={this.handleOnSubmit} className="form-group d-flex flex-column container">
                            <input onChange={e => this.handleOnChange(e.target.value, 'username')} className="form-control login-input" type="text" placeholder="Username"></input>
                            <input onChange={e => this.handleOnChange(e.target.value, 'password')} className="form-control login-input" type="password" placeholder="Password"></input>
                            <input className="btn btn-outline-info login-input mt-4 px-4" type="submit" value="Login"></input>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}

export default Login;