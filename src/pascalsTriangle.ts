
//O(n^2) {time} - O(1) {space}
export const pascalsTriangleQuadConst = (num: number) => {
    let C

    //starting from 1 to avoid zeroDivide Error
    for(let n = 1; n < num + 1; n++){
        let a = []
        C = 1 //first element of each row

        for(let k = 1; k < n + 1; k++){
            a.push(C)
            C = (C * (n - k) / k)
        }

        console.log(a)
    }
}

//O(n^2) {time/space}
export const pascalsTriangleQuad = (num: number) => {
    let matrix: number[][] = []

    for(let i = 0; i < num; i++){
        matrix[i] = []
        for(let j = 0; j < num; j++){
            matrix[i][j] = 0
        }
    }

    for(let n = 0; n < num; n++){
        for(let k = 0; k < n + 1; k++){
            
            if(k === 0 || k === n){
                matrix[n][k] = 1
                console.log(matrix)

            } else {
                matrix[n][k] = (matrix[n-1][k-1] + matrix[n-1][k])
                console.log(matrix)
            }
        }
    }
}

//O(n^3) {time}
export const pascalsTriangleCubic = (num: number) => {

    for(let i = 0; i < num; i++){
        let a = []
        //iterating through each val of the row
        for(let j = 0; j < i + 1; j++){
            a.push(factFormula(i, j))
        }
        
        console.log(a)
    }
}

const findFact = (idx: number): number => {
    if(idx === 1 || idx === 0) return 1
    return idx * findFact(idx - 1)
}

//combinations formula
const factFormula = (n: number, k: number): number => {
    return (findFact(n) / (findFact(k) * findFact(n - k)))
}