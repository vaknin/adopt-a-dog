import React, { Component } from 'react'
/*
name: "אביב"
phone: "0259252"
phone2: "0259252"
timePeriod: "אומנה"

    pets: (2) ["חתול", "אחר"]
    size: ["קטן"]
    dogAge: (4) ["לא משנה לי", "גור", "צעיר", "בוגר"]
    _id: "5e8c834d8072c533ecaba5e5"
    gender: "לא משנה לי"
    houseType: "דירה עם גג או חצר מתוחמים"
    residents: "יחיד"
    experience: "מנוסה"
    comments: "אין"
*/

export class ResultModal extends Component {

    parseDate = originalDate => {
        const date = new Date(originalDate)
        const newDate = `${date.getDate()}/${date.getMonth()+1}/${date.getFullYear()}`
        return newDate
    }

    render() {
        if (!this.props.data) return null

        const data = this.props.data
        console.log(data)

        return (
            <div className="modal fade" id="resultModal" tabIndex="-1" role="dialog" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered" role="document">
                    <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">{data.name}</h5>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="modal-body rtl">
                        <div>
                            <p>גיל: {data.age}</p>
                            <p>תאריך הצטרפות למאגר: {this.parseDate(data.date)}</p>
                            <p>אזור מגורים: {data.region}</p>
                            <p>עיר מגורים: {data.city}</p>
                            <p>סוג בקשה: {data.timePeriod}</p>
                            {data.comments ? <p>הערות: {data.comments}</p> : null}
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-dismiss="modal">סגור</button>
                        <button type="button" className="btn btn-success">אימץ!</button>
                    </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default ResultModal