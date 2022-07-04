import React, { useState, useEffect } from 'react'
import axios from 'axios'

import BlockCode from '../components/Code/block'
import { Hero, HeroBackground, Main } from '../styles/interpreters.styles'

type CodeLangs = 'JavaScript'
type CodesType = {
  JavaScript: { link: string, code?: string }
}


const Interpreters = () => {
  const [ Codes, SetCodes ] = useState<CodesType>({
    JavaScript: { link: 'https://raw.githubusercontent.com/pandasoli/Brainfuck/master/interpreter.min.js' }
  })

  useEffect(() => {
    Object.keys(Codes).forEach($ => {
      axios.get(Codes[$ as CodeLangs].link)
        .then($2 => SetCodes({ ...Codes, [$ as CodeLangs]: { ...Codes[$ as CodeLangs], code: String($2.data) }}))
    })

  }, [])

  return <>
    <Hero>
      <HeroBackground/>
    </Hero>

    <Main>
      {
        Object.keys(Codes).map(($, _) =>
          <React.Fragment key={ _ }>
            <h1>{ $ }</h1>
            <BlockCode language={ $.toLowerCase() } code={ Codes[$ as CodeLangs].code || '' }/>
          </React.Fragment>
        )
      }
    </Main>
  </>
}


export default Interpreters