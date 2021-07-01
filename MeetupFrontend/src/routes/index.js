import React from 'react';
import { Switch } from 'react-router-dom';
import Route from './Route';

import Entrar from '../pages/Entrar';
import Cadastro from '../pages/Cadastro';

import Dashboard from '../pages/Dashboard';
import Profile from '../pages/Profile';

import CriarMeetup from '~/pages/Meetup/Create';
import DetalhesMeetup from '~/pages/Meetup/Detail';
import EditaMeetup from '~/pages/Meetup/Edit';

export default function Routes() {
  return (
    <Switch>
      <Route path="/" exact component={Entrar} />
      <Route path="/registraMeetup" exact component={Cadastro} />
      <Route path="/listaMeetup" exact component={Dashboard} isPrivate />
      <Route path="/profileConta" exact component={Profile} isPrivate />

      <Route path="/meetup" exact component={CriarMeetup} isPrivate />
      <Route path="/meetup/:id/edit" exact component={EditaMeetup} isPrivate />
      <Route path="/meetup/:id" exact component={DetalhesMeetup} isPrivate />

      <Route path="/" component={() => <h1>404</h1>} />
    </Switch>
  );
}

// rotas privadas servem como comandos JSX para componentes de páginas
