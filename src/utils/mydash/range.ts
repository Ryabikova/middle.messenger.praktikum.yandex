export function rangeRight(start, end, step) {
    return range(start, end, step, true);
}

export function range(start, end, step, isRight) {
    if(end === undefined) {
    end = start;
    start = 0;
    }
    step = step === undefined ? (start < end ? 1 : -1) : step;
    let length = Math.max(Math.ceil((end - start) / (step || 1)), 0);
    const res = []; 
    let index = -1
    while (length--) {
    res[isRight ? length : ++index] = start
    start += step;
    }
    return res;	
}