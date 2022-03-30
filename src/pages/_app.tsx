import * as React from 'react';
import type { AppProps } from 'next/app';
import { Provider } from 'react-redux'
import { CacheProvider, EmotionCache } from '@emotion/react';
import { ThemeProvider, CssBaseline, createTheme } from '@mui/material';

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import createEmotionCache from '../../utility/createEmotionCache';
import '../styles/globals.css';

interface MyAppProps extends AppProps {
    emotionCache?: EmotionCache;
}
const clientSideEmotionCache = createEmotionCache();

import store from '../app/store'

const MyApp: React.FunctionComponent<MyAppProps> = (props) => {
    const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;

  return (
      <CacheProvider value={emotionCache}>
          <CssBaseline />
        <Provider store={store}>
          <Component {...pageProps} />
        </Provider>
      </CacheProvider>
  )
}

export default MyApp;