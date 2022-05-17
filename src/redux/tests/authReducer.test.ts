import {authMeTC, authReducer, InitialAuthStateType, loginTC, logoutTC} from '../reducers/authReducer';
import {LoginUserType} from "../../api/typesAPI";

let fakeState: InitialAuthStateType;

beforeEach(() => {
    fakeState = {
        id: 1,
        email: '',
        password: '',
        isAuth: false,
        login: '',
        captchaURL: '',
    }
})

describe('auth', () => {

    test('user should be initialized', () => {

        const action = authMeTC.fulfilled({id: 12, login: 'fake', email: 'fake@gmail.com'}, 'requestId')
        const endState = authReducer(fakeState, action)

        expect(fakeState.isAuth).toBeFalsy()
        expect(endState.isAuth).toBeTruthy()

        expect(fakeState.id).toBe(1)
        expect(endState.id).toBe(12)

        expect(fakeState.email).toBe('')
        expect(endState.email).toBe('fake@gmail.com')

        expect(fakeState.login).toBe('')
        expect(endState.login).toBe('fake')

    })

    test('show data registered user', () => {
        const fakeIsAuthUserData: LoginUserType = {
            email: 'fake@gmail.com',
            password: '12345678',
        };
        const action = loginTC.fulfilled({user: fakeIsAuthUserData}, 'requestId', fakeIsAuthUserData)
        const endState = authReducer(fakeState, action)

        expect(fakeState.email).toBe('')
        expect(endState.email).toBe('fake@gmail.com')

        expect(fakeState.password).toBe('')
        expect(endState.password).toBe('12345678')
    })

    test('when user logout clear state', () => {

        const action = logoutTC.fulfilled(undefined, 'requestId')
        const endState = authReducer(fakeState, action)

        expect(fakeState).toEqual(fakeState)
        expect(endState).toEqual(fakeState)
    })
})

