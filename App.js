/* eslint-disable react/style-prop-object */
import { StatusBar } from 'expo-status-bar';
import React from 'react';

import Main from './src/components/Main/index';

export default function App() {
  return (
    <>
      <Main />
      <StatusBar style="auto" />
    </>
  );
}
