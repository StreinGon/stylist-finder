'use strict';

/**
 * Mediaproduction.js controller
 *
 * @description: A set of functions called "actions" for managing `Mediaproduction`.
 */

module.exports = {

  /**
   * Retrieve mediaproduction records.
   *
   * @return {Object|Array}
   */

  find: async (ctx) => {
    if (ctx.query._q) {
      return strapi.services.mediaproduction.search(ctx.query);
    } else {
      return strapi.services.mediaproduction.fetchAll(ctx.query);
    }
  },

  /**
   * Retrieve a mediaproduction record.
   *
   * @return {Object}
   */

  findOne: async (ctx) => {
    if (!ctx.params._id.match(/^[0-9a-fA-F]{24}$/)) {
      return ctx.notFound();
    }

    return strapi.services.mediaproduction.fetch(ctx.params);
  },

  /**
   * Count mediaproduction records.
   *
   * @return {Number}
   */

  count: async (ctx) => {
    return strapi.services.mediaproduction.count(ctx.query);
  },

  /**
   * Create a/an mediaproduction record.
   *
   * @return {Object}
   */

  create: async (ctx) => {
    return strapi.services.mediaproduction.add(ctx.request.body);
  },

  /**
   * Update a/an mediaproduction record.
   *
   * @return {Object}
   */

  update: async (ctx, next) => {
    return strapi.services.mediaproduction.edit(ctx.params, ctx.request.body) ;
  },

  /**
   * Destroy a/an mediaproduction record.
   *
   * @return {Object}
   */

  destroy: async (ctx, next) => {
    return strapi.services.mediaproduction.remove(ctx.params);
  }
};
