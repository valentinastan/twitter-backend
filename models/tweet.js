'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Tweet extends Model {
    static associate(models) {
      Tweet.hasMany(models.TweetHashtag);
      Tweet.belongsTo(models.User);
      Tweet.hasOne(models.Tweet);
    }
  };
  Tweet.init({
    text: DataTypes.STRING,
    userId: DataTypes.INTEGER,
    prevTweetId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Tweet',
  });
  return Tweet;
};