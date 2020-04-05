import React, { Component } from 'react';
import axios from 'axios';
import PetForm from './PetForm';
import FeatherIcon from 'feather-icons-react';

export class Root extends Component {

    state = {
        loading: false,
        completedForm: false
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
                <div className="spinner-border mb-2" role="status"/>
                <strong>טוען..</strong>
            </div>)
    }

    renderFormOrCompletionMessage = () => {

        // Say thanks
        if (this.state.completedForm){
            return <div className="thank-you">
                <div className="text-center">
                    <h3>תודה!</h3>
                    <p>מקווים שתמצאו בן/בת משפחה חדש/ה בקרוב!</p>
                    <FeatherIcon icon="heart" />
                </div>
            </div>
        }

        // Render the questionnaire
        else return <div className={`${this.state.loading ? 'blur' : ''}`}>
            <button disabled type="button" className="btn btn-secondary m-1 p-1">כניסת עמותות <FeatherIcon icon="lock"/></button>
            <PetForm submit={this.submit} />
        </div>
    }

    render = () => {
        return (
            <div className="rtl">
                {this.loading()}
                {this.renderFormOrCompletionMessage()}
            </div>
        )
    }
}

export default Root;