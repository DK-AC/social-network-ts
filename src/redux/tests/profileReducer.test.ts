import {addPostAC, ProfilePageType} from "../state";
import {profileReducer} from "../reducers/profileReducer";

let fakeState: ProfilePageType

beforeEach(() => {
    fakeState = {
        posts: [
            {id: 1, message: '1 post', likesCount: 20},
            {id: 2, message: '2 post', likesCount: 1},
            {id: 3, message: '3 post', likesCount: 55},
        ],
        newPostText: ''
    }
})

test('post should be added', () => {
    let endState = profileReducer(fakeState, addPostAC('New Post Text'))

    expect(fakeState.posts.length).toBe(3)
    expect(endState.posts.length).toBe(4)
    expect(fakeState.posts[3]).toBeUndefined()
    expect(endState.posts[3]).toBeDefined()
    expect(fakeState.posts[2].message).toBe('3 post')
    expect(endState.posts[3].message).toBe('New Post Text')
})