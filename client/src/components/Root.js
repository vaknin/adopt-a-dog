import React, { Component } from 'react';
import axios from 'axios';
import PetForm from './PetForm';
import FeatherIcon from 'feather-icons-react';

export class Root extends Component {

    state = {
        loading: false,
        completedForm: false,
        page: 'menu'
    };

    submit = async form => {

        // Start loading animation
        this.setState({loading: true})

        // Send the form details to the server
        await axios.post('/form', {form})
        .then(response => {

            // Notify that the form was successfully sent
            if (response.status === 200){
                this.setState({completedForm: true})
            }
        })
        .catch(e => {
            console.log(e)
        })
        .finally(() => this.setState({loading: false}))
    }

    loading = () => {
        if (this.state.loading) return(
            <div className="loading d-flex justify-content-center flex-column align-items-center">
                <strong>טוען..</strong>
                <div className="spinner-border mb-2" role="status"/>
            </div>)
    }

    renderFormOrCompletionMessage = () => {

        // Say thanks
        if (this.state.completedForm){
            return <div className="thank-you">
                <div className="text-center">
                    <h3>תודה!</h3>
                    <p>מקווים שתמצאו בן משפחה חדש בקרוב!</p>
                    <FeatherIcon icon="heart" />
                </div>
            </div>
        }

        // Render the questionnaire
        else return (
            <div>
                {this.loading()}
                <div className={`${this.state.loading ? 'blur' : ''}`}>
                    <PetForm submit={this.submit} />
                </div>
            </div>)
    }

    renderPage = () => {

        const page = this.state.page

        // Main menu
        if (page === 'menu'){
            return (
                <div className="menu">
                    <div className="inner-menu">
                        <button onClick={() => this.setState({page: 'form'})} type="button" className="btn btn-secondary m-3 p-2">רישום למאגר <FeatherIcon icon="edit"/></button>
                        <button onClick={() => this.setState({page: 'admin'})} type="button" className="btn btn-secondary m-3 p-2">כניסת עמותות <FeatherIcon icon="lock"/></button>
                    </div>
                </div>)
        }

        // Questionnaire
        else if (page === 'form'){
            return this.renderFormOrCompletionMessage()
        }

        // Admin panel
        else if (page === 'admin'){
            return <h3>עובדים כאן</h3>
        }
    }

    render = () => {
        return (
            <div className="rtl">
                {this.renderPage()}
            </div>
        )
    }
}

export default Root;