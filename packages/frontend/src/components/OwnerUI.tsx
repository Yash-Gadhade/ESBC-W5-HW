import React from "react";

interface Props {
  isLotterOpen: boolean;
}

const OwnerUI: React.FC<Props> = ({ isLotterOpen }) => {
  return (
    <div>
      {!isLotterOpen && <button className="btn btn-primary">Open Bets</button>}
      <div className="divider"></div>
      <div className="form-control items-center">
        <label className="input-group justify-center">
          <span>Address</span>
          <input
            type="text"
            placeholder="0x..."
            className="input input-bordered"
          />
          <button className="btn btn-accent">Top up account</button>
        </label>
      </div>
      <div className="divider"></div>
      <div className="form-control items-center">
        <label className="input-group justify-center">
          <span>Amount</span>
          <input
            type="number"
            placeholder="0"
            step="0.00001"
            className="input input-bordered"
          />
          <button className="btn btn-primary">Withdraw Tokens</button>
        </label>
      </div>
      <div className="divider"></div>
    </div>
  );
};

export default OwnerUI;
