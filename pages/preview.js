import React from 'react';
import 'isomorphic-fetch';

import Page from '../components/page';

const baseUrl = typeof document === 'undefined' ? 'http://127.0.0.1:3000' : '';

function getComponentByType(type) {
  switch (type) {
    case 'page':
      return Page;
    default:
      return () => <h1>Unhandled type: {type}</h1>;
  }
}

export default class extends React.Component {
  static async getInitialProps({ req }) {
    const data = await fetch(`${baseUrl}/api/prismic?href=${req.query.href}`).then((resp) => resp.json());
    return {
      ...req.query,
      data
    };
  }

  render() {
    const { id, type, data } = this.props;
    const Comp = getComponentByType(type);
    return (
      <div>
        <header>Preview {`type: ${type}, id: ${id}`}</header>
        <Comp data={data} />
        <style jsx>{`
          body {
            margin: 0;
            font-family: sans-serif;
          }
          header {
            background-color: darkorange;
            color: white;
            padding: 0.5em 1em;
            text-align: center;
          }
        `}</style>
      </div>
    );
  }
}
