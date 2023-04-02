import { CodeHighlightNode, CodeNode } from '@lexical/code';
import { AutoLinkNode, LinkNode } from '@lexical/link';
import { ListItemNode, ListNode } from '@lexical/list';
import {
  $convertFromMarkdownString,
  $convertToMarkdownString,
  TRANSFORMERS,
} from '@lexical/markdown';
import {
  InitialConfigType,
  LexicalComposer,
} from '@lexical/react/LexicalComposer';
import { ContentEditable } from '@lexical/react/LexicalContentEditable';
import LexicalErrorBoundary from '@lexical/react/LexicalErrorBoundary';
import { HistoryPlugin } from '@lexical/react/LexicalHistoryPlugin';
import { LinkPlugin } from '@lexical/react/LexicalLinkPlugin';
import { ListPlugin } from '@lexical/react/LexicalListPlugin';
import { MarkdownShortcutPlugin as LexicalMarkdownShortcutPlugin } from '@lexical/react/LexicalMarkdownShortcutPlugin';
import { OnChangePlugin } from '@lexical/react/LexicalOnChangePlugin';
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin';
import { HeadingNode, QuoteNode } from '@lexical/rich-text';
import { TableCellNode, TableNode, TableRowNode } from '@lexical/table';
import classNames from 'classnames';
import { EditorState } from 'lexical';
import React from 'react';

import ToolbarPlugin from './plugins/ToolbarPlugin';
import ReadonlyPlugin from './plugins/ToolbarPlugin/plugins/ReadonlyPlugin';
import { EditorTheme } from './plugins/ToolbarPlugin/theme';

interface Props {
  className?: string;
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  label?: string;
  toolbarDisabled?: boolean;
  readonly?: boolean;
}

const RichTextEditor: React.FC<Props> = function (props) {
  const {
    className,
    placeholder,
    label,
    value,
    onChange,
    readonly,
    toolbarDisabled,
  } = props;

  const [initialConfig] = React.useState<InitialConfigType>({
    namespace: 'Editor',
    editorState: () => {
      if (value != null) {
        $convertFromMarkdownString(value, TRANSFORMERS);
      }
    },
    editable: !readonly,
    theme: EditorTheme,
    nodes: [
      HeadingNode,
      ListNode,
      ListItemNode,
      QuoteNode,
      CodeNode,
      CodeHighlightNode,
      TableNode,
      TableCellNode,
      TableRowNode,
      AutoLinkNode,
      LinkNode,
    ],
    onError: console.error,
  });

  const handleChange = React.useCallback(
    (editorState: EditorState) => {
      editorState.read(() => {
        const markdown = $convertToMarkdownString(TRANSFORMERS);

        onChange?.(markdown);
      });
    },
    [onChange]
  );

  return (
    <div className={classNames('flex flex-col', className)}>
      {label != null && <span className="text-xs text-gray-400">{label}</span>}
      <div
        className={classNames('focus-within:border-b-brand-main', {
          'border-b-2': readonly !== true,
        })}
      >
        <LexicalComposer initialConfig={initialConfig}>
          <div className="mt-2 rounded-t-lg border-b border-gray-400 bg-gray-100 px-3">
            <ToolbarPlugin disabled={toolbarDisabled ?? false} />
          </div>
          <ReadonlyPlugin readonly={readonly ?? false} />
          <RichTextPlugin
            contentEditable={
              <ContentEditable className="mt-1 min-h-[80px] outline-none" />
            }
            placeholder={
              placeholder != null ? (
                <span className="text-xs text-gray-400">{placeholder}</span>
              ) : null
            }
            ErrorBoundary={LexicalErrorBoundary}
          />
          <ListPlugin />
          <LinkPlugin />
          <HistoryPlugin />
          <OnChangePlugin onChange={handleChange} />
          <LexicalMarkdownShortcutPlugin transformers={TRANSFORMERS} />
        </LexicalComposer>
      </div>
    </div>
  );
};
export default RichTextEditor;
