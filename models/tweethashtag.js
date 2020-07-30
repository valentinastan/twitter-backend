'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class TweetHashtag extends Model {
    static associate(models) {
      TweetHashtag.belongsTo(models.Tweet);
      TweetHashtag.belongsTo(models.Hashtag);
    }
  };
  TweetHashtag.init({
    hashtagId: DataTypes.INTEGER,
    tweetId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'TweetHashtag',
  });
  return TweetHashtag;
};