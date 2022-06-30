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
} from './index.styles'

type Props = {
  code?: string
  focusAt?: number
  error?: boolean | undefined
  warnings?: number[]
}


const BFHighlight = (props: Props) => {
  const ElementProps = (key: number) => ({
    key,
    className: `
      ${key === props.focusAt ? 'focused' : ''}
      ${props.error ? 'error' : ''}
      ${props.warnings?.includes(key) ? 'warning' : ''}
    `
  })

  return <>
    {
      props.code?.split('').map(($, _) =>
        $ === '>' ? <MoveRight { ...ElementProps(_) }>{ $ }</MoveRight> :
        $ === '<' ? <MoveLeft { ...ElementProps(_) }>{ $ }</MoveLeft> :
        $ === '[' ? <StartLoop { ...ElementProps(_) }>{ $ }</StartLoop> :
        $ === ']' ? <EndLoop { ...ElementProps(_) }>{ $ }</EndLoop> :
        $ === '+' ? <Increment { ...ElementProps(_) }>{ $ }</Increment> :
        $ === '-' ? <Decrement { ...ElementProps(_) }>{ $ }</Decrement> :
        $ === '.' ? <Print { ...ElementProps(_) }>{ $ }</Print> :
        $ === ',' ? <AskChar { ...ElementProps(_) }>{ $ }</AskChar> :
        $ === '!' ? <EndProgram { ...ElementProps(_) }>{ $ }</EndProgram> :
        $ === '\n' ? <br { ...ElementProps(_) }/> :
        <Comment { ...ElementProps(_) }>{ $ }</Comment>
      )
    }
  </>
}


export default BFHighlight