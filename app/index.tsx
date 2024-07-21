import { Stack } from 'expo-router';
import React, { useState } from 'react';
import { Button, Text, View, Platform } from 'react-native';
import { Editor } from 'components/Editor';
import { HeadingNode, QuoteNode } from '@lexical/rich-text';
import { $convertFromMarkdownString, TRANSFORMERS } from '@lexical/markdown';
import { ListItemNode, ListNode } from '@lexical/list';
import { CodeNode } from '@lexical/code';
import { LinkNode } from '@lexical/link';

const pickerOpts: OpenFilePickerOptions = {
  types: [
    {
      description: 'Markdown File',
      accept: { 'text/markdown': ['.md'] },
    },
  ],
  excludeAcceptAllOption: true,
  multiple: false,
};

const EDITOR_NODES = [HeadingNode, ListNode, ListItemNode, QuoteNode, CodeNode, LinkNode];

export default function Home() {
  const [content, setContent] = useState<string>(undefined);
  const onOpenFile = async () => {
    if (Platform.OS === 'web') {
      const [fileHandle] = await window.showOpenFilePicker(pickerOpts);
      const file = await fileHandle.getFile();
      const fileReader = new FileReader();
      fileReader.readAsText(file);
      fileReader.onload = () => {
        setContent(fileReader.result as string);
      };
    }
  };
  return (
    <React.Fragment>
      <Stack.Screen options={{ title: 'Home' }} />
      {!content && (
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            gap: 8,
            justifyContent: 'center',
            height: '100%',
          }}>
          <Text>Open a file to Get Started</Text>
          <Button title="Open File" onPress={onOpenFile} />
        </View>
      )}
      {content && (
        <Editor
          config={{
            namespace: 'home',
            editorState: () => {
              $convertFromMarkdownString(content, TRANSFORMERS);
            },
            nodes: EDITOR_NODES,
            theme: {
              root: 'editor-root',
            },
            onError: error => {
              console.log(error);
            },
          }}
        />
      )}
    </React.Fragment>
  );
}
