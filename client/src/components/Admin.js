import React, { Component } from 'react'
import FeatherIcon from 'feather-icons-react'
import Login from './Login'
import axios from 'axios'
import cities from './cities-list'
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

                {/* Dog related filters 1*/}
                <div className="filters">

                    {/* Dog's age */}
                    <div className="form-group admin-filter">
                        <label>גיל הכלב</label>
                        <select defaultValue={["הכל"]} multiple onChange={e => this.setState({dogAge: $(e.target).val()})} className="form-control-sm form-control">
                            <option>הכל</option>
                            <option>גור</option>
                            <option>צעיר</option>
                            <option>בוגר</option>
                            <option>מבוגר</option>
                        </select>
                    </div>

                    {/* Dog's size */}
                    <div className="form-group admin-filter">
                        <label>גודל הכלב</label>
                        <select defaultValue={["הכל"]} multiple onChange={e => this.setState({size: $(e.target).val()})} className="form-control-sm form-control">
                            <option>הכל</option>
                            <option>קטן</option>
                            <option>בינוני</option>
                            <option>גדול</option>
                        </select>
                    </div>

                </div>

                {/* Dog related filters 2*/}
                <div className="filters">

                    {/* Dog's gender */}
                    <div className="form-group admin-filter">
                        <label>מין הכלב</label>
                        <select defaultValue={["הכל"]} multiple onChange={e => this.setState({gender: $(e.target).val()})} className="form-control-sm form-control">
                            <option>הכל</option>
                            <option>זכר</option>
                            <option>נקבה</option>
                        </select>
                    </div>

                    {/* Adoption time period */}
                    <div className="form-group admin-filter">
                        <label>סוג אימוץ</label>
                        <select defaultValue={["הכל"]} multiple onChange={e => this.setState({timePeriod: $(e.target).val()})} className="form-control-sm form-control">
                            <option>הכל</option>
                            <option>אומנה</option>
                            <option>אימוץ</option>
                            <option>אומנה, עם אפשרות לאמץ</option>
                        </select>
                    </div>

                </div>

                {/* Location filters*/}
                <div className="filters">

                    {/* Region */}
                    <div className="form-group admin-filter">
                        <label>איזור מגורים</label>
                        <select defaultValue={["הכל"]} multiple onChange={e => this.setState({region: $(e.target).val()})} className="form-control-sm form-control">
                            <option>הכל</option>
                            <option>מרכז</option>
                            <option>צפון</option>
                            <option>דרום</option>
                            <option>יהודה ושומרון</option>
                        </select>
                    </div>

                    {/* City */}
                    <div className="form-group admin-filter">
                        <label>עיר מגורים</label>
                        <select defaultValue={["הכל"]} multiple onChange={e => this.setState({city: $(e.target).val()})} className="form-control-sm form-control">
                            <option>הכל</option>
                            {cities.map(city => <option key={city}>{city}</option>)}
                        </select>
                    </div>

                </div>

                {/* Location filters*/}
                <div className="filters">

                    {/* Type of house */}
                    <div className="form-group admin-filter">
                        <label>סוג דירה</label>
                        <select defaultValue={["הכל"]} multiple onChange={e => this.setState({houseType: $(e.target).val()})} className="form-control-sm form-control">
                            <option>הכל</option>
                            <option>דירה עם גג או חצר מתוחמים</option>
                            <option>דירה עם גג או חצר לא מתוחמים</option>
                            <option>דירה ללא גג או חצר</option>
                        </select>
                    </div>
                    
                    {/* Who's living in the house? */}
                    <div className="form-group admin-filter">
                        <label>מי חי בבית?</label>
                        <select defaultValue={["הכל"]} multiple onChange={e => this.setState({residents: $(e.target).val()})} className="form-control-sm form-control">
                            <option>הכל</option>
                            <option>יחיד</option>
                            <option>זוג</option>
                            <option>שותפים</option>
                            <option>משפחה עם ילדים מעל לגיל 5</option>
                            <option>משפחה עם ילדים מתחת לגיל 5</option>
                        </select>
                    </div>
                </div>

                {/* Person/Logistics related filters 2*/}
                <div className="filters">

                    {/* Experience with dogs */}
                    <div className="form-group admin-filter">
                        <label>נסיון עם כלבים</label>
                        <select defaultValue={["הכל"]} multiple onChange={e => this.setState({experience: $(e.target).val()})} className="form-control-sm form-control">
                            <option>הכל</option>
                            <option>מנוסה</option>
                            <option>לא מנוסה</option>
                        </select>
                    </div>

                    {/* Other pets */}
                    <div className="form-group admin-filter">
                        <label>חיות נוספות בבית</label>
                        <select defaultValue={["הכל"]} multiple onChange={e => this.setState({pets: $(e.target).val()})} className="form-control-sm form-control">
                            <option>הכל</option>
                            <option>כלב</option>
                            <option>חתול</option>
                            <option>אחר</option>
                        </select>
                    </div>

                </div>

                <button type="button" className="btn btn-secondary mt-4 mb-3">
                    <FeatherIcon icon="search" />
                </button>
            </div>
        )
    }
}

export default Admin
