import React, { Component } from 'react'
import Login from './Login'
import axios from 'axios'

export class Admin extends Component {

    state = {
        logged: false,
    }

    // Attempt to log in
    login = (username, password) => {

        return new Promise(async resolve => {

            // Send the form details to the server
            await axios.post('/login', {username, password})
            .then(response => {

                // Logged in
                if (response.data === true){
                    this.setState({logged: true, username, password})
                }
    
                // Incorrect credentials
                else resolve(false)
            })
            .catch(e => {
                console.log(e)
            })
        })
    }

    renderPage = () => {

        // Check if logged in
        if (!this.state.logged){
            return <Login
                        login={this.login}
                   />
        }
    }

    render() {
        return (
            <div>
                {this.renderPage()}
            </div>
        )
    }
}

export default Admin
