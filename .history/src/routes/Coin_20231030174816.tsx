import { Switch, Route, useLocation, useParams, Link, useRouteMatch } from 'react-router-dom';
import styled from 'styled-components';
import Chart from './Chart';
import Price from './Price';
import { fetchCoin, fetchTicker } from '../api';
import { useQuery } from 'react-query';
import {Helmet} from 'react-helmet';

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
const Overview = styled.div`
  display: flex;
  justify-content: space-between;
  background-color: rgba(0, 0, 0, 0.5);
  padding: 10px 20px;
  border-radius: 10px;
`;
const OverviewItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  span:first-child {
    font-size: 10px;
    font-weight: 400;
    text-transform: uppercase;
    margin-bottom: 5px;
  }
`;
const Description = styled.p`
  margin: 20px 0px;
`;
const Tabs = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  margin: 25px 0px;
  gap: 10px;
`;

const Tab = styled.span<{ $isActive: boolean }>`
  text-align: center;
  text-transform: uppercase;
  font-size: 12px;
  font-weight: 400;
  background-color: rgba(0, 0, 0, 0.5);
  padding: 7px 0px;
  border-radius: 10px;
  color: ${(props) =>
    props.$isActive ? props.theme.accentColor : props.theme.textColor};
  a {
    display: block;
  }
`;

interface Params {
    coinId: string;
}

interface RouteState {
    name: string;
}

interface ICoinData {
    id: string; 
    name: string; 
    symbol: string; 
    rank: number; 
    is_new: boolean; 
    is_active: boolean; 
    type: string; 
    logo: string;   
    description: string; 
    message: string; 
    open_source: boolean; 
    started_at: string; 
    development_status: string; 
    hardware_wallet: boolean; 
    proof_type: string; 
    org_structure: string; 
    hash_algorithm: string;    
    first_data_at: string; 
    last_data_at: string; 
}

interface ITickerData {
    id: string;
    name: string;
    symbol: string;
    rank: number;
    circulating_supply: number;
    total_supply: number;
    max_supply: number;
    beta_value: number;
    first_data_at: string;
    last_updated: string;
    quotes: {
      USD: {
        ath_date: string;
        ath_price: number;
        market_cap: number;
        market_cap_change_24h: number;
        percent_change_1h: number;
        percent_change_1y: number;
        percent_change_6h: number;
        percent_change_7d: number;
        percent_change_12h: number;
        percent_change_15m: number;
        percent_change_24h: number;
        percent_change_30d: number;
        percent_change_30m: number;
        percent_from_price_ath: number;
        price: number;
        volume_24h: number;
        volume_24h_change_24h: number;
      };
    };
}

function Coin() {
  const { coinId } = useParams<Params>();
  const { state } = useLocation<RouteState>();
  const priceMatch = useRouteMatch("/:coinId/price");
  const chartMatch = useRouteMatch("/:coinId/chart");

  const {isLoading: isCoinLoading, data: coinData} = useQuery<ICoinData>(["info",coinId], ()=>fetchCoin(coinId));
  const {isLoading: isTickerLoading, data: tickerData} = useQuery<ITickerData>(["ticker",coinId], ()=>fetchTicker(coinId), {
    refetchInterval: 60000,
  });
/*   const [ loading, setLoading ] = useState(true);
    const [ coin, setCoin ] = useState<ICoinData>();
    const [ ticker, setTicker] = useState<ITickerData>();

    useEffect(() => {
        (async()=>{
            const coinData = await(await fetch(`https://api.coinpaprika.com/v1/coins/${coinId}`)).json();
            const tickerData = await (await fetch(`https://api.coinpaprika.com/v1/tickers/${coinId}`)).json();
            setCoin(coinData);
            setTicker(tickerData);

            setLoading(false);
        })();
    },[coinId]) */
    const loading = isCoinLoading || isTickerLoading;
    return (
      <Container>
          <Helmet>
            <title>{ state?.name ? state.name : loading ? "Loading..." : coinData?.name }</title>
          </Helmet>
            <Link to={"/"}>🏠 Home</Link>
            <Header>
                <Title>{ state?.name ? state.name : loading ? "Loading..." : coinData?.name }</Title>
            </Header>
            {loading ? (
        <Loader>Loading...</Loader>
      ) : (
        <>
          <Overview>
            <OverviewItem>
              <span>Rank:</span>
              <span>{coinData?.rank}</span>
            </OverviewItem>
            <OverviewItem>
              <span>Symbol:</span>
              <span>${coinData?.symbol}</span>
            </OverviewItem>
            <OverviewItem>
              <span>Price:</span>
              <span>{tickerData?.quotes.USD.price}</span>
            </OverviewItem>
          </Overview>
          <Description>{coinData?.description}</Description>
          <Overview>
            <OverviewItem>
              <span>Total Suply:</span>
              <span>{tickerData?.total_supply}</span>
            </OverviewItem>
            <OverviewItem>
              <span>Max Supply:</span>
              <span>{tickerData?.max_supply}</span>
            </OverviewItem>
          </Overview>
          <Tabs>
            <Tab $isActive={chartMatch !== null}>
              <Link to={`/${coinId}/chart`}>Chart</Link>
            </Tab>
            <Tab $isActive={priceMatch !== null}>
              <Link to={`/${coinId}/price`}>Price</Link>  
            </Tab>
          </Tabs>
          
          <Switch>
            <Route path={`/:coinId/price`}>
              <Price/>
            </Route>
            <Route path={`/:coinId/chart`}>
              <Chart coinId={coinId} />
            </Route>
          </Switch>
        </>
      )}
        </Container>
    );
}
export default Coin;