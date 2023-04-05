/**
 *  MERGESORT:  T = O(n log(n)), S = O(n)
 */

export const merge = (left: (number | undefined)[], right: (number | undefined)[]) : (number | undefined)[] => {
    let auxArr = [];
    
    while(left.length && right.length){
        if(left[0] && right[0])
            if(left[0] < right[0]){
                auxArr.push(left.shift());
            } else {
                auxArr.push(right.shift());
            }
    }

    return [...auxArr, ...left, ...right];
}

export const mergesort = (arr: number[]): (number | undefined)[] => {
    if(arr.length <= 1)
        return arr;
    
    return merge(
        mergesort(arr.splice(0, ~~(arr.length / 2))), 
        mergesort(arr)
    );
}