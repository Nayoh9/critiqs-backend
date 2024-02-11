const containsSpaces = (...values) => {

    values.forEach(e => {
        for (let i = 0; i < e.length; i++) {
            if (e[i] === " ") {
                throw new Error('Illegal space detected')
            }
        }
    })
}

module.exports = containsSpaces