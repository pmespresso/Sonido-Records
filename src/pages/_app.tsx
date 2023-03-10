import "@rainbow-me/rainbowkit/styles.css";
import { RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { CssVarsProvider } from "@mui/joy/styles";
import type { AppProps } from "next/app";
import NextHead from "next/head";
import * as React from "react";
import { WagmiConfig } from "wagmi";

import "../styles/tailwind.css";
import { chains, client } from "../wagmi";
import { AppContextProvider } from "../contexts/AppContext";

function App({ Component, pageProps }: AppProps) {
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => setMounted(true), []);
  return (
    <WagmiConfig client={client}>
      <RainbowKitProvider chains={chains}>
        <CssVarsProvider>
          <NextHead>
            <title>Sonido Propose</title>
          </NextHead>

          {mounted && (
            <AppContextProvider>
              <Component {...pageProps} />
            </AppContextProvider>
          )}
        </CssVarsProvider>
      </RainbowKitProvider>
    </WagmiConfig>
  );
}

export default App;
