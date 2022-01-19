import {
  Box,
  Button,
  Flex,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  useDisclosure,
} from '@chakra-ui/react';
import { useMoralis } from 'react-moralis';
import NavBar from '../components/NavBar';
import DAMTable from '../components/table/Table';
import { initSuperfluid, createFlow, modifyFlow } from '../superfluid';
import { Link as RouterLink } from 'react-router-dom';
import {initComptroller} from "../comptroller"

export default function Home() {
  const { Moralis, user, isAuthenticated } = useMoralis();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const getBalances = async () => {
    const options = {
      chain: 'mumbai',
      address: user.get('ethAddress'),
    };
    const balances = await Moralis.Web3.getAllERC20(options);
    let b = balances[0].balance / 10 ** 18;
    console.log('BALANCES', balances);
  };

  const getTransaction = async () => {
    const options = {
      chain: 'mumbai',
      address: user.get('ethAddress'),
      order: 'desc',
    };
    const transactions = await Moralis.Web3.getTransactions(options);
    console.log('Transactions', transactions);
  };

  return (
    // Main Wrapper
    <Flex direction="column" h="100vh">
      {/* Wrapper of the main content */}
      {/* Heading and button */}
      <NavBar />
      <Box m="30px 20px 0 20px">
        <Flex
          dir="row"
          justifyContent="space-between"
          sx={{
            '@media (max-width: 415px)': {
              flexDirection: 'column',
            },
          }}
        >
          <Text fontSize="3xl" fontWeight="700">
            Browse and Deposit
          </Text>
          <Button onClick={getBalances}>Get Balance</Button>
          <Button onClick={getTransaction}>Get Transaction</Button>
          <Button onClick={initSuperfluid}>SuperFluid</Button>
          <Button
            onClick={() => {
              /* create flow */
              createFlow(
                200,
                100,
                '0x3f84205744D06370Aa0dbE704f59CBE36FF7b2Bb',
                user.get('ethAddress')
              );
              /* modify flow */
              // modifyFlow(
              //   user.get('ethAddress'),
              //   '0x3f84205744D06370Aa0dbE704f59CBE36FF7b2Bb',
              //   0
              // );
            }}
          >
            Create Flow
          </Button>
          <Button
            display={{ base: 'none', md: 'inline-flex' }}
            fontSize={'sm'}
            fontWeight={600}
            color={'white'}
            as={RouterLink}
            to="/createpools"
            bgGradient="linear(to-r, cyan.400, blue.500)"
            _hover={{
              bgGradient: 'linear(to-l, cyan.500, blue.400)',
            }}
          >
            Deposites
          </Button>
        </Flex>
        {/* Tabs for table content */}
          <DAMTable mt={10} />
      </Box>
    </Flex>
  );
}
