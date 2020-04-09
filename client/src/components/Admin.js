import React, { Component } from 'react'
import Login from './Login'
import axios from 'axios'
import Search from './Search'
import Results from './Results'

export class Admin extends Component {

    state = {
        loading: false,
        logged: false
    }

    // Attempt to log in
    login = (username, password) => {
        return new Promise(async resolve => {

            this.setState({loading: true})
            
            // Attempt to log in
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
            .finally(() => this.setState({loading: false}))
        })
    }

    // Search forms by criteria
    search = async criteria => {

        // Start loading animation
        this.setState({loading: true, criteria})

        // Send user & pass for validation
        const username = this.state.username
        const password = this.state.password

        await axios.post('/search', {username, password, criteria})
        .then(response => {
            this.setState({results: response.data.results})
        })
        .catch(e => {
            console.log(e)
        })
        .finally(() => this.setState({loading: false}))
    }

    // Hide the form (reason is either 'adopted' or 'deleted')
    hide = async (id, reason) => {

        // Start loading animation
        this.setState({loading: true})

        // Send user & pass for validation
        const username = this.state.username
        const password = this.state.password
        const criteria = this.state.criteria

        await axios.post('/hide', {username, password, id, reason, criteria})
        .then(response => {
            this.setState({results: response.data.results})
        })
        .catch(e => {
            console.log(e)
        })
        .finally(() => this.setState({loading: false}))
    }

    // Go back to the search screen
    reset = () => {
        this.setState({results: undefined})
    }

    // Loading animation
    loadingSpinner = () => {
        if (this.state.loading){
            return (
                <div className="loading d-flex justify-content-center flex-column align-items-center">
                    <strong>טוען..</strong>
                    <div className="spinner-border mb-2" role="status"/>
                </div>)
        }
    }

    // Dynmically render the page based on states
    renderPage = () => {

        // Needs to log in
        if (!this.state.logged){
            return (
                <Login
                    login={this.login}
                />
            )
        }

        // Display results
        else if (this.state.results){
            return (
                <Results
                    data={this.state.results}
                    reset={this.reset}
                    hide={this.hide}
                />
            )
        }

        // Search forms
        else return (
            <Search
                criteria={this.state.criteria}
                formCount={this.state.formCount}
                search={this.search}
            />
        )
    }

    render() {

        // Render admin panel
        return (
            <div>
                <div className={`${this.state.loading ? 'blur' : ''}`}>
                    {this.renderPage()}
                </div>
                {this.loadingSpinner()}
            </div>
        )
    }
}

export default Admin
