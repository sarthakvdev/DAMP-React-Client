import { useEffect, useState } from 'react';

// importing components
import {
  Avatar,
  Box,
  Flex,
  Text,
  Button,
  Spacer,
  Wrap,
  Input,
} from '@chakra-ui/react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
} from '@chakra-ui/react';
import NavBar from '../components/NavBar/index';
import {
  createFlow,
  upgradeToken,
  getSuperTokenBalance,
  getTokenBalance,
} from '../superfluid';
import { useMoralis } from 'react-moralis';
import WrapCard from '../components/WrapCard';
import { VscCloudDownload } from 'react-icons/vsc';
import { useParams } from 'react-router';
import {
  withdrawable,
  withdrawAmount,
  calcUserInvested,
  calcUserUninvested,
  calcShare,
  calcTotalAmount,
  getNetFlow,
  calcTotalInvested,
  calcTotalUninvested,
  initComptroller,
} from '../comptroller';
import { aaveDAIRedeem,calcTotalValue,initDAMPool } from '../DAMPool';
import aaveDAIDetails from '../denominationAsset.json';
import {GetPool} from "../queries/DadyShark"

const WithDrawButton = (props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { user, isWeb3Enabled } = useMoralis();
  const userAddress = user?.attributes.accounts[0];
  const [Amount, setAmount] = useState();

  // const getInvestedAmount = () => {
  //   const InvestedAmount = calcUserInvested(userAddress);
  //   console.log(InvestedAmount);
  // }

  // const getUnInvestedAmount = () => {
  //   const unInvestedAmount = calcUserUninvested(userAddress);
  //   console.log(unInvestedAmount);
  // }

  // const getUserShare = () => {
  //   const  calShareValue = calcShare(userAddress);
  //   console.log(calShareValue);
  // }

  const handleWithDraw = async () => {
    const test = await withdrawAmount(Amount, userAddress);
    console.log(test);
  };

  return (
    <>
      <Button
        {...props}
        display={{ base: 'none', md: 'inline-flex' }}
        leftIcon={<VscCloudDownload />}
        fontSize={'sm'}
        fontWeight={600}
        color={'white'}
        bgGradient="linear(to-r, cyan.400, blue.500)"
        onClick={onOpen}
        _hover={{
          bgGradient: 'linear(to-l, cyan.500, blue.400)',
        }}
      >
        WithDraw
      </Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>WithDraw</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text>The Amount You can WithDraw is {props.withdrawable}</Text>
            <Input onChange={(e) => setAmount(e.target.value)} value={Amount} />
          </ModalBody>
          <ModalFooter>
            <Button variant="ghost" onClick={handleWithDraw}>
              Max
            </Button>
            <Button variant="ghost" onClick={handleWithDraw}>
              WithDraw
            </Button>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

const UpgradeButton = (props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { user, isWeb3Enabled } = useMoralis();
  const [upgradeAmount, setUpgradeAmount] = useState('');
  const [token, setToken] = useState();

  const userAddress = user?.attributes.accounts[0];

  useEffect(() => {
    if (isWeb3Enabled && user) {
      getSuperToken();
    }
  }, []);

  const getSuperToken = async () => {
    const res = await getSuperTokenBalance(userAddress);
    console.log('SUPERTOKEN', res);
    setToken(res);
  };

  const handleUpgrade = async () => {
    const data = await upgradeToken(upgradeAmount, userAddress);
  };

  return (
    <>
      <Button
        {...props}
        display={{ base: 'none', md: 'inline-flex' }}
        leftIcon={<VscCloudDownload />}
        fontSize={'sm'}
        fontWeight={600}
        color={'white'}
        bgGradient="linear(to-r, cyan.400, blue.500)"
        onClick={onOpen}
        _hover={{
          bgGradient: 'linear(to-l, cyan.500, blue.400)',
        }}
      >
        Upgrade
      </Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Upgrade your Tokens</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text>Enter the Amount you want to upgrade </Text>
            <Text>The Amount of SuperToken you have is {token}</Text>
            <Input onChange={(e) => setUpgradeAmount(e.target.value)} />
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blackAlpha" onClick={handleUpgrade}>
              Upgrade
            </Button>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

const Valve = () => {
  const { compAdd } = useParams();
  console.log("COMPTROLLER ADDRESS",compAdd);
  const [data, setData] = useState();
  const [totalAmount, setTotalAmount] = useState(0);
  const [totalInvested, setTotalInvested] = useState(0);
  const [totalUnInvested, setTotalUnInvested] = useState(0);
  const [flowAmount, setFlowAmount] = useState('');
  const { user, isWeb3Enabled } = useMoralis();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [comptroller,setComptroller] = useState();

  const getPoolData = async() => {
    const data = await GetPool(compAdd);
    console.log('SINGLE POOL DATA',data.data.comptroller);
    setComptroller(data.data.comptroller);
  }

  const getTotalAmount = async () => {
    const data = await calcTotalAmount();
    const res = parseFloat(data);
    const fix = res.toFixed(4);
    setTotalAmount(fix);
  };

  const getTotalInvested = async () => {
    const data = await calcTotalInvested();
    console.log('INVSTED AMOUNT', data);
    if (data === undefined) {
      setTotalInvested(0);
      return;
    }
    setTotalInvested(data);
  };

  const getTotalUnInvested = async () => {
    const data = await calcTotalUninvested();
    const res = parseFloat(data);
    const fix = res.toFixed(4);
    setTotalUnInvested(fix);
  };

  const handleDeposit = () => {
    createFlow(
      500,
      flowAmount,
      compAdd,
      user.get('ethAddress')
    );
  };


  const getWithDrawAmount = async () => {
    const withdrawableAmount = await withdrawable(user?.attributes.accounts[0]);
    console.log('WITHDRAWABLE', withdrawableAmount);
    setData(withdrawableAmount);
  };

  useEffect(() => {
    if (isWeb3Enabled && user) {
      initComptroller(compAdd);
      getPoolData();
      getTotalAmount();
      getTotalInvested();
      getTotalUnInvested();
      getWithDrawAmount();
    }
  }, [user, isWeb3Enabled, compAdd]);

  const getCalcValue = async() => {
    const data =await calcTotalValue();
    console.log(data);
  }

  useEffect(() => {
    if(isWeb3Enabled && user && comptroller){
      initDAMPool(comptroller.pool.id);
      getCalcValue();
    }
  },[user,isWeb3Enabled,comptroller])

  return (
    comptroller ? <Flex direction="column" h="100vh">
      <NavBar />
      {/* Fund Name and Deposite Button */}
      <Box m={5}>
        <Flex dir="row" align="center" justify="auto" m={6}>
          <Avatar
            name="Dan Fincher"
            src="https://bit.ly/wrong-link"
            bg="teal.300"
          ></Avatar>
          <Text fontSize="3xl" fontWeight="bold" ml={4}>
            {comptroller.pool.name}
          </Text>
          <Spacer />
          <Button
            display={{ base: 'none', md: 'inline-flex' }}
            leftIcon={<VscCloudDownload />}
            fontSize={'sm'}
            fontWeight={600}
            color={'white'}
            bgGradient="linear(to-r, cyan.400, blue.500)"
            onClick={onOpen}
            _hover={{
              bgGradient: 'linear(to-l, cyan.500, blue.400)',
            }}
          >
            Deposit 
          </Button>
          <UpgradeButton ml={2} />
          <WithDrawButton ml={2} withdrawable={data} />
          <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>Flow Tokens</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                <Input
                  placeholder="Flow Amount"
                  value={flowAmount}
                  onChange={(e) => setFlowAmount(e.target.value)}
                />
              </ModalBody>
              <ModalFooter>
                <Button colorScheme="blue" mr={3} onClick={onClose}>
                  Close
                </Button>
                <Button variant="ghost" onClick={handleDeposit}>
                  Create Flow
                </Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
        </Flex>
        <Box m="50px 0 0 30px">
          <Text fontSize="sm" color="gray.500">
            Asset Name - <span style={{fontWeight:"bold"}}>{comptroller.pool.assetName}</span>
          </Text>
        </Box>

        {/* Main Line: Price - Droption - Button group */}
        <Flex
          dir="row"
          m="0 30px 60px 30px"
          align="center"
          sx={{
            '@media (max-width: 770px)': {
              flexDirection: 'column',
            },
          }}
        >
          <Text fontSize="5xl" fontWeight="bold">
            ${totalAmount}
          </Text>
        </Flex>

        {/* Cards */}
        <Wrap
          justify="space-around"
          align="center"
          m="60px 10px 10px 60px"
          h="auto"
          color="whitesmoke"
        >
          <WrapCard title="Total Amount Deposited" value={totalAmount} />
          <WrapCard title="Total Invested" value={totalInvested} />
          <WrapCard title="Total UnInvested" value={totalUnInvested} />
        </Wrap>
      </Box>
    </Flex> : <></>
  );
};

export default Valve;
