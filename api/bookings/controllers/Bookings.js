'use strict';

/**
 * Bookings.js controller
 *
 * @description: A set of functions called "actions" for managing `Bookings`.
 */

module.exports = {

  /**
   * Retrieve bookings records.
   *
   * @return {Object|Array}
   */

  find: async (ctx) => {
    if (ctx.query._q) {
      return strapi.services.bookings.search(ctx.query);
    } else {
      return strapi.services.bookings.fetchAll(ctx.query);
    }
  },

  /**
   * Retrieve a bookings record.
   *
   * @return {Object}
   */

  findOne: async (ctx) => {
    if (!ctx.params._id.match(/^[0-9a-fA-F]{24}$/)) {
      return ctx.notFound();
    }

    return strapi.services.bookings.fetch(ctx.params);
  },

  /**
   * Count bookings records.
   *
   * @return {Number}
   */

  count: async (ctx) => {
    return strapi.services.bookings.count(ctx.query);
  },

  /**
   * Create a/an bookings record.
   *
   * @return {Object}
   */

  create: async (ctx) => {
    return strapi.services.bookings.add(ctx.request.body);
  },

  /**
   * Update a/an bookings record.
   *
   * @return {Object}
   */

  update: async (ctx, next) => {
    return strapi.services.bookings.edit(ctx.params, ctx.request.body) ;
  },

  /**
   * Destroy a/an bookings record.
   *
   * @return {Object}
   */

  destroy: async (ctx, next) => {
    return strapi.services.bookings.remove(ctx.params);
  }
};
