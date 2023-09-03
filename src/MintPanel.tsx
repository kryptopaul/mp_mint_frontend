import { Card, Paper, Title, Text, Button, Image } from "@mantine/core";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useEffect, useState } from "react";
import axios from "axios";
import { usePrepareContractWrite, useContractWrite, useNetwork, useSwitchNetwork, useWaitForTransaction } from 'wagmi'
import { abi } from './abi/abi'
import { parseEther } from "viem";

interface Address {
    address: string
}


export default function MintPanel({ address }: Address) {


    const [frenMintLoading, setFrenMintLoading] = useState<boolean>(false)
    const [mintLoading, setMintLoading] = useState<boolean>(false)
    const [hash, setHash] = useState<`0x${string}`>("0x")
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


    const { data: txHashData, isError, isLoading: txIsLoading } = useWaitForTransaction({
        hash: hash
    })

    const { config: frenConfig, error: frenError } = usePrepareContractWrite({
        address: '0xCd8Cb673bD3c880f54e38681f39bEF6F4Bc5950f',
        abi: abi, // to be filled
        functionName: 'FrensMint',
        chainId: 1,
    })

    const { data: frenData, isLoading: frenIsLoading, isSuccess: frenIsSuccess, write: frenWrite } = useContractWrite({
        address: '0xCd8Cb673bD3c880f54e38681f39bEF6F4Bc5950f',
        abi: abi, // to be filled
        functionName: 'FrensMint',
        chainId: 1,
        onSuccess: (data) => {
            setFrenMintLoading(false)
            setHash(data.hash)
        },
        onError: () => {
            setFrenMintLoading(false)
            alert("Error!")
        }
    })

    const { config, error } = usePrepareContractWrite({
        address: '0xCd8Cb673bD3c880f54e38681f39bEF6F4Bc5950f',
        abi: abi, // to be filled,
        chainId: 1,
        functionName: 'FrensMint'
    })

    const { data, isLoading, isSuccess, write } = useContractWrite({
        address: '0xCd8Cb673bD3c880f54e38681f39bEF6F4Bc5950f',
        abi: abi, // to be filled
        functionName: 'mint',
        chainId: 1,
        onSuccess: (data) => {
            setFrenMintLoading(false)
            setHash(data.hash)
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

    useEffect(() => {
        if (txHashData) {
            console.log("seems confirmed")
            console.log(txHashData)
            setFrenMintLoading(false)
            setMintLoading(false)
            alert("Minted!")
        }
    }, [txHashData])


    return (
        <div style={{
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column',
            display: 'flex',
            textAlign: 'center'
        }}>
            <Card shadow="sm" maw={600} padding={50}>
                <Image src={'./preview.gif'} />
                <br />
                <Text>{signature === "Not a fren" ? "" : signature === "" ? "Checking eligility..." : "Milady / thePolak detected: - free mint"}</Text>
                <br />
                <div style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    flexDirection: 'row',
                    display: 'flex',
                    textAlign: 'center'
                }}>
                    <Button loading={frenMintLoading} disabled={signature === "Not a fren" || signature === ""} size="lg" mr={10} onClick={handleFrenMint} >Friends Mint (Free)</Button>

                    <Button size="lg" ml={10} loading={mintLoading} onClick={handleMint}>Mint (0.03 ETH)</Button>
                </div>

            </Card>
        </div>
    )
}