import { createRoot } from 'react-dom/client'
import Canvas from './components/Canvas'

const root = createRoot(document.getElementById('root'))

// ReactDOM.createRoot(document.getElementById('root')).render(
//   <React.StrictMode>
//     <Canvas />
//   </React.StrictMode>,
// )
root.render( <Canvas />)
