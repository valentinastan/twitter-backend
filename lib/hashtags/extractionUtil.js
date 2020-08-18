const models = require('../../models/index')
const Hashtag = models.Hashtag

exports.extractHashtagNames = (text) => text.split(" ").filter( el => el[0] == '#').map(el => el.slice(1))

exports.extractHashtags = (text) => this.extractHashtagNames(text).map( name => Hashtag.build({name}))