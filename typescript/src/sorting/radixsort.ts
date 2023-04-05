/**
 *  RADIX SORT: T = O(d * (n + max)), S = O(max) {STABLE}
*/

export function radixSort(a:number[]):void{
    let max = Math.max(...a)
    
    for(let i=1; ~~(max / i)>0; i*=10){
        radixCountingSort(a, i)
    }
}

function radixCountingSort(a: number[], idx:number):void{
    let max = Math.max(...a), 
        freq = new Array(max + 1).fill(0),
        outputA = new Array(a.length + 1).fill(0)

    //calculate count of elems
    for(let i=0; i<a.length; i++){
        freq[~~(a[i] / idx) % 10]++
    }

    //accumulate frequency (0-9)
    for(let n=1; n<10; n++){
        freq[n] += freq[n-1]
    }

    //place elems in sorted order
    for(let j=a.length-1; j>=0; j--){
        outputA[freq[~~(a[j] / idx) % 10] - 1] = a[j]
        freq[~~(a[j] / idx) % 10]--
    }

    //copy the output array
    for(let m=0; m<a.length; m++){
        a[m] = outputA[m]
    }
}