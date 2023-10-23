'use strict'

module.exports = function (module) {
    return (

        {
            insertOne: async function(object){
                return await module.client.collection('creditDetails').insertOne(object)
            },
            findOne: async function(object){
                return await module.client.collection('creditDetails').findOne(object)
            },
            find: async function(object){
                return await module.client.collection('creditDetails').find(object)
            },
            aggregate: async function(object){
                return await module.client.collection('creditDetails').aggregate(object)
            }
        }
    )
}