import React, { Component } from 'react'
import FeatherIcon from 'feather-icons-react'

export class Result extends Component {

    getDate = originalDate => {
        const date = new Date(originalDate)
        return `${date.getDate()}/${date.getMonth()+1}/${date.getYear()-100}`
    }

    phoneButton = (number, isSecondary) => {
        return (
            <a onClick={e => e.stopPropagation()} href={`tel:${number}`}>
                <FeatherIcon style={{strokeWidth: '0.8px'}} fill={isSecondary ? '#2b76af' : '#8895bf'} icon="phone-call" size="24"/>
            </a>
        )
    }

    render() {
        const date = this.getDate(this.props.data.date)
        const name = this.props.data.name
        const phone = this.props.data.phone
        const phone2 = this.props.data.phone2
        const city = this.props.data.city
        const timePeriod = this.props.data.timePeriod
        
        return (
            <div className="result p-2" onClick={this.props.expand}>
                <p>{`${name} - ${timePeriod}`}</p>
                <div className="phone-buttons">
                    {this.phoneButton(phone)} {phone2 ? this.phoneButton(phone2, true) : null}
                </div>
            </div>
        )
    }
}

export default Result
