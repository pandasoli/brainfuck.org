import { useState, useEffect, useCallback } from 'react'
import { Button, Input, Label, FormGroup } from 'reactstrap'

import FadeButton from '../components/FadeButton'
import ToBrainfuck from '../scripts/ToBrainfuck'
import Range from '../components/Range'
import Code from '../components/Code'

import { Header, Editor, Main, EditorBackground, ResultPanel, Hero, HeroBackground } from '../styles/to.styles'

type Result = {
  ascii: number
  memory: number[]
  index: number
  char: string
  result: string
  error: string
}


const To = () => {
  const [ Text, SetText ] = useState('Panda')
  const [ Result, SetResult ] = useState<Result>({} as Result)
  const [ Speed, SetSpeed ] = useState<number>(30)
  const [ PauseInterpreter, SetPauseInterpreter ] = useState(true)

  const [ State, SetState ] = useState('stopped')
  const [ Interpreter, SetInterpreter ] = useState<Generator>({} as Generator)
  const [ Timer, SetTimer ] = useState<NodeJS.Timeout>({} as NodeJS.Timeout)

  document.title += ' | To Brainfuck'

  const interpreterNext= useCallback((_step?: boolean) => {
    const response = Interpreter.next()
    SetResult(response.value)

    if (response.done)
      SetState('stopped')
    else if (_step)
      Interpreter.next()
  }, [ Interpreter ])

  const startTimer = useCallback(() => {
    SetTimer(setInterval(() => interpreterNext(), Speed))
  }, [ Speed, interpreterNext ])

  const startInterpreter = useCallback(() => {
    SetInterpreter(ToBrainfuck(Text, PauseInterpreter))
  }, [ PauseInterpreter, Text ])


  const $btnExecute_click = () => {
    startInterpreter()
    SetState('executing')
  }

  const $btnStop_click = () => {
    SetState('stopped')
    SetInterpreter({} as Generator)
    SetResult({} as Result)
    clearInterval(Timer)
  }

  const $btnPause_click = () => {
    SetState('paused')
    clearInterval(Timer)
  }

  const $btnContinue_click = () => {
    SetState('executing')
  }

  const $btnStep_click = () => {
    if (Interpreter === null || State !== 'stepped') {
      startInterpreter()
      SetState('stepped')
    }
    else {
      interpreterNext(true)
    }
  }

  const $btnReset_click = () => {
    SetText('')
    SetResult({} as Result)
    SetSpeed(30)
    SetPauseInterpreter(true)
    SetState('stopped')
    SetInterpreter({} as Generator)
    SetTimer({} as NodeJS.Timeout)
  }

  useEffect(() => {
    if (State === 'paused' || State === 'stopped')
      clearInterval(Timer)
    else if (State === 'executing')
      startTimer()
    else if (State === 'stepped') {
      clearInterval(Timer)
      interpreterNext(true)
    }

  }, [ State, Timer, interpreterNext, startTimer ])

  return <>
    <Hero>
      <HeroBackground/>
    </Hero>

    <label>Algorithm in tests</label>

    <Header>
      <div>
        <div>
          {
            (State === 'stopped') &&
            <>
              <Button className='success mini' onClick={ $btnExecute_click }>Execute</Button>
              <Button className='success mini' onClick={ $btnStep_click }>Step</Button>
            </>
          }
          {
            (State === 'executing') &&
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
          <Button className='mini' onClick={ $btnReset_click }>Reset</Button>
        </div>
      </div>

      <div>
        <label>Velocity:</label>
        <Range
          value={ Speed }
          onSlide={ _value => SetSpeed(_value) }
        />

        <FormGroup check inline>
          <Input
            type='checkbox'
            defaultChecked={ PauseInterpreter }
            onChange={ _event => SetPauseInterpreter(_event.currentTarget.checked) }
          />
          <Label check>Pause</Label>
        </FormGroup>
      </div>
    </Header>

    <Main>
      <header>
        <p className='red'>{ Result ? Result.error : '' }</p>
      </header>

      <Editor>
        <Input
          type='text'
          defaultValue={ Text }
          onChange={ _event => SetText(_event.currentTarget.value) }
        />

        {
          (State !== 'stopped') ? (
            <EditorBackground
              dangerouslySetInnerHTML={{ __html: Result ? Result.char : '' }}
            />
          ) : ''
        }
      </Editor>

      {
        Result?.result &&
        <ResultPanel>
          <FadeButton text='JSON Response'>
            <Code language='json' code={ JSON.stringify(Result) } size='extended'/>
          </FadeButton>

          <label>Result:</label>

          <Code language='brainfuck' code={ Result.result || '' }/>
          <Button onClick={ () => navigator.clipboard.writeText(Result?.result) } className='mini'>Copy</Button>
        </ResultPanel>
      }
    </Main>
  </>
}


export default To