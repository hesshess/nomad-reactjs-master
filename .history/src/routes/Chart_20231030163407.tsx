import { useQuery } from 'react-query';
import { fetchCoinHistory } from '../api';
import ApexCharts from 'react-apexcharts';

interface IHistoricalData{
    time_open: number,
    time_close: number,
    open: string,
    high: string,
    low: string,
    close: string,
    volume: string,
    market_cap: number,
}
interface ChartProps{
    coinId : string;
}


function Chart({  coinId }:ChartProps){
    const {isLoading, data} = useQuery<IHistoricalData[]>(["ohlcv", coinId], ()=>fetchCoinHistory(coinId));
    console.log(data?.map(price=>price.close));
    return (<div>
        {isLoading ? "Loading Chart..." : (
    <ApexCharts 
    type="line" 
    series={[
        {
            name: "sales",
            data: data?.map((price)=> Number(price.close)) ?? [],
        },
    ]} 
        options={{
        chart : {
            height: 500,
            width: 500,
            toolbar: {
                show: false,
            }
        },
        grid:{show: false,},
        stroke:{
            curve: "smooth",
            width:4,
        },
        yaxis: {show: false, },
        xaxis: {
            labels:{
                show:false,
            }
    }}}/>)}
    </div>);
}
export default Chart;