import React, { useState } from "react";
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
} from "@chakra-ui/react";
  import { useTable } from "react-table";
  import { useMemo } from "react";
import {
  FiHome,
  FiPieChart,
  FiDollarSign,
  FiBox,
  FiCalendar,
  FiChevronDown,
  FiChevronUp,
  FiSearch,
  FiBell,
} from "react-icons/fi";
import {Link as RouterLink} from "react-router-dom"

export default function Profile() {
    const columns = useMemo(
        () => [
          {
            Header: "Pool",
            accessor: "name",
          },
          {
            Header: "Invested Amount",
            accessor: "invested_amount",
          },
          {
            Header: "Uninvested Amount",
            accessor: "uninvested_amount",
          },
          {
            Header: "Total Deposited",
            accessor: "deposited",
          },
          {
            Header: "Withdrawable Amount",
            accessor: "withdraw",
          },
        ],
        []
      );
      const data = useMemo(
        () => [
          {
            name: "USF Fund 1",
            invested_amount: "600",
            uninvested_amount: "900",
            deposited: '800',
            withdraw: '600'
          },
          {
            name: "USF Fund 1",
            invested_amount: "1000",
            uninvested_amount: "300",
            deposited: '800',
            withdraw: '600'
          },
          {
            name: "USF Fund 1",
            invested_amount: "1000",
            uninvested_amount: "500",
            deposited: '800',
            withdraw: '600'
          },
          {
            name: "USF Fund 1",
            invested_amount: "1000",
            uninvested_amount: "800",
            deposited: '800',
            withdraw: '600'
          },
          {
            name: "USF Fund 1",
            invested_amount: "1000",
            uninvested_amount: "800",
            deposited: '800',
            withdraw: '600'
          },
        ],
        []
      );
    
      const tableInstance = useTable({ columns, data });
      const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
        tableInstance;

  const [display, changeDisplay] = useState("hide");
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
                  _hover={{textDecor: "none"}}
                >
                  <Icon as={FiHome} fontSize="2xl" className="active-icon" />
                  <Text className="active" ml={2}>Home</Text>
                </Link>
              </Flex>

              <Flex className="sidebar-items" mr={[2, 6, 0, 0, 0]} mt="10px">
                <Link
                  display={["none", "none", "flex", "flex", "flex"]}
                  href="#"
                  _hover={{textDecor: "none"}}
                >
                  <Icon as={FiPieChart} fontSize="2xl" />
                  <Text ml={2}>Token Balance</Text>
                </Link>
              </Flex>

              <Flex className="sidebar-items" mr={[2, 6, 0, 0, 0]} mt="10px">
                <Link
                  display={["none", "none", "flex", "flex", "flex"]}
                  href="#"
                  _hover={{textDecor: "none"}}
                >
                  <Icon as={FiDollarSign} fontSize="2xl" />
                  <Text ml={2}>Wallet</Text>
                </Link>
              </Flex>

              <Flex className="sidebar-items" mr={[2, 6, 0, 0, 0]} mt="10px">
                <Link
                  display={["none", "none", "flex", "flex", "flex"]}
                  href="#"
                  _hover={{textDecor: "none"}}
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
                  _hover={{textDecor: "none"}}
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
        overflow="hidden"
        minH="100vh"
      >
        <Heading fontWeight="normal" mb={4} letterSpacing="wide">
          Welcome, XYZ
        </Heading>

        <Flex dir="row" align="center" justify="flex-start">
          <Avatar
            name="USDC"
            src="https://cryptologos.cc/logos/usd-coin-usdc-logo.png"
            mt={2}
          />
          <Box ml={6}>
          <Text color="gray.400" fontSize="sm" fontWeight="500" mt="10px">
              Pool Balance
            </Text>
            <Text fontWeight="bold" fontSize="2xl">
              $5,750.20
            </Text>
          </Box>
        </Flex>

        <Flex alignItems='center' ml={18} justifyContent="space-between" mt={8}>
          <Flex>
          <Box border="1px" borderColor="gray.600" rounded="lg">
      <Table size="lg" {...getTableProps()}>
        <Thead>
          {
            // Loop over the header rows
            headerGroups.map((headerGroup, idx) => (
              // Apply the header row props
              <Tr {...headerGroup.getHeaderGroupProps()}>
                {
                  // Loop over the headers in each row
                  headerGroup.headers.map((column) => (
                    // Apply the header cell props
                    <Th {...column.getHeaderProps()}>
                      {
                        // Render the header
                        column.render("Header")
                      }
                    </Th>
                  ))
                }
              </Tr>
            ))
          }
        </Thead>
        <Tbody {...getTableBodyProps()}>
          {
            // Loop over the table rows
            rows.map((row) => {
              // Prepare the row for display
              prepareRow(row);
              return (
                // Apply the row props
                <Tr {...row.getRowProps()}>
                  {
                    // Loop over the rows cells
                    row.cells.map((cell) => {
                      // Apply the cell props
                      return (
                        <Td {...cell.getCellProps()}>
                          {
                            // Render the cell contents
                            cell.render("Cell")
                          }
                        </Td>
                      );
                    })
                  }
                </Tr>
              );
            })
          }
        </Tbody>
      </Table>
    </Box>
          </Flex>
        </Flex>
      </Flex>

      {/* Aave transaction */}
      <Flex
        w={["100%", "100%", "30%"]}
        bgColor="white"
        p="3%"
        flexDir="column"
        overflow="auto"
        minW={[null, null, "300px", "300px", "400px"]}
      >
        <Flex alignContent="center">
        </Flex>
        </Flex>
    </Flex>
  );
}


