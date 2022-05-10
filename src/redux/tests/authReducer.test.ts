import {
    authReducer,
    InitialAuthStateType,
    setIsAuthUser,
    setIsInitializedAC,
} from '../reducers/authReducer';

let fakeState: InitialAuthStateType;

beforeEach(() => {
    fakeState = {
        id: 1,
        email: '',
        password: '',
        isAuth: false,
        login: '',
    }
})

test('user should be initialized', () => {
    const endState = authReducer(fakeState, setIsInitializedAC())

    expect(fakeState.isAuth).toBeFalsy()
    expect(endState.isAuth).toBeTruthy()
})

test('show data registered user', () => {
    const fakeIsAuthUserData = {
        id: 100,
        email: 'fake@gmail.com',
        login: 'fakeUser',
        password: '',
        isAuth: true,
    };
    const endState = authReducer(fakeState, setIsAuthUser(fakeIsAuthUserData))

    expect(fakeState.id).toBe(1)
    expect(endState.id).toBe(100)
    expect(fakeState).toEqual({
        id: 1,
        email: '',
        password: '',
        isAuth: false,
        login: '',
    })
    expect(endState).toEqual(fakeIsAuthUserData)
})

// test('user should be logged in', () => {
//
//     const fakeLoggedUser = {email: 'fake@gmail.com', password: '123456', rememberMe: false, captcha: false}
//     const endState = authReducer(fakeState, setIsLoggedInAC(fakeLoggedUser))
//
//     expect(fakeState.email).toBe('')
//     expect(endState.email).toBe('fake@gmail.com')
//     expect(fakeState.password).toBe('')
//     expect(endState.password).toBe('123456')
//
// })