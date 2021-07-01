import { takeLatest, all, call, put } from 'redux-saga/effects';
import { toast } from 'react-toastify';

import { requireSucesso, requireError } from './actions';
import api from '~/services/api';
import history from '~/services/history';

export function* Entrar({ payload }) {
  try {
    const { email, password } = payload;

    const resposta = yield call(api.post, 'sessions', {
      email,
      password,
    });

    const { token, user } = resposta.data;

    if (!user) {
      toast.error('Usuário não existe, cadastre-se :)');
      return;
    }
    yield put(requireSucesso(token, user));

    history.push('/listaMeetup');
  } catch (err) {
    toast.error('Falha, algo de errado aconteceu :( , verifique seus dados');
    yield put(requireError());
  }
}
export function* Cadastrar({ payload }) {
  try {
    const { name, email, password } = payload;
    yield call(api.post, 'users', {
      name,
      email,
      password,
    });

    history.push('/');
    toast.success('Cadastrado com sucesso!');
  } catch (err) {
    toast.error('Falha, verifique seus dados usados :( ');
    yield put(requireError());
  }
}

export function setarToken({ payload }) {
  if (!payload) return;

  const { token } = payload.auth;

  if (token) {
    api.defaults.headers.Authorization = `Bearer ${token}`;
  }
}

export function Sair() {
  history.push('/');
}

export default all([
  takeLatest('persist/REHYDRATE', setarToken),
  takeLatest('@auth/Entrar_Request', Entrar),
  takeLatest('@auth/Entrar_Cadastro_Request', Cadastrar),
  takeLatest('@auth/Sair_Aplicacao', Sair),
]);
