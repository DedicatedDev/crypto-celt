/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import type {
  ERC1155Upgradeable,
  ERC1155UpgradeableInterface,
} from "../ERC1155Upgradeable";

const _abi = [
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "account",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "operator",
        type: "address",
      },
      {
        indexed: false,
        internalType: "bool",
        name: "approved",
        type: "bool",
      },
    ],
    name: "ApprovalForAll",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "operator",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256[]",
        name: "ids",
        type: "uint256[]",
      },
      {
        indexed: false,
        internalType: "uint256[]",
        name: "values",
        type: "uint256[]",
      },
    ],
    name: "TransferBatch",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "operator",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "id",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
    ],
    name: "TransferSingle",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "string",
        name: "value",
        type: "string",
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "id",
        type: "uint256",
      },
    ],
    name: "URI",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "id",
        type: "uint256",
      },
    ],
    name: "balanceOf",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address[]",
        name: "accounts",
        type: "address[]",
      },
      {
        internalType: "uint256[]",
        name: "ids",
        type: "uint256[]",
      },
    ],
    name: "balanceOfBatch",
    outputs: [
      {
        internalType: "uint256[]",
        name: "",
        type: "uint256[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
      {
        internalType: "address",
        name: "operator",
        type: "address",
      },
    ],
    name: "isApprovedForAll",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256[]",
        name: "ids",
        type: "uint256[]",
      },
      {
        internalType: "uint256[]",
        name: "amounts",
        type: "uint256[]",
      },
      {
        internalType: "bytes",
        name: "data",
        type: "bytes",
      },
    ],
    name: "safeBatchTransferFrom",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "id",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
      {
        internalType: "bytes",
        name: "data",
        type: "bytes",
      },
    ],
    name: "safeTransferFrom",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "operator",
        type: "address",
      },
      {
        internalType: "bool",
        name: "approved",
        type: "bool",
      },
    ],
    name: "setApprovalForAll",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes4",
        name: "interfaceId",
        type: "bytes4",
      },
    ],
    name: "supportsInterface",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "uri",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
];

