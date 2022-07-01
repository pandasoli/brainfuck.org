import { createGlobalStyle } from 'styled-components'


export const GlobalStyle = createGlobalStyle`
  @font-face {
    font-family: 'FiraCode';
    src: url('/fonts/FiraCode.ttf');
  }

  @font-face {
    font-family: 'MavenPro';
    src: url('/fonts/MavenPro.ttf');
  }

  @font-face {
    font-family: 'Alpha centauri';
    src: url('/fonts/Alphacentauri.ttf');
  }

  * {
    margin: 0px;
    padding: 0px;
    box-sizing: border-box;

    color: var(--primary-font-cl);
    line-height: 1.33;
    font-size: min(4.2vw, 1.06rem);
    font-family: 'MavenPro';
    font-weight: normal;
    text-rendering: optimizeLegibility;
    text-decoration: none;

    image-rendering: optimizeQuality;

    transition: all .2s;
    appearance: none;
    outline: none;
    border: none;
    background-color: transparent;

    --primary-font-cl: #e7f0ea;

    --primary-cl: #05090e;
    --primary-cl-light: #0b121c;

    --secondary-cl: #d2de78;
    --secondary-cl-rgb: 210, 222, 120;

    --red-cl: #de5971;

    --box-shadow: 0px 0px 3px var(--secondary-cl);

    --header-1: 64px;
    --header-2: 48px;
    --header-3: 42px;
    --header-4: 32px;

    --text-medium: 10px;
    --text-regular: 16px;
    --text-light: 13px;

    --font-weight-bold: 700;
    --font-weight-semi-bold: 600;
    --font-weight-medium: 500;
    --font-weight-regular: 400;
    --font-weight-light: 300;

    --sm-size: 768px;
    --md-size: 992px;
    --lg-size: 1200px;
  }

  body {
    display: flex;
    flex-direction: column;

    min-height: 100vh;

    background-color: var(--primary-cl);
  }

  #root {
    display: flex;
    flex-direction: column;
    flex-grow: 1;
  }

  a {
    color: var(--primary-font-cl);

    &:hover {
      color: var(--secondary-cl);
    }
  }

  ::selection {
    color: var(--primary-cl);
    background-color: var(--secondary-cl);
  }

  ::-webkit-scrollbar {
    height: 6px;
    width: 6px;

    background-color: transparent;
  }

  ::-webkit-scrollbar-thumb {
    border-radius: 6px;
    background-color: var(--secondary-cl);
  }

  span {
    opacity: .8;
  }

  .pace {
    user-select: none;
    pointer-events: none;

    .pace-progress {
      position: fixed;

      height: 3px;
      width: 100%;

      top: 0px;
      right: 100%;
      z-index: 99;

      background-color: var(--secondary-cl);
    }
  }

  .pace-inactive {
    display: none;
  }
`
