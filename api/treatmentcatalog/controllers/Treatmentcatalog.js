'use strict';

/**
 * Treatmentcatalog.js controller
 *
 * @description: A set of functions called "actions" for managing `Treatmentcatalog`.
 */

module.exports = {

  /**
   * Retrieve treatmentcatalog records.
   *
   * @return {Object|Array}
   */

  find: async (ctx) => {
    if (ctx.query._q) {
      return strapi.services.treatmentcatalog.search(ctx.query);
    } else {
      return strapi.services.treatmentcatalog.fetchAll(ctx.query);
    }
  },

  /**
   * Retrieve a treatmentcatalog record.
   *
   * @return {Object}
   */

  findOne: async (ctx) => {
    if (!ctx.params._id.match(/^[0-9a-fA-F]{24}$/)) {
      return ctx.notFound();
    }

    return strapi.services.treatmentcatalog.fetch(ctx.params);
  },

  /**
   * Count treatmentcatalog records.
   *
   * @return {Number}
   */

  count: async (ctx) => {
    return strapi.services.treatmentcatalog.count(ctx.query);
  },

  /**
   * Create a/an treatmentcatalog record.
   *
   * @return {Object}
   */

  create: async (ctx) => {
    return strapi.services.treatmentcatalog.add(ctx.request.body);
  },

  /**
   * Update a/an treatmentcatalog record.
   *
   * @return {Object}
   */

  update: async (ctx, next) => {
    return strapi.services.treatmentcatalog.edit(ctx.params, ctx.request.body) ;
  },

  /**
   * Destroy a/an treatmentcatalog record.
   *
   * @return {Object}
   */

  destroy: async (ctx, next) => {
    return strapi.services.treatmentcatalog.remove(ctx.params);
  }
};
