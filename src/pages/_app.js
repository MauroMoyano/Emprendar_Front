import '@/styles/globals.css'
import { Provider } from 'react-redux'
// import { useStore } from '../../redux/store'
import store from "../../redux/store"

export default function App({ Component, pageProps }) {
    // const store = useStore(pageProps.initialReduxState)

    return (
        <Provider store={store}>
            <Component {...pageProps} />
        </Provider>
    )
}