//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.7;

import "@openzeppelin/contracts-upgradeable/token/ERC1155/ERC1155Upgradeable.sol";
import "@openzeppelin/contracts-upgradeable/utils/CountersUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/utils/StringsUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/UUPSUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/utils/structs/EnumerableSetUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/security/PausableUpgradeable.sol";
import "./GreenFalcoin.sol";

contract CeltMinter is ERC1155Upgradeable,UUPSUpgradeable,OwnableUpgradeable,PausableUpgradeable {
    
    using CountersUpgradeable for CountersUpgradeable.Counter;

    CountersUpgradeable.Counter private tokenIds_;
    GreenFalcoin private token_;
    uint256 private airdropAmount_ = 10000 ether;
    uint256 private mintFee_ = 1e16 wei;

    function initialize() public initializer {
      ///@dev as there is no constructor, we need to initialise the OwnableUpgradeable explicitly
        __Pausable_init();
        __Ownable_init();
        __ERC1155_init("https://bafybeiart4ifwiigqlkw6m7mmumetlquozzalj3tbtbhdofwsvaoim6znu.ipfs.nftstorage.link/");
    }

     ///@dev required by the OZ UUPS module
    function _authorizeUpgrade(address) internal override onlyOwner {}
    
    function pause() external onlyOwner  {
        _pause();
    }

    function unpause() external onlyOwner {
        _unpause();
    }

    

    function claim(uint256 amount, bool levelup) external payable whenNotPaused {
        require(msg.value == mintFee_ * amount, "CeltMinter: not enough fund");
        require(amount<1000,"CeltMinter: exccced amount");
        for (uint256 index = 0; index < amount; index++) {
            _mint(msg.sender, tokenIds_.current(), 1, "0x00");
            tokenIds_.increment();
        }
        if(levelup){
            airdrop_(msg.sender, amount * airdropAmount_ * 5);
        }else{
            airdrop_(msg.sender, amount * airdropAmount_);
        }
    }

    function airdrop_(address receiver,uint256 amount) private {
        token_.transfer(receiver, amount);
    }

    function setGreenFalAirdropAmount(uint256 airdropAmount)  external onlyOwner   {
        require(airdropAmount > 0, "CeltMinter: invalid amount");
        airdropAmount_ = airdropAmount;
    }

    function setFee(uint256 fee)  external onlyOwner   {
        require(fee > 0, "CeltMinter: invalid amount");
        mintFee_ = fee;
    }
    
    function uri(uint256 _tokenId) override public view returns (string memory) {
        
        return string(abi.encodePacked(
            "https://bafybeiart4ifwiigqlkw6m7mmumetlquozzalj3tbtbhdofwsvaoim6znu.ipfs.nftstorage.link/",
            StringsUpgradeable.toString(_tokenId+1),
            ".json"
        ));
    }

    function burn(uint256 tokenId) external {
        _burn(msg.sender,tokenId,1);
    }

    function withdraw(uint256 withdrawAmount) external onlyOwner {
        require(withdrawAmount > 0, "CeltMinter: invalid withdraw amount");
        if(withdrawAmount > address(this).balance) {
            (bool sent, ) = payable(address(this)).call{value:address(this).balance}("");            
        } else{
            (bool sent, ) = payable(address(this)).call{value:withdrawAmount}("");
        }
    }

    function setUri(string memory domain) external onlyOwner {
        _setURI(domain);
    }
}
