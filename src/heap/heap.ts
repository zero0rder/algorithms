export class MaxHeap {
    heap: number[] = [];
    heapSize: number = 0;

    constructor(){}

    insert(value: number): void {
        // - insert where maxSize pointer is??
    }

    siftUp(index: number): void {
        while(index > 1 && this.heap[this.getParent(index)] < this.heap[index]){
            this.swap(this.heap, index, this.getParent(index));
            index = this.getParent(index);
        }
    }

    siftDown(index: number): void {
        let maxIndex = index;
        let left = this.getLeftChild(index);

        if(left <= this.heapSize && this.heap[index] > this.heap[maxIndex])
            maxIndex = left;
        
        //todo...
        
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

    }

    // - removes item at index
    remove(index: number){

    }

    // - create heap from given array items
    heapify(a: number[]){

    }

    // - take an unsorted array and turn it into a sorted array in-place using a max heap or min heap
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