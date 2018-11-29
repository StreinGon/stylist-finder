'use strict';

/**
 * Wedding.js controller
 *
 * @description: A set of functions called "actions" for managing `Wedding`.
 */

module.exports = {

  /**
   * Retrieve wedding records.
   *
   * @return {Object|Array}
   */

  find: async (ctx) => {
    if (ctx.query._q) {
      return strapi.services.wedding.search(ctx.query);
    } else {
      return strapi.services.wedding.fetchAll(ctx.query);
    }
  },

  /**
   * Retrieve a wedding record.
   *
   * @return {Object}
   */

  findOne: async (ctx) => {
    if (!ctx.params._id.match(/^[0-9a-fA-F]{24}$/)) {
      return ctx.notFound();
    }

    return strapi.services.wedding.fetch(ctx.params);
  },

  /**
   * Count wedding records.
   *
   * @return {Number}
   */

  count: async (ctx) => {
    return strapi.services.wedding.count(ctx.query);
  },

  /**
   * Create a/an wedding record.
   *
   * @return {Object}
   */

  create: async (ctx) => {
    return strapi.services.wedding.add(ctx.request.body);
  },

  /**
   * Update a/an wedding record.
   *
   * @return {Object}
   */

  update: async (ctx, next) => {
    return strapi.services.wedding.edit(ctx.params, ctx.request.body) ;
  },

  /**
   * Destroy a/an wedding record.
   *
   * @return {Object}
   */

  destroy: async (ctx, next) => {
    return strapi.services.wedding.remove(ctx.params);
  }
};
