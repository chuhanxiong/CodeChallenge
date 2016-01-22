var VALID_PLAYERS = ['player1', 'player2'];
var VALID_MOVES = ['rock', 'paper', 'scissors'];

Meteor.methods({
  doMove: function(player, move, round) {
    if (!_.contains(VALID_PLAYERS, player)) {
      throw new Meteor.Error('invalid player');
    }
    if (!_.contains(VALID_MOVES, move)) {
      throw new Meteor.Error('invalid move');
    }

    var moveUpdate = {$set:{}}
    moveUpdate['$set'][player] = move
    moveUpdate['$set']['round'] = round
 
    Games.upsert({completed:false}, moveUpdate, function(err, result) {
      if (Meteor.isClient) {        
        Session.set('move', undefined);
      }
    });
  } 
});