import {profilePageReducer} from "../reducers/profilePage-reducer";
import {addPostAC, StateType} from "../state";

let fakeState: StateType

beforeEach(() => {
    fakeState = {
        profilePage: {
            posts: [
                {id: 1, message: '1 post', likesCount: 20},
                {id: 2, message: '2 post', likesCount: 1},
                {id: 3, message: '3 post', likesCount: 55},
            ],
            newPostText: ''
        },
        dialogsPage: {
            dialogs: [
                {id: 1, name: 'Jenya'},
                {id: 2, name: 'Sasha'},
                {id: 3, name: 'Dima'},
                {id: 4, name: 'Rita'},
            ],
            messages: [
                {id: 1, message: 'Hello'},
                {id: 2, message: 'How are you?'},
                {id: 3, message: 'let\'s go'},
                {id: 4, message: 'Stop'},
            ],
            newMessageText: ''
        },
        sideBarPage: {
            friends: [
                {id: 1, name: 'Artiom'},
                {id: 2, name: 'Dima'},
                {id: 3, name: 'Ivan'},
            ]
        }
    }
})

test('post should be added', () => {
    let endState = profilePageReducer(fakeState, addPostAC('New Post Text'))

    expect(fakeState.profilePage.posts.length).toBe(3)
    expect(endState.profilePage.posts.length).toBe(4)
    expect(fakeState.profilePage.posts[3]).toBeUndefined()
    expect(endState.profilePage.posts[3]).toBeDefined()
    expect(fakeState.profilePage.posts[2].message).toBe('3 post')
    expect(endState.profilePage.posts[3].message).toBe('New Post Text')
})