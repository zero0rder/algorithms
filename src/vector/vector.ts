//Idea: store a pointer to dynamically allocated array and replace it with a newly-allocated array as needed.
export class Vector {
    protected arr: number[] | null[];
    protected arr_capacity: number = 12;
    protected arr_size: number = 0; 

    constructor(arrSize: number = 12){
        this.arr = new Array(arrSize).fill(null);
        this.arr_capacity = arrSize;
    }

    //number of items, default = 0
    size(): number {
        return this.arr_size;
    }

    //number of items it can hold, default = 12
    capacity(): number {
        return this.arr_capacity;
    }

    //checks if our arr contains at least 1 value 
    isEmpty(): boolean {
        return this.arr_size === 0 ? true : false;
    }

    //returns item at given index, blows up if index out of bounds
    at(index: number): number | void | null {
        if(index < 0 || index >= this.arr_capacity)
            return console.log('out of range!'); //throw new RangeError('index out of range.')

        return this.arr[index];
    }

    //appends an item to the end of our array
    push(item: number): void {
        this.checkMaxCapacity();
        this.arr[this.arr_size] = item;
        this.arr_size++;
    }
    
    //inserts item at index and shifts that index's value and trailing elements to the right
    insert(value: number, index: number): void {
        if(index < 0 || index >= this.arr_capacity)
            return console.log('out of range!');

        this.checkMaxCapacity();
        
        for(let j = this.arr_size - 1 ; j >= index; j--)
            this.arr[j + 1] = this.arr[j];
        
        this.arr[index] = value;
        this.arr_size++;
    }

    //inserts item at first index and shifts that index's value and trailing elements to the right
    prepend(item: number): void {
        this.insert(item, 0);
    }

    //remove item from end and return value
    pop(): number | null {
        if(this.isEmpty())
            return null;

        let temp = this.arr[this.arr_size - 1];
        this.arr[this.arr_size - 1] = null;
        this.arr_size--;
        this.checkMinCapacity();

        return temp;
    }

    //delete item at index, shifting all trailing elements left
    delete(index: number): void {
        if(index < 0 || index >= this.arr_capacity)
            return console.log('out of range!');

        if (this.arr[index] === null)
            return console.log(`no item exists at index ${index}.`);

        for(let j = index; j < this.arr_size; j++)
            this.arr[j] = this.arr[j + 1];

        this.arr[this.arr_size - 1] = null;
        this.arr_size--;
    }

    //looks for value and removes index holding it (even if in multiple places)
    //changes size/capacity of array
    remove(value: number): void {
        let size_cap_change = 0;

        for(let i = 0; i < this.arr_size; i++){
            if(this.arr[i] === value){
                for(let j = i + 1; j < this.arr_size; j++){
                    this.arr[j - 1] = this.arr[j];
                    this.arr[j] = null;
                }

                size_cap_change++;
            } 
        }

        if(size_cap_change > 0) {
            this.arr_size = this.arr_size - size_cap_change;
            this.resize(this.arr_capacity - size_cap_change)
        }
    }

    //looks for value and returns first index with that value, -1 if not found
    find(value: number): number {
        for(let i = 0; i < this.arr_size; i++){
            if(this.arr[i] === value){
                return i;
            }
        }

        return -1;
    }
    
    //when you reach min/max capacity, resize to half/double the size
    private resize(capacity: number): void {
        let newArr = new Array(capacity).fill(null);

        for(let i = 0; i <= this.arr_size; i++)
            newArr[i] = this.arr[i];
        
        this.arr = newArr;
        this.arr_capacity = capacity;
    }
    
    //if array size is at full capacity, double the size
    private checkMaxCapacity(): void {
        if(this.arr_size === this.arr_capacity)
            this.resize(this.arr_capacity * 2);

    }

    //if array size is 1/4 of capacity, resize to half
    private checkMinCapacity(): void {
        let allocationPercent = parseFloat((this.arr_size / this.arr_capacity).toFixed(2));
        if(allocationPercent < 0.25)
            this.resize(Math.floor(this.arr_capacity / 2));
        
    }
};