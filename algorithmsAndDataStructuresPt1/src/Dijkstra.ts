import { Vertex } from "./Vertex";

interface Path {
  path: string[];
  distance: number;
}

interface IDijkstra<T> {
  findShortestPath(vertex1: T, vertex2: T): Path;
  findAllShortestPaths(vertex: T): Map<string, Path>;
}

export class Dijkstra implements IDijkstra<Vertex> {
  constructor(private readonly graph: Map<string, Map<string, number>>) {}

  findShortestPath(vertex1: Vertex, vertex2: Vertex): Path {
    if(vertex1.key === vertex2.key) {
      return {path: [vertex2.key], distance: 0}
    }

    const distances = this.findAllShortestPaths(vertex1);
    const path = distances.get(vertex2.key);
    if (!path) {
      throw new Error("distance was not found");
    }

    return path;
  }

  findAllShortestPaths(vertex: Vertex): Map<string, Path> {
    const startVertexKey = vertex.key;

    const distances = new Map<string, Path>();
    const visited = new Set<string>();
    const queue: string[] = [];

    for (const vertexKey of this.graph.keys()) {
      distances.set(vertexKey, { path: [], distance: Infinity });
    }

    distances.set(startVertexKey, { path: [startVertexKey], distance: 0 });

    queue.push(startVertexKey);

    while (queue.length) {
      const currentVertexKey = queue.shift() ?? "";

      if (visited.has(currentVertexKey)) continue;

      visited.add(currentVertexKey);

      const currentVertexMap = this.graph.get(currentVertexKey);

      for (const nextVertexKey of currentVertexMap!.keys()) {
        const distance = currentVertexMap!.get(nextVertexKey) || 0;
        const totalDistanceToNextVertexKey =
          (distances.get(currentVertexKey)?.distance ?? 0) + distance;

        if (
          totalDistanceToNextVertexKey <
          (distances.get(nextVertexKey)?.distance ?? Infinity)
        ) {
          queue.push(nextVertexKey);

          const pathToCurVertex = distances.get(currentVertexKey)?.path ?? [];
          distances.set(nextVertexKey, {
            path: [...pathToCurVertex, nextVertexKey],
            distance: totalDistanceToNextVertexKey,
          });
        }
      }
    }

    distances.delete(startVertexKey)

    return distances;
  }
}
