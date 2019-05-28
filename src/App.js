import React from 'react';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import { GlobalStyle } from './global/Globalstyles';
import Header from './components/layout/Header';
import { Container, Row } from './global/grid';
import { randomStuff, funnyTitle } from './helper';
import { Provider } from './context';
import Contacts from './components/contacts/Contacts';
import AddContact from './components/contacts/AddContact';
import About from './components/pages/About';
import NotFound from './components/pages/NotFound';
import EditContact from './components/contacts/EditContact';
import Test from './components/test/Test';

export default function App() {
  return (
    <Provider>
      <Router>
        <GlobalStyle />
        <Header title={randomStuff(funnyTitle)} />
        <Container>
          <Switch>
            <Route exact path="/" component={Contacts} />
            <Route path="/about" component={About} />
            <Route path="/contact/add" component={AddContact} />
            <Route path="/contact/edit/:id" component={EditContact} />
            <Route path="/testing123" component={Test} />
            <Route component={NotFound} />
          </Switch>
        </Container>
      </Router>
    </Provider>
  );
}
