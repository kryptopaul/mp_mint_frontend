import { Card, Paper, Title } from "@mantine/core";
import { ConnectButton } from "@rainbow-me/rainbowkit";

export default function ConnectPanel() {
    return (
        <div style={{
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column',
            display: 'flex',
            textAlign: 'center'
        }}>
            <Card shadow="sm" padding={50}>
                <Title>Connect your wallet</Title>
                <br />
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    flexDirection: 'column',
                }}>
                    <ConnectButton />
                </div>
            </Card>
        </div>
    )
}