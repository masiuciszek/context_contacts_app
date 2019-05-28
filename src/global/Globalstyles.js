import styled, { createGlobalStyle } from 'styled-components';

export const mainColurs = {
  blackPrimary: '#131A1C',
  blackLight: '#262730',
  brown: '#694D4C',
  tomato: '#F05408',
  tomato2: '#Fd7708',
  goldenBrown: '#9E7F65',
  white: '#fff',
  transparentLight: 'rgba(229,229,229,.2)'
};

export const GlobalStyle = createGlobalStyle`
  *::before,
  *,
  *::after{
    margin: 0;
    padding: 0;
    box-sizing: inherit;
  }
  html{
    font-size: 10px;
  }
  body{
    box-sizing: border-box;
    @import url('https://fonts.googleapis.com/css?family=Mandali&display=swap');
    font-family: 'Mandali', sans-serif;
    color: ${mainColurs.white};
    background:  linear-gradient(to left, ${mainColurs.blackPrimary}, ${
  mainColurs.white
});
    height: 100vh;
  }
  ul{
    list-style: none;
  }
  a {
    text-decoration: none;
  }
`;

export const pageWrapper = styled.div``;
