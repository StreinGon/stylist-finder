'use strict';

/**
 * Confirmtoken.js controller
 *
 * @description: A set of functions called "actions" for managing `Confirmtoken`.
 */

module.exports = {

  /**
   * Retrieve confirmtoken records.
   *
   * @return {Object|Array}
   */

  find: async (ctx) => {
    if (ctx.query._q) {
      return strapi.services.confirmtoken.search(ctx.query);
    } else {
      return strapi.services.confirmtoken.fetchAll(ctx.query);
    }
  },

  /**
   * Retrieve a confirmtoken record.
   *
   * @return {Object}
   */

  findOne: async (ctx) => {
    if (!ctx.params._id.match(/^[0-9a-fA-F]{24}$/)) {
      return ctx.notFound();
    }

    return strapi.services.confirmtoken.fetch(ctx.params);
  },

  /**
   * Count confirmtoken records.
   *
   * @return {Number}
   */

  count: async (ctx) => {
    return strapi.services.confirmtoken.count(ctx.query);
  },

  /**
   * Create a/an confirmtoken record.
   *
   * @return {Object}
   */

  create: async (ctx) => {
    return strapi.services.confirmtoken.add(ctx.request.body);
  },

  /**
   * Update a/an confirmtoken record.
   *
   * @return {Object}
   */

  update: async (ctx, next) => {
    return strapi.services.confirmtoken.edit(ctx.params, ctx.request.body) ;
  },

  /**
   * Destroy a/an confirmtoken record.
   *
   * @return {Object}
   */

  destroy: async (ctx, next) => {
    return strapi.services.confirmtoken.remove(ctx.params);
  }
};
