export function atualizarContaRequest(data) {
  return {
    type: '@user/Atualizar_Conta_Request',
    payload: { data },
  };
}

export function atualizarContaSucess(profile) {
  return {
    type: '@user/Atualizar_Conta_Sucess',
    payload: { profile },
  };
}

export function atualizarContaError() {
  return {
    type: '@user/Atualizar_Conta_Error',
  };
}
