import { createClient, configureChains, mainnet, WagmiConfig } from "wagmi";
import { publicProvider } from "wagmi/providers/public";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ContractUI from "./components/ContractUI";

const { chains, provider, webSocketProvider } = configureChains(
  [mainnet],
  [publicProvider()]
);

const client = createClient({
  autoConnect: true,
  provider,
  webSocketProvider,
});

function App() {
  return (
    <div>
      <WagmiConfig client={client}>
        <Navbar />
        <ContractUI />
        <Footer />
      </WagmiConfig>
    </div>
  );
}

export default App;
