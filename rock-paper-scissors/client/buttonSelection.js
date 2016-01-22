Template.buttonSelection.helpers({
  selected: function (move) {
    if (move === Session.get('move')) {
      return 'selected';
    }
  },
  getPlayerId: function() {
    return Session.get('player');
  }
});

Template.buttonSelection.events({
  'click button.choose': function (e) {
    Session.set('move', e.currentTarget.dataset.move);
    Session.set('round',Session.get('round') + 1);
    Meteor.call('doMove', Session.get('player'), Session.get('move'),Session.get('round'));
  }


})