class PriorityQueue<T extends { priority: number }> {
  public readonly  queue: T[] = []

  public insert(element: T): void {
    this.queue.push(element);

    let index = this.queue.length - 1;
    let parentIndex = this.getParentIndex(index);

    while (index > 0 && this.queue[parentIndex].priority < this.queue[index].priority) {
      this.swapNodes(index, parentIndex);
      index = parentIndex;
      parentIndex = this.getParentIndex(index);
    }
  }

  maximum(): T  | null {
    return this.queue[0] ?? null
  }

  extractMax(): T | null {
    if (!this.queue.length) {
      return null
    }

    const queueRootNode = this.queue[0]
    const lastNode = this.queue.pop() as T
    if(this.queue.length > 0) {
      this.queue[0] = lastNode;

      this.maxHeapify(0)
    }

    return queueRootNode
  }

  getParentIndex(childIndex: number): number {
    return Math.floor((childIndex - 1) / 2)
  }

  getLeftChildIndex(parentIndex: number ): number {
    return parentIndex * 2 + 1
  }

  getRightChildIndex(parentIndex: number ): number {
    return parentIndex * 2 + 2
  }

  swapNodes(indexA: number, indexB: number): void {
    [this.queue[indexA], this.queue[indexB]] = [this.queue[indexB], this.queue[indexA]]
  }

  maxHeapify(startNodeIndex: number) {
    let leftChildIndex = this.getLeftChildIndex(startNodeIndex);
    let rightChildIndex = this.getRightChildIndex(startNodeIndex);
    let largestNodeIndex = startNodeIndex;

    if (
      leftChildIndex < this.queue.length &&
      this.queue[leftChildIndex].priority > this.queue[startNodeIndex].priority) {
        largestNodeIndex = leftChildIndex;
    }

    if (
      rightChildIndex < this.queue.length &&
      this.queue[rightChildIndex].priority > this.queue[largestNodeIndex].priority) {
        largestNodeIndex = rightChildIndex;
    }

    if (largestNodeIndex != startNodeIndex) {

      this.swapNodes(startNodeIndex, largestNodeIndex)

      this.maxHeapify(largestNodeIndex);
    }
  }
}

const logTime = (operation: string, callback: () => void) => {
  const startTime = Date.now()
  console.log(`${operation} is started`)

  callback()

  const finishTime = Date.now() - startTime;
  console.log(`${operation} is ended. Finished in ${finishTime} ms`)
}

const priorityQueue = new PriorityQueue()
let jobs: {priority: number }[]

logTime('create jobs array', () => {
   jobs = Array(10_000)
   .fill(1)
   .map((_, index) => ({ priority: Math.floor(Math.random() * 10), id: index }))
})

logTime('add jobs in queue', () => {
  jobs.forEach(job => {
    priorityQueue.insert(job)
  })
})

logTime('run jobs', () => {
  while (!!priorityQueue.maximum()) {
    const job = priorityQueue.extractMax()

    console.log('run job with priority: ', job)
  }
})
