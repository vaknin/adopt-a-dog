import React, { Component } from 'react'

export class Result extends Component {

    getDate = originalDate => {
        const date = new Date(originalDate)
        return `${date.getDate()}/${date.getMonth()+1}/${date.getYear()-100}`
    }

    render() {
        const date = this.getDate(this.props.data.date)
        const name = this.props.data.name
        const phone = this.props.data.phone
        const phone2 = this.props.data.phone2
        const city = this.props.data.city
        const timePeriod = this.props.data.timePeriod
        
        return (
            <div>
            </div>
        )
    }
}

export default Result
