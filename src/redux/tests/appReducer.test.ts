import {appReducer, InitialAppStateType, setIsLoadingAC} from "../reducers/appReducer";

let startState: InitialAppStateType

beforeEach(() => {
    startState = {
        loading: 'idle'
    }
})

test('loading should be changed', () => {
    const endState = appReducer(startState, setIsLoadingAC('successful'))

    expect(startState.loading).toBe('idle')
    expect(endState.loading).toBe('successful')
})