import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import React from 'react';

interface Props {
  readonly: boolean;
}

const ReadonlyPlugin: React.FC<Props> = function (props) {
  const { readonly } = props;

  const [editor] = useLexicalComposerContext();

  React.useEffect(() => {
    editor.setEditable(!readonly);
  }, [editor, readonly]);

  return null;
};

export default ReadonlyPlugin;
