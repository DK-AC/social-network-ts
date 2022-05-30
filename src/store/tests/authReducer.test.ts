import {authMe, authReducer, getCaptchaURL, InitialAuthStateType, logout} from '../reducers/authReducer'
import {FAILED_USER_AUTH} from '../../constans'

let fakeState: InitialAuthStateType

beforeEach(() => {
    fakeState = {
        id: null,
        email: null,
        password: null,
        isAuth: FAILED_USER_AUTH,
        login: null,
        captchaURL: null,
        myPhotos: null,
    }
})

describe('auth', () => {

    test('user should be initialized', () => {

        const action = authMe.fulfilled({id: 12, login: 'fake', email: 'fake@gmail.com'}, 'requestId')
        const endState = authReducer(fakeState, action)

        expect(fakeState.isAuth).toBeFalsy()
        expect(endState.isAuth).toBeTruthy()

        expect(fakeState.id).toBeNull()
        expect(endState.id).toBe(12)

        expect(fakeState.email).toBeNull()
        expect(endState.email).toBe('fake@gmail.com')

        expect(fakeState.login).toBeNull()
        expect(endState.login).toBe('fake')

    })

    test('when user logout clear state', () => {

        const action = logout.fulfilled(undefined, 'requestId')
        const endState = authReducer(fakeState, action)

        expect(fakeState).toEqual(fakeState)
        expect(endState).toEqual(fakeState)
    })

    test('If the user entered the wrong username and password, set the captcha', () => {

        const action = getCaptchaURL.fulfilled({url: 'captchaURL'}, 'requestId')
        const endState = authReducer(fakeState, action)

        expect(fakeState.captchaURL).toBeNull()
        expect(endState.captchaURL).toBe('captchaURL')
    })
})

