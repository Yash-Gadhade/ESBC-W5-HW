import React from "react";

import ContractAddressForm from "./ContractAddressForm";

interface State {
  page: number;
  contractAddress: string;
}

const initialState = {
  page: 1,
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
  }
  return (
    <main className="h-[calc(100vh-156px)] mx-auto w-full max-w-[1080px]">
      {content}
    </main>
  );
};

export default ContractUI;
