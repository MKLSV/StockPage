'use strict'

function debounce(func, wait) {
    let timeout
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout)
            func(...args)
        };

        clearTimeout(timeout)
        timeout = setTimeout(later, wait)
    }
}


function log() {
    console.log('Logging!')
}

// log()
// log()
// log()

// const debounceLog = debounce(log, 500)

// debounceLog()
// debounceLog()
// debounceLog()