import { useState } from "react";
import { Link as ReactRouterLink } from "react-router-dom";
import {
  Box,
  Flex,
  HStack,
  VStack,
  Button,
  Image,
  Text,
  Link as ChakraLink,
} from "@chakra-ui/react";
import HomeIcon from "./icons/HomeIcon";
import DashboardIcon from "./icons/Dashboard";
import BlogIcon from "./icons/BlogIcon";
import ExpandIcon from "./icons/ExpandIcon";

function Sidebar(): JSX.Element {
  // const [hidden, setHidden] = useState(false);
  let [hidden, setHidden] = useState("open");

  return (
    <Flex height="100%" position="relative" //width="fit-content"
    data-state={hidden} 
    _open={{animation: "0.3s slide-from-left-full"}} 
    _closed={{animation: "0.3s slide-from-right-full"}}
    width={hidden=="closed" ? "0px" : "300px"}
    >
      {/* <motion.nav
        initial={hidden}
        animate={{ width: hidden ? 0 : "300px" }}
        transition={{ ease: "easeOut", duration: 0.3 }}
      > */}
        <Flex
          height="100%"
          backgroundColor="blue.500"
          direction="column"
          justifyContent="space-between"
          color="white"
          overflow="hidden"
          // paddingX="14"
          paddingX={hidden=="closed" ? "0" : "14"}
        >
          <Box>
            {/* <HStack padding="16px" columnGap="20px">
              <Image
                src={Logo}
                alt="Blueprint Logo"
                boxSize="80px"
                minWidth="80px"
              ></Image>
            </HStack> */}
            <VStack paddingX="8px" align="left">
              <ChakraLink
                as={ReactRouterLink}
                // asChild
                href="/"
                _hover={{ textDecoration: "none" }}
              >
                {/* <ReactRouterLink to="/">
                  
                </ReactRouterLink> */} 
                {/* Try Linkbox */}
                <Button
                  colorScheme="whiteAlpha"
                  width="100%"
                  padding="8px"
                  justifyContent="start"
                  backgroundColor="transparent"
                  variant="solid"
                  display="flex"
                >
                 <HomeIcon /><Text alignSelf="flex-end">Home</Text> 
                </Button>
              </ChakraLink>
              <ChakraLink
                as={ReactRouterLink}
                href="/dashboard"
                _hover={{ textDecoration: "none" }}
              >
                <Button
                  colorScheme="whiteAlpha"
                  width="100%"
                  padding="8px"
                  justifyContent="start"
                  backgroundColor="transparent"
                  variant="solid"
                  display="flex"
                >
                  <DashboardIcon /><Text alignSelf="flex-end"> Dashboard</Text>
                </Button>
              </ChakraLink>
              <ChakraLink
                as={ReactRouterLink}
                href="/blog"
                _hover={{ textDecoration: "none" }}
              >
                <Button
                  colorScheme="whiteAlpha"
                  width="100%"
                  padding="8px"
                  justifyContent="start"
                  backgroundColor="transparent"
                  variant="solid"
                  display="flex"
                >
                  <BlogIcon /><Text alignSelf="flex-end"> Blog</Text>
                </Button>
              </ChakraLink>
            </VStack>
          </Box>
        </Flex>
      {/* </motion.nav> */}
      <Button
        onClick={() => {
          // setHidden(!hidden);
          setHidden(hidden=="open" ? hidden="closed" : hidden="open")
        }}
        colorScheme="none"
        backgroundColor="transparent"
        color="black"
        position="absolute"
        right="-50px"
      ><ExpandIcon /></Button>
    </Flex>
  );
}

export default Sidebar;
