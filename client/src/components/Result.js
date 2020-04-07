import React, { Component } from 'react'
import FeatherIcon from 'feather-icons-react'

export class Result extends Component {

    getDate = originalDate => {
        const date = new Date(originalDate)
        return `${date.getDate()}/${date.getMonth()+1}/${date.getYear()-100}`
    }

    phoneButton = (number, isSecondary) => <FeatherIcon href={`tel:${number}`} fill={isSecondary ? '#c75b5b' : '#4279ff'} icon="phone-call" size="24" />

    render() {
        const date = this.getDate(this.props.data.date)
        const name = this.props.data.name
        const phone = this.props.data.phone
        const phone2 = this.props.data.phone2
        const city = this.props.data.city
        const timePeriod = this.props.data.timePeriod
        
        return (
            <div>

            <div className="result p-2">
                <p>{`${name} - ${timePeriod}`}  {this.phoneButton(phone)} {phone2 ? this.phoneButton(phone2, true) : null}</p>
            </div>
            <div className="result p-2">
            <p>{`${name} - ${timePeriod}`}  {this.phoneButton(phone)} {phone2 ? this.phoneButton(phone2, true) : null}</p>
        </div>
        <div className="result p-2">
        <p>{`${name} - ${timePeriod}`}  {this.phoneButton(phone)} {phone2 ? this.phoneButton(phone2, true) : null}</p>
    </div>
    <div className="result p-2">
    <p>{`${name} - ${timePeriod}`}  {this.phoneButton(phone)} {phone2 ? this.phoneButton(phone2, true) : null}</p>
</div>
            </div>
        )
    }
}

export default Result
