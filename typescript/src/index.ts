//=> https://www.codingninjas.com/blog/2020/09/05/implementing-dfs-using-adjacency-matrix/
import { _NumsArr, _VertexObj } from './utils'
import { List } from './slinkedList/slinkedList'
import { quickSortRecursive, quicksortIterative } from './sorting/quicksort'
// import { getBit, setBit, dec2bin, clearMSBthruI, clearBitsIthru0 } from './bitwise/bitwise'

let numA = [22,2,99,1,34,13,4,5,60,77,18]
quickSortRecursive(numA, 0, numA.length-1)
console.log(numA)


/**
 *      Linked List
 *  
 *      Patterns:
 *        - reverse linked list 3-pointers
 *        - sentinel node (dummy node)
 *        - fast/slow pointer
 *        - merge linked lists (sorted &n unsorted)
 * 
 */
// const faker = [7,1,5,3,6,4]

// class ListNode {
//     val: number
//     next: ListNode | null
//     constructor(val?: number, next?: ListNode | null) {
//         this.val = (val===undefined ? 0 : val)
//         this.next = (next===undefined ? null : next)
//     }
// }



// let head:ListNode|null=null, c=0, res = null

// while(c < faker.length){
//     console.log(faker[c])
//     if(head){
//         head.next = new ListNode(faker[c])
//     } else {
//         head = new ListNode(faker[c])
//         res = head
//     }

//     head = head.next
//     c++
// }


// console.log('head', JSON.stringify(res))

// while(res){
//     console.log(res.val)
//     head = res.next
// }


// console.log(reorderList(head))

// while(head){
//     console.log(head.val)
//     head = head.next
// }

// function reorderList(head: ListNode | null): void {
//     let slow = findMid(head),
//         //@ts-ignore
//         prev = reverse(slow.next)
//         //@ts-ignore
//         slow.next = null

    
//     let h1 = head, h2 = prev
//     while(h2){
//         //@ts-ignore
//         let temp = h1.next
//         //@ts-ignore
//         h1.next = h2
//         h1 = h2
//         h2 = temp
//     }

// };

// function findMid(head:ListNode|null){
//     let slow = head, fast = head
//     while(fast && fast.next){
//         //@ts-ignore
//         slow = slow.next
//         fast = fast.next.next
//     }

//     return slow
// }

// function reverse(head:ListNode|null):ListNode|null{
//     let curr = head, prev = null

//     while(curr){
//         let forward = curr.next
//         curr.next = prev
//         prev = curr
//         curr = forward
//     }

//     return prev
// }




/**
 *      Bitwise Ops.
 */

let rawBin = 0b1110101110
let rawBin2 = 0b0010111
let binStr = '101010'

// console.log(getBit(rawBin, 4))
// console.log(setBit(rawBin, 4))
// console.log(dec2bin(-120))
// console.log(clearMSBthruI(0b1110101110, 7))

//Brian Kernighan's method goes through as many iterations as there are set bits. 
//So if we have a 32-bit word with only the high bit set, then it will only go once through the loop
function countBitsSet(v: number){
    let c: number //accumulates the total bits set in v

    for(c = 0; c < v; c++){
        v &= v - 1; // clear the least significant bit set
    }

    return c
}

// console.log(countBitsSet(rawBin))

function reverseBits(v: number){
    let t = v.toString(2).split(''), 
        str_len = t.length
    
    //-> converting to an 8-bit unsigned int
    for (let i = 0; i < 8 - str_len; i++) {
        t.unshift('0')
    }
    
    return parseInt(t.reverse().join(''), 2)
}

// console.log(reverseBits(rawBin2), dec2bin(reverseBits(rawBin2)))
// console.log(dec2bin(rawBin2 - 1))




/**
 * 
 *        SANDBOX AREA BELOW !!
 * 
 * 
*/

let str = ['abcabcbb', 'pwwkew', 'bbbbb', 'dvdf' ] //3,3,1,3
// function lengthOfLongestSubstring(s: string): number {
//     const charSet = new Set<string>()
//     let longest = 0
//     let l = 0

//     for(let r=0; r < s.length; r++){
//         while(charSet.has(s[r])){
//             charSet.delete(s[l])
//             l++
//         }

//         charSet.add(s[r])
//         longest = Math.max(longest, (r - l + 1))
//     }

//     return longest
// }

// str.forEach(v => console.log(lengthOfLongestSubstring(v)))

function removeDuplicates(nums: number[]): number {
    if(nums.length === 0) return 0

    let l = 0
    let r = 1

    while(nums[r] !== undefined && nums[r] !== Infinity){

        if(nums[l] === nums[r]){
            let sift = r

            if(nums[sift + 1] === undefined || nums[sift + 1] === Infinity){
                nums[sift] = Infinity
                r++
            }

            while(nums[sift + 1] !== undefined && nums[sift + 1] !== Infinity){
                nums[sift] = nums[sift + 1] 
                nums[sift + 1] = Infinity
                sift++
            }


        } else {
            
            l++
            r++

        }
    }

    console.log(nums)

    return l + 1
}

const tc1 = [1,1,2]
const tc2= [0,0,1,1,1,2,2,3,3,4]


// console.log('removeDupes', removeDuplicates([1,1,1]))
function mySqrt(x: number): number { //=> x = 9
    if(x <= 1) return 1

    let i = 1 //=> i = 4
    let sq = i * i //=> 16

    while(x >= sq){ //=> 9 >= 16
        i++ //=> i = 4
        sq = i * i //=> sq = 16
    }

    return i - 1 //=> 3
}

// console.log('sqRoot', mySqrt(9))



function titleToNumber(columnTitle: string): number {
    let res = 0
    
    for(let i=0;i<columnTitle.length;i++){
        res *= 26
        res += columnTitle[i].charCodeAt(0) - 'A'.charCodeAt(0) + 1
    }
    
    return res
}
// console.log(titleToNumber('AB'))

let mizz = 'newsome'
let slc = mizz.slice(4, 9)
// console.log({slc, arr: Array.from(slc).reverse().join('') , mizz})

//=> Reverse Number/Bits
function rev(x:number){
    let max = 2**31-1, //-> 32 bit constraints
        min = -(2**31),
        res = 0
    
    while(x){
        let d = (x % 10);
        x = ~~(x / 10)

        if(res > ~~(max / 10) || (res === ~~(max / 10) && d >= max % 10)){
            return 0
        }

        if(res < ~~(min / 10) || (res === ~~(min / 10) && d <= min % 10)){
            return 0
        }

        res = (res * 10) + d
        
    }

    return res

}