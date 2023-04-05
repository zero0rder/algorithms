/**
 *  HASH TABLE: T = O(1), S = O(n)
 */

type HashNode = {
    key: string;
    value: number | null;
}

export class HashTable {
    table: HashNode[];
    table_size: number = 0;

    constructor(capacity: number = 8) {
        this.table = new Array(capacity).fill({ key: '<empty>', value: null });
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
    set(key: string, value: number){
        let index = this.hash(key);

        //if pair already exists at this index look at the next
        if(this.table[index].key !== '<empty>' && this.table[index].key !== '<tombstone>'){
            while(this.table[index].key !== '<empty>' && this.table[index].key !== '<tombstone>'){
                index++;
            }

            this.table[index] = {key, value};

        } else {
            this.table[index] = {key, value};
        }

        this.table_size++
        this.checkLoadFactor();
    }

    // - check if a specific key exists
    exists(key: string){
        const target = this.hash(key);
        return this.table[target].key !== '<empty>' && this.table[target].key !== '<tombstone>';
    }

    // - retrieve a value from a specific key
    get(key: string){
        let index = this.hash(key);

        if(this.table[index].key !== key){
            while(this.table[index].key !== '<empty>' && this.table[index].key !== '<tombstone>'){
                index++;
            }
            
            if(this.table[index] === undefined)
                return null;
        }

        return this.table[index].value;
    }

    // - remove key/value pair from the table
    remove(key: string){
        const index = this.hash(key);
        this.table[index] = { key: '<tombstone>', value: null };
        this.table_size--;
    }
    
    //if load factor >= 0.6% double the size of table
    private checkLoadFactor(){ 
        const loadFactor = parseFloat((this.table_size / this.table.length).toFixed(2));
        if(loadFactor >= 0.6)
            this.resizeTable(~~(this.table.length * 2));
        
    }

    private resizeTable(size: number){
        const temp = new Array(size).fill({ key: '<empty>', value: null });

        for(let i = 0; i <= this.table.length - 1; i++){
            if(this.table[i].key !== '<empty>' && this.table[i].key !== '<tombstone>')
                temp[i] = this.table[i];
            
        }

        this.table = temp;
    }

}