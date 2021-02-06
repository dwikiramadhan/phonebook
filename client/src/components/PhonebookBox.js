import React, { Component } from 'react';

import PhonebookForm from '../containers/PhonebookForm';
// import PhonebookSearch from '../containers/PhonebookSearch';
import PhonebookList from '../containers/PhonebookList';

export default class PhonebookBox extends Component {
    // constructor(props) {
    //     super(props)
    //     this.state = {
    //         searchName: '',
    //         searchPhone: ''
    //     }
    // }

    // onSearchName = (event) => {
    //     this.setState({
    //         searchName: event.target.value
    //     })
    // }

    // onSearchPhone = (event) => {
    //     this.setState({
    //         searchPhone: event.target.value
    //     })
    // }

    render() {
        return (
            <div className="container">
                <div className="alert alert-success mt-3" role="alert">
                    <h1 className="text-center">Phone Book Apps</h1>
                </div>
                <PhonebookForm />
                <PhonebookList/>
            </div>
        )
    }
}