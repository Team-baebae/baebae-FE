import ReactDOM from 'react-dom/client'
import { RecoilRoot } from 'recoil'
import App from './App.tsx'
import './main.css'
import './fonts/fonts.css'
import GlobalStyle from './styles/GlobalStyles.ts'
import { Analytics } from '@vercel/analytics/react'

ReactDOM.createRoot(document.getElementById('root')!).render(
  // <React.StrictMode>
  <RecoilRoot>
    <GlobalStyle />
    <App />
    <Analytics />
  </RecoilRoot>,
  // </React.StrictMode>
)
