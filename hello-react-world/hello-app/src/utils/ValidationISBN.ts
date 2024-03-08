function splitListByIndex(list: Array<number>) {
    const evenList = Array<number>()
    const oddList = Array<number>()

    list.forEach((item, index) => {
        if (index % 2 === 0) {
            evenList.push(item)
        } else {
            oddList.push(item)
        }
    })

    return { evenList, oddList }
}

function validateISBN13(isbn: Array<number>) {
    const { evenList, oddList } = splitListByIndex(isbn)

    const z = oddList.map((x: number) => x * 3).reduce((sum, current) => sum + current, 0)
    const y = evenList.reduce((sum, current) => sum + current, 0) + z

    return 10 - (y % 10)
}

export function validateISBN(isbn: Array<number>){
    switch (isbn.length) {
        case 13:
            let validationDigit = isbn.pop()
            return validateISBN13(isbn) === validationDigit
        case 10:
            // Add code to validate ISBN-10
            throw new Error('Not implemented')
        default:
            return false
    }
}