import React, { Component } from 'react'
import Login from './Login'
import axios from 'axios'
import Search from './Search'

export class Admin extends Component {

    state = {
        loading: false,
        logged: false,
        dogAge: ["הכל"],
        size: ["הכל"],
        gender: ["הכל"],
        timePeriod: ["הכל"],
        region: ["הכל"],
        city: ["הכל"],
        houseType: ["הכל"],
        residents: ["הכל"],
        experience: ["הכל"],
        pets: ["הכל"]
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

        this.setState({loading: true})

        const username = this.state.username
        const password = this.state.password

        await axios.post('/search', {username, password, criteria})
        .then(response => {
            console.log(response.data)
        })
        .catch(e => {
            console.log(e)
        })
        .finally(() => this.setState({loading: false}))

    }

    // Loading animation
    loadingSpinner = () => {
        if (this.state.loading) return (
            <div className="loading d-flex justify-content-center flex-column align-items-center">
                <strong>טוען..</strong>
                <div className="spinner-border mb-2" role="status"/>
            </div>)
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

        else return <Search
                        formCount={this.state.formCount}
                        search={this.search}
                    />
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
