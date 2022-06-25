/**
 *  ROTATE 90-DEGREES "In-place" (clockwise|counter-clockwise): T = O(n^2), S = O(1)
*/

export const rotateMatixCW = (m: number[][]) => {
    let len = m.length;

    for(let i = 0; i < Math.ceil(len / 2); i++){
        for(let j = i; j < (len - i) - 1; j++){
            let temp = m[i][j];

            m[i][j] = m[len - 1 - j][i];
            m[len - 1 - j][i] = m[len - 1 - i][len - 1 - j];
            m[len - 1 - i][len - 1 - j] = m[j][len - 1 - i];
            m[j][len - 1 - i] = temp;
        }
    }

    return m;
}

export const rotateMatixCCW = (m: number[][]) => {
    let len = m.length;

    for(let i = 0; i < Math.ceil(len / 2); i++){
        for (let j = i; j < (len - i) - 1; j++){
            let temp = m[i][j];

            m[i][j] = m[j][len - 1 - i];
            m[j][len - 1 - i] = m[len - 1 - i][len - 1 - j];
            m[len - 1 - i][len - 1 - j] = m[len - 1 - j][i];
            m[len - 1 - j][i] = temp;
        }
    }

    return m;
}
