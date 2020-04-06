import React, { Component } from 'react'
import FeatherIcon from 'feather-icons-react'
import Login from './Login'
import axios from 'axios'
import $ from 'jquery'

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
                if (response.data.logged){
                    this.setState({logged: true, formCount: response.data.formCount, username, password})
                }
    
                // Incorrect credentials
                else resolve(false)
            })
            .catch(e => {
                console.log(e)
            })
        })
    }

    render() {

        // Needs to log in
        if (!this.state.logged){
            return (
                <Login
                    login={this.login}
                />
            )
        }

        // Render admin panel
        return (
            <div className="admin-container">
                <h5 className="mb-4">טפסים במערכת: {this.state.formCount}</h5>

                {/* Dog's age */}
                <div className="form-group text-center">
                    <label>גיל הכלב</label>
                    <select multiple onChange={e => this.setState({dogAge: $(e.target).val()})} className="form-control-sm form-control">
                        <option>לא משנה</option>
                        <option>גור</option>
                        <option>צעיר</option>
                        <option>בוגר</option>
                        <option>מבוגר</option>
                    </select>
                </div>

                {/* Dog's size */}
                <div className="form-group text-center">
                    <label>גודל הכלב</label>
                    <select multiple onChange={e => this.setState({size: $(e.target).val()})} className="form-control-sm form-control">
                        <option>לא משנה</option>
                        <option>קטן</option>
                        <option>בינוני</option>
                        <option>גדול</option>
                    </select>
                </div>

                {/* Submit Form */}
                <button type="button" className="btn btn-secondary mt-2 mb-3">
                    <FeatherIcon icon="search" />
                </button>
            </div>
        )
    }
}

export default Admin
