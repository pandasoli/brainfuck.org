import CodeC, { Main, LineNumbers } from './index.styles'
import {
  MoveRight,
  MoveLeft,
  StartLoop,
  EndLoop,
  Increment,
  Decrement,
  Print,
  AskChar,
  EndProgram,
  Comment
} from './brainfuck.styles'

type Props = {
  code?: string
  size?: 'extended' | 'inline'
  lineNumbers?: boolean | undefined
}


const Code = (props: Props) => {
  return <CodeC className={ props?.size }>
    {
      props.lineNumbers &&
        <LineNumbers>
          {
            props.code?.split('\n').map(($, _) =>
              <li key={ _ }>{ _ + 1 }</li>
            )
          }
        </LineNumbers>
    }
    <Main>
      {
        props.code?.split('').map(($, _) =>
          $ === '>' ? <MoveRight key={ _ }>{ $ }</MoveRight> :
          $ === '<' ? <MoveLeft key={ _ }>{ $ }</MoveLeft> :
          $ === '[' ? <StartLoop key={ _ }>{ $ }</StartLoop> :
          $ === ']' ? <EndLoop key={ _ }>{ $ }</EndLoop> :
          $ === '+' ? <Increment key={ _ }>{ $ }</Increment> :
          $ === '-' ? <Decrement key={ _ }>{ $ }</Decrement> :
          $ === '.' ? <Print key={ _ }>{ $ }</Print> :
          $ === ',' ? <AskChar key={ _ }>{ $ }</AskChar> :
          $ === '!' ? <EndProgram key={ _ }>{ $ }</EndProgram> :
          $ === '\n' ? <br/> :
          <Comment key={ _ }>{ $ }</Comment>
        )
      }
    </Main>
  </CodeC>
}


export default Code