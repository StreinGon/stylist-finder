'use strict';

/**
 * Treatments.js controller
 *
 * @description: A set of functions called "actions" for managing `Treatments`.
 */

module.exports = {

  /**
   * Retrieve treatments records.
   *
   * @return {Object|Array}
   */

  find: async (ctx) => {
    if (ctx.query._q) {
      return strapi.services.treatments.search(ctx.query);
    } else {
      return strapi.services.treatments.fetchAll(ctx.query);
    }
  },

  /**
   * Retrieve a treatments record.
   *
   * @return {Object}
   */

  findOne: async (ctx) => {
    if (!ctx.params._id.match(/^[0-9a-fA-F]{24}$/)) {
      return ctx.notFound();
    }

    return strapi.services.treatments.fetch(ctx.params);
  },

  /**
   * Count treatments records.
   *
   * @return {Number}
   */

  count: async (ctx) => {
    return strapi.services.treatments.count(ctx.query);
  },

  /**
   * Create a/an treatments record.
   *
   * @return {Object}
   */

  create: async (ctx) => {
    return strapi.services.treatments.add(ctx.request.body);
  },

  /**
   * Update a/an treatments record.
   *
   * @return {Object}
   */

  update: async (ctx, next) => {
    return strapi.services.treatments.edit(ctx.params, ctx.request.body) ;
  },

  /**
   * Destroy a/an treatments record.
   *
   * @return {Object}
   */

  destroy: async (ctx, next) => {
    return strapi.services.treatments.remove(ctx.params);
  }
};
