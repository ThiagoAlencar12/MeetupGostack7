import produce from 'immer';

const ESTADO_INICIAL = {
  profile: null,
};

export default function user(state = ESTADO_INICIAL, action) {
  return produce(state, draft => {
    switch (action.type) {
      case '@auth/Entrar_Sucess': {
        draft.profile = action.payload.user;
        break;
      }
      case '@user/Atualizar_Conta_Sucess': {
        draft.profile = action.payload.profile;
        break;
      }
      case '@auth/Sair_Aplicacao': {
        draft.profile = null;
        break;
      }
      default:
    }
  });
}
