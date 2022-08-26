/**
 *      MINIMUM SPANNING TREE -- PRIM/KRUSKAL ALGOS (DAG) -- O(E LOG V)
 * 
 */

export function primsMST(g: number[][], source: number){
    const inTree: boolean[] = [];
    const distance: number[] = [];
    const parent: number[] = [];

    const length = g.length;
    for (let i = 0; i < length; i++) {
        inTree[i] = false;
        distance[i] = Infinity;
        parent[i] = -1;
    };

    //distance of source vertex from itself is always 0
    distance[source] = 0;

    //find shortest path for all vertices
    for (let j = 0; j < length; j++) {

        // Select the minimum distance vertex from the set of vertices not yet
        // processed inTree. 'u' is always equal to source in first iteration.
        let u = minDistance(distance, inTree);

        // Mark the selected vertex as processed
        inTree[u] = true;

        // Update distance value of the adjacent vertices of the selected vertex.
        for (let v = 0; v < length; v++) {
            // Update distance[v] only if not within inTree, plus there is an edge from u to v, and distance
            // from current vertex to v is smaller than it's current recorded value of distance[v]
            if (!inTree[v] && g[u][v] !== 0 && distance[u] !== Infinity && g[u][v] < distance[v]) {
                distance[v] = g[u][v];
                parent[v] = u;
            }
        }
    }

    printMST(distance, parent);

}

//=> find the vertex with minimum distance from the set of vertices not yet included in shortest path tree
function minDistance(dist: number[], tree: boolean[]): number {
    let min = Infinity;
    let min_index = -1;

    for (let v = 0; v < dist.length; v++) {
        if (tree[v] === false && dist[v] <= min) {
            min = dist[v];
            min_index = v;
        }
    }

    return min_index;
}

function printMST(d: number[], p: number[]): void {
    console.log('Minimum Spanning Tree: ');
    for (let i = 0; i < d.length; i++) {
        console.log(`vertex ${i}: { distance: ${d[i]}, parent: ${p[i]} }`);
    }
}
