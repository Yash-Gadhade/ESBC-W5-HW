import React from "react";

interface Props {}

const NonOwnerUI: React.FC<Props> = () => {
  return (
    <div>
      <button className="btn btn-info">Place bet</button>
      <div className="divider" />
      <button className="btn btn-error">Close bets</button>
    </div>
  );
};

export default NonOwnerUI;
