import React, { Component } from 'react';
import styled from 'styled-components';

export default class Test extends Component {
  state = {
    title: '',
    body: '',
  };

  componentDidMount() {
    fetch('https://jsonplaceholder.typicode.com/posts/1')
      .then(response => response.json())
      .then(data =>
        this.setState(prev => ({
          title: (prev.title = data.title),
          body: (prev.body = data.body),
        }))
      );
  }

  render() {
    return (
      <TestWrapper>
        <h1>Jus a simple test Component</h1>
        <h3>{this.state.title}</h3>
        <p>{this.state.body}</p>
      </TestWrapper>
    );
  }
}

const TestWrapper = styled.div`
  margin: 0 auto;
  text-align: center;
  h1 {
    font-size: 4rem;
  }
  h3 {
    font-size: 3rem;
  }
  p {
    font-size: 1.6rem;
  }
`;
