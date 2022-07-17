import { useState, useEffect } from 'react'
import { Label, FormGroup } from 'reactstrap'
import nookies from 'nookies'

import FadeButton from '../components/FadeButton'
import ToBrainfuck from '../scripts/ToBrainfuck'
import Button from '../components/Button'
import Input from '../components/Input.styles'
import Range from '../components/Range'
import Code from '../components/Code/block'

import { Header, Editor, Main, EditorBackground, ResultPanel, Hero, HeroBackground, CodeInput } from '../styles/to.styles'

type ResultType = {
  ascii: number
  memory: number[]
  index: number
  char: string
  result: string
  error: string
}

type SettingsType = {
  pause: boolean
  speed: number
}


const To = () => {
  const [ Text, SetText ] = useState(nookies.get()['to-text'] || 'Panda')

  const [ Result, SetResult ] = useState<ResultType | null>(null)
  const [ Settings, SetSettings ] = useState<SettingsType>({
    pause: true,
    speed: 30
  })

  const [ Interpreter, SetInterpreter ] = useState<Generator | null>({} as Generator)
  const [ State, SetState ] = useState('stopped')
  const [ Timer, SetTimer ] = useState({} as NodeJS.Timeout)

  function interpreterNext() {
    const response = Interpreter?.next() as { value: ResultType, done: boolean }

    if (response.value)
      SetResult(response.value)

    if (response.done) {
      SetState('stopped')
    }
    else if (State === 'stepped')
      Interpreter?.next()
  }

  function startTimer() {
    SetTimer(setInterval(interpreterNext, Settings.speed))
  }

  function startInterpreter() {
    SetInterpreter(
      ToBrainfuck(Text, Settings.pause)
    )
  }


  const $btnExecute_click = () => {
    startInterpreter()
    SetState('executing')
  }

  const $btnStop_click = () => {
    SetState('stopped')
    SetResult(null)
  }

  const $btnPause_click = () => {
    SetState('paused')
    clearInterval(Timer)
  }

  const $btnContinue_click = () => {
    startTimer()
    SetState('executing')
  }

  const $btnStep_click = () => {
    clearInterval(Timer)

    if (Interpreter === null)
      startInterpreter()
    else
      interpreterNext()

    SetState('stepped')
  }

  const $btnReset_click = () => {
    SetSettings({
      pause: true,
      speed: 30
    })

    SetState('stopped')
    SetResult(null)
    clearInterval(Timer)
  }

  window.onbeforeunload = () => {
    nookies.set(null, 'to-text', Text)
    nookies.set(null, 'to-result', JSON.stringify(Result))
    nookies.set(null, 'to-settings', JSON.stringify(Settings))
  }

  useEffect(() => {
    const cookies = nookies.get()

    const states: {
      [state: string]: ($: string) => any
    } = {
      'to-code': ($: string) => SetText($),
      'to-result': ($: string) => SetResult(JSON.parse($)),
      'to-settings': ($: string) => SetSettings(JSON.parse($))
    }

    for (let state in states)
      if (cookies[state] !== undefined)
        states[state](cookies[state])

  }, [])

  useEffect(() => {
    if (State === 'executing')
      startTimer()

    if (State === 'stepped')
      interpreterNext()

    if (State === 'stopped')
      clearInterval(Timer)

  }, [ State ])

  document.title = 'Brainfuck.org | To'

  return <>
    <Hero>
      <HeroBackground/>
    </Hero>

    <label>Algorithm in tests</label>

    <Header>
      <div>
        {
          (State === 'stopped') &&
          <>
            <Button color='success' className='mini' onClick={ $btnExecute_click }>Execute</Button>
            <Button color='success' className='mini' onClick={ $btnStep_click }>Step</Button>
            <Button color='primary' outline className='mini' onClick={ $btnReset_click }>Reset</Button>
          </>
        }
        {
          (State === 'executing') &&
          <>
            <Button color='error' className='mini' onClick={ $btnStop_click }>Stop</Button>
            <Button color='error' outline className='mini' onClick={ $btnPause_click }>Pause</Button>
          </>
        }
        {
          (State === 'paused' || State === 'stepped') &&
          <>
            <Button color='error' className='mini' onClick={ $btnStop_click }>Stop</Button>
            <Button color='success' className='mini' onClick={ $btnStep_click }>Step</Button>
            <Button color='success' outline className='mini' onClick={ $btnContinue_click }>Continue</Button>
          </>
        }
      </div>

      <div>
        <div>
          <label>Velocity:</label>
          <Range
            className='range'
            value={ Settings.speed }
            onSlide={ $ => SetSettings({ ...Settings, speed: $ }) }
          />
        </div>

        <FormGroup check inline>
          <Input
            type='checkbox'
            checked={ Settings.pause }
            onChange={ ($: any) => SetSettings({ ...Settings, pause: $.currentTarget.checked}) }
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
        Result?.result !== undefined &&
        <ResultPanel>
          <FadeButton text='JSON Response'>
            <Code language='json' code={ JSON.stringify(Result) }/>
          </FadeButton>

          <label>Result:</label>

          <Code language='brainfuck' code={ Result.result || '' }/>
          <Button onClick={ () => navigator.clipboard.writeText(Result?.result) } color='primary' outline className='mini'>Copy</Button>
        </ResultPanel>
      }
    </Main>
  </>
}


export default To