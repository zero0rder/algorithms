/**
 *  COUNTING SORT: T = O(n + max), S = O(max) {STABLE}
*/

export function countingSort(a: number[]):number[]{
    let max = Math.max(...a), 
        temp = new Array(max + 1).fill(0),
        outputA = new Array(a.length).fill(0)

    for(let k=0; k<a.length; k++){
        temp[a[k]]++
    }

    //accumulate frequency by adding the current val with prev val
    for(let n=1; n<temp.length; n++){
        temp[n] += temp[n-1]
    }

    //place elems in sorted order
    for(let j=a.length-1; j>=0; j--){
        outputA[temp[a[j]] - 1] = a[j] 
        temp[a[j]]--
    }

    return outputA
}

/**
 *  COUNTING SORT: T = O(n + max), S = O(max) {STABLE}
*/

export function countingSortNeg(a: number[]):number[]{
    let max = Math.max(...a), 
        min = Math.min(...a),
        range = (max-min) + 1,
        count = new Array(range).fill(0),
        output = new Array(a.length).fill(0)

    for(let k=0; k<a.length; k++){
        count[a[k]-min]++
    }

    for(let n=1; n<count.length; n++){
        count[n] += count[n-1]
    }

    for(let j=a.length-1; j>=0; j--){
        output[count[a[j] - min] - 1] = a[j]
        count[a[j] - min]--
    }

    return output
}