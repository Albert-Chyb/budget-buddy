import { createContext, PropsWithChildren, useContext, useState } from 'react';

interface EditorContextValue {
  isInsideProvider: boolean;
  currentEditor: string;
  openEditor(editorId: string): void;
  closeEditor(): void;
}

const EditorContext = createContext<EditorContextValue>({
  isInsideProvider: false,
  currentEditor: '',
  openEditor() {},
  closeEditor() {},
});

export const useEditorContext = () => {
  const context = useContext(EditorContext);

  if (!context.isInsideProvider)
    throw new Error('EditorContext can only be used inside a provider');

  return context;
};

export const EditorContextProvider = ({ children }: PropsWithChildren) => {
  const [currentEditor, setCurrentEditor] = useState('');

  const open = (editorId: string) => {
    setCurrentEditor(editorId);
  };

  const close = () => {
    setCurrentEditor('');
  };

  return (
    <EditorContext.Provider
      value={{
        currentEditor,
        openEditor: open,
        closeEditor: close,
        isInsideProvider: true,
      }}
    >
      {children}
    </EditorContext.Provider>
  );
};

export function useEditorOpenState(isDismissible: boolean, id: string) {
  const { currentEditor, openEditor, closeEditor } = useEditorContext();

  function handleOpenChange(newOpenState: boolean) {
    if (!newOpenState && !isDismissible) return;

    if (newOpenState) openEditor(id);
    else closeEditor();
  }

  return [id === currentEditor, handleOpenChange] as const;
}
