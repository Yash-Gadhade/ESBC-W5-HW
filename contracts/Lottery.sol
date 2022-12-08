// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.7.0 <0.9.0;

import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";
import {LotteryToken} from "./Token.sol";

contract Lottery is Ownable {
    LotteryToken public paymentToken;

    bool public betsOpen;

    uint256 public betsClosingTime;
    uint256 public purchaseRatio;

    constructor(
        string memory tokenName,
        string memory tokenSymbol,
        uint256 _purchaseRatio
    ) {
        purchaseRatio = _purchaseRatio;
        paymentToken = new LotteryToken(tokenName, tokenSymbol);
    }

    function openBets(uint256 timestamp) external onlyOwner {
        require(
            timestamp > block.timestamp,
            "Lottery: The closing time must be in the future"
        );
        require(!betsOpen, "Lottery:Bets are open");
        betsOpen = true;
        betsClosingTime = timestamp;
    }

    function purchaseTokens() external payable {
        paymentToken.mint(msg.sender, msg.value * purchaseRatio);
    }
}
