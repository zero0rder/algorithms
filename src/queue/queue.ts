type NodePtr = QueueNode | null;

export class QueueNode {
    data: number;
    next: NodePtr = null;

    constructor(data: number = 0) {
        this.data = data;
    }
}

export class LinkedListQueue {
     head: NodePtr = null;
     tail: NodePtr = null;
     list_size: number = 0;

    constructor() {}

    // - adds value at position at tail
    enqueue(value: number){
        let newNode = new QueueNode(value);

        if(this.list_size === 0){
            this.head = this.tail = newNode;

        } else {
            if (this.tail)
                this.tail.next = this.tail = newNode;

        }
        
        this.list_size++;

    }

    // - returns value and removes least recently added element (front)
    dequeue() {
        let prevNodeVal = this.head?.data;

        if(this.head?.next){
            this.head = this.head.next;
        } else {
            this.head = this.tail = null;
        }

        if(this.list_size > 0)
            this.list_size--;

        return prevNodeVal;
    }

    empty(): boolean {
        return this.list_size === 0;
    }
    
}

export class FixedArrayQueue {
    queue: number[] | null[];
    read: number = 0; //dequeue pointer
    write: number = 0;//enqueue pointer
    queueSize: number = 0;
    maxSize: number;

    constructor(size: number = 8){
        this.queue = new Array(size).fill(null);
        this.maxSize = size;
    }

    // - adds item at end of available storage
    enqueue(value: number){
        this.queue[this.write] = value;

        if(this.write === this.maxSize - 1){
            if(this.read !== 0)
                this.write = 0;
            
        } else {
            if((this.write + 1) !== this.read)
                this.write++;
            
        }

        if(this.queueSize < this.maxSize)
            this.queueSize++;
        
    }

    // - returns value and removes least recently added element
    dequeue() {
       let item = this.queue[this.read]; 

       if(this.queueSize === 0)
            return;
        
       this.queue[this.read] = null;

       if(this.read === this.maxSize){
           this.read = 0;
       } else {
           this.read++;
       }

        this.queueSize--;

        return item;
    }

    empty(): boolean {
        return this.queueSize <= 0;
    }

    full() {
        return this.queueSize === this.maxSize; 
    }
}