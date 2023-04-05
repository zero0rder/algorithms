/**
 *  SELECTIONSORT: T = O(n^2), S = O(n)
 */

export const selectionsort = (a: number[]): number[] => {
    let sortedArr = [];
    let len = a.length;

    for(let i=0; i < len; i++){
        let min = findMin(a);
        sortedArr.push(a.splice(min, 1)[0])
    }

    return sortedArr;

}

const findMin = (a: number[]) => {
    let minElement = a[0];
    let minIndex = 0;
    let len = a.length;

    for(let j=1; j < len; j++){
        if(a[j] < minElement){
            minElement = a[j];
            minIndex = j;
        }
    }

    return minIndex;
}  