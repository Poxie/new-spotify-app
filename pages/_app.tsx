import '../styles/globals.scss'
import type { AppProps } from 'next/app'
import { Navbar } from '../components/navbar'
import { Footer } from '../components/footer';
import { wrapper } from '../redux/store';

function MyApp({ Component, pageProps }: AppProps) {
  return(
    <>
    <Navbar />
    <Component {...pageProps} />
    <Footer />
    </>
  )
}
export default wrapper.withRedux(MyApp);
