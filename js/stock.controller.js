'use strict'

var gChart

function onInit() {
    const elInput = document.querySelector('[name=symbol]')
    elInput.addEventListener('input', debounce(onGetQuotes, 500))
}

function onGetQuotes() {
    const symbol = document.querySelector('[name=symbol]').value
    console.log('Getting quotes for:', symbol)
    if (!symbol) return
    showLoader()
    if (gChart) gChart.destroy()
    getQuotes(symbol, renderChart)
}

function renderChart(quotes) {

    const ctx = document.getElementById('myChart');
    if (!quotes.length) {
        showMsg()
        return
    }
    gChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: quotes.map(quote => quote.date),
            datasets: [{
                label: '# of Votes',
                data: quotes.map(quote => quote.price),
                backgroundColor: ['rgba(255, 99, 132, 0.2)'],
                borderColor: 'rgba(255, 99, 132, 1)',
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: false
                }
            }
        }
    });

    showChart()

}

function showChart() {
    document.querySelector('.chart').classList.remove('hide')
    document.querySelector('.loader').classList.add('hide')
    document.querySelector('.msg').classList.add('hide')
}

function showLoader() {
    document.querySelector('.chart').classList.add('hide')
    document.querySelector('.loader').classList.remove('hide')
    document.querySelector('.msg').classList.add('hide')

}

function showMsg() {
    document.querySelector('.chart').classList.add('hide')
    document.querySelector('.loader').classList.add('hide')
    document.querySelector('.msg').classList.remove('hide')

}