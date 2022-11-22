// styles/global-styles.ts
import { createGlobalStyle } from 'styled-components';
import { themeType } from './theme';

export const GlobalStyle = createGlobalStyle`
#__next{
  width: 100%;
  height: 100%;
}

@font-face {
  font-family: "GmarketSansLight";
  src: url("https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2001@1.1/GmarketSansLight.woff")
    format("woff");
  font-weight: normal;
  font-style: normal;
}
@font-face {
  font-family: "GmarketSansMedium";
  src: url("https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2001@1.1/GmarketSansMedium.woff")
    format("woff");
  font-weight: normal;
  font-style: normal;
}
@font-face {
  font-family: "GmarketSansBold";
  src: url("https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2001@1.1/GmarketSansBold.woff")
    format("woff");
  font-weight: normal;
  font-style: normal;
}


* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
  font-family: GmarketSansMedium;
  
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

@media (max-width: 768px) {
  html,
  body {
    font-size: 14px;
  }
}

`;
