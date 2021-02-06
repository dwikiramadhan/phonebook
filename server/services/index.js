const firebase = require("firebase");

const getContacts = (offset, limit, searchName, searchPhone) => {
    const userReference = firebase.database().ref("/Phonebook/");
    return (new Promise((resolve, reject) => {
        userReference.on("value", function (snapshot) {
            const folders = snapshot.val();
            if (folders === null) {
                resolve([]);
            } else {
                const data = Object.keys(folders).map(o => Object.assign({ id: o }, folders[o]));
                // const dataReverse = data.reverse();

                let dataTest = data;
                if (searchName && searchPhone) {
                    dataTest = data.filter(item =>
                        item.name.toLowerCase() === searchName.toLowerCase() && item.phone === searchPhone
                    )
                } else if (searchName) {
                    dataTest = data.filter(item =>
                        item.name.toLowerCase() === searchName.toLowerCase()
                    )
                } else if (searchPhone) {
                    dataTest = data.filter(item =>
                        item.phone === searchPhone
                    )
                }

                const dataFilter = dataTest.splice(offset - 1, limit)
                console.log('dataFiltered', dataFilter)
                console.log('dataTest', dataTest)
                resolve(dataFilter);
            }
            userReference.off("value");
        }, (errorObject) => {
            console.log("The read failed: " + errorObject.code);
            reject("The read failed: " + errorObject.code);
        });
    }));
}

const totalData = (searchName, searchPhone) => {
    const userReference = firebase.database().ref("/Phonebook/");
    return (new Promise((resolve, reject) => {
        userReference.on("value", function (snapshot) {
            const folders = snapshot.val();
            if (folders === null) {
                resolve([]);
            } else {
                const data = Object.keys(folders).map(o => Object.assign({ id: o }, folders[o]));

                let dataTest = data;
                if (searchName && searchPhone) {
                    dataTest = data.filter(item =>
                        item.name.toLowerCase() === searchName.toLowerCase() && item.phone === searchPhone
                    )
                } else if (searchName) {
                    dataTest = data.filter(item =>
                        item.name.toLowerCase() === searchName.toLowerCase()
                    )
                } else if (searchPhone) {
                    dataTest = data.filter(item =>
                        item.phone === searchPhone
                    )
                }

                resolve(dataTest.length);
            }
            userReference.off("value");
        }, (errorObject) => {
            console.log("The read failed: " + errorObject.code);
            reject("The read failed: " + errorObject.code);
        });
    }));
}

//Create new instance
const createContact = (contact) => {
    const referencePath = `/Phonebook/${contact._id}/`;
    const userReference = firebase.database().ref(referencePath);
    return (new Promise((resolve, reject) => {
        userReference.set({ id: contact.id, name: contact.name, phone: contact.phone }, (error) => {
            if (error) {
                reject("Data could not be deleted." + error);
            } else {
                resolve(contact);
            }
        });
    }));
}

//Update existing instance
const updateContact = (contact) => {
    var referencePath = `/Phonebook/${contact._id}/`;
    var userReference = firebase.database().ref(referencePath);
    return (new Promise((resolve, reject) => {
        userReference.update({ name: contact.name, phone: contact.phone }, (error) => {
            if (error) {
                reject("Data could not be deleted." + error);
            } else {
                resolve(contact);
            }
        });
    }));
}

//Delete an instance
const deleteContact = (contact) => {
    var referencePath = `/Phonebook/${contact._id}/`;
    var userReference = firebase.database().ref(referencePath);
    return (new Promise((resolve, reject) => {
        userReference.remove((error) => {
            if (error) {
                reject("Data could not be deleted." + error);
            } else {
                resolve(contact);
            }
        })
    }));
}

module.exports = { getContacts, createContact, updateContact, deleteContact, totalData }