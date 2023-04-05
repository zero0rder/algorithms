/**
 *      DIJKSTRA'S ALGO -- SHORTEST PATH [weighted] - (Adjacency Matrix) - O(V log V + E)
 * 
*/

//==> Generates a "shortest path tree"
export function dijkstra(g: number[][], source: number): void {
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

        // Mark the selected vertex as processed (inTree)
        inTree[u] = true;

        // Update distance value of the adjacent vertices of the selected vertex above.
        for (let v = 0; v < length; v++) {
            // Update distance[v] only if not present within inTree, plus there is an edge from u to v, and total weight of path
            // from source to v through u is smaller than current value of distance[v]
            if (!inTree[v] && g[u][v] !== 0 && distance[u] !== Infinity && (distance[u] + g[u][v]) < distance[v]) {
                distance[v] = distance[u] + g[u][v];
                parent[v] = u;
            }
        }
    }

    printSSSPTree(distance, parent);

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

function printSSSPTree(d: number[], p: number[]): void {
    console.log('Vertex Distances from Source and Parent: ');
    for (let i = 0; i < d.length; i++) {
        console.log(`vertex ${i}: { distance: ${d[i]}, parent: ${p[i]} }`);
    }
}