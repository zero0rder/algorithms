/**
 *  Recursive Stack: T = O(n) - S = ???
 */

 let vector: number[] = []
function recursiveStack(lo: number, hi: number): number {
     if(lo+1 == hi) return 1
     
     let mid = vector[lo]

     if(mid === hi) return 2 * recursiveStack(lo+1, hi-1)

     return recursiveStack(lo, mid) + recursiveStack(mid+1, hi)

 }

 //calculates the score of string S
export function scoreOfParentheses(S: string) {
    let i, n = S.length

    n = Math.max(n, 1)
    // vector.resize(n, 0)
    let stack: string[] = []

    for(i=0; i<n; i++){

        if(S[i] == ')'){
            let t = stack[stack.length-1]
            // vector[t] = i
            stack.pop()
        }

        // else stack.push(i)
    }

    return recursiveStack(0, n-1)
}