import { Web3ReactProvider } from "@web3-react/core";
import * as ethers from "ethers";

import '../styles/globals.css'
import 'tailwindcss/tailwind.css'

function MyApp({ Component, pageProps }) {
  return (
    <Web3ReactProvider getLibrary={(provider) => new ethers.providers.Web3Provider(provider)}>
      <Component {...pageProps} />
    </Web3ReactProvider>
  );
}

export default MyApp
