import {
  $createCodeNode,
  $isCodeNode,
  getDefaultCodeLanguage,
} from '@lexical/code';
import {
  $isListNode,
  INSERT_ORDERED_LIST_COMMAND,
  INSERT_UNORDERED_LIST_COMMAND,
  ListNode,
  REMOVE_LIST_COMMAND,
} from '@lexical/list';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import {
  $createHeadingNode,
  $createQuoteNode,
  $isHeadingNode,
} from '@lexical/rich-text';
import { $wrapNodes } from '@lexical/selection';
import { $getNearestNodeOfType } from '@lexical/utils';
import classNames from 'classnames';
import {
  $createParagraphNode,
  $getSelection,
  $isRangeSelection,
  COMMAND_PRIORITY_LOW,
  FORMAT_TEXT_COMMAND,
  SELECTION_CHANGE_COMMAND,
} from 'lexical';
import Image from 'next/image';
import React from 'react';

import Select from '../../../Select';
import FormatButton from './components/FormatButton';

interface Props {
  disabled: boolean;
}

const ToolbarPlugin: React.FC<Props> = function (props) {
  const { disabled } = props;

  const [editor] = useLexicalComposerContext();

  const [isBold, setIsBold] = React.useState(false);
  const [isItalic, setIsItalic] = React.useState(false);
  const [isUnderline, setIsUnderline] = React.useState(false);
  const [isStrikethrough, setIsStrikethrough] = React.useState(false);
  const [isCode, setIsCode] = React.useState(false);
  const [blockType, setBlockType] = React.useState<string>('paragraph');
  const [codeLanguage, setCodeLanguage] = React.useState('');

  const updateToolbar = React.useCallback(() => {
    const selection = $getSelection();

    if (!$isRangeSelection(selection)) {
      return;
    }

    setIsBold(selection.hasFormat('bold'));
    setIsItalic(selection.hasFormat('italic'));
    setIsStrikethrough(selection.hasFormat('strikethrough'));
    setIsCode(selection.hasFormat('code'));

    const anchorNode = selection.anchor.getNode();
    const element =
      anchorNode.getKey() === 'root'
        ? anchorNode
        : anchorNode.getTopLevelElementOrThrow();

    const elementKey = element.getKey();
    const elementDOM = editor.getElementByKey(elementKey);

    if (elementDOM != null) {
      if ($isListNode(element)) {
        const parentList = $getNearestNodeOfType(anchorNode, ListNode);
        const type =
          parentList != null ? parentList.getTag() : element.getTag();
        setBlockType(type);
      } else {
        const type = $isHeadingNode(element)
          ? element.getTag()
          : element.getType();
        setBlockType(type);
        if ($isCodeNode(element)) {
          setCodeLanguage(element.getLanguage() || getDefaultCodeLanguage());
        }
      }
    }
  }, [editor]);

  React.useEffect(() => {
    const updateListenerCleanup = editor.registerUpdateListener(
      ({ editorState }) => {
        editorState.read(() => {
          updateToolbar();
        });
      }
    );

    const commandCleanupSelectionChange = editor.registerCommand(
      SELECTION_CHANGE_COMMAND,
      () => {
        updateToolbar();
        return false;
      },
      COMMAND_PRIORITY_LOW
    );

    return () => {
      updateListenerCleanup();
      commandCleanupSelectionChange();
    };
  }, [editor, updateToolbar]);

  const handleFormatChange = React.useCallback(
    (format: string) => {
      switch (format) {
        case 'paragraph': {
          if (blockType === format) {
            return;
          }

          editor.update(() => {
            const selection = $getSelection();

            if ($isRangeSelection(selection)) {
              $wrapNodes(selection, () => $createParagraphNode());
            }
          });
          break;
        }
        case 'h1':
        case 'h2': {
          if (blockType === format) {
            return;
          }

          editor.update(() => {
            const selection = $getSelection();

            if ($isRangeSelection(selection)) {
              $wrapNodes(selection, () => $createHeadingNode(format));
            }
          });
          break;
        }
        case 'ul': {
          switch (blockType) {
            case 'ul': {
              // @ts-ignore
              editor.dispatchCommand(REMOVE_LIST_COMMAND);
              break;
            }
            default: {
              // @ts-ignore
              editor.dispatchCommand(INSERT_UNORDERED_LIST_COMMAND);
              break;
            }
          }
          break;
        }
        case 'ol': {
          switch (blockType) {
            case 'ol': {
              // @ts-ignore
              editor.dispatchCommand(REMOVE_LIST_COMMAND);
              break;
            }
            default: {
              // @ts-ignore
              editor.dispatchCommand(INSERT_ORDERED_LIST_COMMAND);
              break;
            }
          }
          break;
        }
        case 'quote': {
          if (blockType === format) {
            return;
          }

          editor.update(() => {
            const selection = $getSelection();

            if ($isRangeSelection(selection)) {
              $wrapNodes(selection, () => $createQuoteNode());
            }
          });
          break;
        }
        case 'code': {
          if (blockType === format) {
            return;
          }

          editor.update(() => {
            const selection = $getSelection();

            if ($isRangeSelection(selection)) {
              $wrapNodes(selection, () => $createCodeNode());
            }
          });
          break;
        }
      }

      setBlockType(format);
    },
    [blockType, editor]
  );

  if (disabled) {
    return null;
  }

  return (
    <div className="flex items-center gap-x-1">
      <div className="relative flex">
        <Image
          src={'/TeeTee.svg'}
          width={35}
          height={35}
          alt="TT"
          className="border-b-2 border-gray-400 pr-2"
        />
        <Select
          className="inline w-32 border-b-2 border-gray-400"
          label=""
          value={blockType}
          placeholder="Paragraph"
          items={[
            /**
             * HACK to handle the initial `blockType` of an empty box
             */
            {
              label: 'Paragraph',
              value: 'paragraph',
            },
            {
              label: 'Heading 1',
              value: 'h1',
            },
            {
              label: 'Heading 2',
              value: 'h2',
            },
            {
              label: 'Bullet List',
              value: 'ul',
            },
            {
              label: 'Numbered List',
              value: 'ol',
            },
            {
              label: 'Quote',
              value: 'quote',
            },
            {
              label: 'Code Block',
              value: 'code',
            },
          ]}
          onChange={handleFormatChange}
        />
      </div>
      <FormatButton
        isActive={isBold}
        onClick={() => {
          editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'bold');
        }}
        className={'h-6 w-6'}
      >
        <span className="font-bold">B</span>
      </FormatButton>
      <FormatButton
        isActive={isItalic}
        onClick={() => {
          editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'italic');
        }}
        className="h-6 w-6"
      >
        <span className="italic">I</span>
      </FormatButton>
      <FormatButton
        isActive={isUnderline}
        onClick={() => {
          editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'underline');
        }}
        className="h-6 w-6"
      >
        <span className="underline">U</span>
      </FormatButton>
      <FormatButton
        isActive={isStrikethrough}
        onClick={() => {
          editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'strikethrough');
        }}
        className="h-6 w-6"
      >
        <span className="line-through">S</span>
      </FormatButton>
      <FormatButton
        isActive={isCode}
        onClick={() => {
          editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'code');
        }}
      >
        <span className="font-mono">&lsaquo;&rsaquo;</span>
      </FormatButton>
    </div>
  );
};

export default ToolbarPlugin;
