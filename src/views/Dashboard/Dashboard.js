// Chakra imports
import {
  Box,
  Button,
  Flex,
  Grid,
  Progress,
  SimpleGrid,
  Stat,
  StatLabel,
  StatNumber,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useColorMode,
  useColorModeValue,

} from "@chakra-ui/react";
// Custom components
import Card from "components/Card/Card.js";
import BarChart from "components/Charts/BarChart";
import LineChart from "components/Charts/LineChart";
import IconBox from "components/Icons/IconBox";
// Custom icons
import {
  CartIcon,
  DocumentIcon,
  GlobeIcon,
  WalletIcon,
} from "components/Icons/Icons.js";

import { FaSearchDollar,FaFileInvoiceDollar } from "react-icons/fa";

import React from "react";
// Variables
import {
  barChartData,
  barChartOptions,
  lineChartData,
  lineChartOptions,
} from "variables/charts";


import { pageVisits, socialTraffic } from "variables/general";

import { useApsStatsContext } from "contexts/ApsStatsContext";

import BestSellingProduct from "components/Dashboard/BestSellingProduct";
import BestCollectionsBySeller from "components/Dashboard/BestCollectionsBySeller";
import TotalSoldPerYear from "components/Dashboard/TotalSoldPerYear";
import TotalSoldPerMonthInCurrentYear from "components/Dashboard/TotalSoldPerMonthInCurrentYear";

