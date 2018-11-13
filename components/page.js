import React from 'react';
import Head from 'next/head';

export default ({ data }) => (
  <div>
    <Head>
      <title>{data.meta_title}</title>
      <meta name="description" content={data.meta_description} />
    </Head>
    <h1>{data.meta_description}</h1>
    {data.content.map(({ title, text, image }, idx) => (
      <section key={idx}>
        <h3>{title[0].text}</h3>
        <p>{text[0].text}</p>
        <picture>
          <source media={`(max-width: ${image.mobile.dimensions.width}px)`} srcSet={image.mobile.url} />
          <img {...image.mobile.dimensions} src={image.url} alt={image.alt} />
        </picture>
      </section>
    ))}
  </div>
);
