export function requireEntrar(email, password) {
  return {
    type: '@auth/Entrar_Request',
    payload: { email, password },
  };
}

export function requireSucesso(token, user) {
  return {
    type: '@auth/Entrar_Sucess',
    payload: { token, user },
  };
}

export function cadastrarRequest(name, email, password) {
  return {
    type: '@auth/Entrar_Cadastro_Request',
    payload: { name, email, password },
  };
}

export function requireError() {
  return {
    type: '@auth/Entrar_Error',
  };
}

export function Sair() {
  return {
    type: '@auth/Sair_Aplicacao',
  };
}
