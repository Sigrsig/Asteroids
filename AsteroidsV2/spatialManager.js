/*

spatialManager.js

A module which handles spatial lookup, as required for...
e.g. general collision detection.

*/

"use strict";

/* jshint browser: true, devel: true, globalstrict: true */

/*
0        1         2         3         4         5         6         7         8
12345678901234567890123456789012345678901234567890123456789012345678901234567890
*/
var spatialManager = {

// "PRIVATE" DATA

_nextSpatialID : 1, // make all valid IDs non-falsey (i.e. don't start at 0)

_entities : [],

// "PRIVATE" METHODS
//
// <none yet>

// PUBLIC METHODS

// Doles out a new spatial ID to each new entity and returns its ID number
getNewSpatialID : function() {

    // TODO: YOUR STUFF HERE!
    var id = this._nextSpatialID;
    console.log(this._nextSpatialID);

    this._nextSpatialID++;
    return id;
},

// Registers the entity to the _entities array, and sets it's x/y coordinates
// and radius.
// If X has been pressed, also draws red circles around each entity.
register: function(entity) {
    var pos = entity.getPos();
    var spatialID = entity.getSpatialID();
    // TODO: YOUR STUFF HERE!

    entity.radius = entity.getRadius();
    entity.posX = pos.posX;
    entity.posY = pos.posY;

    this._entities[spatialID] = entity;
    this.render(ctx);
},

// This etitiy's ID data is wiped.
unregister: function(entity) {
    var spatialID = entity.getSpatialID();
    // TODO: YOUR STUFF HERE!
    delete this._entities[spatialID];
},

// Finds the distance between the two entities.
// returns the entity in range if their combined radiuses are larger than 
// the distance between them.
findEntityInRange: function(posX, posY, radius) {

    // TODO: YOUR STUFF HERE!
    for (var ID in this._entities){
        var e = this._entities[ID];

        var rads = util.square(e.radius + radius);

        var wrap = util.wrappedDistSq(posX, posY, e.posX, e.posY, 600, 600);
        var dist = util.distSq(posX, posY, e.posX, e.posY);

        if((wrap < rads) || (dist < rads)){
            console.log(wrap, dist, rads);
            return this._entities[ID];
        }    
    }
},


render: function(ctx) {
    var oldStyle = ctx.strokeStyle;
    ctx.strokeStyle = "red";
    
    for (var ID in this._entities) {
        var e = this._entities[ID];
        util.strokeCircle(ctx, e.posX, e.posY, e.radius);
    }
    ctx.strokeStyle = oldStyle;
}

}
