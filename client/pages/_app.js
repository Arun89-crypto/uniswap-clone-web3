import '../styles/globals.css'
import { TransactionProvider } from '../Context/TransactionContext'

function MyApp({ Component, pageProps }) {
    return (
        <TransactionProvider>
            <Component {...pageProps} />
        </TransactionProvider>
    )
}
export default MyApp
