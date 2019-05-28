import { Consumer } from '../../context';
import React, { Component } from 'react';
import styled from 'styled-components';
import { ArrowDropDown } from 'styled-icons/material/ArrowDropDown';
import { Card } from './Contact';
import { ADD_CONTACT, UPDATED_CONTACT } from '../../types';
import { mainColurs } from '../../global/Globalstyles';
import { Button } from '../../global/button';
import TextInputGroup from '../layout/TextInputGroup';
import axios from 'axios';
import { Form } from './AddContact';

export default class EditContact extends Component {
  constructor() {
    super();
    this.state = {
      name: '',
      email: '',
      phone: '',
      errors: {},
      show: false
    };
    this.onChange = this.onChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.toggleShow = this.toggleShow.bind(this);
  }

  async componentDidMount() {
    const { id } = this.props.match.params;
    const res = await axios.get(
      `https://jsonplaceholder.typicode.com/users/${id}`
    );
    const contact = res.data;
    this.setState({
      name: contact.name,
      email: contact.email,
      phone: contact.phone
    });
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  async handleSubmit(dispatch, e) {
    e.preventDefault();
    const { name, email, phone, errors } = this.state;

    if (name === '') {
      this.setState({ errors: { name: 'Name is required' } });
      return;
    }
    if (email === '') {
      this.setState({ errors: { email: 'Email is required' } });
      return;
    }
    if (phone === '') {
      this.setState({ errors: { phone: 'Phone number is required' } });
      return;
    }

    const updatedContact = {
      name,
      email,
      phone
    };
    const { id } = this.props.match.params;
    const res = await axios.put(
      `https://jsonplaceholder.typicode.com/users/${id}`,
      updatedContact
    );
    dispatch({ type: UPDATED_CONTACT, payload: res.data });

    const newContact = {
      name,
      email,
      phone
    };

    const resp = await axios.post(
      'https://jsonplaceholder.typicode.com/users',
      newContact
    );
    dispatch({ type: ADD_CONTACT, payload: resp.data });

    this.setState(prev => ({
      name: (prev.name = ''),
      email: (prev.email = ''),
      phone: (prev.phone = ''),
      errors: (prev.errors = {})
    }));

    // redirect home
    this.props.history.push('/');
  }

  toggleShow() {
    this.setState(prev => ({
      show: !prev.show
    }));
  }

  render() {
    const { name, email, phone, errors, show } = this.state;

    return (
      <Consumer>
        {value => {
          const { dispatch } = value;
          return (
            <>
              <Card
                size="2.7rem"
                radius
                background={mainColurs.transparentLight}
                padding="2rem 4rem"
                center
                size="5rem"
              >
                <div className="card-body">
                  <h3 style={{ color: '#000' }}>
                    Edit Contact{' '}
                    <span onClick={this.toggleShow}>
                      {' '}
                      <ArrowDropDown size="55" className="dropIcon" />{' '}
                    </span>{' '}
                  </h3>
                  {show ? (
                    <Form onSubmit={this.handleSubmit.bind(this, dispatch)}>
                      <TextInputGroup
                        label="Name"
                        type="text"
                        placeHolder="enter name..."
                        name="name"
                        value={name}
                        onChange={this.onChange}
                        error={errors.name}
                      />
                      <TextInputGroup
                        label="Email"
                        type="email"
                        placeHolder="enter email..."
                        name="email"
                        value={email}
                        onChange={this.onChange}
                        error={errors.email}
                      />
                      <TextInputGroup
                        label="Phone number"
                        type="text"
                        placeHolder="enter your number..."
                        name="phone"
                        value={phone}
                        onChange={this.onChange}
                        error={errors.phone}
                      />

                      <Button
                        type="submit"
                        background={mainColurs.tomato}
                        colour={mainColurs.white}
                        hoverBG={mainColurs.blackLight}
                      >
                        Update Contact
                      </Button>
                    </Form>
                  ) : null}
                </div>
              </Card>
            </>
          );
        }}
      </Consumer>
    );
  }
}
