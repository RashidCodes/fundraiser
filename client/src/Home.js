import React, { useState, useEffect } from "react";
import { makeStyles } from '@material-ui/core/styles';
import FundraiserCard from './FundraiserCard'
import getWeb3 from "./utils/getWeb3";
import FundraiserFactory from './contracts/FundraiserFactory.json';



const Home = () => {

	const [ contract, setContract ] = useState(null);
	const [ accounts, setAccounts ] = useState(null);
	const [ funds, setFunds ] = useState([]);


	useEffect(() => {
		init();
	}, []);

	const init = async () => {
		try {

            let web3 = await getWeb3();
            const accounts = await web3.eth.getAccounts(); 
            const networkId = await web3.eth.net.getId();
            const deployedNetwork = FundraiserFactory.networks[networkId];
            const instance = new web3.eth.Contract(FundraiserFactory.abi, deployedNetwork.address);
     

            // setAccounts(accounts);
            setContract(instance);
            setAccounts(accounts);


		    const fundraisers = await instance.methods.fundraisers(10, 0).call({from: accounts[0]});
			setFunds(fundraisers);

		}
		catch(error) {
		  alert(
			`Failed to load web3, accounts, or contract. Check console for details.`,
		  );
		  console.error(error);
		}
	}

	const displayFundraisers = () => {
		return funds.map((fundraiser) => {
		  return (
			<FundraiserCard
			  fundraiser={fundraiser}
			  key={fundraiser}
			/>
		  )
		})
	}


	return (
		<div className="main-container">
		   {displayFundraisers()}
		</div>
	)
}

export default Home;
