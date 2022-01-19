import {
  Button,
  Flex,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Image
} from '@chakra-ui/react';
import Portis from '@portis/web3';
import Web3 from 'web3';
import { useMoralis } from 'react-moralis';

// images
import MetaMaskSVG  from '../../assets/metamask.svg';
import  PortisSVG  from '../../assets/portis.svg';

// import PortisLogo from '../../public/images/portis.svg';

const ModelBox = (props) => {
  const {
    user,
    authenticate,
    isAuthenticated,
    isAuthenticating,
    Moralis,
    web3,
    logout,
  } = useMoralis();

  const handlePortis = async () => {
    class MoralisPortisProvider {
      async activate() {
        // code to show portis modal
        const portis = new Portis(
          'dc462473-0779-43ff-810f-11c07bf4eb2d',
          'maticMumbai'
        );
        this.provider = portis.provider;
        const MWeb3 = typeof Web3 === 'function' ? Web3 : window.Web3;
        this.web3 = new MWeb3(this.provider);
        this.isActivated = true;
        return this.web3;
      }
    }

    Moralis.Web3.enable = async () => {
      const web3Provider = new MoralisPortisProvider();
      const web3 = await web3Provider.activate();
      console.log('RUNNING');
      console.log('WEB3', web3);
      const accounts = await web3.eth.getAccounts();
      console.log(accounts);
      return web3;
    };

    authenticate();
  };

  return (
    <Modal isOpen={props.isOpen} onClose={props.onClose} isCentered>
      <ModalBody>
        <ModalOverlay />
        <ModalContent w="xl" h="2xl">
          <ModalHeader>Select Wallet</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Flex direction="column" align="center" justify="center">
              <Flex direction="column" align="center" justify="center">
                <Image src={MetaMaskSVG} alt="Metamask Icon" width="100px" />
                <Button
                marginTop='4'
                  size="lg"
                  display={{ base: 'none', md: 'inline-flex' }}
                  fontSize={'sm'}
                  fontWeight={600}
                  color={'white'}
                  bgGradient="linear(to-r, purple.500, pink.500)"
                  href={'#'}
                  _hover={{
                    bgGradient: 'linear(to-l, purple.500, pink.700)',
                  }}
                  isLoading={isAuthenticating}
                  onClick={() => authenticate()}
                >
                  Connect Metamask
                </Button>
              </Flex>
              <Flex
                direction="column"
                align="center"
                justify="center"
                marginTop="20"
              >
                <Image src={PortisSVG} alt="Portis Icon" width="80px" />
                <Button
                  size="lg"
                  display={{ base: 'none', md: 'inline-flex' }}
                  marginTop="4"
                  fontSize="sm"
                  fontWeight={600}
                  color="white"
                  bgGradient="linear(to-r, purple.500, pink.500)"
                  href={'#'}
                  _hover={{
                    bgGradient: 'linear(to-l, purple.500, pink.700)',
                  }}
                  onClick={handlePortis}
                >
                  Connect Portis
                </Button>
                <Button
                color="white"
                bgColor='red.600'
                _hover={{bgColor: 'red.700'}}
                marginTop='6' 
                onClick={() => logout()}>Logout</Button>
              </Flex>
            </Flex>
          </ModalBody>
        </ModalContent>
      </ModalBody>
    </Modal>
  );
};

export default ModelBox;
