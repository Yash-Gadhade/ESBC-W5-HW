import React from "react";
import { useContractReads } from "wagmi";
import { useAccount, useConnect } from "wagmi";

import LotterABI from "../assets/Lottery.json";
import NonOwnerUI from "./NonOwnerUI";
import OwnerUI from "./OwnerUI";

interface Props {
  contractAddress: string;
}

const ConnectedContract: React.FC<Props> = ({ contractAddress }) => {
  // const { data } = useContractReads({
  //   contracts: [
  //     {
  //       address: contractAddress,
  //       abi: LotterABI.abi,
  //       functionName: "checkState",
  //     },
  //     {
  //       address: contractAddress,
  //       abi: LotterABI.abi,
  //       functionName: "owner",
  //     },
  //   ],
  // });
  const data = [false, "0xA18c98416183bdEA1804b6649c055d6144b2d736"];

  const { address, connector: activeConnector, isConnected } = useAccount();
  const { connect, connectors, error, isLoading, pendingConnector } =
    useConnect();

  return (
    <div className="text-center">
      <h3 className="text-xl">Connected to contract at {contractAddress}</h3>
      {!!data && (
        <div className="italic my-2">
          The Lottery is {data && data[0] ? "open" : "closed"}
        </div>
      )}

      {data && data[0] && (
        <button className="btn btn-sm btn-info">Check winner</button>
      )}

      <div className="my-8">
        <h2 className="text-2xl">
          Connect wallet to interact with the contract
        </h2>

        {isConnected && <div>Connected to {address}</div>}

        {!isConnected &&
          connectors.map((connector) => (
            <button
              disabled={!connector.ready}
              key={connector.id}
              onClick={() => connect({ connector })}
              className="btn btn-secondary my-4"
            >
              {`Connect with ${connector.name}`}
              {isLoading &&
                pendingConnector?.id === connector.id &&
                " (connecting)"}
            </button>
          ))}
      </div>

      <div>
        <h3 className="text-xl mb-3">You can now:</h3>
        {data &&
          isConnected &&
          address?.toLowerCase() === (data[1] as string).toLowerCase() && (
            <OwnerUI isLotterOpen={data[0] as boolean} />
          )}
        <NonOwnerUI />
      </div>
    </div>
  );
};

export default ConnectedContract;
