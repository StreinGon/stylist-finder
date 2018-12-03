'use strict';

/**
 * Subscribers.js controller
 *
 * @description: A set of functions called "actions" for managing `Subscribers`.
 */

module.exports = {

  /**
   * Retrieve subscribers records.
   *
   * @return {Object|Array}
   */

  find: async (ctx) => {
    if (ctx.query._q) {
      return strapi.services.subscribers.search(ctx.query);
    } else {
      return strapi.services.subscribers.fetchAll(ctx.query);
    }
  },

  /**
   * Retrieve a subscribers record.
   *
   * @return {Object}
   */

  findOne: async (ctx) => {
    if (!ctx.params._id.match(/^[0-9a-fA-F]{24}$/)) {
      return ctx.notFound();
    }

    return strapi.services.subscribers.fetch(ctx.params);
  },

  /**
   * Count subscribers records.
   *
   * @return {Number}
   */

  count: async (ctx) => {
    return strapi.services.subscribers.count(ctx.query);
  },

  /**
   * Create a/an subscribers record.
   *
   * @return {Object}
   */

  create: async (ctx) => {
    return strapi.services.subscribers.add(ctx.request.body);
  },

  /**
   * Update a/an subscribers record.
   *
   * @return {Object}
   */

  update: async (ctx, next) => {
    return strapi.services.subscribers.edit(ctx.params, ctx.request.body) ;
  },

  /**
   * Destroy a/an subscribers record.
   *
   * @return {Object}
   */

  destroy: async (ctx, next) => {
    return strapi.services.subscribers.remove(ctx.params);
  }
};
