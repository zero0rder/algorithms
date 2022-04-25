//Idea: store a pointer to dynamically allocated array and replace it with a newly-allocated array as needed.
export class Vector {
    arr: number[] | null[] = new Array(10).fill(null);
    arr_capacity: number = 10;
    arr_size: number = 0;

    constructor(){}

    //number of items, default = 0
    size(){
        return this.arr_size;
    }

    //number of items it can hold, default = 10
    capacity(){
        return this.arr_capacity;
    }

    isEmpty(){
        return this.arr_size === 0 ? true : false;
    }

    //returns item at given index, blows up if index out of bounds
    at(index: number){
        if(index < 0 || index >= this.arr_capacity)
            return console.log('out of range!'); //throw new RangeError('index out of range.')

        return this.arr[index];
    }

    push(item: number){
        if(this.arr_size === this.arr_capacity)
            this.resize(this.arr_capacity * 2);
        
        this.arr[this.arr_size] = item;
        this.arr_size++;
    }
    
    //inserts item at index, shifts that index's value and trailing elements to the right
    insert(value: number, index: number){
        if(index < 0 || index >= this.arr_capacity)
            return console.log('out of range!');

        if(this.arr_size === this.arr_capacity)
            this.resize(this.arr_capacity * 2);
        
        if(this.arr[index] === null){
            this.arr[index] = value;

        } else {
            for(let j = this.arr_size - 1 ; j >= index; j--){
                if(j === index){
                    this.arr[j + 1] = this.arr[j];
                    this.arr[j] = value;
                } else {
                    this.arr[j + 1] = this.arr[j];
                }
            }
        }
        
        this.arr_size++;
    }

    prepend(item: number){
        this.insert(item, 0);
    }

    //remove from end, return value
    pop(){
        if(this.isEmpty())
            return console.log('empty vector');

        let temp = this.arr[this.arr_size - 1];
        this.arr[this.arr_size - 1] = null;
        this.arr_size--;

        return temp;
    }

    //delete item at index, shifting all trailing elements left
    delete(index: number){
        if(index < 0 || index >= this.arr_capacity)
            return console.log('out of range!');

        if (this.arr[index] === null)
            return console.log(`no item exists at index ${index}.`);

        for(let j = index; j <= this.arr_size - 1; j++){
            if(this.arr[j + 1] === undefined){
                this.arr[j] = null;
            } else {
                this.arr[j] = this.arr[j + 1];
            }
        }

        this.arr_size--;
    }

    //looks for value and removes index holding it (even if in multiple places)
    //changes size/capacity of array
    //todo: implement remove method
    remove(value: number){}

    //looks for value and returns first index with that value, -1 if not found
    find(value: number){
        for(let i = 0; i < this.arr_size; i++){
            if(this.arr[i] === value){
                return i;
            }
        }

        return -1;
    }
    
    //when you reach capacity, resize to double the size
    //todo: when popping an item, if size is 1/4 of capacity, resize to half
    private resize(capacity: number){
        let newArr = new Array(capacity).fill(null);

        for(let i = 0; i <= this.arr_size; i++)
            newArr[i] = this.arr[i];
        
        this.arr = newArr;
        this.arr_capacity = capacity;
    }
};
