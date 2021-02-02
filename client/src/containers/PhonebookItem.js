import React, { Component } from 'react';
import { updateData, deleteData, resendData } from '../actions';
import { connect } from 'react-redux';
import Swal from 'sweetalert2';

class PhonebookItem extends Component {
    constructor(props) {
        super(props)
        this.state = {
            name: this.props.name || '',
            phone: this.props.phone || '',
            isEdit: false,
        }
    }

    editBtnClicked = () => {
        this.setState({
            isEdit: true
        })
    }

    handleInputChange = (event) => {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    }

    handleUpdate = () => {
        this.props.updateData(this.props.id, this.state.name, this.state.phone)
        this.setState({
            isEdit: false
        })
    }

    handleResend = () => {
        this.props.resendData(this.props.id, this.state.name, this.state.phone)
    }

    handleDelete = () => {
        Swal.fire({
            title: 'Are you sure?',
            text: "Anda tidak akan dapat mengembalikan ini!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                this.props.deleteData(this.props.id)
                Swal.fire(
                    'Deleted!',
                    'Your file has been deleted.',
                    'success'
                )
            }
        })

    }

    render() {
        if (this.state.isEdit) {
            return (
                <tr>
                    <th scope="row">{this.props.no}</th>
                    <td>
                        <input type="text" value={this.state.name} onChange={this.handleInputChange} name="name" className="form-control" />
                    </td>
                    <td>
                        <input type="text" value={this.state.phone} onChange={this.handleInputChange} name="phone" className="form-control" />
                    </td>

                    <td>
                        <button onClick={this.handleUpdate} className={"btn btn-success mr-2 "}><i className="fa fa-save"></i> save</button>
                    </td>
                </tr>
            )
        } else {
            return (
                <tr className={this.props.sent ? "" : "bg-danger text-white"}>
                    <th scope="row">{this.props.no}</th>
                    <td>{this.state.name}</td>
                    <td>{this.state.phone}</td>
                    <td>
                        <button onClick={this.editBtnClicked} className={this.props.sent ? "btn btn-success mr-2" : "d-none"}><i className="fa fa-edit"></i> edit </button>
                        <button onClick={ this.props.sent ? this.handleDelete : this.handleResend} className={this.props.sent ? 'btn btn-danger' : 'btn btn-warning'}><i className={this.props.sent ? "fa fa-trash" : "fa fa-refresh"}></i> { this.props.sent ? 'delete' : 'Resend' }</button>
                    </td>
                </tr>
            )
        }
    }
}

const mapDispatchToProps = (dispatch) => ({
    updateData: (id, name, phone) => dispatch(updateData(id, name, phone)),
    deleteData: (id) => dispatch(deleteData(id)),
    resendData: (id, name, phone) => dispatch(resendData(id, name, phone)),
})

export default connect(
    null,
    mapDispatchToProps
)(PhonebookItem)