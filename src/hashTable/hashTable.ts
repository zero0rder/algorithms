export class HashTable {
    table: (string|number)[][] = new Array(8).fill(null);
    table_size: number = 0;

    constructor() {}

    //k=key, m=size of hash table
    private hash(k: string){
        let hash = 0;

        for(let i = 0; i < k.length; i++){
            hash += k.charCodeAt(i);
        }
        
        return hash % this.table.length;

    }

    // - if key already exists, update value
    //todo: update to use linear probing for collision protection
    set(key: string, val: number){
        let index = this.hash(key);
        this.table[index] = [key, val];
        this.table_size++
    }

    // - check if a specific key exists
    exists(key: string){
        let index = this.hash(key);
        return this.table[index] !== null;
    }

    // - retrieve a value from a specific key
    get(key: string){
        let index = this.hash(key);
        return this.table[index];
    }

    // - remove key/value pair from the table
    remove(key: string){
        let index = this.hash(key);
        this.table[index] === null;
    }

    //if load factor >= 0.6% double the size of table
    private checkLoadFactor(){ 
        let loadFactor = parseFloat((this.table_size / this.table.length).toFixed(2));
        if(loadFactor >= 0.6)
            this.resizeTable(Math.floor(this.table.length * 2));
        
    }

    private resizeTable(size: number){
        let temp = new Array(size).fill(null);

        //may have to re-hash keys
        for(let i = 0; i <= this.table.length; i++)
            temp[i] = this.table[i];
        
        this.table = temp;
    }


}