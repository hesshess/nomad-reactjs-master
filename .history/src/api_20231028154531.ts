export function fetchCoins(){
    return fetch("https://api.coinpaprika.com/v1/coins").then(response => response.json());
};

export function fetchCoin(coinId){
    return fetch(`https://api.coinpaprika.com/v1/coins/${coinId}`).then(response=>response.json());
};

export function fetchticker(coinId){
    return fetch(`https://api.coinpaprika.com/v1/tickers/${coinId}`).then(response=>response.json());
};