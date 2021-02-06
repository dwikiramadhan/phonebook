import React, { Component } from 'react';
import PhonebookItem from './PhonebookItem';
import { connect } from 'react-redux';
import { loadData } from '../actions';

class PhonebookList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            currentPage: 1,
            limit: 3,
            searchName: '',
            searchPhone: ''
        }
    }

    componentDidMount() {
        this.props.loadData(this.state.currentPage, this.state.limit, this.state.searchName, this.state.searchPhone);
    }

    onSearchName = (event) => {
        this.setState({
            searchName: event.target.value
        })
        const searchName = event.target.value;
        this.props.loadData(this.state.currentPage, this.state.limit, searchName, this.state.searchPhone);
    }

    onSearchPhone = (event) => {
        this.setState({
            searchPhone: event.target.value
        })
        const searchPhone = event.target.value;
        this.props.loadData(this.state.currentPage, this.state.limit, this.state.searchName, searchPhone);
    }

    handlePreviousPage = (event) => {
        this.setState({
            currentPage: this.state.currentPage - 1
        })
        const previousPage = this.state.currentPage - 1
        this.props.loadData(previousPage, this.state.limit, this.state.searchName, this.state.searchPhone);
        event.preventDefault();
    }

    handleNextPage = (event) => {
        this.setState((state) => ({
            currentPage: state.currentPage + 1
        }))
        const nextPage = this.state.currentPage + 1
        this.props.loadData(nextPage, this.state.limit, this.state.searchName, this.state.searchPhone);
        event.preventDefault();
    }

    handleSelectPage = (event) => {
        const page = event.target.getAttribute('data');
        this.setState({
            currentPage: Number(page)
        })
        this.props.loadData(page, this.state.limit, this.state.searchName, this.state.searchPhone);
        event.preventDefault();
    }

    render() {

        let dataFiltered = this.props.data.items;
        const dataNode = dataFiltered.map((item, index) =>
            <PhonebookItem
                key={index}
                id={item.id}
                no={(this.state.currentPage - 1) * this.state.limit + (index+1)}
                name={item.name}
                phone={item.phone}
                sent={item.sent}
            />
        )

        const totalPage = Math.ceil(this.props.data.count / this.state.limit);
        // console.log('totalPage', totalPage)
        const page = []
        for (let i = 1; i <= totalPage; i++) {
            page.push(
                <li className={this.state.currentPage === i ? "page-item active" : "page-item"} key={i}>
                    <button className="page-link" onClick={this.handleSelectPage} data={i}>{i}</button>
                </li>
            )

        }

        return (
            <div>
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
                                    value={this.state.searchName}
                                    onChange={this.onSearchName} />
                            </div>
                            <div className="col-sm-4 d-flex">
                                <label className="col-form-label mr-2">Phone</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="phone"
                                    aria-label="Phone"
                                    name="phone"
                                    value={this.state.searchPhone}
                                    onChange={this.onSearchPhone} />
                            </div>
                        </form>
                    </div>
                </div>
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
                <nav aria-label="...">
                    <ul className="pagination">
                        <li className={this.state.currentPage === 1 ? "page-item disabled" : "page-item"}>
                            <button className="page-link" onClick={this.handlePreviousPage} tabIndex="-1">Previous</button>
                        </li>
                        {page}
                        <li className={this.state.currentPage === totalPage ? "page-item disabled" : "page-item"}>
                            <button className="page-link" onClick={this.handleNextPage} >Next</button>
                        </li>
                    </ul>
                </nav>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    data: state.phonebook
})

const mapDispatchToProps = (dispatch) => ({
    loadData: (curpage, limit, searchName, searchPhone) => dispatch(loadData(curpage, limit, searchName, searchPhone))
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(PhonebookList)