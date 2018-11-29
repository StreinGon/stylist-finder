'use strict';
const strapi=require('strapi')
/**
 * A set of functions called "actions" for `User`
 */

module.exports = {
  profile: async (ctx, next) => {
    const { user } = ctx.state;
    return Purse.find({ user_id: user._id}).then(purse=>{
      return ctx.send({user: ctx.state.user, purse: purse});
    }).catch(error=>ctx.send(error)) 
   
  },
  allStylist: async (ctx,next) => {
    return strapi.plugins['users-permissions'].models.user.find({role : '5bfe57026d852426c8d11d0a'}).then(stylist=>{
      return ctx.send({stylist})
    }).catch(error=>{
      return ctx.send(error)
    })
  }
};
