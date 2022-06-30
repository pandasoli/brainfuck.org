import IconLabel from '../IconLabel'

import Container, { Divider, Title } from './index.styles'


const Footer = () =>
  <Container>
    <Divider>
      <Title>Project repo</Title>

      <a href='github.com/pandasoli/brainfuck.org'>GitHub</a>
    </Divider>

    <Divider>
      <Title>Credits</Title>

      <IconLabel icon='github' text='pandasoli' link='github.com/pandasoli'/>
      <IconLabel icon='instagram' text='pandasoli.ofc' link='instagram.com/pandasoli.ofc'/>
      <IconLabel icon='facebook' text='pandasoli.ofc' link='facebook.com/pandasoli.ofc'/>
    </Divider>
  </Container>


export default Footer