import React, { Component } from 'react';

export default class PhonebookSearch extends Component {
    constructor(props) {
        super(props);
        this.handleInputChange = this.handleInputChange.bind(this);
    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            [name]: value,
        })
    }

    render() {
        return (
            <div className="card mb-4">
                <div className="card-header">
                    Search Form
                </div>
                <div className="card-body">
                    <form className="row">
                        <div className="col-sm-3 d-flex">
                            <label className="col-form-label mr-2">Name</label>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="name"
                                aria-label="Name"
                                name="name"
                                value={this.props.searchName}
                                onChange={this.props.onSearchName} />
                        </div>
                        <div className="col-sm-4 d-flex">
                            <label className="col-form-label mr-2">Phone</label>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="phone"
                                aria-label="Phone"
                                name="phone"
                                value={this.props.searchPhone}
                                onChange={this.props.onSearchPhone} />
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}