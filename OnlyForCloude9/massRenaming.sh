#!/bin/sh

#To rename propertie field in array
mongo --eval '
var bulk = db.snacks.initializeOrderedBulkOp(),
    count = 0;

db.snacks.find({ "elements.number": { "$exists": true } }).forEach(function(doc) {
    doc.elements.forEach(function(element) {
        if ( element.hasOwnProperty("number") ) { 
            bulk.find({ "_id": doc._id, "elements._id": element._id }).updateOne({
                "$set": { "elements.$.quantity": element.number }
            });
            bulk.find({ "_id": doc._id, "elements._id": element._id }).updateOne({
                "$unset": { "elements.$.number": 1 }
            });
            count += 2;

            if ( count % 500 == 0 ) {
                bulk.execute();
                bulk = db.collection.initializeOrderedBulkOp();
            }
        }
    });
});

if ( count % 500 !== 0 ) 
    bulk.execute();
'