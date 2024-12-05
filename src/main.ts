import './style.css'


document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
<div class="element"></div>
`

import Document from '@tiptap/extension-document'
import Paragraph from '@tiptap/extension-paragraph'
import Text from '@tiptap/extension-text'

import { Editor } from '@tiptap/core'
import StarterKit from '@tiptap/starter-kit'

import Collaboration from '@tiptap/extension-collaboration'
import CollaborationCursor from "@tiptap/extension-collaboration-cursor";

import YPartyKitProvider from "y-partykit/provider";
import * as Y from "yjs";


// 5 nice colors
const colours = ["#ffa5a5", "#f9ffa5", "#a9ffa5", "#a5e8ff", "#dfa5ff"];

// Pick a random color from the list
// This is just for demonstration purposes
const MY_COLOR = colours[Math.floor(Math.random() * colours.length)];



const yDoc = new Y.Doc();

const provider = new YPartyKitProvider(
  "localhost:1999",
  "my-document-name",
  yDoc
);

const editor = new Editor({
  element: document.querySelector('.element')!,
  extensions: [StarterKit.configure({
    history: false, // Disables default history to use Collaboration's history management
  }),
    Document,
    Paragraph,
    Text,
  Collaboration.configure({
    document: provider.doc, // Configure Y.Doc for collaboration
  }),
  CollaborationCursor.configure({
    provider: provider,
    user: {
      name: provider.id,
      color: MY_COLOR,
    },
  }),
  ],

})


// const provider = new TiptapCollabProvider({
//   name: 'document.name', // Unique document identifier for syncing. This is your document name.
//   appId: '7j9y6m10', // Your Cloud Dashboard AppID or `baseURL` for on-premises
//   token: 'notoken', // Your JWT token
//   document: doc,
//   onSynced() {
//     if (!doc.getMap('config').get('initialContentLoaded') && editor) {
//       doc.getMap('config').set('initialContentLoaded', true)

//       editor.commands.setContent(`
//       <p>This is a radically reduced version of Tiptap. It has support for a document, with paragraphs and text. That’s it. It’s probably too much for real minimalists though.</p>
//       <p>The paragraph extension is not really required, but you need at least one node. Sure, that node can be something different.</p>
//       `)
//     }
//   }
// })
