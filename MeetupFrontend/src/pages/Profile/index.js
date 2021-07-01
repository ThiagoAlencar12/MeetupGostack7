import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Form, Input } from '@rocketseat/unform';

import { atualizarContaRequest } from '~/store/modules/user/actions';

import Loading from '~/components/Loading';

import { Container, SubmitButton } from './styles';

export default function Profile() {
  const profile = useSelector(state => state.user.profile);
  const loading = useSelector(state => state.user.loading);
  const dispatch = useDispatch();

  function enviarDados(data) {
    dispatch(atualizarContaRequest(data));
    console.tron.log(data);
  }

  return (
    <Container>
      <Form initialData={profile} onSubmit={enviarDados}>
        <Input name="name" placeholder="Nome Completo" />
        <Input name="email" type="email" placeholder="Seu E-mail completo" />

        <hr />

        <Input
          type="password"
          name="oldPassword"
          placeholder="Sua Senha Atual"
        />
        <Input
          type="password"
          name="password"
          placeholder="Digite uma senha nova"
        />
        <Input
          type="password"
          name="confirmPassword"
          placeholder="Confirme sua senha"
        />

        <SubmitButton loading={loading ? 1 : 0}>
          {loading ? <Loading height={20} /> : 'Atualizar'}
        </SubmitButton>
      </Form>
    </Container>
  );
}
