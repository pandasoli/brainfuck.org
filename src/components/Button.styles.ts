import styled from 'styled-components'
import { Button } from 'reactstrap'


export default styled(Button)`
  --cl: var(--primary-font-cl);

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

  color: var(--cl);
  border-radius: 25px;
  transition: opacity .6s, background-color .6s, color .2s;
  background-color: transparent;
  border: 1px solid var(--cl);

  &.mini {
    padding: 5px 40px;
  }

  &.success {
    --cl: var(--bs-teal);
  }

  &:hover:not([disabled]),
  &:focus {
    color: var(--primary-cl);
    border: 1px solid var(--cl);
    background-color: var(--cl);

    &:focus {
      box-shadow: 0 0 0 .25rem #e7f0eaad;
    }
  }

  &[disabled] {
    opacity: .7;

    &, & * {
      cursor: no-drop;
    }
  }
`

