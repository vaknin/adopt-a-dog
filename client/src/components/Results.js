import React, { Component } from 'react'
import FeatherIcon from 'feather-icons-react'
import ResultModal from './ResultModal'
import $ from 'jquery'

export class Results extends Component {

    state = {}

    openModal = data => {
        this.setState({modalData: data}, () => {
            $('#resultModal').modal('show')
        })
    }

    render() {

        return (
            <div className="results-outer-container">
                <div className="back-button-container">
                    <h5 className="my-3 mx-3">{`נמצאו ${this.props.data.length} טפסים העונים לדרישות החיפוש`}</h5>
                    <FeatherIcon size="35" className="mx-3" color="#171717" onClick={this.props.reset} icon="arrow-left" />
                </div>

                <div className="results-container">
                    <ResultModal
                        data={this.state.modalData}
                        markAdpoted={() => this.props.markAdpoted(this.state.modalData._id)}
                        delete={() => this.props.delete(this.state.modalData._id)}
                    />
                    {this.props.data.map(data =>
                        <div className="result p-2" key={data._id} onClick={() => this.openModal(data)}>
                            <p>{data.name}</p>
                        </div>)
                    }
                </div>
            </div>
        )
    }
}

export default Results