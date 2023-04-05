# QUICKSORT:  T = O(n log(n)), S = O(1) -> [T = O(n^2) worst-case]
def quick_sort(A: list[int], left: int, right: int):
    if left >= right:
        return

    pivot = partition(A, left, right)
    quick_sort(A, left, pivot - 1)
    quick_sort(A, pivot + 1, right)


def quick_sort_loop(A: list[int]):
    stack = [(0, len(A)-1)]

    while stack:
        start, end = stack.pop()
        pvt = partition(A, start, end)

        if (pvt - 1) > start:
            stack.append((start, pvt-1))
        if (pvt + 1) < end:
            stack.append((pvt+1, end))

    return A


def partition(A: list[int], left: int, right: int):
    pvt = right
    stop = left - 1
    j = left

    while j <= right:
        if A[j] < A[pvt]:
            stop += 1
            A[stop], A[j] = A[j], A[stop]
        j += 1

    A[stop + 1], A[pvt] = A[pvt], A[stop + 1]

    return stop + 1


arr = [22, 2, 99, 1, 34, 13, 4, 5, 60, 77, 18]
print(arr)
# quick_sort(arr, 0, len(arr)-1)
print(quick_sort_loop(arr))
