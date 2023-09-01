import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Title, Container } from '@mantine/core';
import { HeaderResponsive } from './HeaderResponsive';
import { FooterSimple } from './FooterSimple';
import { useAccount } from 'wagmi';

import ConnectPanel from './ConnectPanel';
import MintPanel from './MintPanel';

function App() {

  const { address, isConnected } = useAccount()


  return (
    <>
      <HeaderResponsive links={[{ link: "/", label: "Mint" }]} />
      <Container mt={-50}>
        {isConnected ? <MintPanel address={address!}/> : <ConnectPanel />}
      </Container>
      <FooterSimple links={[{ link: '/', label: 'isPies()' }]} />
    </>
  );
}

export default App;
