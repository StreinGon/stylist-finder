'use strict';

/**
 * Purse.js controller
 *
 * @description: A set of functions called "actions" for managing `Purse`.
 */

module.exports = {

  /**
   * Retrieve purse records.
   *
   * @return {Object|Array}
   */

  find: async (ctx) => {
    if (ctx.query._q) {
      return strapi.services.purse.search(ctx.query);
    } else {
      return strapi.services.purse.fetchAll(ctx.query);
    }
  },

  /**
   * Retrieve a purse record.
   *
   * @return {Object}
   */

  findOne: async (ctx) => {
    if (!ctx.params._id.match(/^[0-9a-fA-F]{24}$/)) {
      return ctx.notFound();
    }

    return strapi.services.purse.fetch(ctx.params);
  },

  /**
   * Count purse records.
   *
   * @return {Number}
   */

  count: async (ctx) => {
    return strapi.services.purse.count(ctx.query);
  },

  /**
   * Create a/an purse record.
   *
   * @return {Object}
   */

  create: async (ctx) => {
    return strapi.services.purse.add(ctx.request.body);
  },

  /**
   * Update a/an purse record.
   *
   * @return {Object}
   */

  update: async (ctx, next) => {
    return strapi.services.purse.edit(ctx.params, ctx.request.body) ;
  },

  /**
   * Destroy a/an purse record.
   *
   * @return {Object}
   */

  destroy: async (ctx, next) => {
    return strapi.services.purse.remove(ctx.params);
  }
};
