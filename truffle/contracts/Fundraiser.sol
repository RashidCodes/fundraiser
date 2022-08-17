// SPDX-License-Identifier: MIT
pragma solidity 0.8.15;


// Import Ownable.sol 
import '../node_modules/@openzeppelin/contracts/access/Ownable.sol';

contract Fundraiser is Ownable {

    // event: Tells us when a donation is received
    // Marking the address as "index" allows the EVM to make it easier for
    // subscribers to filter events that may be relevant to them.
    // Up to 3 parameteres can be indexed when defining an event.
    event DonationReceived(address indexed donor, uint256 value);

    event Withdraw(uint256 amount);

    struct Donation {
        uint256 value;
        // uint256 conversionFactor;
        uint256 date;
    }

    mapping(address => Donation[]) private _donations;

    uint256 public totalDonations;

    uint256 public donationsCount;

    // Paramters contaning references data types such as arrays or strings
    // need to notate if they are pointing directly to persisted data with 
    // storage, or a local copy of that data, notated as memory.

    // The final data location *calldata* was discussed last chapter with the 
    // Greeter contract and is the required location when the function visibility
    // is set to external.

    // default visibility type: internal
    string public name;
    string public url;
    string public imageURL;
    string public description;
    address payable public beneficiary;
    address public custodian;

    constructor(
        string memory _name,
        string memory _url,
        string memory _imageURL,
        string memory _description,
        address payable _beneficiary,
        address _custodian
    ) {
        name = _name;
        url = _url;
        imageURL = _imageURL;
        description = _description;
        beneficiary = _beneficiary;
        // custodian = _custodian;
        _transferOwnership(_custodian);
    }



    function myDonationsCount() public view returns(uint) {
        return _donations[msg.sender].length;
    }

    function donate() public payable {
        Donation memory donation = Donation({
            value: msg.value,
            // conversionFactor: 0,
            date: block.timestamp
        });

        _donations[msg.sender].push(donation);

        // increase the sum of donation amounts
        totalDonations = totalDonations + msg.value;

        // increase the total number of donations
        donationsCount++;

        // emit an event when someone makes a donation
        emit DonationReceived(msg.sender, msg.value);
    }


    function myDonations() public view returns (
        uint256[] memory values, 
        uint256[] memory dates
    )
    {
        uint count = myDonationsCount();

        // memory arrays with dynamic length
        // it is not possible to resize memory arrays
        // the new keyword is used because the size is not known
        // at runtime
        values = new uint256[](count);
        dates = new uint256[](count);

        for (uint256 i = 0; i < count; i++){
            Donation storage donation = _donations[msg.sender][i];
            values[i] = donation.value;
            dates[i] = donation.date;
        }

        return (values, dates);
    }


    // setBeneficiary function
    function setBeneficiary(address payable _beneficiary) public onlyOwner {
        beneficiary = _beneficiary;
    }

    
    function withdraw() public onlyOwner {
        uint256 balance = address(this).balance;
        beneficiary.transfer(balance);

        emit Withdraw(balance);
    }


    // receive function: Send us some ether without using the 
    // donate() function 
    receive () external payable {
        totalDonations = totalDonations + msg.value;
        donationsCount++;
    }
}
