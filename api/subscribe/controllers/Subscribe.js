'use strict';

/**
 * Subscribe.js controller
 *
 * @description: A set of functions called "actions" for managing `Subscribe`.
 */

module.exports = {

  /**
   * Retrieve subscribe records.
   *
   * @return {Object|Array}
   */

  find: async (ctx) => {
    if (ctx.query._q) {
      return strapi.services.subscribe.search(ctx.query);
    } else {
      return strapi.services.subscribe.fetchAll(ctx.query);
    }
  },

  /**
   * Retrieve a subscribe record.
   *
   * @return {Object}
   */

  findOne: async (ctx) => {
    if (!ctx.params._id.match(/^[0-9a-fA-F]{24}$/)) {
      return ctx.notFound();
    }

    return strapi.services.subscribe.fetch(ctx.params);
  },

  /**
   * Count subscribe records.
   *
   * @return {Number}
   */

  count: async (ctx) => {
    return strapi.services.subscribe.count(ctx.query);
  },

  /**
   * Create a/an subscribe record.
   *
   * @return {Object}
   */

  create: async (ctx) => {
    return strapi.services.subscribe.add(ctx.request.body);
  },

  /**
   * Update a/an subscribe record.
   *
   * @return {Object}
   */

  update: async (ctx, next) => {
    return strapi.services.subscribe.edit(ctx.params, ctx.request.body) ;
  },

  /**
   * Destroy a/an subscribe record.
   *
   * @return {Object}
   */

  destroy: async (ctx, next) => {
    return strapi.services.subscribe.remove(ctx.params);
  }
};
