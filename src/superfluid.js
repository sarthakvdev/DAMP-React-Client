import SuperfluidSDK from '@superfluid-finance/js-sdk';
import aaveDAIDetails from './denominationAsset.json';
import ERC20 from './abis/ERC20.json';
import { convertTo, convertFrom } from './utils';
import mWeb3 from './mWeb3';

import ERC20ABI from './abis/ERC20.json';

// const mweb3 = mWeb3();

let aaveDAIx;

let web3 = null;
mWeb3()
  .then((w) => {
    web3 = w;
  })
  .catch((err) => console.log(err));

export let sf;

const toBN = (number) => web3.utils.toBN(number);

// To be called first after moralis is initialized
export async function initSuperfluid() {
  sf = new SuperfluidSDK.Framework({
    web3,
    version: 'v1',
    tokens: ['aaveDAIx'],
  });

  await sf.initialize();

  aaveDAIx = sf.tokens.aaveDAIx;
  console.log(aaveDAIx.address);

  // await sf.host.batchCall(createBatchCall());
}

// To run this function, initSuperfluid() must be called first
// This function can be used to modify and terminate a flow
export async function modifyFlow(userAddr, comptrollerAddr, amount) {
  const flowrate = calcFlowRate(amount);

  const user = await sf.user({
    address: userAddr,
    token: aaveDAIx.address,
  });

  await user.flow({
    recipient: comptrollerAddr,
    flowRate: flowrate,
  });

  const details = await user.details();
  console.log(details);

  // Call the host with the batch call parameters
}

// This function is used to updgrade aaveDAI to aaveDAIx
// and create a constant flow to a comptroller all in one transaction
export async function createFlow(
  upgradeAmount,
  depositAmount,
  comptrollerAddr,
  userAddr
) {
  console.log('Beginning batch call...');

  const upgradeAmountString = convertTo(upgradeAmount, 18);
  const depositAmountString = toBN(convertTo(depositAmount, 18))
    .div(toBN(3600 * 24 * 30))
    .toString();

  const aaveDAIContract = new web3.eth.Contract(
    ERC20ABI,
    aaveDAIDetails[0].address
  );

  await aaveDAIContract.methods
    .approve(aaveDAIx.address, '1' + '0'.repeat(42))
    .send({ from: userAddr });

  const superBalance = await getSuperTokenBalance(userAddr);

  if(superBalance >= depositAmount) {
    await modifyFlow(userAddr, comptrollerAddr, depositAmount);
  } else {
    await sf.host.batchCall(
      createBatchCall(upgradeAmountString, depositAmountString, comptrollerAddr),
      { from: userAddr }
    );
  }
}

export async function upgradeToken(upgradeAmount, userAddr) {
  const callData = [
    [
      101, // upgrade 'upgradeAmount' aaveDAIx to start a flow to a comptroller
      aaveDAIx.address,
      web3.eth.abi.encodeParameters(['uint256'], [convertTo(upgradeAmount, 18)]),
    ]
  ];

  try {
    await sf.host.batchCall(callData, { from: userAddr });
    console.log(`Upgraded ${upgradeAmount} for user ${userAddr}`);
  } catch (err) {
    console.log("upgradeTokens ERR: ", err);
  }

}

export async function getSuperTokenBalance(userAddr) {
  try {
    const aaveDAIxContract = new web3.eth.Contract(ERC20, aaveDAIDetails[0].superToken);
    const balance = await aaveDAIxContract.methods.balanceOf(userAddr).call();
    console.log(`aaveDAIx balance of ${userAddr} is ${convertTo(balance, 18)}`);
    return convertFrom(balance, 18);
  } catch (err) {
    console.log("getSuperTokenBalance ERR: ", err);
  }
}

export async function getTokenBalance(userAddr) {
  try {
    const aaveDAIContract = new web3.eth.Contract(ERC20, aaveDAIDetails.address);
    const balance = await aaveDAIContract.methods.balanceOf(userAddr).call();
    console.log(`aaveDAI balance of ${userAddr} is ${convertTo(balance, 18)}`);
    return convertFrom(balance, 18);
  } catch (err) {
    console.log("getTokenBalance ERR: ", err);
  }
}

function createBatchCall(upgradeAmount, depositAmount, comptrollerAddr) {
  return [
    [
      101, // upgrade 'upgradeAmount' aaveDAIx to start a flow to a comptroller
      aaveDAIx.address,
      web3.eth.abi.encodeParameters(['uint256'], [upgradeAmount]),
    ],
    [
      201, // create constant flow to comptroller
      sf.agreements.cfa.address,
      web3.eth.abi.encodeParameters(
        ['bytes', 'bytes'],
        [
          sf.agreements.cfa.contract.methods
            .createFlow(
              aaveDAIx.address,
              // change this to the address of chinmay
              comptrollerAddr, // change it to app.address
              depositAmount,
              '0x'
            )
            .encodeABI(), // callData
          '0x', // userData
        ]
      ),
    ],
  ];
}

const calcFlowRate = (amount) =>
  toBN(convertTo(amount, 18))
    .div(toBN(3600 * 24 * 30))
    .toString();
