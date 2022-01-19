import React, { useEffect, useState } from "react";
import {
  Flex,
  Heading,
  Avatar,
  Text,
  Icon,
  IconButton,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Divider,
  Link,
  Button,
  Input,
  InputGroup,
  InputLeftElement,
  WrapItem,
  ButtonGroup,
  Box,
  Stack
} from "@chakra-ui/react";
import {
  FiHome,
  FiPieChart,
  FiDollarSign,
  FiBox,
  FiChevronDown,
  FiChevronUp,
} from "react-icons/fi";
import { useMoralis } from "react-moralis";
import { GetPools } from "../queries/DadyShark";
import {
  isManager,
  initDAMPool,
  getAaveDepositData,
  aaveDAIDeposit,
  aaveDAIRedeem,
  topupDAMPool,
  getAaveRedeemData,
  calcTotalValue,
  callOnAdapter,
  topupComptroller,
} from "../DAMPool";

import { Link as RouterLink } from "react-router-dom";

export default function Manager() {
  const [display, changeDisplay] = useState("hide");
  const [pools, setPools] = useState();
  const { user, isWeb3Enabled } = useMoralis();

  const getPoolData = async () => {
    const data = await GetPools();
    console.log("Pools", data.data.comptrollers);
    setPools(data.data.comptrollers);
  };

  useEffect(() => {
    if (isWeb3Enabled && user) {
      initDAMPool(""); // pool address manually added
      getPoolData();
    }
  }, [isWeb3Enabled, user]);

  // user address
  const userAddress = user?.attributes.accounts[0];
  console.log("USERAddress",userAddress);

  const checkIsManager = async () => {
    console.log(userAddress);
    const ismanager = await isManager(user.get("ethAddress"));
    console.log(`ismanager: ${ismanager}`);
  };

  const handleaaveDAIDeposit = async () => {
    const data = await aaveDAIDeposit(userAddress, 200);
  };

  const handleaaveDAIRedeem = async () => {
    const data = await aaveDAIRedeem(userAddress, 200);
  };

  const handleTopUpDAMPool = async () => {
    
    console.log("((((((((((",userAddress);
    const data = await topupDAMPool(userAddress);
  };

  const handleTopUpComptroller = async () => {
    const data = await topupComptroller(userAddress, 10);
  };

  const handlegetAaveDepositData = async () => {
    //params are tokenaddress and amount
    const data = await getAaveDepositData("xxdfsdfdsa", 300);
  };

  console.log(pools);
  return (
    <Flex
      h={[null, null, "100vh"]}
      maxW="2000px"
      flexDir={["column", "column", "row"]}
      overflow="hidden"
    >
      {/* Nav and currency */}
      <Flex
        w={["100%", "100%", "10%", "15%", "15%"]}
        flexDir="column"
        alignItems="center"
        backgroundColor="purple.800"
        color="#fff"
      >
        <Flex
          flexDir="column"
          h={[null, null, "100vh"]}
          justifyContent="space-between"
        >
          <Flex flexDir="column" as="nav">
            <Heading
              mt={50}
              mb={[25, 50, 100]}
              fontSize={["4xl", "4xl", "2xl", "3xl", "4xl"]}
              alignSelf="center"
              letterSpacing="tight"
            >
              DAM <br />
              Finance
            </Heading>
            <Flex
              flexDir={["row", "row", "column", "column", "column"]}
              align={["center", "center", "center", "flex-start", "flex-start"]}
              wrap={["wrap", "wrap", "nowrap", "nowrap", "nowrap"]}
              justifyContent="center"
            >
              <Flex className="sidebar-items" mr={[2, 6, 0, 0, 0]}>
                <Link
                  display={["none", "none", "flex", "flex", "flex"]}
                  href="/"
                  _hover={{ textDecor: "none" }}
                >
                  <Icon as={FiHome} fontSize="2xl" className="active-icon" />
                  <Text className="active" ml={2}>
                    Home
                  </Text>
                </Link>
              </Flex>

              <Flex className="sidebar-items" mr={[2, 6, 0, 0, 0]} mt="10px">
                <Link
                  display={["none", "none", "flex", "flex", "flex"]}
                  href="#"
                  _hover={{ textDecor: "none" }}
                >
                  <Icon as={FiPieChart} fontSize="2xl" />
                  <Text ml={2}>Token Balance</Text>
                </Link>
              </Flex>

              <Flex className="sidebar-items" mr={[2, 6, 0, 0, 0]} mt="10px">
                <Link
                  display={["none", "none", "flex", "flex", "flex"]}
                  href="#"
                  _hover={{ textDecor: "none" }}
                >
                  <Icon as={FiDollarSign} fontSize="2xl" />
                  <Text ml={2}>Wallet</Text>
                </Link>
              </Flex>

              <Flex className="sidebar-items" mr={[2, 6, 0, 0, 0]} mt="10px">
                <Link
                  display={["none", "none", "flex", "flex", "flex"]}
                  href="#"
                  _hover={{ textDecor: "none" }}
                >
                  <Icon as={FiBox} fontSize="2xl" />
                  <Text ml={2}>Assets</Text>
                </Link>
              </Flex>
              <Flex className="sidebar-items" mr={[2, 6, 0, 0, 0]} mt="10px">
                <Link
                  as={RouterLink}
                  to="/protocol"
                  display={["none", "none", "flex", "flex", "flex"]}
                  href="#"
                  _hover={{ textDecor: "none" }}
                >
                  <Icon as={FiDollarSign} fontSize="2xl" />
                  <Text ml={2}>Protocol</Text>
                </Link>
              </Flex>
            </Flex>
          </Flex>
          <Flex flexDir="column" alignItems="center" mb={10} mt={5}>
            <Avatar my={2} src="avatar-1.jpg" />
            <Text textAlign="center">Manager</Text>
          </Flex>
        </Flex>
      </Flex>

      {/* Portfolio */}
      <Flex
        w={["100%", "100%", "60%", "60%", "55%"]}
        p="3%"
        flexDir="column"
        overflow="auto"
        minH="100vh"
      >
        <Heading fontWeight="normal" mb={4} letterSpacing="wide">
          Welcome back, Manager
        </Heading>

        <Flex justifyContent="space-between" mt={4}>
          <Flex align="flex-end">
            <Heading as="h2" size="lg" mt={6} letterSpacing="tight">
              Pools of Manager
            </Heading>
            <Text fontSize="small" color="gray" ml={4}>
              Aug 2021
            </Text>
          </Flex>
          {/* <IconButton icon={<FiCalendar />} /> */}
        </Flex>
        <Flex flexDir="column">
          <Flex overflow="auto">
            <Table variant="unstyled" mt={4}>
              <Thead>
                <Tr color="gray">
                  <Th>Pools</Th>
                  <Th>Top Assets</Th>
                </Tr>
              </Thead>

              <Tbody >
                {/* This is repetative */}
                {/* {pools.map(pool => {
            
                  return (
                    <Tr>
                      <Td>
                      <Flex align="center">
                      <Avatar size="sm" mr={2} src="amazon.jpeg" />
                      <Flex flexDir="column">
                        <Heading size="sm" letterSpacing="tight">
                          {pool.pool.name} 
                        </Heading>
                      </Flex>
                    </Flex>
                        </Td>
                      <Td>{pool.pool.assetName}</Td>
                    </Tr>
                  )
                })} */}
              </Tbody>
            </Table>
          </Flex>

          <Stack direction="column" w="100%" space={4}>
            <Button onClick={getPoolData}>GEt Pool data</Button>
            <Button onClick={checkIsManager}>Check manager</Button>
            <Button onClick={handleaaveDAIDeposit}>DAI Desposite</Button>
            <Button onClick={handleaaveDAIRedeem}>DAI Redeem</Button>
            <Button onClick={handleTopUpDAMPool}>Topup Pool</Button>
            <Button onCLick={topupComptroller}>Topup Comptroller</Button>
            <Button onCLick={handleTopUpDAMPool}>Handle Topup DAM Pool</Button>
            <Button onCLick={handleTopUpComptroller}>
              Handle Topup comptroller
            </Button>
          </Stack>
          <Divider />
        </Flex>
      </Flex>
    </Flex>
  );
}
