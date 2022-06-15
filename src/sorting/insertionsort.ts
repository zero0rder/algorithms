/**
 *  INSERTIONSORT:  T = O(n^2)
 */

export const insertionsort = (a: number[]): number[] => {
    let key, j;
    let len = a.length;

    for(let i=1; i < len; i++){
        key = a[i];
        j = i - 1;

        while(j >= 0 && a[j] > key){
            a[j+1] = a[j];
            j = j - 1;
        }

        a[j+1] = key;

    }


    return a;

}