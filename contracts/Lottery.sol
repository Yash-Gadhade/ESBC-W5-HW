// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.7.0 <0.9.0;

import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";
import {LotteryToken} from "./Token.sol";

contract Lottery is Ownable {
    LotteryToken public paymentToken;

    bool public betsOpen;

    uint256 public betsClosingTime;
    uint256 public purchaseRatio;
    uint256 public prizePool;
    uint256 public ownerPool;
    uint256 public betPrice;
    uint256 public betFee;

    mapping(address => uint256) public prize;

    address[] _slots;

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

    // Optimize this
    function betMany(uint256 times) public {
        require(times > 0);
        while (times > 0) {
            bet();
            --times;
        }
    }

    function bet() public {
        require(betsOpen);
        ownerPool += betFee;
        prizePool += betPrice;
        _slots.push(msg.sender);
        paymentToken.transferFrom(msg.sender, address(this), betPrice + betFee);
    }

    function closeLottery() public {
        require(block.timestamp >= betsClosingTime, "Too soon to close");
        require(betsOpen, "Already Closed");
        if (_slots.length > 0) {
            uint256 winnerIndex = getRandomNumber() % _slots.length;
            address winner = _slots[winnerIndex];
            prize[winner] += prizePool;
            prizePool = 0;
            delete (_slots);
        }
        betsOpen = false;
    }

    function getRandomNumber() public view returns (uint256 randomNumber) {
        randomNumber = block.difficulty;
    }

    function prizeWithdraw(uint256 amount) public onlyOwner {
        require(amount <= ownerPool, "Not enough fees collected");
        ownerPool -= amount;
        paymentToken.transfer(msg.sender, amount);
    }
}
