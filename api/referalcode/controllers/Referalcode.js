'use strict';

/**
 * Referalcode.js controller
 *
 * @description: A set of functions called "actions" for managing `Referalcode`.
 */

module.exports = {

  /**
   * Retrieve referalcode records.
   *
   * @return {Object|Array}
   */

  find: async (ctx) => {
    if (ctx.query._q) {
      return strapi.services.referalcode.search(ctx.query);
    } else {
      return strapi.services.referalcode.fetchAll(ctx.query);
    }
  },

  /**
   * Retrieve a referalcode record.
   *
   * @return {Object}
   */

  findOne: async (ctx) => {
    if (!ctx.params._id.match(/^[0-9a-fA-F]{24}$/)) {
      return ctx.notFound();
    }

    return strapi.services.referalcode.fetch(ctx.params);
  },

  /**
   * Count referalcode records.
   *
   * @return {Number}
   */

  count: async (ctx) => {
    return strapi.services.referalcode.count(ctx.query);
  },

  /**
   * Create a/an referalcode record.
   *
   * @return {Object}
   */

  create: async (ctx) => {
    return strapi.services.referalcode.add(ctx.request.body);
  },

  /**
   * Update a/an referalcode record.
   *
   * @return {Object}
   */

  update: async (ctx, next) => {
    return strapi.services.referalcode.edit(ctx.params, ctx.request.body) ;
  },

  /**
   * Destroy a/an referalcode record.
   *
   * @return {Object}
   */

  destroy: async (ctx, next) => {
    return strapi.services.referalcode.remove(ctx.params);
  }
};
