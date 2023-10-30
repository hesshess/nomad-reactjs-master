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
    const {isLoading, data} = useQuery<IHistoricalData[]>(["closeprice", coinId], ()=>fetchCoinHistory(coinId),{
        refetchInterval: 60000,
    });
    return (<div>
        {isLoading ? "Loading Chart..." : (
    <ApexCharts 
    type="line" 
    series={[
        {
            name: "Price",
            data: data?.map((price)=> Number(price.close)) ?? [],
        },
    ]} 
        options={{
        theme:{
            mode: "light",
        },
        chart : {
            height: 300,
            width: 500,
            toolbar: {
                show: false,
            },
            background: "transparent",
        },
        grid:{show: false,},
        stroke:{
            curve: "smooth",
            width:4,
        }
    }}/>)}
    </div>);
}
export default Chart;