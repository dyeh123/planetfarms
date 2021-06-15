// const Sequelize = require('sequelize')
// const {sequelize} = require('./index');

// const Community = sequelize.define('communities',
//   {
//     name: {
//       type: Sequelize.STRING
//     },
//     description: {
//       type: Sequelize.STRING
//     },
//     attachment: {
//       type: Sequelize.STRING
//     }
//   },
//   { timestamps: true }
// )

// module.exports = Community
module.exports = (sequelize, DataTypes) => {
  const Community = sequelize.define('communities', {
    name: {
      type: DataTypes.STRING
    },
    description: {
      type: DataTypes.STRING
    },
    attachment: {
      type: DataTypes.STRING
    }
  },
    { timestamps: true }
  )
  Community.associate = (models) => {
    Community.belongsToMany(models.User, {
        through: 'communities_users',
        foreignKey: 'communityId',
        as: 'followers'
      })
      Community.belongsTo(models.User, { as: 'creator', foreignKey: 'creatorId' })
  };
  return Community;
}