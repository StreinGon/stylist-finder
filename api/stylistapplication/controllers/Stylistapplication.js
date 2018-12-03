'use strict';

/**
 * Stylistapplication.js controller
 *
 * @description: A set of functions called "actions" for managing `Stylistapplication`.
 */

module.exports = {

  /**
   * Retrieve stylistapplication records.
   *
   * @return {Object|Array}
   */

  find: async (ctx) => {
    if (ctx.query._q) {
      return strapi.services.stylistapplication.search(ctx.query);
    } else {
      return strapi.services.stylistapplication.fetchAll(ctx.query);
    }
  },

  /**
   * Retrieve a stylistapplication record.
   *
   * @return {Object}
   */

  findOne: async (ctx) => {
    if (!ctx.params._id.match(/^[0-9a-fA-F]{24}$/)) {
      return ctx.notFound();
    }

    return strapi.services.stylistapplication.fetch(ctx.params);
  },

  /**
   * Count stylistapplication records.
   *
   * @return {Number}
   */

  count: async (ctx) => {
    return strapi.services.stylistapplication.count(ctx.query);
  },

  /**
   * Create a/an stylistapplication record.
   *
   * @return {Object}
   */

  create: async (ctx) => {
    return strapi.services.stylistapplication.add(ctx.request.body);
  },

  /**
   * Update a/an stylistapplication record.
   *
   * @return {Object}
   */

  update: async (ctx, next) => {
    return strapi.services.stylistapplication.edit(ctx.params, ctx.request.body) ;
  },

  /**
   * Destroy a/an stylistapplication record.
   *
   * @return {Object}
   */

  destroy: async (ctx, next) => {
    return strapi.services.stylistapplication.remove(ctx.params);
  }
};
