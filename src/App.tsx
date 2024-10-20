import '@syncfusion/ej2-js-es5/styles/material.css';

// src/App.tsx
import React, { useRef, useEffect } from 'react';
import './App.css';

import {
  DocumentEditorContainerComponent,
  Toolbar,
  ContextMenu,
} from '@syncfusion/ej2-react-documenteditor';
import { DocumentEditor } from '@syncfusion/ej2-documenteditor';
import '@syncfusion/ej2-react-documenteditor/styles/material.css';

// Inject the Toolbar and ContextMenu dependencies
DocumentEditorContainerComponent.Inject(Toolbar, ContextMenu);

// Extend the DocumentEditor interface
interface ExtendedDocumentEditor extends DocumentEditor {
  contextMenuSettings: any;
  contextMenuItemSelect: (args: any) => void;
}

const App: React.FC = () => {
  const editorRef = useRef<DocumentEditorContainerComponent>(null);

  // Rövarspråk encoding function
  const rovarsprak = (text: string): string => {
    return text.replace(/([bcdfghjklmnpqrstvwxz])/gi, '$1o$1');
  };

  // Function to apply Rövarspråk to selected text
  const applyRovarsprak = () => {
    if (editorRef.current) {
      const documentEditor = editorRef.current.documentEditor;
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
    }
  };

  // Handle context menu item selection
  const onContextMenuItemSelect = (args: any) => {
    if (args.item.id === 'rovarsprak') {
      applyRovarsprak();
    }
  };

  useEffect(() => {
    if (editorRef.current) {
      const documentEditor = editorRef.current.documentEditor as ExtendedDocumentEditor;

      // Set context menu settings
      documentEditor.contextMenuSettings = {
        show: true,
        items: [], // Keep default items
        customItems: [
          {
            text: 'Rövarspråk',
            id: 'rovarsprak',
            iconCss: 'e-icons e-edit',
          },
        ],
      };

      // Attach the context menu item select event handler
      documentEditor.contextMenuItemSelect = onContextMenuItemSelect;
    }
  }, []);

  return (
    <div className="App">
      <h1>Syncfusion Word Processor in React</h1>
      <DocumentEditorContainerComponent
        id="container"
        height={'900px'} // Increased height by 50%
        enableToolbar={true}
        ref={editorRef}
        serviceUrl="https://ej2services.syncfusion.com/production/web-services/api/documenteditor/"
      />
      <button onClick={applyRovarsprak}>Rövarspråk</button>
    </div>
  );
};

export default App;

