import { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import styled from 'styled-components';

const Container = styled.div`
    padding: 0px 20px;
    max-width: 480px;
    margin: 0 auto;
`;
const Header = styled.header`
    height: 15vh;
    display: flex;
    justify-content: center; 
    align-items: center;
`;
const Title = styled.h1`
    font-size: 48px;
    color: ${props => props.theme.accentColor};
`;
const Loader = styled.span`
    text-align: center;
    display: block;
`;

interface Params {
    coinId: string;
}

interface RouteState {
    name: string;
}

function Coin() {
    const [ loading, setLoading ] = useState(true);
    const { coinId } = useParams<Params>();
    const { state } = useLocation<RouteState>();
    useEffect(() => {
        (async()=>{
            const coinData = await(await fetch(`https://api.coinpaprika.com/v1/coins/${coinId}`)).json();
            const tickerData = await (await fetch(`https://api.coinpaprika.com/v1/tickers/${coinId}`)).json();
            console.log(coinData);
            console.log(tickerData);
        })();
    },[])
    return (
        <Container>
            <Header>
                <Title>{ state?.name || "Loading..." }</Title>
            </Header>
            { loading ? (
                <Loader>Loading...</Loader>
                ) : null}
        </Container>
    );
}
export default Coin;