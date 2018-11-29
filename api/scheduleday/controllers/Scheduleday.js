'use strict';

/**
 * Scheduleday.js controller
 *
 * @description: A set of functions called "actions" for managing `Scheduleday`.
 */

module.exports = {

  /**
   * Retrieve scheduleday records.
   *
   * @return {Object|Array}
   */

  find: async (ctx) => {
    if (ctx.query._q) {
      return strapi.services.scheduleday.search(ctx.query);
    } else {
      return strapi.services.scheduleday.fetchAll(ctx.query);
    }
  },

  /**
   * Retrieve a scheduleday record.
   *
   * @return {Object}
   */

  findOne: async (ctx) => {
    if (!ctx.params._id.match(/^[0-9a-fA-F]{24}$/)) {
      return ctx.notFound();
    }

    return strapi.services.scheduleday.fetch(ctx.params);
  },

  /**
   * Count scheduleday records.
   *
   * @return {Number}
   */

  count: async (ctx) => {
    return strapi.services.scheduleday.count(ctx.query);
  },

  /**
   * Create a/an scheduleday record.
   *
   * @return {Object}
   */

  create: async (ctx) => {
    return strapi.services.scheduleday.add(ctx.request.body);
  },

  /**
   * Update a/an scheduleday record.
   *
   * @return {Object}
   */

  update: async (ctx, next) => {
    return strapi.services.scheduleday.edit(ctx.params, ctx.request.body) ;
  },

  /**
   * Destroy a/an scheduleday record.
   *
   * @return {Object}
   */

  destroy: async (ctx, next) => {
    return strapi.services.scheduleday.remove(ctx.params);
  }
};
