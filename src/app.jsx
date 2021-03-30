import React from 'react';
import ReactDOM from 'react-dom';
import Index from './index.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
  }
  render (){
    return (
      <div>
        <Index />
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('container'));

