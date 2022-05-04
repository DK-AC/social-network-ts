import {
    appReducer,
    InitialAppStateType,
    initializeApp,
    setAppErrorAC,
    setIsLoadingAC,
} from '../reducers/appReducer';

let startState: InitialAppStateType;

beforeEach(() => {
    startState = {
        isInitialized: false,
        isLoading: 'idle',
        error: '',
    };
});

test('loading should be changed', () => {
    const endState = appReducer(startState, setIsLoadingAC('successful'));

    expect(startState.isLoading).toBe('idle');
    expect(endState.isLoading).toBe('successful');
});

test('set app error', () => {
    const endState = appReducer(startState, setAppErrorAC('error'));

    expect(startState.error).toBe('');
    expect(endState.error).toBe('error');
});

test('set app initialize', () => {
    const endState = appReducer(startState, initializeApp(true));

    expect(startState.isInitialized).toBeFalsy();
    expect(endState.isInitialized).toBeTruthy();
});