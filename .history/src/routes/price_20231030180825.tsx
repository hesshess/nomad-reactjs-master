import { useQuery } from 'react-query';
import { fetchCoinHistory } from '../api';
import ApexCharts from 'react-apexcharts';

interface IHistoricalPriceData{
    time_open: number,
    time_close: number,
    open: string,
    high: string,
    low: string,
    close: string,
    volume: string,
    market_cap: number,
}

interface PriceProps{
    coinId: string;
}

function Price ({coinId}: PriceProps){
    const {isLoading, data} = useQuery<IHistoricalPriceData[]>(["ohlcv", coinId], ()=>fetchCoinHistory(coinId),{
        refetchInterval: 60000,
    });
    const possibleData = data ?? [];
    const priceData = possibleData.map((i)=>{
        return{
            x: i.time_close,
            y: [i.open, i.high, i.low, i.close],
        }
    })


       return (<div>
        {isLoading ? "Loading Chart..." : (
    <ApexCharts 
    type="candlestick" 
    series={[
        {
            data: priceData,
        },
    ]} 
    />)}
    </div>);
}

export default Price;