const _bytecode =
  "0x608060405234801561001057600080fd5b506125b7806100206000396000f3fe608060405234801561001057600080fd5b50600436106100875760003560e01c80634e1273f41161005b5780634e1273f414610138578063a22cb46514610168578063e985e9c514610184578063f242432a146101b457610087565b8062fdd58e1461008c57806301ffc9a7146100bc5780630e89341c146100ec5780632eb2c2d61461011c575b600080fd5b6100a660048036038101906100a191906113ab565b6101d0565b6040516100b391906113fa565b60405180910390f35b6100d660048036038101906100d1919061146d565b61029a565b6040516100e391906114b5565b60405180910390f35b610106600480360381019061010191906114d0565b61037c565b6040516101139190611596565b60405180910390f35b610136600480360381019061013191906117b5565b610410565b005b610152600480360381019061014d9190611947565b6104b1565b60405161015f9190611a7d565b60405180910390f35b610182600480360381019061017d9190611acb565b6105ca565b005b61019e60048036038101906101999190611b0b565b6105e0565b6040516101ab91906114b5565b60405180910390f35b6101ce60048036038101906101c99190611b4b565b610674565b005b60008073ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff161415610241576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161023890611c54565b60405180910390fd5b6065600083815260200190815260200160002060008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002054905092915050565b60007fd9b67a26000000000000000000000000000000000000000000000000000000007bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916827bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916148061036557507f0e89341c000000000000000000000000000000000000000000000000000000007bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916827bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916145b80610375575061037482610715565b5b9050919050565b60606067805461038b90611ca3565b80601f01602080910402602001604051908101604052809291908181526020018280546103b790611ca3565b80156104045780601f106103d957610100808354040283529160200191610404565b820191906000526020600020905b8154815290600101906020018083116103e757829003601f168201915b50505050509050919050565b61041861077f565b73ffffffffffffffffffffffffffffffffffffffff168573ffffffffffffffffffffffffffffffffffffffff16148061045e575061045d8561045861077f565b6105e0565b5b61049d576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161049490611d47565b60405180910390fd5b6104aa8585858585610787565b5050505050565b606081518351146104f7576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016104ee90611dd9565b60405180910390fd5b6000835167ffffffffffffffff811115610514576105136115bd565b5b6040519080825280602002602001820160405280156105425781602001602082028036833780820191505090505b50905060005b84518110156105bf5761058f85828151811061056757610566611df9565b5b602002602001015185838151811061058257610581611df9565b5b60200260200101516101d0565b8282815181106105a2576105a1611df9565b5b602002602001018181525050806105b890611e57565b9050610548565b508091505092915050565b6105dc6105d561077f565b8383610a9e565b5050565b6000606660008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060009054906101000a900460ff16905092915050565b61067c61077f565b73ffffffffffffffffffffffffffffffffffffffff168573ffffffffffffffffffffffffffffffffffffffff1614806106c257506106c1856106bc61077f565b6105e0565b5b610701576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016106f890611f12565b60405180910390fd5b61070e8585858585610c0b565b5050505050565b60007f01ffc9a7000000000000000000000000000000000000000000000000000000007bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916827bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916149050919050565b600033905090565b81518351146107cb576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016107c290611fa4565b60405180910390fd5b600073ffffffffffffffffffffffffffffffffffffffff168473ffffffffffffffffffffffffffffffffffffffff16141561083b576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161083290612036565b60405180910390fd5b600061084561077f565b9050610855818787878787610e90565b60005b8451811015610a0957600085828151811061087657610875611df9565b5b60200260200101519050600085838151811061089557610894611df9565b5b6020026020010151905060006065600084815260200190815260200160002060008b73ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002054905081811015610937576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161092e906120c8565b60405180910390fd5b8181036065600085815260200190815260200160002060008c73ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002081905550816065600085815260200190815260200160002060008b73ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008282546109ee91906120e8565b9250508190555050505080610a0290611e57565b9050610858565b508473ffffffffffffffffffffffffffffffffffffffff168673ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff167f4a39dc06d4c0dbc64b70af90fd698a233a518aa5d07e595d983b8c0526c8f7fb8787604051610a8092919061213e565b60405180910390a4610a96818787878787610e98565b505050505050565b8173ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff161415610b0d576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610b04906121e7565b60405180910390fd5b80606660008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060006101000a81548160ff0219169083151502179055508173ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff167f17307eab39ab6107e8899845ad3d59bd9653f200f220920489ca2b5937696c3183604051610bfe91906114b5565b60405180910390a3505050565b600073ffffffffffffffffffffffffffffffffffffffff168473ffffffffffffffffffffffffffffffffffffffff161415610c7b576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610c7290612036565b60405180910390fd5b6000610c8561077f565b9050610ca5818787610c968861107f565b610c9f8861107f565b87610e90565b60006065600086815260200190815260200160002060008873ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002054905083811015610d3d576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610d34906120c8565b60405180910390fd5b8381036065600087815260200190815260200160002060008973ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002081905550836065600087815260200190815260200160002060008873ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000206000828254610df491906120e8565b925050819055508573ffffffffffffffffffffffffffffffffffffffff168773ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff167fc3d58168c5ae7397731d063d5bbf3d657854427343f4c083240f7aacaa2d0f628888604051610e71929190612207565b60405180910390a4610e878288888888886110f9565b50505050505050565b505050505050565b610eb78473ffffffffffffffffffffffffffffffffffffffff166112e0565b15611077578373ffffffffffffffffffffffffffffffffffffffff1663bc197c8187878686866040518663ffffffff1660e01b8152600401610efd959493929190612294565b602060405180830381600087803b158015610f1757600080fd5b505af1925050508015610f4857506040513d601f19601f82011682018060405250810190610f459190612311565b60015b610fee57610f5461234b565b806308c379a01415610fb15750610f6961236d565b80610f745750610fb3565b806040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610fa89190611596565b60405180910390fd5b505b6040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610fe590612475565b60405180910390fd5b63bc197c8160e01b7bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916817bffffffffffffffffffffffffffffffffffffffffffffffffffffffff191614611075576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161106c90612507565b60405180910390fd5b505b505050505050565b60606000600167ffffffffffffffff81111561109e5761109d6115bd565b5b6040519080825280602002602001820160405280156110cc5781602001602082028036833780820191505090505b50905082816000815181106110e4576110e3611df9565b5b60200260200101818152505080915050919050565b6111188473ffffffffffffffffffffffffffffffffffffffff166112e0565b156112d8578373ffffffffffffffffffffffffffffffffffffffff1663f23a6e6187878686866040518663ffffffff1660e01b815260040161115e959493929190612527565b602060405180830381600087803b15801561117857600080fd5b505af19250505080156111a957506040513d601f19601f820116820180604052508101906111a69190612311565b60015b61124f576111b561234b565b806308c379a0141561121257506111ca61236d565b806111d55750611214565b806040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016112099190611596565b60405180910390fd5b505b6040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161124690612475565b60405180910390fd5b63f23a6e6160e01b7bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916817bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916146112d6576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016112cd90612507565b60405180910390fd5b505b505050505050565b6000808273ffffffffffffffffffffffffffffffffffffffff163b119050919050565b6000604051905090565b600080fd5b600080fd5b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b600061134282611317565b9050919050565b61135281611337565b811461135d57600080fd5b50565b60008135905061136f81611349565b92915050565b6000819050919050565b61138881611375565b811461139357600080fd5b50565b6000813590506113a58161137f565b92915050565b600080604083850312156113c2576113c161130d565b5b60006113d085828601611360565b92505060206113e185828601611396565b9150509250929050565b6113f481611375565b82525050565b600060208201905061140f60008301846113eb565b92915050565b60007fffffffff0000000000000000000000000000000000000000000000000000000082169050919050565b61144a81611415565b811461145557600080fd5b50565b60008135905061146781611441565b92915050565b6000602082840312156114835761148261130d565b5b600061149184828501611458565b91505092915050565b60008115159050919050565b6114af8161149a565b82525050565b60006020820190506114ca60008301846114a6565b92915050565b6000602082840312156114e6576114e561130d565b5b60006114f484828501611396565b91505092915050565b600081519050919050565b600082825260208201905092915050565b60005b8381101561153757808201518184015260208101905061151c565b83811115611546576000848401525b50505050565b6000601f19601f8301169050919050565b6000611568826114fd565b6115728185611508565b9350611582818560208601611519565b61158b8161154c565b840191505092915050565b600060208201905081810360008301526115b0818461155d565b905092915050565b600080fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b6115f58261154c565b810181811067ffffffffffffffff82111715611614576116136115bd565b5b80604052505050565b6000611627611303565b905061163382826115ec565b919050565b600067ffffffffffffffff821115611653576116526115bd565b5b602082029050602081019050919050565b600080fd5b600061167c61167784611638565b61161d565b9050808382526020820190506020840283018581111561169f5761169e611664565b5b835b818110156116c857806116b48882611396565b8452602084019350506020810190506116a1565b5050509392505050565b600082601f8301126116e7576116e66115b8565b5b81356116f7848260208601611669565b91505092915050565b600080fd5b600067ffffffffffffffff8211156117205761171f6115bd565b5b6117298261154c565b9050602081019050919050565b82818337600083830152505050565b600061175861175384611705565b61161d565b90508281526020810184848401111561177457611773611700565b5b61177f848285611736565b509392505050565b600082601f83011261179c5761179b6115b8565b5b81356117ac848260208601611745565b91505092915050565b600080600080600060a086880312156117d1576117d061130d565b5b60006117df88828901611360565b95505060206117f088828901611360565b945050604086013567ffffffffffffffff81111561181157611810611312565b5b61181d888289016116d2565b935050606086013567ffffffffffffffff81111561183e5761183d611312565b5b61184a888289016116d2565b925050608086013567ffffffffffffffff81111561186b5761186a611312565b5b61187788828901611787565b9150509295509295909350565b600067ffffffffffffffff82111561189f5761189e6115bd565b5b602082029050602081019050919050565b60006118c36118be84611884565b61161d565b905080838252602082019050602084028301858111156118e6576118e5611664565b5b835b8181101561190f57806118fb8882611360565b8452602084019350506020810190506118e8565b5050509392505050565b600082601f83011261192e5761192d6115b8565b5b813561193e8482602086016118b0565b91505092915050565b6000806040838503121561195e5761195d61130d565b5b600083013567ffffffffffffffff81111561197c5761197b611312565b5b61198885828601611919565b925050602083013567ffffffffffffffff8111156119a9576119a8611312565b5b6119b5858286016116d2565b9150509250929050565b600081519050919050565b600082825260208201905092915050565b6000819050602082019050919050565b6119f481611375565b82525050565b6000611a0683836119eb565b60208301905092915050565b6000602082019050919050565b6000611a2a826119bf565b611a3481856119ca565b9350611a3f836119db565b8060005b83811015611a70578151611a5788826119fa565b9750611a6283611a12565b925050600181019050611a43565b5085935050505092915050565b60006020820190508181036000830152611a978184611a1f565b905092915050565b611aa88161149a565b8114611ab357600080fd5b50565b600081359050611ac581611a9f565b92915050565b60008060408385031215611ae257611ae161130d565b5b6000611af085828601611360565b9250506020611b0185828601611ab6565b9150509250929050565b60008060408385031215611b2257611b2161130d565b5b6000611b3085828601611360565b9250506020611b4185828601611360565b9150509250929050565b600080600080600060a08688031215611b6757611b6661130d565b5b6000611b7588828901611360565b9550506020611b8688828901611360565b9450506040611b9788828901611396565b9350506060611ba888828901611396565b925050608086013567ffffffffffffffff811115611bc957611bc8611312565b5b611bd588828901611787565b9150509295509295909350565b7f455243313135353a2062616c616e636520717565727920666f7220746865207a60008201527f65726f2061646472657373000000000000000000000000000000000000000000602082015250565b6000611c3e602b83611508565b9150611c4982611be2565b604082019050919050565b60006020820190508181036000830152611c6d81611c31565b9050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052602260045260246000fd5b60006002820490506001821680611cbb57607f821691505b60208210811415611ccf57611cce611c74565b5b50919050565b7f455243313135353a207472616e736665722063616c6c6572206973206e6f742060008201527f6f776e6572206e6f7220617070726f7665640000000000000000000000000000602082015250565b6000611d31603283611508565b9150611d3c82611cd5565b604082019050919050565b60006020820190508181036000830152611d6081611d24565b9050919050565b7f455243313135353a206163636f756e747320616e6420696473206c656e67746860008201527f206d69736d617463680000000000000000000000000000000000000000000000602082015250565b6000611dc3602983611508565b9150611dce82611d67565b604082019050919050565b60006020820190508181036000830152611df281611db6565b9050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b6000611e6282611375565b91507fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff821415611e9557611e94611e28565b5b600182019050919050565b7f455243313135353a2063616c6c6572206973206e6f74206f776e6572206e6f7260008201527f20617070726f7665640000000000000000000000000000000000000000000000602082015250565b6000611efc602983611508565b9150611f0782611ea0565b604082019050919050565b60006020820190508181036000830152611f2b81611eef565b9050919050565b7f455243313135353a2069647320616e6420616d6f756e7473206c656e6774682060008201527f6d69736d61746368000000000000000000000000000000000000000000000000602082015250565b6000611f8e602883611508565b9150611f9982611f32565b604082019050919050565b60006020820190508181036000830152611fbd81611f81565b9050919050565b7f455243313135353a207472616e7366657220746f20746865207a65726f20616460008201527f6472657373000000000000000000000000000000000000000000000000000000602082015250565b6000612020602583611508565b915061202b82611fc4565b604082019050919050565b6000602082019050818103600083015261204f81612013565b9050919050565b7f455243313135353a20696e73756666696369656e742062616c616e636520666f60008201527f72207472616e7366657200000000000000000000000000000000000000000000602082015250565b60006120b2602a83611508565b91506120bd82612056565b604082019050919050565b600060208201905081810360008301526120e1816120a5565b9050919050565b60006120f382611375565b91506120fe83611375565b9250827fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff0382111561213357612132611e28565b5b828201905092915050565b600060408201905081810360008301526121588185611a1f565b9050818103602083015261216c8184611a1f565b90509392505050565b7f455243313135353a2073657474696e6720617070726f76616c2073746174757360008201527f20666f722073656c660000000000000000000000000000000000000000000000602082015250565b60006121d1602983611508565b91506121dc82612175565b604082019050919050565b60006020820190508181036000830152612200816121c4565b9050919050565b600060408201905061221c60008301856113eb565b61222960208301846113eb565b9392505050565b61223981611337565b82525050565b600081519050919050565b600082825260208201905092915050565b60006122668261223f565b612270818561224a565b9350612280818560208601611519565b6122898161154c565b840191505092915050565b600060a0820190506122a96000830188612230565b6122b66020830187612230565b81810360408301526122c88186611a1f565b905081810360608301526122dc8185611a1f565b905081810360808301526122f0818461225b565b90509695505050505050565b60008151905061230b81611441565b92915050565b6000602082840312156123275761232661130d565b5b6000612335848285016122fc565b91505092915050565b60008160e01c9050919050565b600060033d111561236a5760046000803e61236760005161233e565b90505b90565b600060443d101561237d57612400565b612385611303565b60043d036004823e80513d602482011167ffffffffffffffff821117156123ad575050612400565b808201805167ffffffffffffffff8111156123cb5750505050612400565b80602083010160043d0385018111156123e8575050505050612400565b6123f7826020018501866115ec565b82955050505050505b90565b7f455243313135353a207472616e7366657220746f206e6f6e204552433131353560008201527f526563656976657220696d706c656d656e746572000000000000000000000000602082015250565b600061245f603483611508565b915061246a82612403565b604082019050919050565b6000602082019050818103600083015261248e81612452565b9050919050565b7f455243313135353a204552433131353552656365697665722072656a6563746560008201527f6420746f6b656e73000000000000000000000000000000000000000000000000602082015250565b60006124f1602883611508565b91506124fc82612495565b604082019050919050565b60006020820190508181036000830152612520816124e4565b9050919050565b600060a08201905061253c6000830188612230565b6125496020830187612230565b61255660408301866113eb565b61256360608301856113eb565b8181036080830152612575818461225b565b9050969550505050505056fea2646970667358221220f5fc8e092fcbf96edc80733b548aa84b9268f30b7b95b3269d0c45b9a46cfbc964736f6c63430008090033";

export class ERC1155Upgradeable__factory extends ContractFactory {
  constructor(
    ...args: [signer: Signer] | ConstructorParameters<typeof ContractFactory>
  ) {
    if (args.length === 1) {
      super(_abi, _bytecode, args[0]);
    } else {
      super(...args);
    }
  }

  deploy(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ERC1155Upgradeable> {
    return super.deploy(overrides || {}) as Promise<ERC1155Upgradeable>;
  }
  getDeployTransaction(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  attach(address: string): ERC1155Upgradeable {
    return super.attach(address) as ERC1155Upgradeable;
  }
  connect(signer: Signer): ERC1155Upgradeable__factory {
    return super.connect(signer) as ERC1155Upgradeable__factory;
  }
  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): ERC1155UpgradeableInterface {
    return new utils.Interface(_abi) as ERC1155UpgradeableInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): ERC1155Upgradeable {
    return new Contract(address, _abi, signerOrProvider) as ERC1155Upgradeable;
  }
}