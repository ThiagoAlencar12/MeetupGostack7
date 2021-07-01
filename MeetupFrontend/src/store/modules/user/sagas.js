import { takeLatest, all, call, put } from 'redux-saga/effects';
import { toast } from 'react-toastify';

import api from '~/services/api';

import { atualizarContaSucess, atualizarContaError } from './actions';

export function* atualizarConta({ payload }) {
  console.tron.log(payload);
  try {
    const { name, email, ...rest } = payload.data;
    const profile = Object.assign(
      { name, email },
      rest.oldPassword ? rest : {}
    );

    const resposta = yield call(api.put, 'users', profile);

    toast.success('Perfil atualizado com sucesso :) ');

    yield put(atualizarContaSucess(resposta.data));
  } catch (err) {
    toast.error('Erro ao atualizar perfil, confira seus dados digitados :( ');
    yield put(atualizarContaError());
  }
}

export default all([
  takeLatest('@user/Atualizar_Conta_Request', atualizarConta),
]);
