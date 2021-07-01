import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

import logo from '~/assets/logo.svg';
import { Sair } from '~/store/modules/auth/actions';

import { Container, Content, Profile } from './styles';

export default function Header() {
  const dispatch = useDispatch();
  const conta = useSelector(state => state.user.profile);

  function sairAplicacao() {
    dispatch(Sair());
  }

  return (
    <Container>
      <Content>
        <nav>
          <Link to="/listaMeetup">
            <img src={logo} alt="Meetup" />
          </Link>
        </nav>

        <aside>
          <Profile>
            <div>
              <strong>{conta.name}</strong>
              <Link to="/profileConta">Meu Perfil</Link>
            </div>
            <button type="button" onClick={sairAplicacao}>
              Sair
            </button>
          </Profile>
        </aside>
      </Content>
    </Container>
  );
}
