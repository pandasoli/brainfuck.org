import MemoryC, { Pointer } from './index.styles'

type Props = {
  items: number[]
  pointer: number
}


const Memory = (props: Props) => <MemoryC>
  { props.items.map(($, _) => <li key={ _ }>{ $ }</li>) }
  <Pointer style={{ left: `calc(${props.pointer} * 40px)` }}/>
</MemoryC>


export default Memory