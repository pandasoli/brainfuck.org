import styled from 'styled-components'


export default styled.div`
  display: flex;

  &.extended {
    width: 100%;
    max-width: 768px; // --sm-size
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
