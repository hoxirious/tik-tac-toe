
import PlayGround from './components/PlayGround';
import {BrowserRouter as Router,Switch,Route} from 'react-router-dom'

const App = () => {
  return (
    <>
    <Router>
    <PlayGround/>
      <Switch>
        <Route path='/' exact/>
      </Switch>
    </Router>
    </>
  );
}

export default App;
