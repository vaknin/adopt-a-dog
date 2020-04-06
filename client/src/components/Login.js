import React, { Component } from 'react'
import FeatherIcon from 'feather-icons-react'
import Cookies from 'universal-cookie'

export class Login extends Component {

    cookies = new Cookies();

    state = {
        username: undefined,
        password: undefined,
        showAlert: false,
        loading: false
    }

    // Loading animation
    loadingSpinner = () => {

        if (this.state.loading) return (
            <div className="loading d-flex justify-content-center flex-column align-items-center">
                <strong>טוען..</strong>
                <div className="spinner-border mb-2" role="status"/>
            </div>)
    }
    
    // Attempt cookies login
    componentDidMount = () => {
        const username = this.cookies.get('username')
        const password = this.cookies.get('password')
        if (username && password){
            this.props.login(username, password)
        }
    }

    // Attempt to log in
    login = async () => {

        if (!this.state.username || !this.state.password) return

        const username = this.state.username
        const password = this.state.password

        this.setState({loading: true})
        const loggedIn = await this.props.login(username, password);

        // Login failed
        if (!loggedIn){
            this.setState({showAlert: true});
        }

        // Logged in, save id&pass to cookies
        else{
            this.cookies.set('username', username);
            this.cookies.set('password', password);
        }

        this.setState({loading: false})
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
                <div className={`login pt-5 pb-3 px-3 ${this.state.loading ? 'blur' : ''}`}>
                    <form onSubmit={this.handleOnSubmit} className="form-group d-flex flex-column">
                        <input onChange={e => this.setState({username: e.target.value})} className="form-control mb-3" type="text" placeholder="שם משתמש"></input>
                        <input onChange={e => this.setState({password: e.target.value})} className="form-control" type="password" placeholder="סיסמה"></input>
                        <button onClick={this.login} type="button" className="btn btn-secondary mt-4">התחבר <FeatherIcon icon="arrow-left-circle"/></button>
                    </form>
                </div>
                {this.loadingSpinner()}
                {this.alertWrongCredentials()}
            </div>
        )
    }
}

export default Login;