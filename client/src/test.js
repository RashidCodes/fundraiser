import React, { useEffect, useState } from 'react';
import getWeb3 from './utils/getWeb3';
import Web3 from 'web3';

// interact with a contract
import FundraiserContract from './contracts/Fundraiser.json'



const TestComponent =  () => {

    const [ contract, setContract ] = useState(null);
    const [ accounts, setAccounts ] = useState(null);


    // useEffect(() => {

    //     const init = async () => {


    //         let web3 = await getWeb3();
    //         const accounts = await web3.eth.getAccounts(); // returns a list
    //         const networkId = await web3.eth.net.getId();
    //         const deployedNetwork = FundraiserContract.networks[networkId];
    //         const instance = new web3.eth.Contract(FundraiserContract.abi, deployedNetwork.address);
    

    //         // setAccounts(accounts);
    //         setContract(instance);
    //         setAccounts(accounts);
            
    //     };

    //     init();

        
    // }, []);




    const createFundraisers = async () => {

        await contract.methods.createFundraiser(
            'USQ Fundraisers',
            'https://mui.com/system/getting-started/overview/',
            'https://cdn.consensys.net/uploads/Screen-Shot-2020-08-26-at-5.49.43-PM.png',
            'A Ganache description',
            '0xd5C47Bb4411C76d4908217bda8b2e014C50D548a'
        ).send({from: accounts[0]});

        alert('Successfully created fundraiser');
    
    }


    const callFunds = async () => {

        // contract.methods.fundraisers(10, 1).call({from: '0x6B3cf522652FB9Be09B550376820Ac9501040cCB'}).then(results => {
        //     console.log(results)
        // })
        const web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:7545'));

        const contract = new web3.eth.Contract(FundraiserContract.abi, '0x9Ff1687d50fb03F59Bd1B429cD687Ee0635eB5e7')

        const allFundraisers = await contract.methods.name().call()


        console.log(allFundraisers);
   
    }



    return (
        <div style={{flexDirection: 'row', width: '100%'}}>
            <h1> This is a test component</h1>
            <p>We'll learn how to use <code style={{display: 'inline-block'}}>web3</code> here</p>

            <p>Custodian: {accounts ? accounts[0] : 'No accounts found'}</p>

            <button onClick={createFundraisers}>Create Fundraiser</button>
            <button onClick={callFunds}>Call funds</button>

        </div>

    )
}


export default TestComponent;
