import React from "react";

import ContractAddressForm from "./ContractAddressForm";
import ConnectedContract from "./ConnectedContract";

interface State {
  page: number;
  contractAddress: string;
}

const initialState = {
  page: 2,
  contractAddress: null,
};

const appReducer = (state: State, action: any) => {
  switch (action.type) {
    case "CONNECT_CONTRACT":
      return {
        contractAddress: action.payload.contractAddress,
        page: 2,
      };
    default:
      return state;
  }
};

const ContractUI: React.FC<{}> = () => {
  const [state, dispatch] = React.useReducer(appReducer, initialState);

  let content;
  switch (state.page) {
    case 1:
      content = (
        <ContractAddressForm
          connectToContract={(contractAddress: string) =>
            dispatch({ type: "CONNECT_CONTRACT", payload: { contractAddress } })
          }
        />
      );
      break;
    case 2:
      content = <ConnectedContract contractAddress={state.contractAddress} />;
  }
  return (
    <main className="min-h-[calc(100vh-156px)] mx-auto w-full max-w-[1080px] pb-12">
      {content}
    </main>
  );
};

export default ContractUI;
