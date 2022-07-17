import { useEffect, useState } from 'react'
import { Label, FormGroup } from 'reactstrap'
import nookies from 'nookies'

import FromBrainfuck from '../scripts/FromBrainfuck'
import FadeButton from '../components/FadeButton'
import Button from '../components/Button'
import FadeTitle from '../components/FadeTitle'
import CodeComponent from '../components/Code/block'
import Input from '../components/Input.styles'
import Memory from '../components/Memory'
import Editor from '../components/Editor'
import Range from '../components/Range'

import { Header, FooterCharTable, Footer, Main, MemoryHeader, ResultPanel, Hero, HeroBackground } from '../styles/from.styles'
import { timeEnd } from 'console'

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
}

type SettingsType = {
  pause: boolean
  maxMemory: number | null
  speed: number
  warn: boolean
}


const From = () => {
  const [ Code, SetCode ] = useState<CodeType>({
    edited: false,
    code: '++++++++\n[\n  > ++++++++++\n  < -\n]\n> . P 80\n\n+++++++++++++++++ . a 97\n+++++++++++++ . n 110\n---------- . d 100\n--- . a 97\n!\n',
  })

  const [ Result, SetResult ] = useState<Result | null>(null)
  const [ Settings, SetSettings ] = useState<SettingsType>({
    pause: true,
    maxMemory: null,
    speed: 30,
    warn: true
  })
  const [ Interpreter, SetInterpreter ] = useState<Generator | null>(null)
  const [ State, SetState ] = useState<'stopped' | 'executing' | 'stepped' | 'paused'>('stopped')
  const [ Timer, SetTimer ] = useState({} as NodeJS.Timeout)

  function fillArray(length: number, startBy: number = 0) {
    const res = []

    for (let x = startBy; x <= length; x++)
      res.push(null)

    return res
  }

  function interpreterNext() {
    const response = Interpreter?.next() as { value: Result, done: boolean }

    if (response.value) {
      SetResult(response.value)
      SetCode({
        ...Code,
        edited: false
      })
    }

    if (response.done) {
      SetState('stopped')
    }
    else if (State === 'stepped')
      Interpreter?.next()
  }

  function startTimer() {
    SetTimer(setInterval(interpreterNext, Settings.speed))
  }

  function startInterpreter(state?: string) {
    SetCode($ => ({ ...$, edited: false }))

    SetInterpreter(
      FromBrainfuck(
        Code.code,
        state === 'stepped' || Settings.pause,
        Settings.warn,
        undefined,
        Settings.maxMemory || undefined
      )
    )
  }


  const $btnStop_click = () => {
    SetState('stopped')
    SetInterpreter(null)
    SetResult(null)
  }

  const $btnExecute_click = () => {
    startInterpreter()
    SetState('executing')
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
    clearInterval(Timer)

    if (Interpreter === null)
      startInterpreter('stepped')
    else
      interpreterNext()

    if (State !== 'stepped')
      SetState('stepped')
  }

  const $btnReset_click = () => {
    SetSettings({
      pause: true,
      maxMemory: null,
      speed: 30,
      warn: true
    })

    SetState('stopped')
    SetResult(null)
    clearInterval(Timer)
  }

  window.onbeforeunload = () => {
    nookies.set(null, 'from-code', Code.code)
    nookies.set(null, 'from-result', JSON.stringify(Result))
    nookies.set(null, 'from-settings', JSON.stringify(Settings))
  }

  useEffect(() => {
    const cookies = nookies.get()

    const states: {
      [state: string]: ($: string) => any
    } = {
      'from-code': ($2: string) => SetCode($ => ({ ...$, code: $2 })),
      'from-result': ($: string) => SetResult(JSON.parse($)),
      'from-settings': ($: string) => SetSettings(JSON.parse($)),
    }

    for (let state in states)
      if (cookies[state] !== undefined)
        states[state](cookies[state])

  }, [])

  useEffect(() => {
    if (State === 'executing')
      startTimer()

    if (State === 'stopped')
      clearInterval(Timer)

    if (State === 'stepped')
      interpreterNext()

  }, [ State ])

  document.title = 'Brainfuck.org | From'

  return <>
    <Hero>
      <HeroBackground/>
    </Hero>

    <Header>
      <div>
        {
          State === 'stopped' &&
          <>
            <Button color='success' className='mini' onClick={ $btnExecute_click }>Execute</Button>
            <Button color='success' className='mini' onClick={ $btnStep_click }>Step</Button>
            <Button color='primary' outline className='mini' onClick={ $btnReset_click }>Reset</Button>
          </>
        }
        {
          State === 'executing' &&
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
            value={ Settings.speed }
            className='range'
            onSlide={ $ => SetSettings({ ...Settings, speed: $}) }
          />
        </div>

        <div>
          <label>Vectors:</label>
          <Input
            type='number'
            placeholder='auto'
            min={ 0 }
            value={ Settings.maxMemory || '' }
            onChange={ ($: any) => SetSettings({ ...Settings, maxMemory: Number($.currentTarget.value)}) }
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

        <FormGroup check inline>
          <Input
            type='checkbox'
            checked={ Settings.warn }
            onChange={ ($: any) => SetSettings({ ...Settings, warn: $.currentTarget.checked}) }
          />
          <Label check>Warn</Label>
        </FormGroup>
      </div>
    </Header>

    <Main>
      <MemoryHeader>
        <Memory items={Result?.memory || [ 0, 0, 0 ]} max={ Settings.maxMemory || undefined } pointer={ Result?.pointer || 0 }/>
        <p>{ Result?.error ?? '' }</p>
      </MemoryHeader>

      <Editor
        State={ State }
        SetCode={ SetCode }
        Result={ Result }
        Code={ Code }
        $btnContinue_click={ $btnContinue_click }
        $btnStop_click={ $btnStop_click }
      />

      {
        Result?.result !== undefined &&
        <ResultPanel>
          <FadeButton text='JSON Response'>
            <CodeComponent language='json' code={ JSON.stringify(Result) }/>
          </FadeButton>

          <label>Result: { Result ? Result.result : '' }</label>
          <Button onClick={ () => navigator.clipboard.writeText(Result?.result || '') } color='primary' outline className='mini'>Copy</Button>
        </ResultPanel>
      }
    </Main>

    <Footer>
      <FadeTitle text='ASCII Table'>
        <FooterCharTable>
          {
            fillArray(255).map(($, _) =>
              <li key={ _ }>
                <span>{ _ }</span>
                <label>{ `: ${String.fromCharCode(_)}` }</label>
              </li>
            )
          }
        </FooterCharTable>
      </FadeTitle>
    </Footer>
  </>
}


export default From