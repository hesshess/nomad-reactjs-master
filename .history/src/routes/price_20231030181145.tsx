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

interface PriceProps{
    coinId: string;
}

function Price ({coinId}: PriceProps){
    const {isLoading, data} = useQuery<IHistoricalData[]>(["ohlcv", coinId], ()=>fetchCoinHistory(coinId),{
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
        options={{
        theme:{
            mode: "dark",
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
        },
        yaxis: {show: false, },
        xaxis: {
            axisTicks:{show: false},
            axisBorder:{show: false},
            labels:{
                show:false,
            },
            type:"datetime",
            categories: data?.map(data=>new Date(data.time_close) ),
        
        },
        fill:{
            type:"gradient",
            gradient:{
                gradientToColors:["blue"],
                type: "vertical",
                stops:[0,100],
            },
        },
        colors:["red"],
        tooltip:{
            y: {
                formatter: (value)=>'$'+ value.toFixed(2 ),
            }
        }
    }}/>)}
    </div>);
}

export default Price;