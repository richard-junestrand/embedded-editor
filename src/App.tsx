
import '@syncfusion/ej2-js-es5/styles/material-dark.css';
import '@syncfusion/ej2-react-documenteditor/styles/material-dark.css';
import './App.scss';
//
import { ButtonComponent } from '@syncfusion/ej2-react-buttons';
import Chat from './components/Chat';
import Sidebar from './components/Sidebar';
import Editors from './components/Editors';
import { useSharedState } from './state';

const App = () => {
  // Function to apply Rövarspråk to selected text
  const [,setState]=useSharedState();
  const applyRovarsprak = () => {
    setState(prev => ({...prev, apply: prev.apply+1}))
  };
  //
  
  return <div>
    <Sidebar />
    <div className="main">
      <div className='d-flex main-sub'>
        <Editors/>
        <div className='nav-right d-flex flex-column'>
          <div className='card'>
            <div className="card-body">
              <div className="d-grid gap-2">
                <ButtonComponent onClick={applyRovarsprak}>Rövarspråk</ButtonComponent>
              </div>
            </div>
          </div>
          <Chat />
        </div>
      </div>
    </div>
  </div>
};

export default App;