import {
    addPost,
    deletePost,
    getProfileUserStatus,
    InitialProfileStateType,
    profileReducer,
    setProfileUser,
    updateProfileUserStatus,
} from '../reducers/profileReducer';
import {ProfileUserType} from '../../api/profileAPI';

let fakeState: InitialProfileStateType;

beforeEach(() => {
    fakeState = {
        posts: [
            {id: 1, message: '1 post', likesCount: 20},
            {id: 2, message: '2 post', likesCount: 1},
            {id: 3, message: '3 post', likesCount: 55},
        ],
        profile: null,
        status: '',
    };
});

describe('profile', () => {
    test('post should be added', () => {

        const endState = profileReducer(fakeState, addPost({postText: 'New Post Text'}))

        expect(fakeState.posts.length).toBe(3);
        expect(endState.posts.length).toBe(4);
        expect(fakeState.posts[3]).toBeUndefined();
        expect(endState.posts[3]).toBeDefined();
        expect(fakeState.posts[2].message).toBe('3 post');
        expect(endState.posts[3].message).toBe('3 post');
        expect(endState.posts[0].message).toBe('New Post Text');
    });

    test('user should be set', () => {
        const user: ProfileUserType = {
            userId: 3,
            photos: {small: '', large: ''},
            lookingForAJob: true,
            lookingForAJobDescription: '',
            fullName: 'DK_AC',
            contacts: {
                facebook: '',
                website: '',
                vk: '',
                twitter: '',
                instagram: '',
                youtube: '',
                github: '',
                mainLink: '',
            },
            aboutMe: 'DK_AC',
        }

        const action = setProfileUser.fulfilled({profile: user}, 'requestId', 3)
        const endState = profileReducer(fakeState, action)

        expect(fakeState.profile).toBeNull()
        expect(endState.profile?.userId).toBe(3)
        expect(endState.profile?.fullName).toBe('DK_AC')
        expect(endState.profile?.lookingForAJob).toBeTruthy()
    })

    test('set user status', () => {

        const action = getProfileUserStatus
            .fulfilled({status: 'new status'}, 'requestId', 1)
        const endState = profileReducer(fakeState, action)

        expect(fakeState.status).toBe('')
        expect(endState.status).toBe('new status')
    })

    test('user status should be changed', () => {

        const action = updateProfileUserStatus
            .fulfilled({status: 'change status'}, 'requestId', {status: ''})
        const endState = profileReducer(fakeState, action)

        expect(fakeState.status).toBe('')
        expect(endState.status).toBe('change status')
    })

    test('correct post should be deleted', () => {

        const endState = profileReducer(fakeState, deletePost({postId: 2}))

        expect(fakeState.posts.length).toBe(3)
        expect(endState.posts.length).toBe(2)
        expect(fakeState.posts[1].id).toBe(2)
        expect(endState.posts[1].id).toBe(3)
    })

})

