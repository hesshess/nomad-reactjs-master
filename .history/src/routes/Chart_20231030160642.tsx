import { useQuery } from 'react-query';
import { fetchCoinHistory } from '../api';
import ApexCharts from 'react-apexcharts';

interface IhistoricalData{
    time_open: string,
    time_close: string,
    open: number,
    high: number,
    low: number,
    close: number,
    volume: number,
    market_cap: number,
}
interface ChartProps{
    coinId : string;
}


function Chart({  coinId }:ChartProps){
    const {isLoading, data} = useQuery<IHistoricalData[]>(["ohlcv", coinId], ()=>fetchCoinHistory(coinId));
    console.log(data?.map(price=>price.close));
    return (<div>{isLoading ? "Loading Chart..." : (
    <ApexCharts 
    type="line" 
    series={[
        {
            name: "sales",
            data: data?.map((price)=>price.close),
        },
    ]} 
        options={{
        chart : {
            height: 500,
            width: 500,
        }
    }}/>)}</div>);
}
export default Chart;