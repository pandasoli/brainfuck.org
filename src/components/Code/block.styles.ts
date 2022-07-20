import styled from 'styled-components'


export default styled.section`
  position: relative;
  display: flex;

  width: 100%;
  max-width: 100%;

  @media (max-width: 768px) { max-width: 100%; }
  @media (min-width: 768px) { max-width: 768px; } // --sm-size
  @media (min-width: 992px) { max-width: 992px; } // --md-size

  margin: 4px;
  padding-right: 10px;
  padding-left: 20px;

  * {
    font-family: 'FiraCode' !important;
    font-size: .8rem !important;
  }

  &.noCopy {
    padding-right: 0;
  }

  &:hover .background {
    opacity: 1;
  }
`

export const LineNumbers = styled.ol`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;

  min-width: 30px;

  margin: 0;
  padding: 4px;

  list-style: none;
  user-select: none;

  border-radius: 4px;
  background-color: var(--primary-cl-light);

  li {
    cursor: default;
    color: #565f89;

    &:hover {
      color: #7079a4;
    }
  }
`

export const Main = styled.code`
  width: 100%;

  @media (max-width: 768px) { max-width: 100%; }
  @media (min-width: 768px) { max-width: 768px; } // --sm-size
  @media (min-width: 992px) { max-width: 992px; } // --md-size

  overflow: auto;
`

export const Background = styled.div`
  position: absolute;

  right: 10px;

  opacity: 0;
  transition: opacity .6s;
`
