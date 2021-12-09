// SPDX-License-Identifier: MIT

pragma solidity ^0.6.0;

contract SimpleStorage {
    // This will get initialized to 0
    uint256 favouriteNum;

    struct People{
        uint256 favouriteNum;
        string name;
    }

    People public person = People({favouriteNum:2, name:"Ankit"});

    People[] public people;
    mapping(string=> uint256) public nameToFavNum;

    function store(uint256 _favNum) public {
        favouriteNum = _favNum;
    }

    function retrieve() public view returns(uint256){
        return favouriteNum;
    }

    function addPerson(string memory _name, uint256 _favNum)public{
        people.push(People({favouriteNum:_favNum, name:_name}));
        nameToFavNum[_name] = _favNum;
    }


}
tests...4_Ballot_test.sol
// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;
import "remix_tests.sol"; // this import is automatically injected by Remix.
import "../contracts/3_Ballot.sol";

contract BallotTest {
   
    bytes32[] proposalNames;
   
    Ballot ballotToTest;
    function beforeAll () public {
        proposalNames.push(bytes32("candidate1"));
        ballotToTest = new Ballot(proposalNames);
    }
    
    function checkWinningProposal () public {
        ballotToTest.vote(0);
        Assert.equal(ballotToTest.winningProposal(), uint(0), "proposal at index 0 should be the winning proposal");
        Assert.equal(ballotToTest.winnerName(), bytes32("candidate1"), "candidate1 should be the winner name");
    }
    
    function checkWinninProposalWithReturnValue () public view returns (bool) {
        return ballotToTest.winningProposal() == 0;
    }
}