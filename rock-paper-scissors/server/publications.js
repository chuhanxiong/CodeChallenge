Meteor.publish('games', function() {
  return Games.find({completed:true}, {limit:10, sort:{date:-1}});
});

function gamePlay(p1Move, p2Move) {
  if (p1Move === p2Move) {
    return 'tie';
  } else if (p1Move === 'rock') {
    return p2Move === 'scissors' ? 'player1' : 'player2';
  } else if (p1Move === 'paper') {
    return p2Move === 'rock' ? 'player1' : 'player2';
  } else if (p1Move === 'scissors') {
    return p2Move === 'paper' ? 'player1' : 'player2';
  }
}

function getPlayerChoiceImg (pMove) {
  switch (pMove) {
    case 'rock':
      return "images/rock.jpeg";
    case 'scissors':
      return "images/scissors.jpeg";
    default:
      return "images/paper.jpeg";
  }
}

function updateScoresForPlayers (newDoc, gameResult, first) {
  if (first == 'false') {    
    var oldDoc = Games.find({}).fetch().pop();
    // console.log('oldDoc.player1Score: ' + oldDoc.player1Score);
    // console.log('oldDoc.player2Score: ' + oldDoc.player2Score);
    newDoc.player1Score = oldDoc.player1Score;
    newDoc.player2Score = oldDoc.player2Score;
  }  

  if (gameResult == 'tie') {
    newDoc.player1Score = newDoc.player1Score + 1;
    newDoc.player2Score = newDoc.player2Score + 1;
  } else if (gameResult == 'player1') {
    newDoc.player1Score = newDoc.player1Score + 1;
  } else {
    newDoc.player2Score = newDoc.player2Score + 1;
  }
  //console.log("gameResult: " + gameResult + " player1Score: " + newDoc.player1Score + " player2Score: " + newDoc.player2Score)
}


Games.find({completed:false}, {limit:1}).observe({
  changed: function(newDoc, oldDoc) {  
    if (newDoc.player1 && newDoc.player2) {
      var gameResult = gamePlay(newDoc.player1, newDoc.player2);

      if (newDoc.round == 1) {
        newDoc.player1Score = 0;
        newDoc.player2Score = 0;
        updateScoresForPlayers(newDoc, gameResult,"true");
      } else {
        updateScoresForPlayers(newDoc, gameResult,"false");
      }     
        Games.update(newDoc._id, {$set: {
          player1_img:getPlayerChoiceImg (newDoc.player1),
          player2_img:getPlayerChoiceImg (newDoc.player2),
          result: gameResult,      
          player1Score: newDoc.player1Score,
          player2Score: newDoc.player2Score,
          completed: true,
          date: new Date()
        }});            
    }
  }
});


