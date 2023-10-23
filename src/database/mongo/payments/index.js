'use strict'

const collections = {
    purchaces:'purchaces',
    cources:'cources',
    creditOrders:'creditOrders',
    priceList:'priceList',
    creditDetails:'creditDetails',
    creditDetails:'creditProduct'
}

module.exports = function (module) {
    module.Find = async function (collection, object) {
        if(!(collection in collections)) return false;
        return await module.client.collection(collection).find(object)
    }
    module.Insert = async function (collection, object) {
        if(!(collection in collections)) return false;
        return await module.client.collection(collection).insertOne(object)
    }
    module.Update = async function (collection, object, options) {
        if(!(collection in collections)) return false;
        return await module.client.collection(collection).update(object, options)
    }

    //bcz db.Agregate is already there in hash.js
    module.customAgregate = async function (collection, pipeline) {
        if(!(collection in collections)) return false;
        return await module.client.collection(collection).aggregate(pipeline)
    }
}