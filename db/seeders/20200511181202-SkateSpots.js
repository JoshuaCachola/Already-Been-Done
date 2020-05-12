'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "SkateSpots",
      [
        {
          name: "3rd and Army",
          address: "1698 Indiana St, San Francisco, CA 94124",
          city: "San Francisco",
          state: "California",
          lat: 37.750294,
          lng: -122.3918799,
          imgs: [
            "https://www.skateboard.com.au/images/3rdArmy1.jpg"
          ],
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: "FDR",
          address: "1500 Pattison Avenue",
          city: "Philadelphia",
          state: "Pennsylvania",
          lat: 37.371904,
          lng: -121.8308964,
          imgs: [
            "https://upload.wikimedia.org/wikipedia/commons/c/c7/20141228-_IGP1984_%2815946902147%29.jpg",
          ],
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: "Pier 7",
          address: "Pier 7, San Francisco CA, 94105",
          city: "San Francisco",
          state: "California",
          lat: 7.7986599,
          lng: -122.399004,
          imgs: [
            "https://storage.googleapis.com/fsscs1/images/large/af3822824d6e866a5da2554a9f29e271.jpg",
          ],
          createdAt: new Date(),
          updatedAt: new Date()
        },
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("SkateSpots", null, {});
  }
};
