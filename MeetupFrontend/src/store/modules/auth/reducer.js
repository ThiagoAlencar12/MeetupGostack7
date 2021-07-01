import produce from 'immer';

const ESTADO_INICIAL = {
  token: null,
  signed: false,
  loading: false,
};

export default function autentica(state = ESTADO_INICIAL, action) {
  return produce(state, draft => {
    switch (action.type) {
      case '@auth/Entrar_Request': {
        draft.loading = true;
        break;
      }
      case '@auth/Entrar_Sucess': {
        draft.token = action.payload.token;
        draft.signed = true;
        draft.loading = false;
        break;
      }
      case '@auth/Entrar_Error': {
        draft.loading = false;
        break;
      }
      case '@auth/Sair_Aplicacao': {
        draft.token = null;
        draft.signed = false;
        break;
      }
      default:
    }
  });
}
