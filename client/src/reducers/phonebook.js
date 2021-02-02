import Swal from 'sweetalert2';

const phonebook = (state = [], action) => {
    switch (action.type) {
        case 'ADD_DATA':
            return [
                ...state,
                {
                    id: action.id,
                    name: action.name,
                    phone: action.phone
                }
            ]

        case 'ADD_DATA_SUCCESS':
            return state.map(item => {
                // return console.log(item)
                Swal.fire({
                    icon: 'success',
                    title: 'Contact has been Add!',
                    text: ''
                }).then(function () {
                    // history.push('/home')
                });
                item.sent = true
                return item
            });

        case 'ADD_DATA_FAILURE':
            return state.map((item) => {
                if (item.id === action.id) {
                    item.sent = false
                }
                return item
            });

        case 'ADD_DATA_EXISTS':
            return state.map(item => {
                // return console.log(item)
                Swal.fire({
                    icon: 'error',
                    title: 'Contact is already exists!',
                    text: ''
                }).then(function () {
                    // history.push('/home')
                });
                return item
            });

        case 'LOAD_DATA_SUCCESS':
            return action.data.data.map((item) => {
                item.sent = true;
                return item
            })

        case 'LOAD_DATA_FAILURE':
            return state;

        case 'DELETE_DATA':
            return state.filter(item => item._id !== action.id)

        case 'DElETE_DATA_SUCCESS':
            return state;

        case 'DElETE_DATA_FAILURE':
            return state;

        default:
            return state;
    }
}

export default phonebook;