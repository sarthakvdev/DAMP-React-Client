/* eslint-disable react/jsx-key */
import { useState,useEffect } from "react";
import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  Box,
  Button,
  Link
} from "@chakra-ui/react";
import { useTable } from "react-table";
import { useMoralis } from "react-moralis";
import {initComptroller} from "../../comptroller"
import { Redirect,Link as ReachLink } from "react-router-dom";
import {GetPool,GetPools,GetWithdrawals} from "../../queries/DadyShark"

export default function DAMTable(props) {

  const [allComptrollers,setAllComptrollers] = useState([]);
  const comptrollerAddress = "0x4C470baC1172B5E20690ce65E1146AfE94Ff1053";

  const GetAllPools = async() =>  {
    const data =await GetPools();
    console.log("GET ALL POOLS",data.data.comptrollers);
    setAllComptrollers(data.data.comptrollers);
  }


  useEffect(() => {
    GetAllPools();
  },[])
  
  

  return (
    <Box {...props} border="1px" borderColor="gray.600" rounded="lg">
      <Table size="lg">
        <Thead>
          <Tr>
            <Th>
              Pool
            </Th>
            <Th>
              Denomination Assets
            </Th>
            <Th>
              Total Amount
            </Th>
          </Tr>
        </Thead>
        <Tbody >
          {allComptrollers.map((comp,index) => {

            return (
              <Tr key={index}>
                <Td>{comp.pool.name}</Td>
                <Td>{comp.pool.assetName}</Td>
                <Td> Hello</Td>
                <Td>
                <Link as={ReachLink} to={`valve/${comp.id}`}>go to pool</Link>
                </Td>
              </Tr>
            )
          })}
        </Tbody>
      </Table>
    </Box>
  );
}

