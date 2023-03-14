import classNames from 'classnames';
import { EditorThemeClasses } from 'lexical';

export const EditorTheme: EditorThemeClasses = {
  text: {
    underline: classNames('underline'),
    strikethrough: classNames('line-through'),
    // https://stackoverflow.com/a/74981861
    underlineStrikethrough: classNames(
      '[text-decoration:underline_line-through]'
    ),
  },
  list: {
    ul: classNames('list-inside list-disc'),
    ol: classNames('list-inside list-decimal'),
  },
  code: classNames('bg-gray-100 block py-1 px-2 font-mono'),
  quote: classNames('border-l-4 border-l-gray-200 pl-2'),
  heading: {
    h1: classNames('text-2xl'),
    h2: classNames('text-xl'),
  },
};
