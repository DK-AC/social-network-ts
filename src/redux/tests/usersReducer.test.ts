import {followUserAC, unfollowUserAC, UsersPageType, usersReducer} from "../reducers/usersReducer";

let startState: UsersPageType

beforeEach(() => {
        startState = {
            users: [
                {
                    id: 1,
                    name: "Denis",
                    uniqueUrlName: '',
                    photos: {small: '', large: ''},
                    status: '',
                    followed: true
                },
                {
                    id: 2,
                    name: "Jenya",
                    uniqueUrlName: '',
                    photos: {small: '', large: ''},
                    status: '',
                    followed: false
                },
            ]
        }
    }
)

test('unfollowed user should be followed', () => {

    let endState = usersReducer(startState, followUserAC(2, true))

    expect(startState.users[1].followed).toBeFalsy()
    expect(endState.users[1].followed).toBeTruthy()
})

test('followed user should be unfollowed', () => {

    let endState = usersReducer(startState, unfollowUserAC(1, false))

    expect(startState.users[0].followed).toBeTruthy()
    expect(endState.users[0].followed).toBeFalsy()
})