// Core
import React, { Component } from 'react';
import { hot } from 'react-hot-loader';

//Component
import Sheduler from '../../components/Scheduler';

@hot(module)
export class App extends Component {
    render () {
        return (
            <Sheduler />
        );
    }
}

export default App;
