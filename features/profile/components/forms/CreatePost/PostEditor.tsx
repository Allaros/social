'use client';
import { EditorContent, useEditor } from '@tiptap/react';
import type { Editor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Placeholder from '@tiptap/extension-placeholder';
import { useState } from 'react';
import { List, Italic } from 'lucide-react';
interface Props {
   value: string;
   onChange: (value: string) => void;
}

interface ToolbarItem {
   func: (editor: Editor) => void;
   ico: string | React.ComponentType<{ size?: number }>;
}

const toolbarConfig: ToolbarItem[] = [
   {
      func: (editor) => editor.chain().focus().toggleBold().run(),
      ico: 'B',
   },
   {
      func: (editor) => editor.chain().focus().toggleItalic().run(),
      ico: Italic,
   },
   {
      func: (editor) => editor.chain().focus().toggleBulletList().run(),
      ico: List,
   },
];

const PostEditor = ({ value, onChange }: Props) => {
   const [showToolbar, setShowToolbar] = useState(false);
   const editor = useEditor({
      extensions: [
         StarterKit,
         Placeholder.configure({ placeholder: 'Что сегодня на уме?' }),
      ],
      content: value,
      immediatelyRender: false,
      editorProps: {
         attributes: {
            class: 'break-words outline-none break-all',
            'data-placeholder': 'Что сегодня на уме?',
         },
      },
      onUpdate({ editor }) {
         onChange(editor.getHTML());
         setShowToolbar(editor.getText().length > 0);
      },
   });

   if (!editor) return null;

   return (
      <div className="relative z-2">
         <div
            className={`absolute top-0 left-0 transition duration-500 -z-1 flex items-stretch ${showToolbar ? '-translate-y-full opacity-100' : 'opacity-0 translate-y-0'}`}
         >
            {toolbarConfig.map((item, i) => {
               const Icon = item.ico;

               return (
                  <button
                     onMouseDown={(e) => e.preventDefault()}
                     key={i}
                     type="button"
                     onClick={() => item.func(editor)}
                     className={`px-2 border-x border-neutralWhite-400 cursor-pointer hover:bg-neutralWhite-400 text-neutralBlack-600`}
                  >
                     {typeof Icon === 'string' ? Icon : <Icon size={16}></Icon>}
                  </button>
               );
            })}
         </div>
         <EditorContent
            editor={editor}
            className="tiptap textBody py-3.5 px-1 min-h-14 break-all border-b bg-neutralWhite-100 border-neutralWhite-400"
         />
      </div>
   );
};

export default PostEditor;
