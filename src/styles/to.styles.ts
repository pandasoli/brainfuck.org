import styled from 'styled-components'


export const Hero = styled.div`
  position: absolute;

  width: 100vw;
  height: 68vh;

  z-index: -1;
  background-image: url('/images/background.jpg');
  background-position: 50%;
  background-size: cover;
  background-attachment: fixed;
`

export const HeroBackground = styled.div`
  position: absolute;

  height: 100%;
  width: 100%;

  background-color: rgba(0, 0, 0, .6);

  z-index: 0;
`

export const Header = styled.header`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;

  width: 100%;
  @media (min-width: 768px) { max-width: 768px; } // --sm-size
  @media (min-width: 992px) { max-width: 992px; } // --md-size
  @media (min-width: 1200px) { max-width: 1200px; } // --lg-size

  padding-bottom: 10px;

  & > div {
    display: flex;
    justify-content: center;

    .range {
      margin-top: 40px;
    }
  }

  & > div:first-child {
    align-items: flex-end;
  }

  & > div:nth-child(2) {
    flex-direction: column;

    & > div {
      display: flex;
      align-items: center;
      margin: 1px;

      & > label {
        margin-right: 10px;
      }
    }

    & > div.form-check.form-check-inline {
      display: block;
    }
  }

  @media (max-width: 680px) {
    flex-direction: column;

    div {
      justify-content: center;
    }
  }
`

export const Main = styled.main`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  width: 100%;
`

export const Editor = styled.div`
  display: flex;
  flex-grow: 1;
  position: relative;
  border-radius: 4px;
  overflow: hidden;
  z-index: 2;

  width: 100%;
  min-height: 400px;

  @media (min-width: 768px) { max-width: 768px; } // --sm-size
  @media (min-width: 992px) { max-width: 992px; } // --md-size
  @media (min-width: 1200px) { max-width: 1200px; } // --lg-size

  * {
    font-family: 'FiraCode';
    font-size: .8rem;
  }

  input {
    position: relative;

    height: 100%;
    width: 100%;
    min-height: 400px;

    margin: 0px;
    padding: 0px;

    text-align: center;

    border: 0px;
  }
`

export const EditorBackground = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  height: 100%;
  width: 100%;

  background-color: rgba(0, 0, 0, .3);

  span {
    font-size: 2rem;
  }
`

export const ResultPanel = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  flex-wrap: wrap;
  margin: 8px 6px;

  label {
    font-family: 'FiraCode';
    font-size: .8rem;
    word-break: break-all;
  }

  .mini {
    margin: 6px 20px;
  }
`
