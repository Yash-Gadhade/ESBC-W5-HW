import { ethers } from "ethers";
import React, { SyntheticEvent } from "react";

interface Props {
  connectToContract: (address: string) => void;
}

const ContractAddressForm: React.FC<Props> = ({ connectToContract }) => {
  const handleSubmit = (event: SyntheticEvent) => {
    event.preventDefault();

    const { address } = event.target as HTMLFormElement;
    const contractAddress = address.value;

    if (!ethers.utils.isAddress(contractAddress)) {
      alert("Not a valid contract address");
      return;
    }

    connectToContract(contractAddress);
  };

  return (
    <form
      className="w-full mx-auto text-center flex flex-col items-center"
      onSubmit={handleSubmit}
    >
      <h1 className="text-xl font-bold mb-4">Enter Contract Address</h1>
      <input
        type="text"
        placeholder="Type here"
        className="input input-bordered w-full max-w-md"
        name="address"
      />
      <button type="submit" className="btn btn-primary mt-8">
        Connect to Contract
      </button>
    </form>
  );
};

export default ContractAddressForm;
