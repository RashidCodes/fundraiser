// SPDX-License-Identifier: MIT
pragma solidity 0.8.15;

// import the FundRaiser contract 
import "./FundRaiser.sol";


contract FundraiserFactory {

    // most items that can be returned from the fundraisers function 
    uint256 constant maxLimit =  20;

    Fundraiser[] private _fundraisers;

    event FundraiserCreated(Fundraiser indexed fundraiser, address indexed owner);


    // create a fundraiser
    function createFundraiser(
        string memory name,
        string memory url,
        string memory imageURL,
        string memory description,
        address payable beneficiary
    )
        public
    {
        // this returns the address of the new contract
        Fundraiser fundraiser = new Fundraiser(
            name,
            url,
            imageURL,
            description,
            beneficiary,
            msg.sender
        );

        _fundraisers.push(fundraiser);

        emit FundraiserCreated(fundraiser, msg.sender);
    }

   
    // get fundraisers
    function fundraisers(uint256 limit, uint256 offset) public view returns (Fundraiser[] memory coll){

        // you can use the require function to give errors more meaning
        require(offset <= fundraisersCount(), "offset out of bounds");

        uint256 size = fundraisersCount() - offset;

        size = size < limit ? size : limit;

        // size should not exceed the maxlimit 
        size = size < maxLimit ? size : maxLimit;

        coll = new Fundraiser[](size);

        for(uint256 i=0; i < size; i++){
            coll[i] = _fundraisers[offset + i];
        }

        return coll;
    }


    // get the count of fundraisers
    function fundraisersCount() public view returns(uint256){
        return _fundraisers.length;
    }

}
