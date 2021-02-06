const { GraphQLObjectType, GraphQLList } = require('graphql');
const services = require('../../services');
const contactType = require('../types/phonebook');
const PaginationArgType = require('../types/paginationParam');
const PaginatedListType = require('../types/paginationOutput');
const firebase = require("firebase");

// Query
const ContactQueryType = {
    phonebooks: {
        type: PaginatedListType(contactType),
        args: {
            pagination: {
                type: PaginationArgType,
                defaultValue: { offset: 0, limit: 2, searchName: '', searchPhone: '' }
            },
        },
        resolve: (_, args) => {
            const { offset, limit, searchName, searchPhone } = args.pagination;
            console.log(args.pagination)
            return {
                items: services.getContacts(offset, limit, searchName, searchPhone),
                count: services.totalData(searchName, searchPhone)
            }
        },
    }
}

module.exports = ContactQueryType

// exports.queryType = new GraphQLObjectType({
//     name: 'Query',
//     fields: function () {
//         return {
//             phonebooks: {
//                 type: new GraphQLList(contactType),
//                 resolve: services.getContacts
//             }
//         }
//     }
// });