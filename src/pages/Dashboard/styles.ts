import { shade } from 'polished';
import styled, { css } from 'styled-components';

interface RequestProps {
  loading: boolean;
}

export const Title = styled.h1`
  font-size: 48px;
  color: #3a3a3a;
  margin-top: 80px;
  max-width: 450px;
  line-height: 56px;
`;

export const Form = styled.form`
  margin-top: 40px;
  max-width: 900px;

  display: flex;

  input {
    flex: 1;
    height: 70px;
    padding: 0 24px;
    border: 0;
    border-radius: 5px 0 0 5px;
    color: #3a3a3a;

    &::placeholder {
      color: #a8a8b3;
    }
  }

  button {
    width: 210px;
    height: 70px;
    background: #04d361;
    border-radius: 0 5px 5px 0;
    border: 0;
    color: #fff;
    font-weight: bold;
    transition: background-color 0.2s;

    &:hover {
      background: ${shade(0.2, '#04d361')};
    }
  }
`;

export const RequestsContainer = styled.div`
  margin-top: 80px;
  max-width: 900px;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
`;

// export const Request = styled.div<RequestProps>`
//   background: #fff;
//   border-radius: 5px;
//   width: 100%;
//   padding: 24px;
//   display: block;
//   text-decoration: none;
//   display: flex;
//   align-items: center;
//   transition: transform 0.2s, background-color 0.2s;
//   cursor: pointer;

// ${props =>
//   props.loading &&
//   css`
//     background: ${shade(0.2, '#fff')};
//     cursor: not-allowed;
//   `}

//   & + div {
//     margin-top: 16px;
//   }

//   &:hover {
//     transform: translateX(10px);
//   }

//   img {
//     width: 64px;
//     height: 64px;
//     border-radius: 50%;
//   }

//   div {
//     margin-left: 16px;
//     flex: 1;

//     strong {
//       font-size: 20px;
//       color: #3d3d4d;
//     }

//     p {
//       font-size: 18px;
//       color: #a8a8b3;
//       margin-top: 4px;
//     }
//   }

//   svg {
//     margin-left: auto;
//     color: #cbcbd6;
//   }
// `;

export const Request = styled.div<RequestProps>`
  cursor: pointer;
  display: block;
  position: relative;
  max-width: 262px;
  background-color: #f2f8f9;
  border-radius: 4px;
  padding: 32px 24px;
  margin: 12px;
  text-decoration: none;
  z-index: 0;
  overflow: hidden;

  ${props =>
    props.loading &&
    css`
      background: ${shade(0.2, '#fff')};
      cursor: not-allowed;
    `}

  h3 {
    color: #262626;
    font-size: 17px;
    line-height: 24px;
    font-weight: 700;
    margin-bottom: 4px;
  }

  p {
    font-size: 17px;
    font-weight: 400;
    line-height: 20px;
    color: #666666;
    font-size: 14px;
  }

  &:before {
    content: '';
    position: absolute;
    z-index: -1;
    top: -16px;
    right: -16px;
    background: #00838d;
    height: 32px;
    width: 32px;
    border-radius: 32px;
    transform: scale(1);
    transform-origin: 50% 50%;
    transition: transform 0.25s ease-out;
  }

  &:hover:before {
    transform: scale(21);
  }

  &:hover {
    p {
      transition: all 0.3s ease-out;
      color: rgba(255, 255, 255, 0.8);
    }
    h3 {
      transition: all 0.3s ease-out;
      color: #ffffff;
    }
  }

  > div {
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    width: 32px;
    height: 32px;
    overflow: hidden;
    top: 0;
    right: 0;
    background-color: #00838d;
    border-radius: 0 4px 0 32px;

    > div {
      margin-top: -4px;
      margin-right: -4px;
      color: white;
      font-family: courier, sans;
    }
  }
`;