export default function Dashboard() {
  // Chakra Color Mode
  const iconBlue = useColorModeValue("blue.500", "blue.500");
  const iconBoxInside = useColorModeValue("white", "white");
  const textColor = useColorModeValue("gray.700", "white");
  const tableRowColor = useColorModeValue("#F7FAFC", "navy.900");
  const borderColor = useColorModeValue("gray.200", "gray.600");
  const textTableColor = useColorModeValue("gray.500", "white");

  const { colorMode } = useColorMode();

  /**
   * @property {Object} apsStatsLineChart contiene options y data para la grafica
   * @property {JSX.Element} saldoPendiente 
   * 
   */
  const {apsStatsLineChart,saldoPendiente} = useApsStatsContext()

  console.log('1515f60c-8de4-4cc9-8771-73e1ade93b73',apsStatsLineChart)

  return (
    <Flex flexDirection='column' pt={{ base: "120px", md: "75px" }}>
      <SimpleGrid columns={{ sm: 1, md: 2, xl: 4 }} spacing='24px' mb='20px'>
        <Card minH='125px'>
          <Flex direction='column'>
            <Flex
              flexDirection='row'
              align='center'
              justify='center'
              w='100%'
              mb='25px'>
              <Stat me='auto'>
                <StatLabel
                  fontSize='xs'
                  color='gray.400'
                  fontWeight='bold'
                  textTransform='uppercase'>
                  Saldo por cobrar
                </StatLabel>
                <Flex>
                  <StatNumber fontSize='lg' color={textColor} fontWeight='bold'>
                    {saldoPendiente}
                  </StatNumber>
                </Flex>
              </Stat>
              <IconBox
                borderRadius='50%'
                as='box'
                h={"45px"}
                w={"45px"}
                bg={iconBlue}>
                <FaSearchDollar h={"24px"} w={"24px"} color={iconBoxInside} />
              </IconBox>
            </Flex>
            <Text color='gray.400' fontSize='sm'>
              <Text as='span' color='green.400' fontWeight='bold'>
                
              </Text>
              En año acual
            </Text>
          </Flex>
        </Card>
        <Card minH='125px'>
          <Flex direction='column'>
            <Flex
              flexDirection='row'
              align='center'
              justify='center'
              w='100%'
              mb='25px'>
              <Stat me='auto'>
                <StatLabel
                  fontSize='xs'
                  color='gray.400'
                  fontWeight='bold'
                  textTransform='uppercase'>
                  Mejor pruducto vendido
                </StatLabel>
                <Flex>
                  <StatNumber fontSize='lg' color={textColor} fontWeight='bold'>
                    <BestSellingProduct />
                  </StatNumber>
                </Flex>
              </Stat>
              <IconBox
                borderRadius='50%'
                as='box'
                h={"45px"}
                w={"45px"}
                bg={iconBlue}>
                <GlobeIcon h={"24px"} w={"24px"} color={iconBoxInside} />
              </IconBox>
            </Flex>
            <Text color='gray.400' fontSize='sm'>
              <Text as='span' color='green.400' fontWeight='bold'>
                
              </Text>
              En el mes actual
            </Text>
          </Flex>
        </Card>
        <Card minH='125px'>
          <Flex direction='column'>
            <Flex
              flexDirection='row'
              align='center'
              justify='center'
              w='100%'
              mb='25px'>
              <Stat me='auto'>
                <StatLabel
                  fontSize='xs'
                  color='gray.400'
                  fontWeight='bold'
                  textTransform='uppercase'>
                  Mejor cobro por Vendedor
                </StatLabel>
                <Flex>
                  <StatNumber fontSize='lg' color={textColor} fontWeight='bold'>
                    <BestCollectionsBySeller />
                  </StatNumber>
                </Flex>
              </Stat>
              <IconBox
                borderRadius='50%'
                as='box'
                h={"45px"}
                w={"45px"}
                bg={iconBlue}>
                <FaFileInvoiceDollar h={"24px"} w={"24px"} color={iconBoxInside} />
              </IconBox>
            </Flex>
            <Text color='gray.400' fontSize='sm'>
              <Text as='span' color='red.500' fontWeight='bold'>
                
              </Text>
              Mes actual
            </Text>
          </Flex>
        </Card>
        <Card minH='125px'>
          <Flex direction='column'>
            <Flex
              flexDirection='row'
              align='center'
              justify='center'
              w='100%'
              mb='25px'>
              <Stat me='auto'>
                <StatLabel
                  fontSize='xs'
                  color='gray.400'
                  fontWeight='bold'
                  textTransform='uppercase'>
                  Total ventas
                </StatLabel>
                <Flex>
                  <StatNumber fontSize='lg' color={textColor} fontWeight='bold'>
                    <TotalSoldPerYear />
                  </StatNumber>
                </Flex>
              </Stat>
              <IconBox
                borderRadius='50%'
                as='box'
                h={"45px"}
                w={"45px"}
                bg={iconBlue}>
                <CartIcon h={"24px"} w={"24px"} color={iconBoxInside} />
              </IconBox>
            </Flex>
            <Text color='gray.400' fontSize='sm'>
              <Text as='span' color='green.400' fontWeight='bold'>
                
              </Text>
              En el año actual
            </Text>
          </Flex>
        </Card>
      </SimpleGrid>
      <Grid
        templateColumns={{ sm: "1fr", lg: "2fr 1fr" }}
        templateRows={{ lg: "repeat(2, auto)" }}
        gap='20px'>
        <Card
          bg={
            colorMode === "dark"
              ? "navy.800"
              : "linear-gradient(81.62deg, #313860 2.25%, #151928 79.87%)"
          }
          p='0px'
          maxW={{ sm: "320px", md: "100%" }}>
          <Flex direction='column' mb='40px' p='28px 0px 0px 22px'>
            <Text color='#fff' fontSize='lg' fontWeight='bold' mb='6px'>
              Ventas por Vendedor
            </Text>
            <Text color='#fff' fontSize='sm'>
            
              <Text as='span' color='green.400' fontWeight='bold'>
                Mes actual 
              </Text>
               in {new Date().getFullYear()}
              </Text>
          </Flex>
          <Box minH='300px'>
            <LineChart 
              chartData={apsStatsLineChart.data}
              chartOptions={apsStatsLineChart.options}
              key={apsStatsLineChart.key}
            />
          </Box>
        </Card>
        <Card p='0px' maxW={{ sm: "320px", md: "100%" }}>
          <Flex direction='column' mb='40px' p='28px 0px 0px 22px'>
            <Text color='gray.400' fontSize='sm' fontWeight='bold' mb='6px'>
              TOTAL DE VENTAS 
            </Text>
            <Text color={textColor} fontSize='lg' fontWeight='bold'>
               Por mes en el año actual
            </Text>
          </Flex>
          <Box minH='300px'>
            <TotalSoldPerMonthInCurrentYear />
          </Box>
        </Card>
        {/* <Card p='0px' maxW={{ sm: "320px", md: "100%" }}>
          <Flex direction='column'>
            <Flex align='center' justify='space-between' p='22px'>
              <Text fontSize='lg' color={textColor} fontWeight='bold'>
                Page visits
              </Text>
              <Button variant='primary' maxH='30px'>
                SEE ALL
              </Button>
            </Flex>
            <Box overflow={{ sm: "scroll", lg: "hidden" }}>
              <Table>
                <Thead>
                  <Tr bg={tableRowColor}>
                    <Th color='gray.400' borderColor={borderColor}>
                      Page name
                    </Th>
                    <Th color='gray.400' borderColor={borderColor}>
                      Visitors
                    </Th>
                    <Th color='gray.400' borderColor={borderColor}>
                      Unique users
                    </Th>
                    <Th color='gray.400' borderColor={borderColor}>
                      Bounce rate
                    </Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {pageVisits.map((el, index, arr) => {
                    return (
                      <Tr key={index}>
                        <Td
                          color={textTableColor}
                          fontSize='sm'
                          fontWeight='bold'
                          borderColor={borderColor}
                          border={index === arr.length - 1 ? "none" : null}>
                          {el.pageName}
                        </Td>
                        <Td
                          color={textTableColor}
                          fontSize='sm'
                          border={index === arr.length - 1 ? "none" : null}
                          borderColor={borderColor}>
                          {el.visitors}
                        </Td>
                        <Td
                          color={textTableColor}
                          fontSize='sm'
                          border={index === arr.length - 1 ? "none" : null}
                          borderColor={borderColor}>
                          {el.uniqueUsers}
                        </Td>
                        <Td
                          color={textTableColor}
                          fontSize='sm'
                          border={index === arr.length - 1 ? "none" : null}
                          borderColor={borderColor}>
                          {el.bounceRate}
                        </Td>
                      </Tr>
                    );
                  })}
                </Tbody>
              </Table>
            </Box>
          </Flex>
        </Card>
        <Card p='0px' maxW={{ sm: "320px", md: "100%" }}>
          <Flex direction='column'>
            <Flex align='center' justify='space-between' p='22px'>
              <Text fontSize='lg' color={textColor} fontWeight='bold'>
                Social traffic
              </Text>
              <Button variant='primary' maxH='30px'>
                SEE ALL
              </Button>
            </Flex>
          </Flex>
          <Box overflow={{ sm: "scroll", lg: "hidden" }}>
            <Table>
              <Thead>
                <Tr bg={tableRowColor}>
                  <Th color='gray.400' borderColor={borderColor}>
                    Referral
                  </Th>
                  <Th color='gray.400' borderColor={borderColor}>
                    Visitors
                  </Th>
                  <Th color='gray.400' borderColor={borderColor}></Th>
                </Tr>
              </Thead>
              <Tbody>
                {socialTraffic.map((el, index, arr) => {
                  return (
                    <Tr key={index}>
                      <Td
                        color={textTableColor}
                        fontSize='sm'
                        fontWeight='bold'
                        borderColor={borderColor}
                        border={index === arr.length - 1 ? "none" : null}>
                        {el.referral}
                      </Td>
                      <Td
                        color={textTableColor}
                        fontSize='sm'
                        borderColor={borderColor}
                        border={index === arr.length - 1 ? "none" : null}>
                        {el.visitors}
                      </Td>
                      <Td
                        color={textTableColor}
                        fontSize='sm'
                        borderColor={borderColor}
                        border={index === arr.length - 1 ? "none" : null}>
                        <Flex align='center'>
                          <Text
                            color={textTableColor}
                            fontWeight='bold'
                            fontSize='sm'
                            me='12px'>{`${el.percentage}%`}</Text>
                          <Progress
                            size='xs'
                            colorScheme={el.color}
                            value={el.percentage}
                            minW='120px'
                          />
                        </Flex>
                      </Td>
                    </Tr>
                  );
                })}
              </Tbody>
            </Table>
          </Box>
        </Card> */}
      </Grid>
    </Flex>
  );
}
