# 프로젝트

QUANTRO

## 프로젝트 설명

- 코인 투자 관련 거래소와 API 연동 서비스
- 투자 전략 관련 커뮤니티, 거래
- 사용자, 커뮤니티 관리 기능

## Client 시작하기

1. 작업 폴더 생성
2. 작업 폴더에 git repo clone

```bash
git clone https://gitlab.com/goodlaw.co.kr/quantro.git
```

3. yarn 설치 (yarn이 있다면 이 과정 생략)

```
npm install -g yarn
```

4. package 설치 및 develop server 구동

```bash
yarn install
# and
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### 기술 STACK

##### ![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB) ![Next JS](https://img.shields.io/badge/Next-black?style=for-the-badge&logo=next.js&logoColor=white) ![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E) ![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white) ![NODE](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white) ![Styled Components](https://img.shields.io/badge/styled--components-DB7093?style=for-the-badge&logo=styled-components&logoColor=white) ![REDUX](https://img.shields.io/badge/Redux-593D88?style=for-the-badge&logo=redux&logoColor=white) ![BABEL](https://img.shields.io/badge/Babel-F9DC3E?style=for-the-badge&logo=babel&logoColor=white)

### Dependencies(node 모듈: 라이브러리)

- next ver.12.3.1
- react ver.18.2.0
- MUI(Material-UI) ver.5.10.10
- babel-eslint ver.10.1.0
- axios ver.1.1.3
- @reduxjs/toolkit ver.1.8.6
- @types/react-redux ver.7.1.24
- @types/react-responsive ver.8.0.5
- apexcharts ver.3.36.3
- moment ver.2.29.4
- next-auth ver.4.16.4
- next-redux-saga ver.4.1.2
- next-redux-wrapper ver.8.0.0
- prettier ver.2.7.1
- react-apexcharts ver.1.4.0
- react-moment ver.1.1.2
- react-quill ver.2.0.0
- react-redux ver.8.0.4
- redux ver.4.2.0
- redux-actions ver.2.6.5
- redux-devtools-extension ver.2.13.9
- redux-saga ver.1.2.1
- styled-components ver.5.3.6
- swiper ver.8.4.4

### Develop Dependencies

- typescript ver.4.8.4
- @types/next-auth ver.3.15.0
- @types/node ver.18.11.9
- @types/react ver.18.0.21
- @types/styled-components ver.5.1.26
- @typescript-eslint/parser ver.5.41.0
- babel-plugin-styled-components ver.2.0.7
- eslint ver.8.27.0

### 폴더구조

#### pages

```bash
📦pages
 ┣ 📂admin
 ┃ ┣ 📂banners
 ┃ ┣ 📂boards
 ┃ ┣ 📂customers
 ┃ ┣ 📂dashboard
 ┃ ┣ 📂strategies
 ┃ ┣ 📂users
 ┃ ┗ 📜login.tsx
 ┣ 📂api
 ┃ ┣ 📂auth
 ┃ ┃ ┗ 📜[...nextauth].ts
 ┣ 📂auth
 ┣ 📂board
 ┣ 📂center
 ┣ 📂community
 ┣ 📂dashboard
 ┣ 📂licenses
 ┣ 📂message
 ┣ 📂mypage
 ┃ ┣ 📂inquiries
 ┣ 📂strategy
 ┃ ┣ 📂certified
 ┃ ┣ 📂user
 ┣ 📂write-quant
 ┣ 📜404.tsx
 ┣ 📜index.tsx
 ┣ 📜_app.tsx
 ┗ 📜_document.tsx
```

- admin: 관리자 페이지
- api: next-auth로 Google OAuth 인증를 위한 폴더
- board: 전략, 커뮤니티 상세페이지 API가 구분 되어있지 않아 상세페이지를 board로 통일 후 API 내 category 값으로 구분
- 404.tsx: 404 Error handler page
- \_app.tsx: next application
- \_document.tsx: SEO, redux store, styled-components Provider를, MUI Provider를 위한 document 설정 파일
- 그 외 = 사용자 페이지 폴더

#### sources(src)

```bash
📦src
 ┣ 📂admin
 ┃ ┣ 📂components
 ┃ ┣ 📂containers
 ┃ ┣ 📂layouts
 ┃ ┗ 📂pages
 ┣ 📂assets
 ┣ 📂components
 ┣ 📂interfaces
 ┣ 📂pages
 ┣ 📂store
 ┗ 📂utils
```

- admin: 관리자 페이지 소스
- assets: Image, Colors, Terms, Options 관리 폴더
- components: components style, state 관리 폴더(container 분리X)
- interfaces: pages와 components Props Type 관리 폴더
- pages: 페이지를 구성하는 components, states, event handler 관리 폴더(container 분리 X)
- store: Redux 상태관리, Server API 관리, redux-saga Aciton 관리, API Actions Types 관리 폴더
- utils: 전역적인 서비스 Class 객체 관리 폴더

#### 작업 리스트(남은 부분)

- 전략 상세 페이지 데이터 노출
- exchange API 구현(DASHBOARD, QUANT, LICENSE, MESSAGE 페이지)
- 테마 색상 변경 디테일 수정
- 언어 변경 구현
