import Swal from 'sweetalert2';

const phonebook = (state = { items: [], count: 0 }, action) => {
    switch (action.type) {
        case 'ADD_DATA':
            return {
                ...state,
                items: [
                    {
                        id: action.id,
                        name: action.name,
                        phone: action.phone
                    },
                    ...state.items
                ]
            }

        case 'ADD_DATA_SUCCESS':
            const data = state.items.map(item => {
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

            return { ...state, items: data }

        case 'ADD_DATA_FAILURE':
            // console.log('datfail', state.items)
            const dataFail = state.items.map((item) => {
                if (item.id === action.id) {
                    item.sent = false
                }
                return item
            });
            return { ...state, items: dataFail }

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
            // console.log('testInReduc', action.items)
            const items = action.items.map((item) => {
                item.sent = true;
                return item
            })
            // console.log('testItemsRedux', items)
            return { items, count: action.count }

        case 'LOAD_DATA_FAILURE':
            return state;

        case 'UPDATE_DATA':
            const dataUpdate = state.items.map(item => {
                if (item.id === action.id) {
                    return (
                        {
                            id: action.id,
                            name: action.name,
                            phone: action.phone,
                            sent: true
                        }
                    )
                }
                return item
            })
            return { ...state, items: dataUpdate }

        case 'DELETE_DATA':
            const dataDelete = state.items.filter(item => item.id !== action.id)
            return { ...state, items: dataDelete }
        // state.filter(item => item.id !== action.id)

        case 'DElETE_DATA_SUCCESS':
            return state;

        case 'DElETE_DATA_FAILURE':
            return state;

        default:
            return state;
    }
}

export default phonebook;