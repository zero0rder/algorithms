# BUBBLE SORT: T = O(n^2) [search] - S = O(1)
def bubbleSort(A: list[int]):
    for i in range(0, len(A)):
        for j in range(0, len(A)-i-1):
            if A[j] > A[j+1]:
                A[j], A[j+1] = A[j+1], A[j]

    return A


arr = [22, 2, 99, 1, 34, 13, 4, 5, 60, 77, 18]
print(bubbleSort(arr))
