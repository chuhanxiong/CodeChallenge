Template.results.helpers({
  games: Games.find({}, {sort:{date:-1}})
})