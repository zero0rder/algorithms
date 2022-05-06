export class HashTable {
    table: (string|number)[][];
    table_size: number = 0;

    constructor(capacity: number = 8) {
        this.table = new Array(capacity).fill(['<empty>']);
    }

    // - k=key
    private hash(k: string){
        let hash = 0;

        for(let i = 0; i < k.length; i++){
            hash += k.charCodeAt(i);
        }
        
        return hash % this.table.length;

    }

    // - add value to hash table
    // - linear probing for collision protection
    set(key: string, val: number){
        let index = this.hash(key);
        let flag = this.table[index][0] !== '<empty>' && this.table[index][0] !== '<tombstone>';

        //if pair already exists at this index look at the next
        if(flag){
            while(this.table[index][0] !== '<empty>' && this.table[index][0] !== '<tombstone>'){
                index++;
            }

            this.table[index] = [key, val];

        } else {
            this.table[index] = [key, val];
        }

        this.table_size++
        this.checkLoadFactor();
    }

    // - check if a specific key exists
    exists(key: string){
        let index = this.hash(key);
        return this.table[index][0] !== '<empty>' && this.table[index][0] !== '<tombstone>';
    }

    // - retrieve a value from a specific key
    get(key: string){
        let index = this.hash(key);
        let flag = this.table[index][0] !== '<empty>' && this.table[index][0] !== '<tombstone>';

        if(this.table[index][0] !== key){
            while(flag){
                index++;
            }

            //todo: need ptr to visit every slot guaranteed
            if(index === undefined)
                return 'not available';
        }

        return this.table[index][1];
    }

    // - remove key/value pair from the table
    remove(key: string){
        let index = this.hash(key);
        this.table[index] = ['<tombstone>'];
        this.table_size--;
    }
    
    //if load factor >= 0.6% double the size of table
    private checkLoadFactor(){ 
        let loadFactor = parseFloat((this.table_size / this.table.length).toFixed(2));
        if(loadFactor >= 0.6)
            this.resizeTable(Math.floor(this.table.length * 2));
        
    }

    private resizeTable(size: number){
        let temp = new Array(size).fill(['<empty>']);
        
        //todo: some keys don't exist() or get() values
        for(let i = 0; i <= this.table.length - 1; i++){
            if(this.table[i][0] !== '<empty>' && this.table[i][0] !== '<tombstone>')
                temp[i] = this.table[i];
            
        }

        this.table = temp;
    }

}