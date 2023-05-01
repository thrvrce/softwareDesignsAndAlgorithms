import { Vertex } from "./Vertex";

export interface IWeightedGraph {
  addVertex(vertex: Vertex): void;
  addEdge(startVertex: Vertex, endVertex: Vertex, weight: number): void;
}