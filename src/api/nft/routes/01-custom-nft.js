module.exports = {
  routes: [
    {
      // Path defined with an URL parameter
      method: "GET",
      path: "/nfts/:name",
      handler: "nft.findByName",
    },
  ],
};
