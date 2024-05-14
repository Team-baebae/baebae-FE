import ReactDOM from 'react-dom/client'
import { RecoilRoot } from 'recoil'
import App from './App.tsx'
import './main.css'
import './fonts/fonts.css'
import GlobalStyle from './styles/GlobalStyles.ts'

ReactDOM.createRoot(document.getElementById('root')!).render(
  // <React.StrictMode>
  <RecoilRoot>
    <GlobalStyle />
    <App />
  </RecoilRoot>,
  // </React.StrictMode>
)
