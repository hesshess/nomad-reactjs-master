import { useQuery } from 'react-query';
import { fetchCoinHistory } from '../api';

interface ChartProps{
    coinId : string;
}


function Chart({  coinId }:ChartProps){
    const { isLoading, data:chartData } = useQuery(["ohlcv", coinId], () =>
    fetchCoinHistory(coinId)
    );

    console.log(chartData);
    return (<h1>Chart</h1>);
}
export default Chart;