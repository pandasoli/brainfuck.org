import styled from 'styled-components'


export default styled.section`
  display: flex;

  width: 100%;
  max-width: 768px; // --sm-size

  margin: 4px;
  padding-right: 20px;

  overflow: visible;

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
  justify-content: center;
  align-items: center;

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
`

export const Background = styled.div`
  width: 20px;

  opacity: 0;
  transition: opacity .6s;
`

export const Svg = styled.svg`
  height: 20px;

  cursor: pointer;

  opacity: .8;
  transition: opacity .6s;

  g path {
    fill: var(--primary-font-cl);
  }

  &:hover {
    opacity: 1;
  }
`
