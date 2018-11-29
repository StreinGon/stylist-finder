'use strict';

/**
 * Voucher.js controller
 *
 * @description: A set of functions called "actions" for managing `Voucher`.
 */

module.exports = {

  /**
   * Retrieve voucher records.
   *
   * @return {Object|Array}
   */

  find: async (ctx) => {
    if (ctx.query._q) {
      return strapi.services.voucher.search(ctx.query);
    } else {
      return strapi.services.voucher.fetchAll(ctx.query);
    }
  },

  /**
   * Retrieve a voucher record.
   *
   * @return {Object}
   */

  findOne: async (ctx) => {
    if (!ctx.params._id.match(/^[0-9a-fA-F]{24}$/)) {
      return ctx.notFound();
    }

    return strapi.services.voucher.fetch(ctx.params);
  },

  /**
   * Count voucher records.
   *
   * @return {Number}
   */

  count: async (ctx) => {
    return strapi.services.voucher.count(ctx.query);
  },

  /**
   * Create a/an voucher record.
   *
   * @return {Object}
   */

  create: async (ctx) => {
    return strapi.services.voucher.add(ctx.request.body);
  },

  /**
   * Update a/an voucher record.
   *
   * @return {Object}
   */

  update: async (ctx, next) => {
    return strapi.services.voucher.edit(ctx.params, ctx.request.body) ;
  },

  /**
   * Destroy a/an voucher record.
   *
   * @return {Object}
   */

  destroy: async (ctx, next) => {
    return strapi.services.voucher.remove(ctx.params);
  }
};
