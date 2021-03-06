import {appReducer, isAppInitialized, setAppError, setAppStatus} from '../reducers'
import {InitialAppStateType} from '../reducers/appReducer'
import {FAILED_INITIALIZED, SUCCESS_INITIALIZED} from '../../constans'

let startState: InitialAppStateType

beforeEach(() => {
    startState = {
        isInitialized: FAILED_INITIALIZED,
        appStatus: 'idle',
        error: '',
    }
})

describe('app', () => {

    test('loading should be changed', () => {
        const endState = appReducer(startState, setAppStatus({appStatus: 'successful'}))

        expect(startState.appStatus).toBe('idle')
        expect(endState.appStatus).toBe('successful')
    })

    test('set app error', () => {
        const endState = appReducer(startState, setAppError({error: 'error'}))

        expect(startState.error).toBe('')
        expect(endState.error).toBe('error')
    })

    test('set app initialize', () => {
        const endState = appReducer(startState, isAppInitialized({isInitialized: SUCCESS_INITIALIZED}))

        expect(startState.isInitialized).toBeFalsy()
        expect(endState.isInitialized).toBeTruthy()
    })
})

