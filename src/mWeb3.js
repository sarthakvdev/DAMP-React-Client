import Moralis from "moralis"

let web3;

const mWeb3 = async() => {
    web3 = await Moralis.Web3.enable();

    return web3;
}


export default mWeb3;
