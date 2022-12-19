'use strict'

const STORAGE_KEY = 'stocksDB'
const CACHE_TIME = 1000 * 10
const gStock = loadFromStorage(STORAGE_KEY) || {}

function getQuotes(symbol, onSuccess) {
    const API_KEY = 'I2H10BU71WVDY4I5'
    const url = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol=${symbol}&apikey=${API_KEY}`

    if (gStock[symbol] && (Date.now() - gStock[symbol].lastReq < CACHE_TIME)) {
        const { quotes } = gStock[symbol]
        onSuccess(quotes)
        console.log('FROM CACHE')
        return
    }

    $.get(url, res => {
        console.log('AJAX')
        const stockInfo = res['Time Series (Daily)']
        const quotes = []
        console.log('stockInfo:', stockInfo)

        for (const date in stockInfo) {
            const price = stockInfo[date]['4. close']
            const quote = {
                date,
                price
            }
            quotes.unshift(quote)
        }

        gStock[symbol] = {
            quotes,
            lastReq: Date.now()
        }
        saveToStorage(STORAGE_KEY, gStock)

        console.log('gStock', gStock)

        onSuccess(quotes)
    })

}

/*
{
    date: '2022-08-25',
    price: 134.3
}
*/