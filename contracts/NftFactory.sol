// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

import "../node_modules/@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "../node_modules/@openzeppelin/contracts/access/Ownable.sol";

contract NftFactory is ERC1155, Ownable {


  string public name = "IAE Degree NFT";
  string public symbol = "IAENFT";

  uint256 public constant IAEMBA = 0;

  event contractfinalization(string msg);
  constructor() ERC1155("https://dtrdc6uexo3c.grandmoralis.com/{id}.json")  {
    _mint(msg.sender, IAEMBA, 1, "");
  }

  function mint(
        address account,
        uint256 id,
        uint256 amount
        
  ) public onlyOwner {
        _mint(account,id,amount,"");
  }


  function finalize () public onlyOwner {

    emit contractfinalization("Contract finalzation called.");
    selfdestruct(payable(msg.sender));
  }
  

  
}
