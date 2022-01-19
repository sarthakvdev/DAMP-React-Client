import DAMPool from "./abis/DAMPool.json";
import aaveDAIDetails from './denominationAsset.json';
import { convertFrom, convertTo } from './utils';
import mWeb3 from './mWeb3';

let web3 = null;

mWeb3()
    .then((w) => {
        web3 = w;
    })
    .catch((err) => console.log(err));

export let pool;

function checkIfInit() {
    // Write code to throw an error if initDAMPool hasn't been called i.e. pool === null
}

export function initDAMPool(poolAddr) {
    try {
        pool = new web3.eth.Contract(DAMPool, poolAddr);
        console.log(`DAMPool ${poolAddr} initialized`);
    } catch (err) {
        console.log("initDAMPool ERR: ", err);
    }
}

// Function to check if a user is a manager
export async function isManager(userAddr) {
    try {
        const ans = await pool.methods.isManager(userAddr).call();
        console.log(`User ${userAddr} is a manager: ${ans}`);
        return ans;
    } catch (err) {
        console.log("isManager ERR: ", err);
    }
}

// Tops up the contract with denomination asset by transferring from the comptroller
// Pass the manager's address or use Moralis to get the manager's address
export async function topupDAMPool(userAddr) {
    try {
        await pool.methods.topupDAMPool().send({ from: userAddr });
        console.log("DAMPool topped up");
    } catch (err) {
        console.log("topupDAMPool ERR: ", err);
    }
}

// Tops up the comptroller contract with denomination asset by transferring from this contract
export async function topupComptroller(userAddr, amount) {
    try {
        await pool.methods.topupComptroller(convertTo(amount, 18)).send({ from: userAddr });
        console.log(`Topped up comptroller of DAMPool ${pool.address} with ${amount} of aaveDAI`);
    } catch (err) {
        console.log("topupComptroller ERR: ", err);
    }
}

// Calculates the value of all the assets held by this contract in $
export async function calcTotalValue() {
    try {
        const value = await pool.methods.calcTotalValue().call();
        console.log(`Total value locked in DAMPool ${pool.address} is $ ${convertFrom(value, 18)}`);
        return convertFrom(value, 18);
    } catch (err) {
        console.log("calcTotalValue ERR: ", err);
    }
}

// Calls a function from a verified adapter
export async function callOnAdapter(adapterAddr, tokenAddr, selectorName, data, userAddr) {
    try {
        await pool.methods.callOnAdapter(adapterAddr, tokenAddr, selectorName, data).send({ from: userAddr });
        console.log(`${adapterAddr} called by ${userAddr}`);
    } catch (err) {
        console.log("callOnAdapter ERR: ", err);
    }
}

// Function to get aaveDeposit data to pass to callOnAdapter function 
export async function getAaveDepositData(tokenAddr, amount) {
    try {
        const data = await web3.eth.abi.encodeParameters(['address', 'uint256'], [tokenAddr, convertTo(amount, 18)]);
        return data;
    } catch (err) {
        console.log("getAaveDepositData ERR: ", err);
    }
}

// Function to get aaveRedeem data to pass to callOnAdapter function 
export async function getAaveRedeemData(tokenAddr, amount) {
    try {
        const data = await web3.eth.abi.encodeParameters(['address', 'uint256'], [tokenAddr, convertTo(amount, 18)]);
        return data;
    } catch (err) {
        console.log("getAaveRedeemData ERR: ", err);
    }
}

// Function to deposit aaveDAI to Aave
export async function aaveDAIDeposit(userAddr, amount) {
    try {
        const data = await getAaveDepositData(aaveDAIDetails[0].address, amount);
        await callOnAdapter(aaveDAIDetails[0].adapter, aaveDAIDetails[0].address, "AAVE_DEPOSIT", data, userAddr);
        console.log(`Deposited ${amount} of aaveDAI to Aave by ${userAddr}`);
    } catch (err) {
        console.log("aaveDAIDeposit ERR: ", err);
    }
}

// Function to redee, aaveDAI from aave and transfer to a DAMPool
export async function aaveDAIRedeem(userAddr, amount) {
    try {
        const data = await getAaveRedeemData(aaveDAIDetails[0].address, amount);
        await callOnAdapter(aaveDAIDetails[0].adapter, aaveDAIDetails[0].address, "AAVE_REDEEM", data, userAddr);
        console.log(`Withdrawn ${amount} of aaveDAI to DAMPool ${pool.address} by ${userAddr}`);
    } catch (err) {
        console.log("aaveDAIRedeem ERR: ", err);
    }
}

