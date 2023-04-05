/**
 *  QUICKSORT:  T = O(n log(n)), S = O(1) -> [T = O(n^2) worst-case]
 */

export const quickSortRecursive = (a: number[], lower: number = 0, upper: number = a.length - 1): void => {
    if(lower >= upper)
        return

    let pivot = partition(a, lower, upper)
    quickSortRecursive(a, lower, pivot - 1)
    quickSortRecursive(a, pivot + 1, upper)
}

export const quicksortIterative = (a: number[]) => {
    let stack = [];
   
    //add entire unsorted array as initial subarray
    stack.push(0);
    stack.push(a.length - 1);

    // => "stack[stack.length - 1]" is reading/returning the topmost element in the stack w/o removing it...
    while(stack[stack.length - 1] >= 0){
        //extract topmost subarray
        let end = stack.pop(), start = stack.pop(), pivot = partition(a, start ?? 0, end ?? (a.length - 1));
        
        //if there are unsorted elements to the left of the pivot,
        //add that subarray to the stack for sorting later
        if(start !== undefined && (pivot - 1) > start) {
            stack.push(start);
            stack.push(pivot - 1);
        }
        
        //if there are unsorted elements to the right of the pivot,
        //add that subarray to the stack for sorting later
        if(end !== undefined && (pivot + 1) < end) {
            stack.push(pivot + 1);
            stack.push(end);
        }

    }

    return a;

}

const partition = (a: number[], lower: number, upper: number): number => {
    let p = upper, k = lower - 1
    // console.log({p, lower, upper})

    // randomInt(lower, upper)
    for(let j = lower; j <= upper; j++){
        if(a[j] < a[p]){
            k++;
            [a[j], a[k]] = [a[k], a[j]];
        }
    }

    //insert pivot into middle
    [a[k + 1], a[p]] = [a[p], a[k + 1]];

    //return pivot index
    return k + 1;
}
