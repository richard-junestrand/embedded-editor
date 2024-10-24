import { useRef, useEffect } from 'react';
import {
  DocumentEditorContainerComponent,
  Toolbar
} from '@syncfusion/ej2-react-documenteditor';
import { useSharedState } from '../state';
import { MenuItemModel } from '@syncfusion/ej2-react-navigations';
import $ from 'jquery';

// Inject the Toolbar and ContextMenu dependencies
DocumentEditorContainerComponent.Inject(Toolbar);

const Editor = ({ active }: { active: boolean }) => {
  const [state, setState] = useSharedState();
  const refEditor = useRef<DocumentEditorContainerComponent>(null);

  // Rövarspråk encoding function
  const rovarsprak = (text: string): string => {
    return text.replace(/([bcdfghjklmnpqrstvwxz])/gi, '$1o$1');
  };

  const applyRovarsprak = () => {
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
        setState(prev => ({ ...prev, apply: 0 }))
      }

    }
  };
  useEffect(() => {
    state.apply > 0 && active && applyRovarsprak()
    // eslint-disable-next-line
  }, [state.apply])

  // Handle context menu item selection
  const onContextMenuItemSelect = (args: any) => {
    let id: string = refEditor.current!.documentEditor.element.id;
    switch (args.id) {
      case id + 'rovarsprak':
        applyRovarsprak();
        break;
    }
  };
  const onContextMenuBeforeOpen = (args: any) => {
    if (refEditor.current) {
      let search: any = document.getElementById(args.ids[0]);
      search.style.display = 'none';
      let searchContent: string = refEditor.current.documentEditor.selection.text;
      if (!refEditor.current.documentEditor.selection.isEmpty && /\S/.test(searchContent)) {
        search.style.display = 'block';
      }
    }

  };
  //
  useEffect(() => {
    if (refEditor.current) {
      let menuItems: MenuItemModel[] = [
        {
          text: 'Rövarspråk',
          id: 'rovarsprak',
          iconCss: 'e-icons e-edit',
        }];
      refEditor.current.documentEditor.contextMenu.addCustomMenu(menuItems, false);
      //
      const removedToolbarItems = ["LocalClipboard", "RestrictEditing", "FormFields", "UpdateFields", "ContentControl", "XML Mapping"]
      refEditor.current.toolbarItems = refEditor.current.toolbarItems.flatMap((r: any) => removedToolbarItems.includes(r) ? [] : [r])
      const ele = $(refEditor.current.editorContainer)
      ele.on('click', '.show-heading', () => {
        refEditor.current?.documentEditor.showOptionsPane()
        setTimeout(() => {
          const e = ele.find('.e-de-op:visible .e-tab-header .e-toolbar-item[data-id="tabitem_0"]')
          e.trigger('click');       
        }, 500);
      });
      setTimeout(() => {
        const e = ele.find('.e-de-pane >.e-de-prop-pane:visible .e-tab-header')
        const b = e.find('.show-heading')
        if (b.length === 0) {
          e.prepend('<button class="btn btn-sm btn-secondary show-heading"><i class="bi bi-card-heading"></i></button>')          
        }
      }, 500);
    }
    // eslint-disable-next-line
  }, []);
  return <DocumentEditorContainerComponent
    height='100%'
    enableToolbar={true}
    customContextMenuBeforeOpen={onContextMenuBeforeOpen}
    customContextMenuSelect={onContextMenuItemSelect}
    ref={refEditor}
    serviceUrl="https://ej2services.syncfusion.com/production/web-services/api/documenteditor/"
  />
};

export default Editor;