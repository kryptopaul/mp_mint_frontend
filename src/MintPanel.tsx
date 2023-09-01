import { Card, Paper, Title, Text, Button, Image } from "@mantine/core";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useEffect, useState } from "react";
import axios from "axios";
import { usePrepareContractWrite, useContractWrite, useNetwork, useSwitchNetwork } from 'wagmi'
import { abi } from './abi/abi'
import { parseEther } from "viem";

interface Address {
    address: string
}


export default function MintPanel({ address }: Address) {


    const [frenMintLoading, setFrenMintLoading] = useState<boolean>(false)
    const [mintLoading, setMintLoading] = useState<boolean>(false)

    const [signature, setSignature] = useState<string>("")
    const apiEndpoint = "https://miladypl-sig.azurewebsites.net/sig"

    async function handleFrenMint() {
        try {
            setFrenMintLoading(true)
            frenWrite({
                args: [1, signature]
            })
        }
        catch (e) {
            console.log(e)
            setFrenMintLoading(false)
        }

    }

    async function handleMint() {
        try {
            setMintLoading(true)
            write({
                value: parseEther('0.03'),
                args: [1]
            })
        }
        catch (e) {
            console.log(e)
        }
       
    }


    const { config: frenConfig, error: frenError } = usePrepareContractWrite({
        address: '0x27393B401A9a69Bb7197109C4A5f45c8Ea78839E',
        abi: abi, // to be filled
        functionName: 'FrensMint'
    })

    const { data: frenData, isLoading: frenIsLoading, isSuccess: frenIsSuccess, write: frenWrite } = useContractWrite({
        address: '0x27393B401A9a69Bb7197109C4A5f45c8Ea78839E',
        abi: abi, // to be filled
        functionName: 'FrensMint',
        // chainId: 1,
        onSuccess: () => {
            setFrenMintLoading(false)
            alert("Minted!")
        },
        onError: () => {
            setFrenMintLoading(false)
            alert("Error!")
        }
    })

    const { config, error } = usePrepareContractWrite({
        address: '0x27393B401A9a69Bb7197109C4A5f45c8Ea78839E',
        abi: abi, // to be filled
        functionName: 'FrensMint'
    })

    const { data, isLoading, isSuccess, write } = useContractWrite({
        address: '0x27393B401A9a69Bb7197109C4A5f45c8Ea78839E',
        abi: abi, // to be filled
        functionName: 'mint',
        // chainId: 1,
        onSuccess: () => {
            setFrenMintLoading(false)
            alert("Minted!")
        },
        onError: () => {
            setMintLoading(false)
            alert("Error!")
        }
    })

    useEffect(() => {
        if (address) {
            axios.get(`${apiEndpoint}`, {
                params: {
                    address
                }
            }).then((response) => {
                console.log(response.data.sig)
                setSignature(response.data.sig)
                console.log(abi)
            }).catch((error) => {
                console.log(error)
            })
        }
    }, [address])

    return (
        <div style={{
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column',
            display: 'flex',
            textAlign: 'center'
        }}>
            <Card shadow="sm" maw={600} padding={50} style={{
                
            }}>
                <Image src={'./50.png'} />
                <br />
                <Text>{signature === "Not a fren" ? "Not a fren - paid mint" : "Fren detected - free mint"}</Text>
                <br />
                <div style={{
                       justifyContent: 'center',
                       alignItems: 'center',
                       flexDirection: 'row',
                       display: 'flex',
                       textAlign: 'center'
                }}>
                <Button loading={frenMintLoading} disabled={signature === "Not a fren"} size="lg" mr={10} onClick={handleFrenMint} >Friends Mint (Free)</Button>

                <Button size="lg" ml={10} loading={mintLoading} onClick={handleMint}>Mint (0.03 ETH)</Button>
                </div>

            </Card>
        </div>
    )
}