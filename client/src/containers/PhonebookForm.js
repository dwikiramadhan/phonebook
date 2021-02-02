import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addData } from '../actions';

class PhonebookForm extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isVisibleAdd: 'card d-none',
            name: '',
            phone: ''
        }
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleClickAdd = this.handleClickAdd.bind(this)
    }
    handleInputChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            [name]: value,
        })
    }
    handleClickAdd() {
        this.setState({
            isVisibleAdd: 'card mb-3'
        })
    }
    handleClickSave = (event) => {
        if (this.state.name && this.state.phone) {
            this.props.addData(this.state.name, this.state.phone)
            this.setState({ name: '', phone: '' })
        }
        event.preventDefault();
    }

    render() {
        return (
            <div>
                <button onClick={() => this.handleClickAdd()} className="btn btn-info mb-3 "><i className="fa fa-plus"></i> add</button>
                <div className={this.state.isVisibleAdd}>
                    <div className="card-header">
                        Adding Form
                    </div>
                    <div className="card-body">
                        <form className="row" onClick={this.handleClickSave}>
                            <div className="col-sm-3 d-flex">
                                <label className="col-form-label mr-2">Name</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="name"
                                    aria-label="Name"
                                    name="name"
                                    value={this.state.name}
                                    onChange={this.handleInputChange} />
                            </div>
                            <div className="col-sm-4 d-flex">
                                <label className="col-form-label mr-2">Phone</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="phone"
                                    aria-label="Phone"
                                    name="phone"
                                    value={this.state.phone}
                                    onChange={this.handleInputChange} />
                            </div>
                            <button type="submit" className="btn btn-outline-success mr-2"><i className="fa fa-check-circle-o"></i> save</button>
                            <button type="button" className="btn btn-outline-warning"><i className="fa fa-ban"></i> cancel</button>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}

const mapDispatchToProps = dispatch => ({
    addData: (name, phone) => dispatch(addData(name, phone)),
})

export default connect(
    null,
    mapDispatchToProps
)(PhonebookForm)