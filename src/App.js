
import './App.css';

import Calendar from './pages/calendar_page';


function App() {
  return (
    <div className="App" >
      {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <Button>hello</Button>
        <Card></Card>
        <Modal open={true}>
          <Card>dad</Card>
        </Modal>
      </header> */}
      <Calendar></Calendar>
      
    </div>
  );
}

export default App;
