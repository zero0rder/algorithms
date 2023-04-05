/**
 *  BUBBLE SORT: T = O(n^2) [search] - S = O(1)
 */

import { swap } from '../utils'
export function bubbleSort(a: number[]): number[]{
    const len = a.length
    for(let i=0; i < len-1; i++){
        for(let j=0; j < len-i-1; j++){
            if(a[j] > a[j+1]){
                swap(a, j, j+1)
            }
        }
    }
 
    return a
}