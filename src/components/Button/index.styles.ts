import styled, { css } from 'styled-components'
import { Button as ButtonStyle } from 'reactstrap'


const Btn = (ft: string, bg: string, outline: boolean) => css`
  color: var(${outline ? bg : ft}) !important;
  background-color: ${outline ? 'transparent' : `var(${bg})`} !important;
  border: 1px solid var(${bg}) !important;

  &:hover:not(:disabled),
  &:focus:not(:disabled) {
    color: var(${outline ? ft : bg}) !important;
    background-color: ${outline ? `var(${bg})` : 'transparent'} !important;
  }

  &:focus:not(:disabled) {
    --cl: rgba(var(${bg + '-rgb'}), .60);
    border-color: var(--cl) !important;
    box-shadow: 0 0 0 .25rem var(--cl);
  }
`


export default styled(ButtonStyle)`
  display: inline-block;
  margin: 4px 8px;
  padding: 9px 40px;
  border-radius: 6px;
  cursor: pointer;
  text-align: center;
  text-decoration: none;
  user-select: none;
  border-radius: 25px;
  transition: opacity .6s, background-color .6s, color .6s, border-color .6s, box-shadow .2s;
  ${ Btn('--primary-cl', '--primary-font-cl', false) }

  &.btn-outline-primary {
    ${ Btn('--primary-cl', '--primary-font-cl', true) }
  }

  &.btn-secondary {
    ${ Btn('--primary-cl-light', '--light-cl', false) }
  }
  &.btn-outline-secondary {
    ${ Btn('--primary-cl-light', '--light-cl', true) }
  }

  &.mini {
    padding: 5px 40px;
  }

  &.btn-success {
    ${ Btn('--primary-cl', '--green-cl', false) }
  }
  &.btn-outline-success {
    ${ Btn('--primary-cl', '--green-cl', true) }
  }

  &.btn-warning {
    ${ Btn('--primary-cl', '--yellow-cl', false) }
  }
  &.btn-outline-warning {
    ${ Btn('--primary-cl', '--yellow-cl', true) }
  }

  &.btn-error {
    ${ Btn('--primary-cl', '--red-cl', false) }
  }
  &.btn-outline-error {
    ${ Btn('--primary-cl', '--red-cl', true) }
  }

  &:disabled {
    opacity: .8;
    &, & * {
      cursor: no-drop;
    }
  }
`
