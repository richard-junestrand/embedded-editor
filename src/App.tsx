
import '@syncfusion/ej2-js-es5/styles/material-dark.css';
import '@syncfusion/ej2-react-documenteditor/styles/material-dark.css';
import './App.scss';
//
import {
  DocumentEditorContainerComponent,
  Toolbar,
  ContextMenu,
} from '@syncfusion/ej2-react-documenteditor';
import { ButtonComponent } from '@syncfusion/ej2-react-buttons';
import Chat from './components/Chat';
import Sidebar from './components/Sidebar';
import Editor from './components/Editor';
import Editors from './components/Editors';

// Inject the Toolbar and ContextMenu dependencies
DocumentEditorContainerComponent.Inject(Toolbar, ContextMenu);

const App = () => {
  
  // Rövarspråk encoding function
  const rovarsprak = (text: string): string => {
    return text.replace(/([bcdfghjklmnpqrstvwxz])/gi, '$1o$1');
  };

  // Function to apply Rövarspråk to selected text
  const applyRovarsprak = () => {
    /*TODO:if (refEditor.current) {
      const documentEditor = refEditor.current.documentEditor;
      const selection = documentEditor.selection;
      const selectedText = selection.text;

      if (selectedText) {
        const transformedText = rovarsprak(selectedText);

        // Store the character format of the selection
        const characterFormat = { ...selection.characterFormat };

        // Store the paragraph format of the selection
        const paragraphFormat = { ...selection.paragraphFormat };

        // Delete the selected text
        documentEditor.editor.delete();

        // Insert the transformed text
        documentEditor.editor.insertText(transformedText);

        // Reapply the stored character format
        Object.assign(selection.characterFormat, characterFormat);

        // Reapply the stored paragraph format
        Object.assign(selection.paragraphFormat, paragraphFormat);
      } else {
        alert('Please select some text to apply Rövarspråk.');
      }
    }*/
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