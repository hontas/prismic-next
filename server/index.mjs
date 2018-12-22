import express from 'express';
import next from 'next';

import middleware from './middleware.mjs';
import generic from './generic.mjs';
import routes from './routes.mjs';

const dev = process.env.NODE_ENV !== 'production';
const PORT = process.env.PORT || 5000;
const nextApp = next({ dev });
const handle = nextApp.getRequestHandler();

nextApp
  .prepare()
  .then(() => {
    const app = express();

    generic(app);
    middleware(app);
    routes(app);

    app.get('*', handle);

    app.listen(PORT, (err) => {
      if (err) throw err;
      console.log(`> Ready on http://localhost:${PORT}`);
    });
  })
  .catch((ex) => {
    console.error(ex.stack);
    process.exit(1);
  });
