import Line, { Symbol, String, Numbers, MathChars, Commands, Classes, ObjAttr, Function } from './index.styles'

type Props = {
  code?: string
}


const JavaScript = (props: Props) => {
  const colors = {
    symbols: '()[]{}:;,=',
    strings: `\`'"`,
    stringIgnore: '\\',
    putSepareted: '\t ',
    numbers: '0123456789',
    mathChars: '+-*/?<>.',
    commands: [ 'for', 'let' ],
    classes: [ 'String' ]
  }

  let InsideString = { begin: '', is: false, ignoreEnd: false }

  return <>
    {
      props.code?.split('\n').map(($, _) => {
        const parts: string[] = [ '' ]

        $.split('').forEach(($, _) => {
          if (InsideString.is && InsideString.ignoreEnd)
            return parts[parts.length - 1] += $

          if (InsideString.is && $ === colors.stringIgnore)
            InsideString.ignoreEnd = true

          if (colors.strings.includes($)) {
            if (InsideString.is) {
              if ($ === InsideString.begin) InsideString.is = false
            }
            else {
              InsideString.begin = $
              InsideString.is = true
            }
          }

          if (InsideString.is || $ === InsideString.begin) {
            parts[parts.length - 1] += $
            if ($ === InsideString.begin)
              parts.push('')
          }
          else {
            if (
              colors.putSepareted.includes($) ||
              colors.numbers.includes($) ||
              colors.mathChars.includes($)
            ) {
              parts.push($)
              parts.push('')
            }
            else {
              if (colors.symbols.includes($)) {
                parts.push($)
                parts.push('')
              }
              else if ($ === ' ')
                parts.push('')
              else
                parts[parts.length - 1] += $
            }
          }
        })

        return <Line key={ _ }>
          {
            parts.map(($, _) =>
              colors.symbols.includes($) ? <Symbol key={ _ }>{ $ }</Symbol> :
              colors.putSepareted.includes($) ?
                $ === ' ' ? <label key={ _ }>&nbsp;</label> :
                $ === '\t' ? <label key={ _ }>&nbsp;&nbsp;</label> :
                $
              :
              colors.numbers.includes($) ? <Numbers key={ _ }>{ $ }</Numbers> :
              colors.mathChars.includes($) ? <MathChars key={ _ }>{ $ }</MathChars> :
              colors.commands.includes($) ? <Commands key={ _ }>{ $ }</Commands> :
              colors.classes.includes($) ? <Classes key={ _ }>{ $ }</Classes> :
              parts[(parts.length >= _ + 1 ? _ : 1) + 1] === '(' ? <Function key={ _ }>{ $ }</Function> :
              parts[(_ === 0 ? 1 : _) - 1] === '.' ? <ObjAttr key={ _ }>{ $ }</ObjAttr> :
              colors.strings.includes($.substring(0, 1)) ? <String key={ _ }>{ $ }</String> :
              $
            )
          }
          <br/>
        </Line>
      })
    }
  </>
}


export default JavaScript