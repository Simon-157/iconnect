import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { UserProvider } from './contexts/UserContext.jsx';
import NProgress from 'react-nprogress-latest';
import 'react-nprogress-latest/dist/style.css';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Toaster } from 'react-hot-toast';
import { WebSocketProvider } from './contexts/WebsocketContext.jsx';
import { ReactQueryDevtools } from 'react-query/devtools';
import { MainWsHandler } from './hotline-room-engine/global/MainWsHandler.jsx';
import WebrtcApp from './hotline-room-engine/webrtc/WebrtcApp.jsx';
import SoundEffectPlayer from './hotline-room-engine/room/sound/SoundEffectPlayer.jsx';
import { createBrowserHistory } from 'history';
import { BrowserRouter } from 'react-router-dom';
import ErrorBoundary from './pages/errors/ErrorBoundary.jsx';


const history = createBrowserHistory();
const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')).render(
  <ErrorBoundary >
    <BrowserRouter>
    <React.StrictMode>
      <QueryClientProvider client={queryClient}>
        <UserProvider>
          {/* <WebSocketProvider> */}
            <MainWsHandler history={history}>
              <WebrtcApp />
              <App />
            </MainWsHandler>
            {/* <ChatWsHandler /> */}
            <SoundEffectPlayer />
          {/* </WebSocketProvider> */}
          <Toaster position="bottom-center" reverseOrder={true} />
          <ReactQueryDevtools initialIsOpen={false} />
        </UserProvider>
      </QueryClientProvider>
    </React.StrictMode>,
    </BrowserRouter>
  </ErrorBoundary>
);
