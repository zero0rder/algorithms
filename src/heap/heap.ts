export class MaxHeap {
    heap: number[];
    heapSize: number;
    maxSize: number;

    constructor(h: number[] = [], max: number = 12){
        this.heap = h;
        this.heapSize = h.length;
        this.maxSize = h.length > max ? h.length : max;
    }

    insert(value: number): void {
        if(this.heapSize === this.maxSize)
            return console.log('full heap :(');

        this.heapSize++;
        this.heap[this.heapSize] = value;
        this.siftUp(this.heapSize);

    }

    siftUp(index: number): void {
        while(index > 0 && this.heap[this.getParent(index)] < this.heap[index]){
            this.swap(this.heap, index, this.getParent(index));
            index = this.getParent(index);
        }
    }

    siftDown(index: number): void {
        let heap = this.heap;
        let left = this.getLeftChild(index);
        let right = this.getRightChild(index);
        let maxIndex = index;

        if(left <= this.heapSize && heap[left] > heap[maxIndex])
            maxIndex = left;
        
        if(right <= this.heapSize && heap[right] > heap[maxIndex])
            maxIndex = right;

        if(index !== maxIndex){
            this.swap(heap, index, maxIndex);
            this.siftDown(maxIndex);
        }
    }

    // - return max value in heap
    getMax(): number {
        if(this.heapSize > 0)
            return this.heap[0];

        return -1;
    }

    // - returns true if heap contains no elements
    isEmpty(): boolean {
        return this.heapSize === 0;
    }

    // - returns the max item, removing it
    extractMax(){
        let result = this.heap[0];
        this.swap(this.heap, result, this.heap[this.heapSize]);
        this.heapSize--;
        this.siftDown(0);
        return result;

    }

    // - removes item at index
    remove(index: number){
        this.heap[index] = Infinity;
        this.siftUp(index);
        this.extractMax();
    }

    // - create heap from given array items
    heapify(a: number[]): number[]{
        this.heapSize = a.length;

        // '(a.length / 2 - 1)' => index of last non-leaf node
        for(let i = Math.floor((a.length / 2) - 1); i >= 0; i--)
            this.siftDown(i);

        return this.heap = a;
    }

    // - take an unsorted array and turn it into a sorted array in-place using a max heap
    heapSort(){

    }

    private getParent(i: number): number {
        return Math.floor((i - 1) / 2);
    }

    private getLeftChild(i: number): number {
        return (2 * i) + 1;
    }
    
    private getRightChild(i: number): number {
        return (2 * i) + 2;
    }

    private swap(a: number[], x: number, y: number): void {
        let temp = a[x];
        a[x] = a[y];
        a[y] = temp;
    }

}