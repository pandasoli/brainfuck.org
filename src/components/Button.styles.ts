import styled from 'styled-components'
import { Button } from 'reactstrap'


export default styled(Button)`
  &.btn-outline-primary,
  &.btn-primary {
    --font-cl: var(--primary-cl);
    --bg-cl: var(--primary-font-cl);
    --border-cl: var(--primary-font-cl);

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
    color: var(--font-cl);

    background-color: var(--bg-cl);
    border-radius: 25px;
    transition: opacity .6s, background-color .6s, color .2s;
    border: 1px solid var(--border-cl);
  }

  
  &.btn-outline-primary {
    --font-cl: var(--primary-font-cl);
    --bg-cl: transparent;
  }

  &.mini {
    padding: 5px 40px;
  }

  &.success {
    --bg-cl: var(--bs-teal);
    --border-cl: var(--bs-teal);
  }

  &:hover:not([disabled]),
  &:focus:not([disabled]) {
    &.btn-primary {
      color: var(--bg-cl);
      background-color: transparent;
    }

    &.btn-outline-primary {
      color: var(--primary-cl);
      background-color: var(--font-cl);
    }
  }

  &:focus:not([disabled]) {
    box-shadow: 0 0 0 .25rem #e7f0eaad;
    
    &.success {
      box-shadow: 0 0 0 .25rem #20c997ad;
    }
  }

  &[disabled] {
    opacity: .7;

    &, & * {
      cursor: no-drop;
    }
  }
`

