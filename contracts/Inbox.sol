// SPDX-License-Identifier: MIT
pragma solidity ^0.8.11;

contract Inbox {
    string private message;

    constructor(string memory initMessage) {
        message = initMessage;
    }

    function setMessage(string memory newMessage) public {
        message = newMessage;
    }

    function getMessage() public view returns (string memory) {
        return message;
    }
}
