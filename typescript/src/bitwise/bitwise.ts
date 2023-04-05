//https://www.topcoder.com/thrive/articles/A%20bit%20of%20fun:%20fun%20with%20bits
//https://www.learncpp.com/cpp-tutorial/bit-manipulation-with-bitwise-operators-and-bit-masks/
//https://graphics.stanford.edu/~seander/bithacks.html#BitReverseObvious

//-> convert decimal to binary
export function dec2bin(dec: number){
    return (dec >>> 0).toString(2); //base-2
}

//-> convert binary to decimal
export function bin2dec(bin: string){
    return parseInt(bin, 2) //base10
}

//-> convert binary to hexadecimal
export function bin2hex(bin: string){
    return parseInt(bin, 2).toString(16) //base-16 
}

//-> convert binary to decimal manually:
//-----------------------------
// Here's whats happening...
//1. Starting from the left, double your previous total and add the current digit
//2. Double your current total and add the next leftmost digit
//3. Repeat the previous step until you have gone through the entire string
// ----------------------------
// 101010
// 101010 => 0 + 1 == 1
// 1 * 2 + 0 == 2
// 2 * 2 + 1 == 5
// 5 * 2 + 0 == 10
// 10 * 2 + 1 == 21
// 21 * 2 + 0 == 42
export function toDecimal(v: string | number){
    let binary: string[], decimal = 0

    typeof v === 'string' ? binary = v.split('') : binary = v.toString().split('')
    
    for(let i = 0; i < binary.length; i++) {
        decimal = (decimal * 2) + parseInt(binary[i])
    }

    return decimal
}

//-> EACH NUMBER XOR'D AGAINST ITSELF RETURNS ZERO - Every dupe will be zeroed out and only leave the UNIQUE one...
// Given numbers after each XOR
// 010(2)
// 001(1) 011
// 100(4) 111
// 101(5) 010
// 010(2) 000
// 100(4) 100
// 001(1) 101 ------final answer === 5
export function filterDupes (a: number[]){
    let result = 0;
    let len = a.length;

    for (let i = 0; i < len; i++)
    {
        result ^= a[i]; // ^= saves the resulting XOR operation to the result variable
    }

    return result;
}

export function textToBinary(str: string){
    let len = str.length;
    let out = '';
    
    for(let i=0; i < len; i++){
        out += str[i].charCodeAt(0).toString(2) + ' ';
    }
    
    return out;
}

export function binaryToText(bin: string){
    let binA = bin.split(' ');
    
    //convert from binary to decimals, then to characters. 
    return binA.map((el) => String.fromCharCode(parseInt(el, 2))).join('');
}

//-> Can XOR chars in a string to (find diff)erence between 2 strings O(n)!!
//-> Currently strings must be same size.
export function findDiff(s1: string, s2: string){
    let len = s2.length, ch = parseInt(textToBinary(s2.charAt(len)));
    
    for(let i = 0; i < len; i++){
        ch ^= parseInt(textToBinary(s1.charAt(i)));
        ch ^= parseInt(textToBinary(s2.charAt(i)));
    }
    
    return binaryToText(`${ch}`);
}

//https://bits.stephan-brumme.com/basics.html
// These basic algorithms rely on a mask representing the position of the bit to be changed.
// These masks are created by left shifting 1

export function getBit(x: number, pos: number){
    return ((x & (1 << pos)) !== 0)
}

export function setBit(x: number, pos: number){
    return x | (1 << pos)
}

export function clearBit(x: number, pos: number){
    return x & ~(1 << pos)
}

export function clearMSBthruI(x: number, pos: number){
    let mask = (1 << pos) - 1 //-> subtract 1 gives us a sequence of zeros followed by 'pos' 1s
    return x & mask //-> leaves just the last 'pos' bits
}

export function clearBitsIthru0(x: number, pos: number){
    //-> take sequence of 1s (-1), then shift left (pos + 1) bits
    //-> the result gives us a sequence of 1s in MSBs followed by (pos + 1) zeroes
    let mask = (-1 << (pos + 1))
    return x & mask
}

export function updateBit(x: number, pos: number, state: number){
    //-> to set bit at 'pos' to 'state, first clear bit a position 'pos' using a mask
    //-> then shift the value 'state' left by 'pos' bits, creating a number with 'pos' bit set to 'state' and all others to 0s
    //-> OR the two numbers, updating the 'pos' bit if 'state' === 1 and leaving as 0 otherwise 
    let val = state ? 1 : 0, mask = ~(1 << pos)
    return (x & mask) | (val << pos)
}

export function modifyBit(x: number, pos: number, newState: number){
    let mask = 1 << pos, state = newState //relies on true=1,false=0
    return (x & ~mask) | (-state & mask)
}

export function flipBit(x: number, pos: number){
    return x ^ (1 << pos)
}

export function isBitSet(x: number, pos: number){
    x >>= pos //arithmetic right shift, fills in new bits w/ value of signed bit
    return (x & 1) != 0
}

export function lowestBitNotSet(x: number){
    return ~x & (x + 1)
}

export function lowestBitNotSetSimple(x: number){
    //to be consistent with lowestBitNotSet
    if(x == ~0)
        return 0

    //shift right until finding zero
    let result = 1
    while((x & result) != 0){
        result <<= 1
    }

    return result

}

//Brian Kernighan's method goes through as many iterations as there are set bits. 
//So if we have a 32-bit word with only the high bit set, then it will only go once through the loop
export function countBitsSet(v: number){
    let c: number //accumulates the total bits set in v

    for(c = 0; c < v; c++){
        v &= v - 1; // clear the least significant bit set
    }

    return c
}

export function reverseBits(v: number){
    let t = v.toString(2).split(''), str_len = t.length
    
    //-> converting to an 8-bit unsigned int
    for (let i = 0; i < 8 - str_len; i++) {
        t.unshift('0')
    }
    
    return parseInt(t.reverse().join(''), 2)
}


//SWAP BITS
// # 0 XOR 0 → 0
// # 0 XOR 1 → 1
// # 1 XOR 0 → 1
// # 1 XOR 1 → 0
// # --------------
// # That means XORing any bit with itself always gives zero: y XOR y → 0.
// # Moreover, XORing any bit with zero always keeps the bit in its current state: y XOR 0 → 0 XOR y → y.
// # Now it follows: a XOR b XOR a → b.
// # ---------------
// # a*new = a XOR b
// # bswapped = b XOR a*new = b XOR (a XOR b) = a
// # aswapped = a*new XOR bswapped = (a XOR b) XOR a = b
export function swapXor(x: number, y: number){
    x ^= y
    y ^= x
    x ^= y
}