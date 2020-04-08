import React, { Component } from 'react'
import FeatherIcon from 'feather-icons-react'
import axios from 'axios'
import Admin from './Admin'
import PetForm from './PetForm'

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
        }).catch(e => {
            console.log(e)
        }).finally(() => this.setState({loading: false}))
    }

    loading = () => {
        if (this.state.loading) return(
            <div className="loading d-flex justify-content-center flex-column align-items-center">
                <strong>טוען..</strong>
                <div className="spinner-border mb-2" role="status"/>
            </div>)
    }

    renderPage = () => {

        const page = this.state.page

        // Main menu
        if (page === 'menu'){
            return (
                <div className="main-container overflow-hidden">
                    <div className="inner-menu">
                        <button onClick={() => this.setState({page: 'form'})} type="button" className="btn btn-secondary m-3 p-2">רישום למאגר <FeatherIcon icon="edit"/></button>
                        <button onClick={() => this.setState({page: 'admin'})} type="button" className="btn btn-secondary m-3 p-2">כניסת עמותות <FeatherIcon icon="lock"/></button>
                    </div>
                </div>)
        }

        // Questionnaire / Thank-you page
        else if (page === 'form'){

            // Say thanks
            if (this.state.completedForm){
                return <div className="thank-you">
                    <div className="text-center px-4">
                        <h3 className="thank-you-text">תודה!</h3>
                        <div>
                            <h5 className="mb-2">אז מה עושים עכשיו?</h5>
                            <p>
                                <FeatherIcon icon="alert-circle" />&nbsp;
                                <a href="https://www.facebook.com/648407794/posts/10157770017417795" rel="noopener noreferrer" target="_blank">משתפים!</a><br/>
                                נשמח מאוד אם תשתפו את הפוסט עם חברים, בכדי שנוכל לעזור לכמה שיותר כלבים.
                            </p>
                            <p>
                                <FeatherIcon icon="alert-circle" />&nbsp;
                                <a href="https://www.facebook.com/648407794/posts/10157770017417795" rel="noopener noreferrer" target="_blank">מפעילים התראות!</a><br/>
                                בתגובות מתפרסמים בכל יום כלבים מעמותות שונות עם דרך ישירה ליצירת קשר.
                            </p>
                        </div>
                        <p className="mt-4">
                            מקווים שתמצאו בן משפחה חדש בקרוב!<br/>
                            <FeatherIcon className="heart mt-1" size="25" icon="heart" />
                        </p>
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

        // Admin panel
        else if (page === 'admin'){
            return <Admin/>
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