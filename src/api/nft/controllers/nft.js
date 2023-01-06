"use strict";

const { createCoreController } = require("@strapi/strapi").factories;

module.exports = createCoreController("api::nft.nft", ({ strapi }) => ({
  async findByName(ctx) {
    try {
      const { name } = ctx.params;
      const { page, limit } = ctx.query;

      const [entities, total] = await strapi.db
        .query("api::nft.nft")
        .findWithCount({
          select: ["name", "description", "blockchainType"],
          where: {
            name: { $containsi: name },
          },
          limit,
          offset: page - 1,
        });

      if (!entities?.length) {
        return (ctx.body = { message: "No NFTs found" });
      }

      return (ctx.body = {
        name,
        entities,
        total,
        page: parseInt(page),
        limit: parseInt(limit),
      });
    } catch (err) {
      console.log("🚀 ~ file: nft.js:21 ~ findByName ~ err", err);
      ctx.body = err;
    }
  },
}));
