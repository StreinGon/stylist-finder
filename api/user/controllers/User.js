'use strict';
const strapi=require('strapi')
/**
 * A set of functions called "actions" for `User`
 */

module.exports = {
  profile: async (ctx,) => {
    ctx.send({user: ctx.state.user});
  },
  allStylist: async (ctx) => {
    return strapi.plugins['users-permissions'].models.user.find({role : '5bfe57026d852426c8d11d0a'}).then(stylist=>{
      return ctx.send({stylist})
    }).catch(error=>{
      return ctx.send(error)
    })
  },
  mediaprod: async (ctx) => {
    return Mediaproduction.create(ctx.request.body).then((prod)=>{
      return ctx.send(prod)
    }).catch(error=>{
      return ctx.send(error)
    })
  },
  wedding: async (ctx) => {
    return Wedding.create(ctx.request.body).then((wedding)=>{
      return ctx.send(wedding)
    }).catch(error=>{
      return ctx.send(error)
    })
  },
  subscribe: async (ctx) => {
    return Wedding.create(ctx.request.body).then((wedding)=>{
      return ctx.send(wedding)
    }).catch(error=>{
      return ctx.send(error)
    })
  },
  schedule: async (ctx) => {
    const { schedule }=ctx.request.body;
    if(!schedule || schedule.length<1){
      ctx.badRequst("Invalid shedule")
    }
    const array_promise = [];
    const user_schedule=ctx.state.user.schedule;
    schedule.forEach(day => {
      day.Date=new Date(day.Date);
      day.schedule=user_schedule;
      const promise=Scheduleday.create(day);
      array_promise.push(promise);
    });
    return Promise.all(array_promise).then((data)=>{
      ctx.send(data);
    }).catch(error=>{
      ctx.badRequest(error);
    })
  }
};
