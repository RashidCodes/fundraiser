import React, { useState, useEffect } from 'react';
//import { EthProvider } from "./contexts/EthContext";
import { Routes, Route,  Link } from "react-router-dom";
import FactoryContract from "./contracts/FundraiserFactory.json" 
import getWeb3 from "./utils/getWeb3.js"
import "./App.css";
import Home from "./Home.js"
import Receipts from './Receipts';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';



const useStyles = makeStyles({
	root: {
		flexGrow: 1,
	},
});





function App() {

	const classes = useStyles();

	const [state, setState] = useState({web3: null, accounts: null, contract: null});
	const [storageValue, setStorageValue] = useState(0);


	useEffect(() => {

		const init = async () => {
			try {
				const web3 = await getWeb3();
				const accounts = await web3.eth.getAccounts();
				const networkId = await web3.eth.net.getId();
				const deployedNetwork = FactoryContract.networks[networkId];
				const instance = new web3.eth.Contract(
					FactoryContract.abi,
					deployedNetwork && deployedNetwork.address
				);

				setState({web3, accounts, contract: instance});

			} catch (error) {
				alert(
					`Failed to load web3, accounts, or contract.
					Check console for details.`
				)

				console.error(error)
			}
		};

		init();

	}, []);


	const runExample = async () => {
		const { accounts, contract } = state;
	};


	return (

		   <div>
		      <AppBar position="static" color="default">
		         <Toolbar>
		            <Typography variant='h6' color='inherit'>
				<Link className='nav-link' to="/">Home</Link>
		            </Typography>
		            <Typography variant='h6' color='inherit'>
				<Link className='nav-link' to="/new">New</Link>
		            </Typography>
		         </Toolbar>
		      </AppBar>
		      <h1>Fundraiser</h1>
		   </div>
	);
}


export default App;
