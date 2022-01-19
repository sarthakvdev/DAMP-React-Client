import {
    Flex,
    Heading,
    Avatar,
    Text,
    Icon,
    Link,
    Button,
    Input,
    ButtonGroup,
    Box,
  } from "@chakra-ui/react";
  import { FiHome, FiPieChart, FiDollarSign, FiBox } from "react-icons/fi";
  
  export default function Protocol() {
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
          backgroundColor="purple.700"
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
                    href="/protocol"
                    _hover={{ textDecor: "none" }}
                  >
                    <Icon as={FiBox} fontSize="2xl" />
                    <Text ml={2}>Aave</Text>
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
  
        {/* transaction box */}
        <Flex m="100px 50px">
          <Text fontSize="4xl" fontWeight="bold">
            Aave Transaction
          </Text>
        </Flex>
        <Flex
          align="center"
          justify="center"
          direction="column"
          p={10}
        >
          <Flex align="center" justify="center" bgColor="#e7deff" p={10} rounded="xl" >
            <Box w="260px">
              <Input placeholder="Amount" rounded="lg" bgColor="white" />
              <ButtonGroup spacing="20px" p={0} m="20px 0">
                <Button
                  color="white"
                  w="120px"
                  bgGradient="linear(to-r, purple.500, pink.500)"
                  _hover={{ bgGradient: "linear(to-l, purple.500, pink.700)" }}
                >
                  Deposit
                </Button>
                <Button
                  color={"white"}
                  w="120px"
                  bgGradient="linear(to-r, purple.500, pink.500)"
                  _hover={{ bgGradient: "linear(to-l, purple.500, pink.700)" }}
                >
                  Withdraw
                </Button>
              </ButtonGroup>
            </Box>
          </Flex>
        </Flex>
      </Flex>
    );
  }
  