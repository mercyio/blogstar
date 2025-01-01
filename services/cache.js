const mongoose = require('mongoose');

const exec = mongoose.Query.prototype.exec;

mongoose.Query.prototype.exec = function () {
    console.log('about to run a query');

    console.log(this.getQuery())
    console.log(this.mongooseCollection.name)
    const key = Object.assign({}, this.getQuery(), {
        collection: this.mongooseCollection.name
    });

    console.log(key);

    return exec.apply(this, arguments);
};