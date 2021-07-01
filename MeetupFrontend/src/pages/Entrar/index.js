import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Form, Input } from '@rocketseat/unform';
import * as Yup from 'yup';

import { requireEntrar } from '~/store/modules/auth/actions';

import logo from '~/assets/logo.svg';

export default function Entrar() {
  const dispatch = useDispatch();
  const carregando = useSelector(state => state.auth.loading);

  const validar = Yup.object().shape({
    email: Yup.string()
      .email('Insira um e-mail válido')
      .required('E-mail obrigatório'),
    password: Yup.string().required('Senha obrigatória'),
  });

  function Submit({ email, password }) {
    dispatch(requireEntrar(email, password));
  }

  return (
    <>
      <img src={logo} alt="Meetup" />
      <Form schema={validar} onSubmit={Submit}>
        <Input
          name="email"
          type="email"
          placeholder="Digite seu e-mail cadastrado"
        />
        <Input
          name="password"
          type="password"
          placeholder="Digite sua Senha cadastrada"
        />

        <button type="submit">{carregando ? 'Carregando...' : 'Entrar'}</button>
        <Link to="/registraMeetup"> Cadastrar </Link>
      </Form>
    </>
  );
}
