import { Card, Paper, Title, Image, Text} from "@mantine/core";
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
            <Card shadow="sm" maw={600} padding={50}>
            <br/>
            <Image src={'./50.png'} />
            <br/>
                <Title>Connect your wallet</Title>
                <Text>all your holdings are definitely safe with us</Text>
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