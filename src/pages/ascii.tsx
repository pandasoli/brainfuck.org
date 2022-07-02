import { useState } from 'react'

import Input from '../components/Input.styles'

import { FooterCharTable, Convertions } from '../styles/ascii.styles'


const ASCII = () => {
  const [ ConvertionsResult, SetConvertionsResult ] = useState({ to: 0, from: '' })

  function fillArray(length: number, startBy: number = 0) {
    const res = []

    for (let x = startBy; x <= length; x++)
      res.push(null)

    return res
  }

  const $txbConvertions_change = ($: any) => {
    const element = $.currentTarget

    if (element.name === 'to')
      SetConvertionsResult({
        ...ConvertionsResult,
        to: element.value.charCodeAt(0)
      })
    else if (element.name === 'from')
      SetConvertionsResult({
        ...ConvertionsResult,
        from: String.fromCharCode(element.value)
      })
  }

  document.title += ' | ASCII'

  return <>
    <h2>Convertion</h2>

    <Convertions>
      <div>
        <label>ASCII to character:</label>
        <Input
          name='from'
          type='number'
          placeholder='0'
          min={ 0 }
          max={ 255 }
          onChange={ $txbConvertions_change }
        />
        <label>Result: { ConvertionsResult.from }</label>
      </div>

      <div>
        <label>Character to ASCII:</label>
        <Input
          name='to'
          type='text'
          placeholder='P'
          maxLength={ 1 }
          onChange={ $txbConvertions_change }
        />
        <label>Result: { ConvertionsResult.to }</label>
      </div>
    </Convertions>


    <h2>What accepted by brainfuck</h2>

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
  </>
}


export default ASCII