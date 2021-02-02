import React, { Component } from 'react';
import PhonebookItem from './PhonebookItem';
import { connect } from 'react-redux';
import { loadData } from '../actions';

class PhonebookList extends Component {
    componentDidMount() {
        this.props.loadData();
    }
    render() {
        let dataFiltered = this.props.data;
        if (this.props.searchName && this.props.searchPhone) {
            dataFiltered = this.props.data.filter(item =>
                item.name.toLowerCase() === this.props.searchName.toLowerCase() && item.phone === this.props.searchPhone
            )
        }else if(this.props.searchName){
            dataFiltered = this.props.data.filter(item =>
                item.name.toLowerCase() === this.props.searchName.toLowerCase()
            )
        }else if(this.props.searchPhone){
            dataFiltered = this.props.data.filter(item => 
                Number(item.phone) === Number(this.props.searchPhone)
            )
        }

        const dataNode = dataFiltered.map((item, index) =>
            <PhonebookItem
                key={index}
                id={item._id}
                no={index + 1}
                name={item.name}
                phone={item.phone}
                sent={item.sent}
            />
        )

        return (
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Name</th>
                        <th scope="col">Phone</th>
                        <th scope="col">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {dataNode}
                </tbody>
            </table>
        )
    }
}

const mapStateToProps = (state) => ({
    data: state.phonebook
})

const mapDispatchToProps = (dispatch) => ({
    loadData: () => dispatch(loadData())
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(PhonebookList)