import Prismic from 'prismic-javascript';
import 'isomorphic-fetch';

function linkResolver(results) {
  const document = Array.isArray(results) ? results[0] : results;
  const { id, type, href } = document;
  return `/preview?id=${id}&type=${type}&href=${encodeURIComponent(href)}`;
}

async function responseHandler(res, response) {
  const { prismicApi } = res.locals.ctx;

  if (response.results_size === 0) {
    return res.sendStatus(404);
  }

  const content = await Promise.all(
    response.results[0].data.content.map(({ content_link }) => prismicApi.getByID(content_link.id))
  );

  res.json({
    ...response.results[0].data,
    content: content.map(({ data }) => data),
    document_meta: {
      locale: {
        current: response.results[0].lang,
        alternate: response.results[0].alternate_languages
      }
    }
  });
}

export default function routes(app) {
  app.get('/api/preview', (req, res) => {
    const { token } = req.query;
    const { prismicApi } = res.locals.ctx;

    console.log('token', token);

    prismicApi.previewSession(token, linkResolver, '/').then((url) => res.redirect(url));
  });

  app.get('/api/prismic', (req, res) => {
    const { href } = req.query;
    fetch(href)
      .then((response) => response.json())
      .then((json) => responseHandler(res, json));
  });

  app.get('/api/page/:slug', (req, res) => {
    const { prismicApi } = res.locals.ctx;
    prismicApi
      .query(Prismic.Predicates.at('my.page.slug', req.params.slug))
      .then((response) => responseHandler(res, response));
  });

  app.get('/api*', (req, res) => {
    console.log('req.url', req.url);
    res.send('api');
  });
}
