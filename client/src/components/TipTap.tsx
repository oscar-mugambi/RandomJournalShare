import { useEditor, EditorContent } from '@tiptap/react';
import { Color } from '@tiptap/extension-color';
import StarterKit from '@tiptap/starter-kit';
import TextStyle from '@tiptap/extension-text-style';
import ListItem from '@tiptap/extension-list-item';
import Toolbar from './Toolbar';

type TipTapProps = {
  description: string;
  onChange: (richText: string) => void;
};

const TipTap = ({ description, onChange }: TipTapProps) => {
  const editor = useEditor({
    extensions: [
      Color.configure({ types: [TextStyle.name, ListItem.name] }),
      StarterKit.configure(),
    ],
    content: description,
    editorProps: {
      attributes: {
        class: 'rounded-md border min-h-[150px] border-input p-3 mt-4',
      },
    },
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
  });

  return (
    <div className='flex flex-col justify-stretch min-h-64'>
      <Toolbar editor={editor} />
      <EditorContent editor={editor} />
    </div>
  );
};

export default TipTap;
