import NP from 'number-precision'
export const updateInput1 = val => ({
    type: 'UPDATE_INPUT1',
    value: val
})
export const updateInput2 = val => ({
    type: 'UPDATE_INPUT2',
    value: val
})
export const updateOperator = val => ({
    type: 'UPDATE_OPERATOR',
    value: val
})
export const updateResult =  () => {
    let state = getState()
    let res
    switch(val.operator){
        case '+':
        res = NP.plus(state.value1, state.value2)
        break;
        case '-':
        res =  NP.minus(state.value1, state.value2)
        break;
        case '*':
        res = NP.times(state.value1, state.value2)
        break;
        case '/':
        res =  NP.divide(state.value1, state.value2)
        break;
    }
    return {
        type: 'UPDATE_RESULT',
        value: res
    }
}