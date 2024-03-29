/**
 *  BINARY SEARCH: T = O(log(n)), S = O(n)
 */

export const binarySearchRecurse = function(arr: number[], target: number, min: number = 0, max: number = arr.length - 1): number | undefined {
    if(min > max)
        return -1
    
    let mid = ~~((min + max) / 2)

    if(arr[mid] === target)
        return mid

    if(arr[mid] > target)
        return binarySearchRecurse(arr, target, min, mid - 1)

    if(arr[mid] < target)
        return binarySearchRecurse(arr, target, mid + 1, max)
    
}

export const binarySearchLoop = function(arr: number[], target: number){
    let min = 0, max = arr.length -1

    while(min <= max){
        let mid = ~~((min + max) / 2)

        if(arr[mid] === target)
            return console.log(`found at index ${mid}`)

        if(arr[mid] > target)
            max = mid - 1

        if(arr[mid] < target)
            min = mid + 1

    }
    
    return console.log('not found')
    
}