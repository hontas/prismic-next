import React from 'react';
import 'isomorphic-fetch';

import Page from '../components/page';

const baseUrl = typeof document === 'undefined' ? 'http://127.0.0.1:3000' : '';

export default class extends React.Component {
  static async getInitialProps() {
    const data = await fetch(`${baseUrl}/api/page/home`).then((resp) => resp.json());
    return { data };
  }

  render() {
    return <Page data={this.props.data} />;
  }
}
