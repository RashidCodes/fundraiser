import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import FundraiserContract from './contracts/Fundraiser.json';
import Web3 from 'web3';


const useStyles = makeStyles({
	card: {
		maxWidth: 450,
		height: 400,
		margin: '15px'
	},

	media: {
		height: 140,
	}
});


const FundraiserCard = ({ fundraiser }) => {

	const classes = useStyles();
	
	const [ contract, setContract] = useState(null)
	const [ accounts, setAccounts ] = useState(null)
	const [ fund, setFundraiser ] = useState(null)
	const [ fundName, setFundname ] = useState(null)
	const [ description, setDescription ] = useState(null)
	const [ totalDonations, setTotalDonations ] = useState(null)
	const [ imageURL, setImageURL ] = useState(null)
	const [ url, setURL ] = useState(null)
	const [ open, setOpen] = useState(false);
	const [ donationAmount, setDonationAmount] = useState(null)
	const [ exchangeRate, setExchangeRate ] = useState(null)
	const [ userDonations, setUserDonations ] = useState(null)
	const [ isOwner, setIsOwner ] = useState(false)
	const [ beneficiary, setNewBeneficiary ] = useState('')


	useEffect(() => {
		if (fundraiser) {
		  init(fundraiser)
		}
	}, [fundraiser]);

	
    const init = async (fundraiser) => {
		try {

			const web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:7545'));
			// const accounts = await web3.eth.getAccounts(); 
			// const networkId = await web3.eth.net.getId();
			// const deployedNetwork = FundraiserContract.networks[networkId];
			const instance = new web3.eth.Contract(FundraiserContract.abi, fundraiser);

			setContract(instance);
			setAccounts(accounts);


			// Placeholder for getting information about each contract

			const name = await instance.methods.name().call();
			const description = await instance.methods.description().call()
			const totalDonations = await instance.methods.totalDonations().call()
			const imageURL = await instance.methods.imageURL().call()
			const url = await instance.methods.url().call()


			setTotalDonations(totalDonations)
			setFundname(name)
			setDescription(description)
			setImageURL(imageURL)
			setURL(url)
		}
		catch(error) {
			alert(
				`Failed to load web3, accounts, or contract. Check console for details.`,
			);
			console.error(error);
		}
	}


	return (
		<div className="fundraiser-card-content">
		   <Card className={classes.card}>
		      <CardActionArea>
		         <CardMedia
		            className={classes.media}
		            image={'https://images.pexels.com/photos/302743/pexels-photo-302743.jpeg?cs=srgb&dl=pexels-pixabay-302743.jpg&fm=jpg'}
		            title="Fundraiser Image"
		         />
		         <CardContent>
		            <Typography gutterBottom variant='h5' component='h2'>
		               {fundName}
		            </Typography>
		            <Typography variant="body2" color="textSecondary" component="p">
		               <p>{description}</p>
		            </Typography>
		         </CardContent>
		      </CardActionArea>
		      <CardActions>
		         <Button size="small" color="primary">
		           View More
		         </Button>
		      </CardActions>
		   </Card>
		</div>
	)
}


export default FundraiserCard;
