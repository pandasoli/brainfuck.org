import nookies from 'nookies'

import JavaScriptHighlight from './Highlight/JavaScript'
import BFHighlight from './Highlight/Brainfuck'
import JSONHighlight from './Highlight/JSON'

import Button from '../Button'
import Container, { Main, LineNumbers, Background } from './block.styles'

export type Props = {
  code: string
  lineNumbers?: boolean | undefined
  noCopy?: boolean | undefined
  language?: 'brainfuck' | 'json' | 'javascript' | string
}


const BlockCode = (props: Props) => {
  const $btnCopy_click = () => {
    navigator.clipboard.writeText(props.code)
  }

  const $btnRun_click = () => {
    nookies.set(null, 'from-code', props.code)
    document.location.href = '/from'
  }

  return <Container className={ props.noCopy ? 'noCopy' : '' }>
    {
      props.lineNumbers &&
        <LineNumbers>
          {
            props.code.split('\n').map(($, _) =>
              <li key={ _ }>{ _ + 1 }</li>
            )
          }
        </LineNumbers>
    }

    <Main>
      {
        props.language === 'brainfuck'  ? <BFHighlight code={ props.code }/>                                     :
        props.language === 'javascript' ? <JavaScriptHighlight code={ props.code }/>                             :
        props.language === 'json'       ? <div dangerouslySetInnerHTML={{ __html: JSONHighlight(props.code) }}/> :
        props.code
      }
    </Main>

    {
      !props.noCopy &&
      <Background className='background'>
        <Button className='mini' color='secondary' onClick={ $btnCopy_click }>Copy</Button>

        {
          props.language === 'brainfuck' &&
          <Button className='mini' onClick={ $btnRun_click }>Run</Button>
        }
      </Background>
    }
  </Container>
}


export default BlockCode