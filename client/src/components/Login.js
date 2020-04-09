import React, { Component } from 'react'
import FeatherIcon from 'feather-icons-react'

export class Login extends Component {

    state = {
        username: undefined,
        password: undefined,
        showAlert: false
    }
    
    // Attempt to log in
    login = async () => {

        if (!this.state.username || !this.state.password) return

        const username = this.state.username
        const password = this.state.password
        const loggedIn = await this.props.login(username, password);

        // Login failed
        if (!loggedIn){
            this.setState({showAlert: true});
        }
    }
    
    alertWrongCredentials = () => {

        return (
                <div id="credentialsAlert" className={`alert alert-danger alert-dismissible fade ${this.state.showAlert ? 'show' : ''}`} role="alert">
                    <strong>אופס!<br/></strong>נראה שהכנסתם פרטים לא נכונים.
                    <button onClick={() => this.setState({showAlert: false})} type="button" className="close" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>)
    }

    render() {
        return (
            <div className="main-container">
                <div className={`login p-1 ${this.state.loading ? 'blur' : ''}`}>
                    <form onSubmit={this.handleOnSubmit} className="align-items-center form-group d-flex flex-column">
                        <input onChange={e => this.setState({username: e.target.value})} className="w-75 form-control my-3" type="text" placeholder="שם משתמש"></input>
                        <input onChange={e => this.setState({password: e.target.value})} className="w-75 form-control" type="password" placeholder="סיסמה"></input>
                        <button onClick={this.login} type="button" className="btn btn-secondary mt-3 p-2">התחבר <FeatherIcon icon="arrow-left-circle"/></button>
                    </form>
                </div>
                {this.alertWrongCredentials()}
            </div>
        )
    }
}

export default Login;