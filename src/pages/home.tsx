
import Table, { Cel as TableCel, Item as TableItem } from '../components/Table'
import Button from '../components/Button.styles'
import P from '../components/Paragraph.styles'
import Memory from '../components/Memory'
import Code from '../components/Code'

import { Hero, HeroBackground, HeroHeader, HeroMain, HeroTitle, Main } from '../styles/home.styles'


const Home = () => {
  const Commands = [
    { command: '>', description: 'Move the pointer right' },
    { command: '<', description: 'Move the pointer left' },
    { command: '[', description: 'Start loop' },
    { command: '[', description: 'End loop' },
    { command: '+', description: 'Increment 1 in the memory' },
    { command: '-', description: 'Decrement 1 in the memory' },
    { command: '.', description: 'Print memory' },
    { command: ',', description: 'Ask for a character' },
    { command: '!', description: 'End program' }
  ]

  return <>
    <Hero>
      <HeroBackground/>
      <HeroHeader>
        <HeroTitle>Brainfuck</HeroTitle>

        <span>The best site to learn and play with Brainfuck</span>
        <span>The most complete site for Brainfuck study</span>
      </HeroHeader>

      <HeroMain>
        <Button color='primary' href='/from'>Convert from Brainfuck</Button>
        <Button color='primary' href='/to'>Convert to Brainfuck</Button>
      </HeroMain>
    </Hero>

    <Main>
      <h1>What the fuck is Brainfuck</h1>

      <Memory items={[ 1, 2, 0, 0, 0 ]} pointer={ 1 }/>

      <P>
        Brainfuck is one of the most famous esoteric programming languages.

        Brainfuck operates on an array of memory cells, each initially set to zero. (originaly the array was 30,000 cells long)
        The only language commands are:
      </P>

      <Table columns={[ 'Command', 'Description' ]}>
        {
          Commands.map(($, _) =>
            <TableCel key={ _ }>
              <TableItem><Code code={ $.command } language='brainfuck' noCopy/></TableItem>
              <TableItem>{ $.description }</TableItem>
            </TableCel>
          )
        }
      </Table>
    </Main>
  </>
}


export default Home