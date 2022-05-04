const express = require('express');

// Route Import
const testRoute = require('./testRoute');

const router = express.Router();

const defaultRoutes = [
  {
    path: '/test',
    route: testRoute,
  },
];

const devRoutes = [
  // routes available only in development mode
//   {
//     path: '/docs',
//     route: docsRoute,
//   },
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

router
    .route('/heartbeat')
    .get(function (req, res, next) {
      res.json('OK');

    });

/* istanbul ignore next */
if (process.env.enviroment === 'dev') {
  devRoutes.forEach((route) => {
    router.use(route.path, route.route);
  });
}

module.exports = router;