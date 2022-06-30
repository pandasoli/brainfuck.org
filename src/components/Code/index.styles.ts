import styled from 'styled-components'


export default styled.div`
  position: relative;
  display: flex;

  margin: 4px;
  padding-right: 20px;

  overflow: visible;

  &.extended {
    width: 100%;
    max-width: 768px; // --sm-size
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
  display: block;

  margin: 0 4px;
  padding: 4px;

  width: 100%;

  border-radius: 4px;
  background-color: var(--primary-cl-light);
`

export const Background = styled.div`
  position: absolute;

  height: 100%;
  width: 20px;

  top: 0;
  right: 0;

  opacity: 0;
  transition: opacity .6s;
`

export const CopySvg = styled.svg`
  height: 20px;

  opacity: .8;
  transition: opacity .6s;

  g path {
    fill: var(--primary-font-cl);
  }

  &:hover {
    opacity: 1;
  }
`
