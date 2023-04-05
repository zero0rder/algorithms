def permute(n: str, l: int, r: int) -> None:
    if l == r:
        return print(n)
    else:
        i = l
        while i <= r:
            n = swap(n, l, i)  # DO work
            permute(n, l+1, r)  # recur
            n = swap(n, l, i)  # UNDO work
            i += 1


def swap(s: str, l: int, r: int) -> str:
    c = list(s)
    c[l], c[r] = c[r], c[l]
    return ''.join(c)


permute('abc', 0, 2)
