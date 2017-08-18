import React from 'react';
import '../styles/index.scss';

export default class App extends React.Component {
  render() {
    return (
      <div>
        <p>This React project just works including <span className="redBg">module</span> local styles.</p>
        <p>Enjoy!</p>
      </div>
    )
  }
}
