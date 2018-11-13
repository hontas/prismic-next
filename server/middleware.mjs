import Prismic from 'prismic-javascript';

const apiEndpoint = 'http://hontas-test.prismic.io/api/v2';

export default function middleware(app) {
  app.use('/api*', (req, res, next) => {
    Prismic.getApi(apiEndpoint, { req })
      .then((prismicApi) => {
        res.locals.ctx = {
          prismicApi
        };
      })
      .then(next);
  });
}