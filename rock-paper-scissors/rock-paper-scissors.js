Router.configure({
  layoutTemplate: 'Layout'
});

// We only support routes with a param (player1, player2)
Router.route('/:player', function() {
  Session.set('move', undefined)
  Session.set('round', 0)
  this.wait(Meteor.subscribe('games'))
  Session.set('player', this.params.player);
  this.render('rockPaperScissors')
});