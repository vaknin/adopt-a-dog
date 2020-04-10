import React, { Component } from 'react'
import cities from './cities-list'
import $ from 'jquery'
import FeatherIcon from 'feather-icons-react'

export class Search extends Component {

    state = {
        name: "הכל",
        comments: "הכל",
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

    changeField = e => {
        const field = e.target.name
        if (e.target.value !== "") this.setState({[field]: e.target.value})
        else this.setState({[field]: "הכל"})
    }

    render() {
        return (
            <div className="admin-container">

                {/* Header */}
                <h5 className="mb-4">טפסים במערכת: {this.props.formCount}</h5>

                {/* Dog related filters 1*/}
                <div className="filters">

                    {/* Dog's age */}
                    <div className="form-group admin-filter">
                        <label>גיל הכלב</label>
                        <select value={this.state.dogAge} multiple onChange={e => this.setState({dogAge: $(e.target).val()})} className="form-control-sm form-control">
                            <option>הכל</option>
                            <option value="גור">גור</option>
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

                {/* Person/Logistics related filters*/}
                <div className="filters">

                    {/* Experience with dogs */}
                    <div className="form-group admin-filter">
                        <label>נסיון עם כלבים</label>
                        <select defaultValue={["הכל"]} multiple onChange={e => this.setState({experience: $(e.target).val()})} className="form-control-sm form-control">
                            <option>הכל</option>
                            <option>מנוסה והיה לי כלב</option>
                            <option>מנוסה ולא היה לי כלב</option>
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
                            <option>אין</option>
                            <option>אחר</option>
                        </select>
                    </div>

                </div>
                
                {/* Person's name */}
                <div className="filters">

                    <div className="form-group admin-filter">
                        <label>שם איש הקשר</label>
                        <input name="name" onChange={this.changeField} type="text" className="form-control-sm form-control" placeholder="השאירו ריק בשביל כולם" />
                    </div>
                </div>

                {/* Comments */}
                <div className="filters">

                    <div className="form-group admin-filter">
                        <label>הערות או בקשות</label>
                        <input name="comments" onChange={this.changeField} type="text" className="form-control-sm form-control" placeholder="השאירו ריק בשביל הכל" />
                    </div>
                </div>

                <button onClick={() => this.props.search(this.state)} type="button" className="btn btn-secondary mt-4 mb-3">
                    <FeatherIcon icon="search" />
                </button>
            </div>
        )
    }
}

export default Search