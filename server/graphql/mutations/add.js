const { GraphQLNonNull, GraphQLString, GraphQLID } = require('graphql');
const contactType = require('../types/phonebook');
const services = require('../../services');
console.log(contactType)
exports.add = {
    type: contactType,
    args: {
        _id: {
            type: new GraphQLNonNull(GraphQLID),
        },
        id: {
            type: new GraphQLNonNull(GraphQLID),
        },
        name: {
            type: new GraphQLNonNull(GraphQLString),
        },
        phone: {
            type: new GraphQLNonNull(GraphQLString),
        }
    },
    resolve(root, params) {
        return services.createContact(params);
    }
}