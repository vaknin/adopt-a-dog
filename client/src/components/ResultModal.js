import React, { Component } from 'react'
import URLencoder from 'encodeurl'

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

    createWhatsappMessage = () => {
        const data = this.props.data
        const number1 = this.props.data.phone
        const number2 = this.props.data.phone2

        let string = `שם: ${data.name}\n`
        string += `תאריך הצטרפות למאגר: ${this.parseDate(data.date)}\n`
        string += `איזור מגורים: ${data.region}\n`
        string += `עיר מגורים: ${data.city}\n`
        string += `גיל: ${data.age}\n`
        string += `סוג בקשה: ${data.timePeriod}\n`
        string += `מין רצוי: ${data.gender}\n`
        string += `גיל רצוי: ${this.ArrayToString(data.dogAge)}\n`
        string += `גודל רצוי: ${this.ArrayToString(data.size)}\n`
        string += `סוג בית: ${data.houseType}\n`
        string += `סוג דיירים: ${data.residents}\n`
        string += `חיות נוספות בבית: ${this.ArrayToString(data.pets)}\n`
        string += data.comments ? `הערות או בקשות: ${data.comments}\n` : ''
        string += `טלפון ראשי: ${number1}`
        string += number2 ? `\nטלפון משני: ${number2}` : ''

        // URL encode the string and return
        return URLencoder(string)
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
                        rel="noopener noreferrer" target="_blank"
                        href={type === 'whatsapp' ? `https://api.whatsapp.com/send?phone=+972${number1}` : `tel:${number1}`}
                        className="dropdown-item"
                    >
                        טלפון ראשי
                    </a>
                    {
                        number2 ?
                        <a
                            rel="noopener noreferrer" target="_blank"
                            href={type === 'whatsapp' ? `https://api.whatsapp.com/send?phone=+972${number2}` : `tel:${number2}`}
                            className="dropdown-item"
                        >
                            טלפון משני
                        </a>
                        :
                        null
                    }
                    {
                        type === 'whatsapp'
                        ?
                        <a
                        rel="noopener noreferrer" target="_blank"
                        href={`https://wa.me/9720522333013/?text=${this.createWhatsappMessage()}`}
                        className="dropdown-item"
                        >
                            ייצוא לוואטסאפ
                        </a>
                        :
                        null
                    }
                </div>
            </div>
        )
    }

    // Render a whatsapp/phonecall dropdown button
    renderEditDropdown = () => {
        return (
            <div className="btn-group" role="group">
                <button type="button" className='btn btn-dark dropdown-toggle' data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    עדכון
                </button>
                <div className="dropdown-menu">
                    <button className="dropdown-item" onClick={() => this.props.hide('adoption')}>
                        אימץ
                    </button>
                    <button className="dropdown-item" onClick={() => this.props.hide('deletion')}>
                        הסרה
                    </button>
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
                <div className="modal-dialog" role="document">
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
                            <p className="modal-description">ניידות (רכב): {data.mobility}</p>
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
                        {this.renderEditDropdown()}
                    </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default ResultModal