import React, {
    Component
} from 'react';
import Header from './global/Header/Header';
import Find from './global/content/Find/find';

class App extends Component {
    render() {
        return (
            <div className="App" >
                <Header />
                <Find />
            </div>
        );
    }
}

export default App;