import { useState, useEffect } from 'react'
import { Label, FormGroup } from 'reactstrap'

import FadeButton from '../components/FadeButton'
import ToBrainfuck from '../scripts/ToBrainfuck'
import Button from '../components/Button.styles'
import Input from '../components/Input.styles'
import Range from '../components/Range'
import Code from '../components/Code'

import { Header, Editor, Main, EditorBackground, ResultPanel, Hero, HeroBackground, CodeInput } from '../styles/to.styles'

type Result = {
  ascii: number
  memory: number[]
  index: number
  char: string
  result: string
  error: string
}


const To = () => {
  const [ PauseInterpreter, SetPauseInterpreter ] = useState(true)
  const [ Result, SetResult ] = useState({} as Result)
  const [ Speed, SetSpeed ] = useState(30)
  const [ Text, SetText ] = useState('Panda')

  const [ Interpreter, SetInterpreter ] = useState<Generator | null>({} as Generator)
  const [ State, SetState ] = useState('stopped')
  const [ Timer, SetTimer ] = useState({} as NodeJS.Timeout)

  function interpreterNext() {
    const response = Interpreter?.next() as { value: Result, done: boolean }

    if (response.value)
      SetResult(response.value)

    if (response.done) {
      SetState('stopped')
      clearInterval(Timer)
      SetInterpreter(null)
    }
    else if (State === 'stepped')
      Interpreter?.next()
  }

  function startTimer() {
    SetTimer(setInterval(interpreterNext, Speed))
  }

  function startInterpreter() {
    SetInterpreter(
      ToBrainfuck(Text, PauseInterpreter)
    )
  }


  const $btnExecute_click = () => {
    SetState('executing')
    startInterpreter()
    startTimer()
  }

  const $btnStop_click = () => {
    SetState('stopped')
    SetInterpreter(null)
    clearInterval(Timer)
    SetResult({} as Result)
  }

  const $btnPause_click = () => {
    SetState('paused')
    clearInterval(Timer)
  }

  const $btnContinue_click = () => {
    SetState('executing')
    startTimer()
  }

  const $btnStep_click = () => {
    SetState('stepped')

    clearInterval(Timer)

    if (Interpreter === null)
      startInterpreter()
    else
      interpreterNext()
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
    if (State === 'executing')
      startTimer()

    if (State === 'stepped')
      interpreterNext()

  }, [ Interpreter ])

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
            onChange={ ($: any) => SetPauseInterpreter($.currentTarget.checked) }
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
        <CodeInput
          type='text'
          defaultValue={ Text }
          onChange={ ($: any) => SetText($.currentTarget.value) }
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