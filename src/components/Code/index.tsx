import BFHighlight from '../BFHighlight'
import AddJsonHighlight from '../../scripts/AddJsonHighlight'

import Container, { Main, LineNumbers, Background, CopySvg } from './index.styles'

type Props = {
  code?: string
  size?: 'extended' | 'inline'
  lineNumbers?: boolean | undefined
  noCopy?: boolean | undefined
  language?: 'brainfuck' | 'json'
}


const Code = (props: Props) => {
  return <Container className={ props?.size }>
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
        (props.language === 'brainfuck' && <BFHighlight code={ props.code }/>) ||
        (props.language === 'json' && <div dangerouslySetInnerHTML={{ __html: AddJsonHighlight(props.code || '') }}/>) ||
        props.code
      }
    </Main>

    <Background className='background'>
      {
        !props.noCopy &&
          <>
            <CopySvg onClick={ () => navigator.clipboard.writeText(props.code || '') } viewBox='0 0 512.000000 512.000000'>
              <g transform='translate(0.000000,512.000000) scale(0.100000,-0.100000)'>
                <path d='M580 4944 c-195 -51 -355 -212 -405 -409 -13 -51 -15 -235 -15 -1410 0 -1488 -4 -1402 63 -1535 43 -87 150 -194 237 -237 99 -50 166 -63 317 -63 l133 0 0 185 0 185 -102 0 c-57 0 -121 5 -143 11 -51 14 -110 73 -124 124 -15 56 -15 2604 0 2660 14 51 73 110 124 124 56 15 2604 15 2660 0 51 -14 110 -73 124 -124 6 -22 11 -84 11 -137 l0 -98 185 0 185 0 0 128 c0 81 -6 149 -15 187 -51 199 -211 359 -410 410 -87 22 -2740 22 -2825 -1z'/>
                <path d='M1753 3829 c-227 -38 -410 -216 -458 -444 -22 -105 -22 -2665 0 -2770 46 -220 220 -394 440 -440 105 -22 2665 -22 2770 0 221 46 394 219 440 440 22 105 22 2665 0 2770 -42 199 -187 360 -385 428 l-65 22 -1345 1 c-740 1 -1368 -2 -1397 -7z m2725 -388 c42 -22 63 -43 86 -88 14 -29 16 -155 16 -1353 0 -1198 -2 -1324 -16 -1353 -23 -45 -44 -66 -86 -88 -36 -18 -82 -19 -1358 -19 -1198 0 -1324 2 -1353 16 -45 23 -66 44 -88 86 -18 36 -19 82 -19 1358 0 1276 1 1322 19 1358 21 41 42 62 86 85 27 15 165 16 1353 17 1279 0 1324 -1 1360 -19z'/>
              </g>
            </CopySvg>
          </>
      }
    </Background>
  </Container>
}


export default Code