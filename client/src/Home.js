import React, { useState, useEffect } from "react";
import { makeStyles } from '@material-ui/core/styles';
import FundraiserCard from './FundraiserCard'
import getWeb3 from "./utils/getWeb3";
import FactoryContract from "./contracts/FundraiserFactory.json";
import Web3 from 'web3'



const Home = () => {
	
	useEffect(() => {
	

	}, []);


	return (
		<div>
		   <h2>Home</h2>
		</div>
	)
}

export default Home;
