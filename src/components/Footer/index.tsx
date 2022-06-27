import Container, { Divider, Title } from './index.styles'


const Footer = () =>
  <Container>
    <Divider>
      <Title>Project repo</Title>

      <span><a href=''>GitHub</a></span>
    </Divider>

    <Divider>
      <Title>Credits</Title>

      <span><a href='github.com/pandasoli'>GitHub/PandaSoli</a></span>
      <span><a href='instagram.com/pandasoli.ofc'>Instagram/PandaSoli.ofc</a></span>
      <span><a href='facebook.com/pandasoli.ofc'>Facebook/PandaSoli.ofc</a></span>
    </Divider>
  </Container>


export default Footer