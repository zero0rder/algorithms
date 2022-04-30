type NodePtr = ListNode | null;

export class ListNode {
    data: number = 0;
    next_ptr: NodePtr = null;

    constructor(data: number){
        this.data = data;
    }
}

export class List {
    head: NodePtr = null;
    list_size: number = 0;
    //tail: NodePtr = null;

    constructor(){}

    // - returns number of data elements in list
    size(): number {
        return this.list_size; 
    }

    // - bool returns true if empty
    empty(): boolean {
        return this.list_size === 0;
    }

    // - returns the value of the nth item (starting at 0 for first)
    value_at(index: number) {
        let currNode = this.head;
        let nodeIndex = 0;

        //check if index is out-of-bounds (see below logic first)

        //start at head & traverse down
        while(currNode?.next_ptr){
            if(nodeIndex === index)
                return currNode.data;
            
            currNode = currNode.next_ptr;
            nodeIndex++;
        }

        return null;
    }

    // - adds an item to the front of the list
    push_front(value: number){
        let newNode = new ListNode(value);

        if(this.head === null) {
            this.head = newNode;
            this.head.next_ptr = null;
        } else {
            newNode.next_ptr = this.head;
            this.head = newNode;
        }

        this.list_size++;
    }

    // - remove front item and return its value
    pop_front(){
        if(this.head === null)
           return console.log('empty list.');

        let data = this.head.data;
        this.head = this.head.next_ptr;
        this.list_size--;

        return data;
    }

    // - adds an item at the end
    push_back(value: number) {
        let newNode = new ListNode(value);
        let currNode = this.head;
        
        //iterate until next_ptr == null (tail)
        while(currNode?.next_ptr)
            currNode = currNode.next_ptr;

        //currNode is currently at the tail node w ptr == null
        if(currNode)
            currNode.next_ptr = newNode;

        this.list_size++;
    }

    // - removes end item and returns its value
    pop_back(){
        let currNode = this.head;
        
        if(currNode === null)
            return console.log('empty list.')

        //iterate until next_ptr.next_ptr == null (second-to-last)
        while(currNode.next_ptr?.next_ptr)
            currNode = currNode.next_ptr;

        //currently on second-to-last node
        let prev_tail = currNode.next_ptr?.data;

        if(currNode)
            currNode.next_ptr = null;

        this.list_size--;

        return prev_tail;

    }

    // - get value of front item
    front(){
        return this.head?.data;
    }

    // - get value of end item
    back(){
        let currNode = this.head;

        while(currNode?.next_ptr){
            currNode = currNode?.next_ptr;
        }

        return currNode?.data;
    }

    // - insert value at index, so current item at that index is pointed to by new item at index
    insert(index: number, value: number){
        let newNode = new ListNode(value);
        let currNode = this.head;
        
        if(index < 0 || index > this.list_size)
            return console.log('out of bounds');

        
        if(index === 0){
            if(currNode === null){
                this.head === newNode;
            } else {
                newNode.next_ptr = this.head;
                this.head = newNode;
            }

            this.list_size++

        } else {
            let nodeIdx = 0;

            while(currNode?.next_ptr){

                if(index === (nodeIdx + 1)){
                    newNode.next_ptr = currNode.next_ptr;
                    currNode.next_ptr = newNode;
                    this.list_size++
                    return;
                }

                currNode = currNode.next_ptr;
                nodeIdx++;
            }
        }

        return;

    }

    // - removes node at given index
    erase(index: number){
        let currNode = this.head;

        if (index === 0){
            if(currNode !== null){
                if(currNode.next_ptr !== null)
                   return this.head = currNode.next_ptr;

                
                return this.head = null;
            }

        } else {
            let nodeIdx = 0;

            while(currNode?.next_ptr){

                if(index === (nodeIdx + 1)){
                    let temp = currNode.next_ptr;
                    currNode.next_ptr = currNode.next_ptr.next_ptr;

                    return temp;
                }

                currNode = currNode.next_ptr;
                nodeIdx++;
            }
        }

        this.list_size !== 0 ? this.list_size-- : this.list_size;
    }

    // - returns the value of the node at nth position from the end of the list
    value_n_from_end(n: number){
        let currNode = this.head;

        if(n >= this.list_size)
            return console.log('out of bounds');

        if(this.head === null)
            return null;

        if(n === 0){
            while(currNode?.next_ptr){
                currNode = currNode.next_ptr;
            }

            return currNode?.data;
        }

        let indx = 0;
        let size = (this.list_size - n) - 1;

        while(indx <= size){
            if(indx === size)
                return currNode?.data;

            if(currNode)
                currNode = currNode?.next_ptr;

            indx++
        }
    }

    // - reverses the list
    reverse(){
        let prev = null;
        let curr = this.head;
        let forward = this.head;

        while(curr !== null){
            if(forward)
                forward = forward.next_ptr;

            curr.next_ptr = prev;
            prev = curr;
            curr = forward;
        }

        return prev;
    }
}