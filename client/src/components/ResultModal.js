import React, { Component } from 'react'
/*
    phone: "0259252"
    phone2: "0259252"
    _id: "5e8c834d8072c533ecaba5e5"
*/

export class ResultModal extends Component {

    parseDate = original => {
        const date = new Date(original)
        const newDate = `${date.getDate()}/${date.getMonth()+1}/${date.getFullYear()}`
        return newDate
    }

    ArrayToString = array => {

        // No preference
        if (array.includes('לא משנה לי')) return 'אין העדפה מיוחדת'

        else if (array.includes('אין')) return 'אין'

        // One preference
        else if (array.length === 1) return array[0]

        // Two preferences
        else if (array.length === 2) return `${array[0]} ו${array[1]}`

        // More than two preferences
        else{
            let string = ''
            for (let i = 0; i < array.length; i++) {
                if (i === array.length - 1) string += `ו${array[i]}`
                else if (i === array.length - 2) string += `${array[i]} `
                else string += `${array[i]}, `
            }
            return string
        }
    }

    // Render a whatsapp/phonecall dropdown button
    renderPhoneDropdown = type => {
        const number1 = this.props.data.phone
        const number2 = this.props.data.phone2

        return (
            <div className="btn-group" role="group">
                <button type="button" className={`btn btn-${type === 'phonecall' ? 'success' : 'success'} dropdown-toggle`} data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    {type === 'phonecall' ? 'שיחה' : 'וואטסאפ'}
                </button>
                <div className="dropdown-menu">
                    <a
                        href={type === 'whatsapp' ? `https://web.whatsapp.com/send?phone=+972${number1}` : `tel:${number1}`}
                        rel="noopener noreferrer"
                        target="_blank"
                        className="dropdown-item"
                    >
                        טלפון ראשי
                    </a>
                    {
                        number2 ?
                        <a
                            href={type === 'whatsapp' ? `https://web.whatsapp.com/send?phone=+972${number2}` : `tel:${number2}`}
                            rel="noopener noreferrer"
                            target="_blank"
                            className="dropdown-item"
                        >
                            טלפון משני
                        </a>
                        :
                        null
                    }
                </div>
            </div>
        )
    }

    render() {
        // No data render
        if (!this.props.data) return null

        const data = this.props.data

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
                            <p className="modal-description">תאריך הצטרפות למאגר: {this.parseDate(data.date)}</p>
                            <p className="modal-description">אזור מגורים: {data.region}</p>
                            <p className="modal-description">עיר מגורים: {data.city}</p>
                            <p className="modal-description">גיל: {data.age}</p>
                            <p className="modal-description">סוג בקשה: {data.timePeriod}</p>
                            <p className="modal-description">מין רצוי: {data.gender}</p>
                            <p className="modal-description">גיל רצוי: {this.ArrayToString(data.dogAge)}</p>
                            <p className="modal-description">גודל רצוי: {this.ArrayToString(data.size)}</p>
                            <p className="modal-description">נסיון עם כלבים: {data.experience}</p>
                            <p className="modal-description">סוג בית: {data.houseType}</p>
                            <p className="modal-description">סוג דיירים: {data.residents}</p>
                            <p className="modal-description">חיות נוספות בבית: {this.ArrayToString(data.pets)}</p>
                            {data.comments ? <p className="modal-description">הערות: {data.comments}</p> : null}
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-dismiss="modal">סגור</button>
                        {this.renderPhoneDropdown('phonecall')}
                        {this.renderPhoneDropdown('whatsapp')}
                        <button onClick={this.props.delete} type="button" className="btn btn-danger">הסרה</button>
                        <button onClick={this.props.markAdpoted} type="button" className="btn btn-primary">אימץ!</button>
                    </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default ResultModal