import React, { Component } from 'react'
import FeatherIcon from 'feather-icons-react'
import Result from './Result'

export class Results extends Component {

    /*
    name: "אביב"
    phone: "0259252"
    phone2: "0259252"
    timePeriod: "אומנה"
    date: "2020-04-07T13:42:37.082Z"
    city: "תל אביב - יפו"

        pets: (2) ["חתול", "אחר"]
        size: ["קטן"]
        dogAge: (4) ["לא משנה לי", "גור", "צעיר", "בוגר"]
        _id: "5e8c834d8072c533ecaba5e5"
        gender: "לא משנה לי"
        age: "23"
        region: "מרכז"
        houseType: "דירה עם גג או חצר מתוחמים"
        residents: "יחיד"
        experience: "מנוסה"
        comments: "אין"
        adopted: false
    */

    render() {

        return (
            <div style={{justifyContent: 'flex-start'}} className="main-container">
                <div className="back-button-container">
                    <h5 className="my-3 mx-3">{`נמצאו ${this.props.data.length} טפסים העונים לדרישות החיפוש`}</h5>
                    <FeatherIcon size="35" className="mx-3" color="#171717" onClick={this.props.reset} icon="arrow-left" />
                </div>

                <div className="results-container">
                    {this.props.data.map(form => {
                        return (
                            <Result
                                key={form._id}
                                data={form}
                            />
                        )
                    })}
                </div>

            </div>
        )
    }
}

export default Results