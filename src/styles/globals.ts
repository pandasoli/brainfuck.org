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
    --red: #e82f2c;
    --yellow: #dee82c;

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

    overflow: overlay;

    background-color: var(--primary-cl);
  }

  #root {
    display: flex;
    flex-direction: column;
    flex-grow: 1;
  }

  .btn {
    display: inline-block;

    margin: 4px;
    padding: 9px 40px;
    border-radius: 6px;

    font-size: min(4.4vw, 1.06rem);
    font-family: 'MavenPro';
    cursor: pointer;
    font-size: var(--text-regular);
    font-weight: var(--font-weight-medium);
    text-align: center;
    text-decoration: none;
    user-select: none;

    color: var(--primary-font-cl);
    border-radius: 25px;
    transition: opacity .6s, background-color .6s, color .2s;
    background-color: transparent;
    border: 1px solid var(--primary-font-cl);

    /* a {
      position: relative;
      display: flex;
      justify-content: center;
      align-items: center;

      height: 100%;
      width: 100%;

      padding: 9px 40px;

      opacity: 1;
      text-decoration: none;
    } */

    &[disabled] {
      opacity: .7;

      &, & * {
        cursor: no-drop;
      }
    }

    /* &.mini {
      padding: 5px 40px;

      &.link {
        padding: 0px;

        a {
          padding: 5px 40px;
        }
      }
    }

    &.link {
      padding: 0px;
    } */

    &:hover:not([disabled]) {
      color: var(--primary-cl);
      border: 1px solid var(--primary-font-cl);
      background-color: var(--primary-font-cl);
    }
/* 
    @mixin colored-shadows($color) {
      box-shadow: 0px 0px 3px $color;
      border-color: $color;
    }

    &.err {
      @include colored-shadows(#c34040);
    }

    &.success {
      @include colored-shadows(#25d42e);
    } */
  }

  a {
    color: var(--primary-font-cl);

    &:hover {
      color: var(--secondary-cl);
    }
  }

  /* .btn.btn-primary:focus,
  .navbar-toggler:focus,
  .form-control:focus {
    box-shadow: 0 0 0 0.25rem rgba(67, 237, 116, .8);
  } */

  /* .btn.btn-primary {
    margin: 5px;

    background-color: var(--primary-cl);
    border-color: var(--secondary-cl);

    &:hover *,
    &:hover {
      color: var(--white) !important;
      background-color: var(--primary-cl-light);
    }
  } */

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
    background-color: var(--primary-cl);
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

      background-color: var(--primary-cl);
    }
  }

  .pace-inactive {
    display: none;
  }
`
