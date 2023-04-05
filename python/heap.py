# MAX HEAP: T = O(log(n)), S = O(n) -- HEAP SORT: T = O(n log(n)), S = O(1)
class MaxHeap:
    def __init__(self, h: list[int]) -> None:
        self.heap: list[int] = self.heapify(h)
        self.size = len(h) if len(h) > 0 else 0
        self.maxSize = len(h) if len(h) > 0 else 12

    def insert(self, v: int):
        if v > self.maxSize:
            return -1

        self.size += 1
        self.heap[len(self.heap)-1] = v
        self.siftUp(len(self.heap)-1)

    def siftUp(self, i: int):
        while i > 0 and self.heap[self.__getParent(i)] < self.heap[i]:
            self.heap[i], self.heap[self.__getParent(
                i)] = self.heap[self.__getParent(i)], self.heap[i]
            i = self.__getParent(i)

    def siftDown(self, i: int, ckpt=float('inf')):
        maxIndex = i
        left = self.__getLeftChild(i)
        right = self.__getRightChild(i)

        if left >= ckpt or right >= ckpt:
            return

        if left < self.size and self.heap[left] > self.heap[i]:
            maxIndex = left
        if right < self.size and self.heap[right] > self.heap[i]:
            if left < self.size and self.heap[right] > self.heap[left]:
                maxIndex = right

        if maxIndex != i:
            self.heap[maxIndex], self.heap[i] = self.heap[i], self.heap[maxIndex]
            self.siftDown(maxIndex, ckpt)

    def extractMax(self):
        res = self.heap[0]
        self.heap[0], self.heap[self.size -
                                1] = self.heap[self.size-1], self.heap[0]
        self.size -= 1
        self.heap.pop()
        self.siftDown(0)
        return res

    def remove(self, i: int):
        self.heap[i] = float('inf')
        self.siftUp(i)
        self.extractMax()

    def heapify(self, A: list[int]):
        self.heap = A
        self.size = len(A)

        for i in range(len(A)//2-1, -1, -1):
            self.siftDown(i)

        return self.heap

    def heapSort(self):
        if not self.heap:
            return

        for i in range(len(self.heap)-1, -1, -1):
            self.heap[0], self.heap[i] = self.heap[i], self.heap[0]
            self.siftDown(0, i)

    def __getParent(self, i: int):
        return (i-1)//2

    def __getRightChild(self, i: int):
        return (2*i)+2

    def __getLeftChild(self, i: int):
        return (2*i)+1


arr = [22, 2, 99, 1, 34, 13, 4, 5, 60, 77, 18]
myheap = MaxHeap(arr)
print(myheap.heap)
print(myheap.heapSort())
print(myheap.heap)
