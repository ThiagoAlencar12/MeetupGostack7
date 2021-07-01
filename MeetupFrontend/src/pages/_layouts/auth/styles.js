import styled from 'styled-components';
import { darken } from 'polished';

export const Wrapper = styled.div`
  background: linear-gradient(-180deg, #22202c, #402845);
  height: 100%;

  display: flex;
  justify-content: center;
  align-items: center;

  img {
    width: 100px;
    height: 120px;
  }
`;

export const Content = styled.div`
  width: 100%;
  max-width: 315px;
  text-align: center;

  form {
    display: flex;
    flex-direction: column;
    margin-top: 30px;

    input {
      background: rgba(0, 0, 0, 0.1);
      border: 0;
      height: 44px;
      border-radius: 4px;
      padding: 0 15px;
      color: #fff;
      margin: 0 0 5px;

      &::placeholder {
        color: rgba(255, 255, 255, 0.8);
      }
    }

    span {
      color: #dc143c;
      align-self: flex-start;
      margin: 0 0 5px;
      font-weight: bold;
      font-size: 13px;
    }

    button {
      margin: 5px 0 0;
      height: 44px;
      background: rgb(93, 0, 255);
      font-weight: bold;
      color: #fff;
      border: 0;
      border-radius: 4px;
      font-size: 16px;
      transition: background 0.2s;

      &:hover {
        background: ${darken(0.03, '#3b9eff')};
      }
    }

    a {
      color: #fff;
      margin-top: 15px;
      font-size: 16px;
      opacity: 0.8;

      &:hover {
        opacity: 1;
      }
    }
  }
`;
