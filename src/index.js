import React, { Component } from 'react';
import ReactDOM from 'react-dom';

class App extends Component {
    constructor(props) {
        super(props);
    }
    
    render() {
        return(
            <h1>Hello React</h1>
        );
    }
}

ReactDOM.render(
    <App />,
    document.getElementById('root')
);