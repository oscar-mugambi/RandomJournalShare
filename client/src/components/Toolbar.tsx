import { type Editor } from '@tiptap/react';
import { Bold, Italic, Code } from 'lucide-react';

import { Toggle } from '@/components/ui/toggle';

type ToolbarProps = {
  editor: Editor | null;
};
const Toolbar = ({ editor }: ToolbarProps) => {
  if (!editor) {
    return null;
  }

  return (
    <div className='border border-input bg-transparent rounded-br-sm'>
      <Toggle
        size='sm'
        pressed={editor?.isActive('code')}
        onPressedChange={() => editor.chain().focus().toggleCode().run()}
      >
        <Code className='w-4 h-4' />
      </Toggle>
      <Toggle
        size='sm'
        pressed={editor?.isActive('bold')}
        onPressedChange={() => editor?.chain().focus().toggleBold().run()}
      >
        <Bold className='w-4 h-4' />
      </Toggle>
      <Toggle
        size='sm'
        pressed={editor?.isActive('italic')}
        onPressedChange={() => editor?.chain().focus().toggleItalic().run()}
      >
        <Italic className='w-4 h-4' />
      </Toggle>
    </div>
  );
};

export default Toolbar;
