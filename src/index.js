import React from 'react'
import ReactDOM from 'react-dom'
import { DndProvider } from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'
import Intro from './Intro.js'
import './index.css'

class App extends React.Component {
  render () {
    return (
      <>
        <DndProvider backend={HTML5Backend}>
          <Intro />
        </DndProvider>
      </>
    )
  }
}
ReactDOM.render(<App />, document.getElementById('root'))
