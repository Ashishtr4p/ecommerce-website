import React from 'react'
import AppRouter from './routes/AllRoutes';
import "../src/app.css";

function App({store}) {
  return (
    <AppRouter store={store} />
  )
}

export default App
