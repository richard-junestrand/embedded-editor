import { useRef, useEffect } from 'react';
import {
  DocumentEditorContainerComponent,
  Toolbar,
  ContextMenu,
} from '@syncfusion/ej2-react-documenteditor';
import { DocumentEditor } from '@syncfusion/ej2-documenteditor';

// Inject the Toolbar and ContextMenu dependencies
DocumentEditorContainerComponent.Inject(Toolbar, ContextMenu);

// Extend the DocumentEditor interface
interface ExtendedDocumentEditor extends DocumentEditor {
  contextMenuSettings: any;
  contextMenuItemSelect: (args: any) => void;
}

const Editor = () => {
  const refEditor = useRef<DocumentEditorContainerComponent>(null);

  // Rövarspråk encoding function
  const rovarsprak = (text: string): string => {
    return text.replace(/([bcdfghjklmnpqrstvwxz])/gi, '$1o$1');
  };

  // Function to Editorly Rövarspråk to selected text
  const EditorlyRovarsprak = () => {
    if (refEditor.current) {
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

        // ReEditorly the stored character format
        Object.assign(selection.characterFormat, characterFormat);

        // ReEditorly the stored paragraph format
        Object.assign(selection.paragraphFormat, paragraphFormat);
      } else {
        alert('Please select some text to Editorly Rövarspråk.');
      }
    }
  };

  // Handle context menu item selection
  const onContextMenuItemSelect = (args: any) => {
    if (args.item.id === 'rovarsprak') {
      EditorlyRovarsprak();
    }
  };

  useEffect(() => {
    if (refEditor.current) {
      const documentEditor = refEditor.current.documentEditor as ExtendedDocumentEditor;

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
    // eslint-disable-next-line
  }, []);
  //
  return <div className='editor'>
    <DocumentEditorContainerComponent
      height='100%'
      enableToolbar={true}
      ref={refEditor}
      serviceUrl="https://ej2services.syncfusion.com/production/web-services/api/documenteditor/"
    />
  </div>
};

export default Editor;