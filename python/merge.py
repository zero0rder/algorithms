# MERGESORT:  T = O(n log(n)), S = O(n)
def merge(left: list[int], right: list[int]) -> list[int]:
    aux = []
    while left and right:
        if left[0] < right[0]:
            aux.append(left.pop(0))
        else:
            aux.append(right.pop(0))
    return aux + left + right


def mergeSort(A: list[int]) -> list[int]:
    if len(A) <= 1:
        return A
    return merge(mergeSort(A[0:len(A)//2]), mergeSort(A[len(A)//2:]))


arr = [22, 2, 99, 1, 34, 13, 4, 5, 60, 77, 18]
print(mergeSort(arr))
