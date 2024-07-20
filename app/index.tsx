import { Stack } from 'expo-router';
import React, { useState } from 'react';
import Markdown from 'react-native-markdown-display';
import { Button, Text, View } from 'react-native';

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

export default function Home() {
  let [content, setContent] = useState<string>(undefined);
  const onOpenFile = async () => {
    const [fileHandle] = await window.showOpenFilePicker(pickerOpts);
    const file = await fileHandle.getFile();
    const fileReader = new FileReader();
    fileReader.readAsText(file);
    fileReader.onload = () => {
      setContent(fileReader.result as string);
    };
  };
  return (
    <React.Fragment>
      <Stack.Screen options={{ title: 'Home' }} />
      {!content && (
        <View>
          <Text>Open a file to Get Started</Text>
          <Button title="Open File" onPress={onOpenFile} />
        </View>
      )}
      {content && <Markdown>{content}</Markdown>}
    </React.Fragment>
  );
}
