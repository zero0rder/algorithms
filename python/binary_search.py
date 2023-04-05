import math


def bin_recurse(A: list[int], item: int, left: int, right: int) -> int:
    mid = math.floor((left + right) // 2)
    midElem = A[mid]

    if left > right:
        return -1

    if midElem == item:
        return mid

    if midElem > item:
        return bin_recurse(A, item, left, mid - 1)

    if midElem < item:
        return bin_recurse(A, item, mid + 1, right)


def bin_loop(A: list[int], item: int) -> int:
    left, right = 0, len(A)-1

    while left < right:
        mid = math.floor((left + right) // 2)
        elem = A[mid]

        if elem == item:
            return mid

        if elem > item:
            right = mid - 1

        if elem < item:
            left = mid + 1

    return -1


arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
even = [i for i in arr if not i % 2]  # list comprehension
print(bin_loop(arr, 3))
print(bin_recurse(arr, 3, 0, len(arr)-1))
