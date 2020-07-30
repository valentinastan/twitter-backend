'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class FollowRelation extends Model {
    static associate(models) {
      FollowRelation.belongsTo(models.User);
    }
  };
  FollowRelation.init({
    followerId: DataTypes.INTEGER,
    followedId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'FollowRelation',
  });
  return FollowRelation;
};