import { useState } from 'react'
import { Link as ReactRouterLink } from 'react-router-dom'
import {
  Box,
  Flex,
  HStack,
  VStack,
  Button,
  Image,
  Text,
  Link as ChakraLink
} from '@chakra-ui/react'
import { motion } from 'framer-motion'
import HomeIcon from './icons/HomeIcon'
import DashboardIcon from './icons/Dashboard'
import BlogIcon from './icons/BlogIcon'
import ExpandIcon from './icons/ExpandIcon'
import Logo from '../assets/images/logo_negative.png'

function Sidebar (): JSX.Element {
  const [hidden, setHidden] = useState(false)

  return (
    <Flex width="fit-content" height="100%" position="relative">
      <motion.nav
        initial={hidden}
        animate={{ width: hidden ? 0 : '300px' }}
        transition={{ ease: 'easeOut', duration: 0.3 }}
      >
        <Flex
          height="100%"
          backgroundColor="blue.500"
          direction="column"
          justifyContent="space-between"
          color="white"
          overflow="hidden"
        >
          <Box>
            <HStack padding="16px" columnGap="20px">
              <Image
                src={Logo}
                alt="Blueprint Logo"
                boxSize="80px"
                minWidth="80px"
              ></Image>
            </HStack>
            <VStack paddingX="8px" spacing="15px" align="left">
              <ChakraLink
                as={ReactRouterLink}
                to="/"
                _hover={{ textDecoration: 'none' }}
              >
                <Button
                  leftIcon={<HomeIcon />}
                  colorScheme="whiteAlpha"
                  width="100%"
                  padding="8px"
                  justifyContent="start"
                  backgroundColor="transparent"
                  variant="solid"
                  display="flex"
                >
                  <Text alignSelf="flex-end">Home</Text>
                </Button>
              </ChakraLink>
              <ChakraLink
                as={ReactRouterLink}
                to="/dashboard"
                _hover={{ textDecoration: 'none' }}
              >
                <Button
                  leftIcon={<DashboardIcon />}
                  colorScheme="whiteAlpha"
                  width="100%"
                  padding="8px"
                  justifyContent="start"
                  backgroundColor="transparent"
                  variant="solid"
                  display="flex"
                >
                  <Text alignSelf="flex-end">Dashboard</Text>
                </Button>
              </ChakraLink>
              <ChakraLink
                as={ReactRouterLink}
                to="/blog"
                _hover={{ textDecoration: 'none' }}
              >
                <Button
                  leftIcon={<BlogIcon />}
                  colorScheme="whiteAlpha"
                  width="100%"
                  padding="8px"
                  justifyContent="start"
                  backgroundColor="transparent"
                  variant="solid"
                  display="flex"
                >
                  <Text alignSelf="flex-end">Blog</Text>
                </Button>
              </ChakraLink>
            </VStack>
          </Box>
        </Flex>
      </motion.nav>
      <Button
        onClick={() => {
          setHidden(!hidden)
        }}
        leftIcon={<ExpandIcon />}
        colorScheme="none"
        backgroundColor="transparent"
        color="black"
        position="absolute"
        right="-50px"
      ></Button>
    </Flex>
  )
}

export default Sidebar
