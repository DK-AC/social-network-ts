import {authMe, authReducer, InitialAuthStateType, logoutTC} from '../reducers/authReducer';

let fakeState: InitialAuthStateType;

beforeEach(() => {
    fakeState = {
        id: 1,
        email: null,
        password: null,
        isAuth: false,
        login: null,
        captchaURL: null,
    }
})

describe('auth', () => {

    test('user should be initialized', () => {

        const action = authMe.fulfilled({id: 12, login: 'fake', email: 'fake@gmail.com'}, 'requestId')
        const endState = authReducer(fakeState, action)

        expect(fakeState.isAuth).toBeFalsy()
        expect(endState.isAuth).toBeTruthy()

        expect(fakeState.id).toBe(1)
        expect(endState.id).toBe(12)

        expect(fakeState.email).toBe(null)
        expect(endState.email).toBe('fake@gmail.com')

        expect(fakeState.login).toBe(null)
        expect(endState.login).toBe('fake')

    })

    test('when user logout clear state', () => {

        const action = logoutTC.fulfilled(undefined, 'requestId')
        const endState = authReducer(fakeState, action)

        expect(fakeState).toEqual(fakeState)
        expect(endState).toEqual(fakeState)
    })
})

