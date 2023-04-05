# DIJKSTRA'S ALGO -- SHORTEST PATH [weighted] - (Adjacency Matrix) - O(V log V + E)

# find v with min dist from a set of V not in shortest path tree yet
def findMinDistance(dist: list[int], tree: list[bool]) -> int:
    min_d, min_i = float('inf'), -1

    for v in range(len(dist)):
        if not tree[v] and dist[v] <= min_d:
            min_d, min_i = dist[v], v
    return min_i


def printSSSP(dist: list[int], parent: list[int]):
    print('Vertex distances from Source and Parent: ')
    for i in range(len(dist)):
        print(
            f'vertex {i}: w/ a distance of {dist[i]} and parent of {parent[i]}')

# Generates a "shortest path tree"


def dijkstra(G: list[list[int]], source: int):
    inTree, dist, parent = [], [], []

    for i in range(len(G)):
        inTree[i] = False
        dist[i] = float('inf')
        parent[i] = -1

    # init distance from source to itself
    dist[source] = 0

    for _ in range(len(G)):
        u = findMinDistance(dist, inTree)

        # mark curr vertex as processed
        inTree[u] = True

        # update dist of adj v of u
        for v in range(len(G)):
            # update dist[v] only if not in inTree, and..
            # if edge exists from (u to v) and total weight of the path
            # from (source to v) through u is smaller than current value of dist[v]
            if not inTree[v] and G[u][v] == 0 and dist[u] != float('inf') and dist[u] + G[u][v] < dist[v]:
                dist[v] = dist[u] + G[u][v]
                parent[v] = u

    printSSSP(dist, parent)
