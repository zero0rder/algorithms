/**
 *      Swap Utility Function
 */

export function swap(a: number[], x: number, y: number){
    // [[a[x], a[y]] = [a[y], a[x]]
    const temp = a[x]
    a[x] = a[y]
    a[y] = temp
}

/**
 *      Random Utility Function
 * 
 *      ~~(Math.random() * 100) -> [0 - 99] non-inclusive
 *      ~~(Math.random() * (100 + 1)) -> [0 - 100] inclusive
 *      10 + ~~(Math.random() * (100 - 10 + 1)) -> [10 - 100] starting at a min upto a max inclusive
 */

export function randomInt(min: number, max: number){
    return (min + ~~(Math.random() * (max - min + 1)))
}

/**
 *      RANDOM VARIABLES
 */

export const _NumsArr = [ 12, 3, 21, 5, 6, 30, 9, 10, 23, 44, 2, 75, 32, 98, 17, 1, 22 ]
export const _CharsArr = ['B', 'A', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K']
export const _VertexObj  = [{ key: 'A', weight: 12 }, { key: 'B', weight: 30 }, { key: 'C', weight: 3 }, { key: 'D', weight: 53 }, { key: 'E', weight: 17 }, { key: 'F', weight: 22 }, { key: 'G', weight: 112 }, { key: 'H', weight: 27 }]
// let airports = ['PHX', 'LAX', 'JFK', 'EWR', 'CLE', 'MEX', 'HTX', 'MIA', 'OKC', 'BKK']
// let routes = [['PHX', 'JFK'],['EWR', 'LAX'],['MEX', 'MIA'],['JFK', 'HTX'],['OKC', 'CLE'],['EWR', 'HTX'],['LAX', 'CLE'],['BKK', 'PHX'],['OKC', 'BKK']]
// let gChars = [['B', 'C'],['C', 'A'],['A', 'B'], ['B', 'D'], ['D', 'E'], ['E', 'F'],['F', 'D'],['G', 'F'], ['G', 'H'], ['H', 'I'],['I', 'J'], ['J', 'G'], ['J', 'K']]