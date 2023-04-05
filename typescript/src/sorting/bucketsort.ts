/**
 *  BUCKET SORT: T = O(n+k), S = O(n+k) {STABLE}
 */

export function bucketSort(a: number[], bucketSize: number = 5):number[] | void {
    let buckets: number[][] = [],
        outputA: number[] = [],
        max = Math.max(...a),
        min = Math.min(...a),
        range = ~~((max - min) / bucketSize)

    if(bucketSize === 0) return

    let p=0
    while(p < bucketSize){
        buckets.push([])
        p++
    }

    //scattering elements into buckets
    for(let j=0;j<a.length;j++){
        let bucketIndex: number = ~~((a[j] - min) / (range + 1))
        buckets[bucketIndex].push(a[j])
    }

    buckets.map(bkt => { //sort individual buckets
        if(bkt.length > 0) bkt.sort((a, b) => a - b)
        return bkt
    }).forEach(srtbkt => outputA.push(...srtbkt)) //gather all sorted buckets together

    return outputA
}