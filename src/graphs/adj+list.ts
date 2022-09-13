/**
 *         Adjacency List (SPARSE Graphs) -- O(v+e)
*/

export const adjList = new Map();

function addNode(node: string): void {
    adjList.set(node, []);
}

function addEdge(origin: string, destination: string): void {
    adjList.get(origin).push(destination);
    //adjList.get(destination).push(origin); // ==> assuming an undirected graph
}

export function createGraph(nodes: string[], edges: string[][]){
    nodes.forEach(addNode); // ==> init each node in the graph
    edges.forEach(node => addEdge(node[0], node[1])); // ==> create connection between (x,y) vertices
}

//=> recursive dfs O(v+e)
export function dfs(node: string, visited = new Set<string>()) {
    visited.add(node);
    
    let destinations = adjList.get(node);
    for (let dest of destinations){
        if (!visited.has(dest))
            dfs(dest, visited);

    }
}

//=> iterative dfs w stack - O(v+e)
export function dfsIter(s: string): void {
    const stack = [];
    stack.push(s); // ==> starting vertex

    const visited = new Set<string>();
    visited.add(s);

    while(stack.length > 0){
        let v = stack[stack.length-1]; //peek
        let adj = adjList.get(v);

        for (let n of adj){
            // ==> perform any needed tasks on adjacent nodes here!
            if(!visited.has(n)){
                // ==> or here...
                stack.push(n)
                visited.add(n);
            }
        }

        stack.pop();
    }
}

//=> O(n + m)
export function bfs(root: string){
    const visited = new Set<string>();
    const queue = [];

    visited.add(root);
    console.log(root);

    for(let n of adjList.keys()){ //==> added for disconnected graphs to work!
        if(!visited.has(n))
            queue.push(n);

        while(queue.length > 0){
            let node = queue.shift();
            let adj = adjList.get(node);

            for(let v of adj){
                if(!visited.has(v)){
                    visited.add(v);
                    queue.push(v);
                    console.log(v);
                }
            }
        }
    }
}

//=> find number of (dis)connected comps (dfs) - O(v+e)
export function numOfConnectedComps(nodes: string[]): number {
    const count = nodes.length;
    const visited = new Set<string>();
    let connectedComps = 0;

    for (let i=0; i < count; i++){
        if(!visited.has(nodes[i])){
            // const rootNode = nodes[i]; ==> starting node for each connectedComp
            dfs(nodes[i], visited);
            connectedComps++;
        }
    }

    return connectedComps;
}

//=> Each vertex appears before all the vertices it point to
export function stronglyConnectedComps(nodes: string[]){
    const finishingTime: string[] = [];
    const visited = new Set<string>()

    for(let i=0; i < nodes.length; i++){
        if(!visited.has(nodes[i]))
            stronglyConnectedUtil(nodes[i], finishingTime, visited);

    }

    //reverse the graph
    const reverseGraph = reverseGraphUtil(nodes);
    const reverseVisited = new Set<string>();
    const SCC: string[][] = [];
    for(let k=0; k < finishingTime.length; k++){
        const adjNodes = reverseGraph.get(finishingTime[k]);
        const _scc: string[] = [];

        if(adjNodes !== undefined){
            for(let adj of adjNodes){
                if(!reverseVisited.has(adj)){
                    stronglyConnectedUtil(finishingTime[k], _scc, reverseVisited);
                    SCC.push(_scc);
                }
            }
        }
    }

    return SCC;
}

function reverseGraphUtil(nodes: string[]): Map<string, string[]>{
    const tempMap = new Map<string, string[]>();
    for(let i=0; i < nodes.length; i++){
        tempMap.set(nodes[i], []);
    }

    for(let j=0; j < nodes.length; j++){
        let adjNodes = adjList.get(nodes[j]);
        for(let n of adjNodes){
            tempMap.get(n)?.push(nodes[j]);
        }
    }
    
    return tempMap
}

function stronglyConnectedUtil(source: string, stack: string[], visited: Set<string>){
    const adjV = adjList.get(source);
    visited.add(source);

    if(adjV !== undefined){
        for(let v of adjV){
            if(!visited.has(v)){
                stronglyConnectedUtil(v, stack, visited);
            }
        }
    }

    //store finishing times in descending order
    stack.push(source)
}

//=> check for a cycle in a graph -> 'back-edges' are key to finding cycles
export function isCyclic(source: string, visited = new Set<string>(),stack: string[] = []): boolean {
    visited.add(source);
    stack.push(source);

    const adjV = adjList.get(source);
    for(let v of adjV){
        if(v === source){
            console.log(`cycle from ${v} to back to ${source}`);
            return true;
        }

        if(!visited.has(v)){
            return isCyclic(v, visited, stack);

        } else {
            //=> vertex is visited which makes it a backedge violating DAG properties!
            if(stack.includes(v)){
                console.log(`cycle from node ${source} going back to ${v}`);
                return true;
            }
        }
    }

    //=> finishing time
    return false;
}

//=> each vertex appears before all the vertices it points to
//=> dfs algo --> Concentrate your action at the finishing time! 
export function topologicalSort(source: string): string[] {
    const sortedVertices: string[] = [];
    topologicalSortUtil(source, sortedVertices);
    return sortedVertices;
}

function topologicalSortUtil(source: string, list: string[], visited = new Set<string>()): void {
    const adj = adjList.get(source);
    visited.add(source);
    
    for(let n of adj){
        if(!visited.has(n))
            topologicalSortUtil(n, list, visited);
    }
    
    //=> finishing time...
    list.unshift(source);
}


/**
 * 
 *       Weighted Graphs with Adjacency Lists (Sparse)
 *       In the adjacency list, each element in the list will have two values.
 *       The first one is the destination node, and the second one is the weight between these two nodes.
 * 
 */