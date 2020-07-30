'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Hashtag extends Model {
    static associate(models) {
      Hashtag.hasMany(models.TweetHashtag);
    }
  };
  Hashtag.init({
    name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Hashtag',
  });
  return Hashtag;
};