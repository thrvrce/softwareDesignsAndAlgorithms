import { IWeightedGraph } from "./IWeightedGraph";
import { Vertex } from "./Vertex";

export class WeightedGraph implements IWeightedGraph {
  public readonly graph = new Map<string, Map<string, number>>

  public addVertex(vertex: Vertex): void {
    if(!this.graph.has(vertex.key)) {
      this.graph.set(vertex.key, new Map())
    }
  }

  public addEdge(startVertex: Vertex, endVertex: Vertex, weight: number): void {
    const startVertexAdj = this.graph.get(startVertex.key);
    const endVertexAdj = this.graph.get(endVertex.key);

    if(!startVertexAdj) {
      throw new Error(`vertex ${startVertex.key} doesn't exist in graph`)
    }

    if(!endVertexAdj) {
      throw new Error(`vertex ${endVertex.key} doesn't exist in graph`)
    }

    startVertexAdj.set(endVertex.key, weight)
    endVertexAdj.set(startVertex.key, weight)
  }
}