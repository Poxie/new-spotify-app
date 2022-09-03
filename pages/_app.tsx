import '../styles/globals.scss'
import type { AppProps } from 'next/app'
import { Navbar } from '../components/navbar'
import { Footer } from '../components/footer';
import { wrapper } from '../redux/store';
import { ToastProvider } from '../contexts/toast/ToastProvider';
import { AuthProvider } from '../contexts/auth/AuthProvider';

function MyApp({ Component, pageProps }: AppProps) {
  return(
    <AuthProvider>
      <ToastProvider>
        <Navbar />
        <Component {...pageProps} />
        <Footer />
      </ToastProvider>
    </AuthProvider>
  )
}
export default wrapper.withRedux(MyApp);
