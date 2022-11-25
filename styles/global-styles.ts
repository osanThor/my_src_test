// styles/global-styles.ts
import { createGlobalStyle } from 'styled-components';
import { media, themeType } from './theme';

export const GlobalStyle = createGlobalStyle`
#__next{
  width: 100%;
  height: 100%;
}



* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
  font-family: "GmarketSans";
  font-weight: 500;
}
html,
body {
  width: 100%;
  height: 100%;
  font-size: 16px;
  scroll-behavior: smooth;
}

body{
  background-color: ${({ theme }: { theme: themeType }) => theme.bgColor} !important;
  color: ${({ theme }: { theme: themeType }) => theme.textColor} !important;
}

a {
  color: inherit;
  text-decoration: none;
}

img {
  border: 0;
  display: block;
}
header,
main,
footer,
nav,
section,
article,
aside {
  display: block;
}

${media.tablet}  {
  html,
  body {
    font-size: 14px;
  }
}

`;
