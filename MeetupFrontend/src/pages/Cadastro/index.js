import React from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { Form, Input } from '@rocketseat/unform';
import * as Yup from 'yup';

import logo from '~/assets/logo.svg';

import { cadastrarRequest } from '~/store/modules/auth/actions';

export default function Entrar() {
  const validar = Yup.object().shape({
    name: Yup.string().required('Nome obrigatório'),
    email: Yup.string()
      .email('Insira um e-mail válido')
      .required('E-mail obrigatório'),
    password: Yup.string()
      .min(6, 'Sua senha precisa de no minimo 6 dígitos')
      .required('Senha obrigatória'),
  });

  const dispatch = useDispatch();

  function SubmitCadastro({ name, email, password }) {
    dispatch(cadastrarRequest(name, email, password));
  }

  return (
    <>
      <img src={logo} alt="Meetup" />

      <Form schema={validar} onSubmit={SubmitCadastro}>
        <Input name="name" placeholder="Digite o seu nome completo" />
        <Input
          name="email"
          type="email"
          placeholder="Digite seu e-mail para cadastro"
        />
        <Input
          name="password"
          type="password"
          placeholder="Digite sua senha para cadastro"
        />

        <button type="submit">Criar Conta</button>
        <Link to="/"> Já tenho Login </Link>
      </Form>
    </>
  );
}
