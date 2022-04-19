import {appReducer, InitialAppStateType, setIsLoadingAC} from "../reducers/appReducer";

let startState: InitialAppStateType

beforeEach(() => {
    startState = {
        isLoading: 'idle',
    }
})

test('loading should be changed', () => {
    const endState = appReducer(startState, setIsLoadingAC('successful'))

    expect(startState.isLoading).toBe('idle')
    expect(endState.isLoading).toBe('successful')
})