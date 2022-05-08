import {
    appReducer,
    InitialAppStateType,
    isAppInitialized,
    setAppError,
    setAppStatus,
} from '../reducers/appReducer';

let startState: InitialAppStateType;

beforeEach(() => {
    startState = {
        isInitialized: false,
        status: 'idle',
        error: '',
    };
});

test('loading should be changed', () => {
    const endState = appReducer(startState, setAppStatus('successful'));

    expect(startState.status).toBe('idle');
    expect(endState.status).toBe('successful');
});

test('set app error', () => {
    const endState = appReducer(startState, setAppError('error'));

    expect(startState.error).toBe('');
    expect(endState.error).toBe('error');
});

test('set app initialize', () => {
    const endState = appReducer(startState, isAppInitialized(true));

    expect(startState.isInitialized).toBeFalsy();
    expect(endState.isInitialized).toBeTruthy();
});