import styled from 'styled-components';
import { darken } from 'polished';

export const Container = styled.div`
  background: #191620;
  padding: 0 30px;
`;

export const Content = styled.div`
  height: 60px;
  max-width: 1000px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;

  nav {
    display: flex;
    align-items: center;

    img {
      margin-right: 10px;
      padding-right: 10px;
    }

    a {
      font-weight: bold;
      color: #7159c1;
    }
  }
  aside {
    display: flex;
    align-items: center;
  }
`;

export const Profile = styled.div`
  display: flex;
  margin-left: 20px;
  padding-left: 20px;
  border-left: 1px solid;

  div {
    text-align: right;
    margin-right: 10px;

    strong {
      display: block;
      color: #ff0000;
    }

    a {
      display: block;
      margin-top: 2px;
      font-size: 12px;
      color: #999;
    }
  }

  button {
    background: #d44059;
    border: 0;
    border-radius: 4px;
    height: 37px;
    width: 71px;
    margin-left: 10px;
    color: #fff;
    font-size: 16px;
    font-weight: bold;
    transition: background 0.2s;
    &:hover {
      background: ${darken(0.08, '#f94d6a')};
    }
  }
`;
