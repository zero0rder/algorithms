/**
 *         Adjacency Matrix (DENSE Graphs) - O(N^2)
*/

export class Vertex {
    value: string
    wasVisited: boolean = false;

    constructor(val: string){
        this.value = val;
    }
}

export class Graph {
    listOfVertices: Vertex[] = [];
    adjMatrix: number[][] = [];
    numOfNodes: number = 0;

    constructor(num: number) {
        //Adj. Matrix represents the edges connecting the vertices
        for (let r=0; r < num; r++){  // first loop = rows
            this.adjMatrix[r] = [];

            for(let c=0; c < num; c++){ // second loop = columns
                // init to all zeroes
                this.adjMatrix[r][c] = 0;
            }
        }
    }

    addVertex(val: string){
        this.listOfVertices[this.numOfNodes++] = new Vertex(val);
    }

    addEdge(origin: number, destination: number): void {
        this.adjMatrix[origin][destination] = 1;
        this.adjMatrix[destination][origin] = 1;
    }

    removeEdge(origin: number, destination: number): void {
        if (this.adjMatrix[origin][destination] === 0){
            console.log(`No edge exists between vertex ${origin} and ${destination}.`);

        } else {
            this.adjMatrix[origin][destination] = 0;
            this.adjMatrix[destination][origin] = 0;
        }
    }

    containsEdge(origin: number, destination: number): boolean {
        if(this.adjMatrix[origin][destination] > 0)
            return true;

        return false
    }

    dfsRecurse(x: number){
        this.listOfVertices[x].wasVisited = true;
        this.printVertex(x);

        for(let y = 0; y < this.numOfNodes; y++){
            if(this.adjMatrix[x][y] === 1 && this.listOfVertices[y].wasVisited === false){
                this.dfsRecurse(y);
            }
        }
    }
    
    dfsIter(r: number){
        const stack: number[] = [r];
        this.listOfVertices[r].wasVisited = true;
        this.printVertex(r);

        while(stack.length > 0){
            let v = this.getAdjUnvisitedVertex(stack[stack.length - 1]);

            if(v === -1){
                stack.pop(); // if no adjacent unvisited nodes, remove current vertex from stack
            } else {
                this.listOfVertices[v].wasVisited = true;
                this.printVertex(v);
                stack.push(v);
            }
        }
    }

    //O(v+e)
    bfs(r: number){
        const queue = [r];
        this.listOfVertices[r].wasVisited = true;
        this.printVertex(r);

        for(let j=0; j < this.numOfNodes; j++){
            if(this.listOfVertices[j].wasVisited !== true)
                queue.push(j);

            while(queue.length > 0){
                const v = queue.shift() ?? 0;
                const adj = this.getAdjUnvisitedVertex(v);
                if(adj !== -1){
                    this.listOfVertices[adj].wasVisited = true;
                    queue.push(adj);
                    this.printVertex(adj);
                }
            }
        }
    }

    getAdjUnvisitedVertex(v: number){ // => searching row 'v' for adj nodes 'j'
        for(let j = 0; j < this.numOfNodes; j++){
            if(this.adjMatrix[v][j] === 1 && this.listOfVertices[j].wasVisited === false){
                return j; // => return column index for adj node 'j' of row 'v' that creates the edge
            }
        }

        return -1;

    }

    printVertex(v: number){
        console.log(`${this.listOfVertices[v].value}`);
    }

    length(): number {
        return this.numOfNodes;
    }

}


/**
 *                              --[ Weighted Adjacency Matrix ]--
 * 
 *     To store weighted graph using adjacency matrix form, we call the matrix as cost matrix.
 *     Here each cell at position M[i, j] is holding the weight from edge i to j. If the edge is not present, 
 *     then it will be infinity. For same node, it will be 0
 */

export class Graph_Weighted extends Graph {

    constructor(num: number){
        super(num);

        //Adj. Matrix represents the edges connecting the vertices
        for (let r=0; r < num; r++){
            this.adjMatrix[r] = [];

            for(let c=0; c < num; c++){      
                if(r === c){
                    this.adjMatrix[r][c] = 0;
                } else {
                    this.adjMatrix[r][c] = Infinity;
                }
            }
        }
    }

    addEdge(origin: number, destination: number, weight?: number): void {
        if(weight === undefined){
            super.addEdge(origin, destination);
        } else {
            this.adjMatrix[origin][destination] = weight;
            this.adjMatrix[destination][origin] = weight;
        }
    }
}