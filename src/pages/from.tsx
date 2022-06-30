import { useEffect, useState, useCallback } from 'react'
import { Button, Input, Label, FormGroup } from 'reactstrap'

import FromBrainfuck from '../scripts/FromBrainfuck'
import FadeButton from '../components/FadeButton'
import FadeTitle from '../components/FadeTitle'
import CodeComponent from '../components/Code'
import Memory from '../components/Memory'
import Editor from '../components/Editor'
import Range from '../components/Range'

import { Header, FooterCharTable, Footer, Main, ResultPanel, Hero, HeroBackground } from '../styles/from.styles'

type Result = {
  memory: number[]
  pointer: number
  result: string
  index: number
  char: string
  loops: any[]
  error: string
  warning: string
  warnings: {
    index: number
    warning: string
  }[]
}

type CodeType = {
  edited: boolean
  code: string
  warnings: number[]
}


const From = () => {
  const [ Code, SetCode ] = useState<CodeType>({
    edited: false,
    code: '++++++++\n[\n  > ++++++++++\n  < -\n]\n> . P 80\n\n+++++++++++++++++ . a 97\n+++++++++++++ . n 110\n---------- . d 100\n--- . a 97\n!\n',
    warnings: []
  })

  const [ Speed, SetSpeed ] = useState<number>(30)
  const [ Result, SetResult ] = useState<Result>({} as Result)
  const [ MaxMemory, SetMaxMemory ] = useState<number>()
  const [ PauseInterpreter, SetPauseInterpreter ] = useState(true)
  const [ Warn, SetWarn ] = useState(true)

  const [ State, SetState ] = useState('stopped')
  const [ Interpreter, SetInterpreter ] = useState<Generator>({} as Generator)
  const [ Timer, SetTimer ] = useState<NodeJS.Timeout>({} as NodeJS.Timeout)

  document.title += ' | From Brainfuck'

  function fillArray(_length: number, _startBy: number = 0): null[] {
    const Result = []

    for (let x = _startBy; x <= _length; x++) {
      Result.push(null)
    }

    return Result
  }

  const InterpreterNext = useCallback((_step?: boolean) => {
    const response = Interpreter.next()
    SetResult(response.value)

    if ((response.value as Result)?.warnings?.length > 0) {
      SetCode({
        edited: false,
        code: Code.code,
        warnings: (response.value as Result).warnings.map(_warn => _warn.index)
      })
    }

    if (
      (response.value as Result).warning &&
      (response.value as Result).warning !== ''
    ) {
      SetCode({
        edited: false,
        code: Code.code,
        warnings: [...Code.warnings, (response.value as Result).index]
      })

      SetState('paused')
    }

    if (response.done)
      SetState('stopped')
    else if (_step)
      Interpreter.next()
  }, [ Code.code, Code.warnings, Interpreter ])

  const startTimer = useCallback(() => {
    SetTimer(setInterval(InterpreterNext, Speed))
  }, [ InterpreterNext, Speed ])

  const startInterpreter = useCallback((_step?: boolean) => {
    SetCode({ edited: false, code: Code.code, warnings: [] })
    SetInterpreter(
      FromBrainfuck(Code.code, _step ? true : PauseInterpreter, Warn, undefined, MaxMemory)
    )
  }, [ Code.code, MaxMemory, PauseInterpreter, Warn ])


  const $btnStop_click = () => {
    SetState('stopped')
    SetInterpreter({} as Generator)
    SetResult({} as Result)
    clearInterval(Timer)
  }

  const $btnExecute_click = () => {
    startInterpreter()
    SetState('executing')
  }

  const $btnPause_click = () => {
    SetState('paused')
    clearInterval(Timer)
  }

  const $btnContinue_click = () =>
    SetState('executing')

  const $btnStep_click = () => {
    SetState('stepped')

    if (Interpreter === null || Interpreter.next().done)
      startInterpreter(true)
    else
      InterpreterNext()
  }

  useEffect(() => {
    if (State === 'paused' || State === 'stopped')
      clearInterval(Timer as NodeJS.Timeout)
    else if (State === 'executing')
      startTimer()
    else if (State === 'stepped') {
      clearInterval(Timer as NodeJS.Timeout)
      InterpreterNext(true)
    }

  }, [ State, Timer, InterpreterNext, startTimer ])

  return <>
    <Hero>
      <HeroBackground/>
    </Hero>

    <Header>
      <div>
        {
          State === 'stopped' &&
            <>
              <Button className='success mini' onClick={ $btnExecute_click }>Execute</Button>
              <Button className='success mini' onClick={ $btnStep_click }>Step</Button>
            </>
        }
        {
          State === 'executing' &&
            <>
              <Button className='err mini' onClick={ $btnStop_click }>Stop</Button>
              <Button className='err mini' onClick={ $btnPause_click }>Pause</Button>
            </>
        }
        {
          (State === 'paused' || State === 'stepped') &&
            <>
              <Button className='err mini' onClick={ $btnStop_click }>Stop</Button>
              <Button className='success mini' onClick={ $btnStep_click }>Step</Button>
              <Button className='success mini' onClick={ $btnContinue_click }>Continue</Button>
            </>
        }
      </div>

      <div>
        <div>
          <label>Velocity:</label>
          <Range
            value={ Speed }
            className='range'
            onSlide={ _value => SetSpeed(_value) }
          />
        </div>

        <div>
          <label>Vectors:</label>
          <Input
            type='number'
            placeholder='auto'
            min={ 0 }
            onChange={ _event => SetMaxMemory(Number(_event.currentTarget.value)) }
          />
        </div>

        <FormGroup check inline>
          <Input
            type='checkbox'
            defaultChecked={ PauseInterpreter }
            onChange={ _event => SetPauseInterpreter(_event.currentTarget.checked) }
          />
          <Label check>Pause</Label>
        </FormGroup>

        <FormGroup check inline>
          <Input
            type='checkbox'
            defaultChecked={ Warn }
            onChange={ _event => SetWarn(_event.currentTarget.checked) }
          />
          <Label check>Warn</Label>
        </FormGroup>
      </div>
    </Header>

    <Main>
      <header>
        <Memory items={Result?.memory || [ 0, 0, 0 ]} pointer={ Result?.pointer }/>
        <p className='red'>{ Result ? Result.error : '' }</p>
      </header>

      <Editor
        State={ State }
        SetCode={ SetCode }
        Result={ Result }
        Code={ Code }
        $btnContinue_click={ $btnContinue_click }
        $btnStop_click={ $btnStop_click }
      />

      {
        Result?.result &&
        <ResultPanel>
          <FadeButton text='JSON Response'>
            <CodeComponent language='json' code={ JSON.stringify(Result) } size='extended'/>
          </FadeButton>

          <label>Result: { Result ? Result.result : '' }</label>
          <Button onClick={ () => navigator.clipboard.writeText(Result?.result) } className='mini'>Copy</Button>
        </ResultPanel>
      }
    </Main>

    <Footer>
      <FadeTitle text='ASCII Table'>
        <FooterCharTable>
          {
            fillArray(255, 1).map(($, _) =>
              <li key={ _ }>
                <span>{ _ + 1 }</span>
                <label>{ `: ${String.fromCharCode(_ + 1)}` }</label>
              </li>
            )
          }
        </FooterCharTable>
      </FadeTitle>
    </Footer>
  </>
}


export default From