import { Vertex } from "./Vertex";

export interface IWeightedGraph {
  readonly graph: Map<string, Map<string, number>>;
  addVertex(vertex: Vertex): void;
  addEdge(startVertex: Vertex, endVertex: Vertex, weight: number): void;
}