//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.7;

import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/token/ERC20/ERC20Upgradeable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/UUPSUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/security/PausableUpgradeable.sol";


contract GreenFalcoin is ERC20Upgradeable,UUPSUpgradeable,PausableUpgradeable,OwnableUpgradeable  {


    function initialize() public initializer {
      ///@dev as there is no constructor, we need to initialise the OwnableUpgradeable explicitly
        __Pausable_init();
        __Ownable_init();
        __ERC20_init("GreenFalcoin", "Fal");
    }

     ///@dev required by the OZ UUPS module
    function _authorizeUpgrade(address) internal override onlyOwner {}
    
      function pause() external onlyOwner  {
        _pause();
    }

    function unpause() external onlyOwner {
        _unpause();
    }
    function mint(address to, uint256 amount) public whenNotPaused onlyOwner  {
        _mint(to, amount);
    }
}