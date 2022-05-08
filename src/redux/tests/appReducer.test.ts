import {appReducer, InitialAppStateType, isAppInitialized, setAppError, setAppStatus,} from '../reducers/appReducer';

let startState: InitialAppStateType;

beforeEach(() => {
    startState = {
        isInitialized: false,
        status: 'idle',
        error: '',
    };
});

describe('app', () => {

    test('loading should be changed', () => {
        const endState = appReducer(startState, setAppStatus({status: 'successful'}));

        expect(startState.status).toBe('idle');
        expect(endState.status).toBe('successful');
    });

    test('set app error', () => {
        const endState = appReducer(startState, setAppError({error: 'error'}));

        expect(startState.error).toBe('');
        expect(endState.error).toBe('error');
    });

    test('set app initialize', () => {
        const endState = appReducer(startState, isAppInitialized({isInitialized: true}));

        expect(startState.isInitialized).toBeFalsy();
        expect(endState.isInitialized).toBeTruthy();
    });
})

