const defaultState = {
    reservaldata: '',
    value1: 0,
    value2: 0,
    operator: '+',
    result: 43
}

export default (state = defaultState, action) => {
    const newState = JSON.parse(JSON.stringify(state))
    switch(action.type) {
        case 'UPDATE_RESULT':
            newState.result = action.value
            let str = newState.result.toString()
            newState.reservaldata = [...str].reverse().join('')
            return newState
        case 'UPDATE_INPUT1':
            newState.value1 = action.value
            return newState
        case 'UPDATE_INPUT2':
            newState.value2 = action.value
            return newState
        case 'UPDATE_OPERATOR':
            newState.operator = action.value
            return newState
        default:
            return newState
    }
}