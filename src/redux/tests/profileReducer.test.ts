import {
    addPost,
    deletePost,
    getProfileUserStatus,
    InitialProfileStateType,
    profileReducer,
    savePhoto,
    saveProfile,
    setProfileUser,
    updateProfileUserStatus,
} from '../reducers/profileReducer'
import {ProfileUserType} from '../../api/profileAPI'

let fakeState: InitialProfileStateType
let fakeFile: File
let fakeProfile: ProfileUserType

beforeEach(() => {

    fakeProfile = {
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

    fakeState = {
        posts: [
            {id: 1, message: '1 post', likesCount: 20},
            {id: 2, message: '2 post', likesCount: 1},
            {id: 3, message: '3 post', likesCount: 55},
        ],
        profile: fakeProfile,
        profileStatus: '',
    }
})

describe('profile', () => {
    test('post should be added', () => {

        const endState = profileReducer(fakeState, addPost({postText: 'New Post Text'}))

        expect(fakeState.posts.length).toBe(3)
        expect(endState.posts.length).toBe(4)
        expect(fakeState.posts[3]).toBeUndefined()
        expect(endState.posts[3]).toBeDefined()
        expect(fakeState.posts[2].message).toBe('3 post')
        expect(endState.posts[3].message).toBe('3 post')
        expect(endState.posts[0].message).toBe('New Post Text')
    })

    test('user should be set', () => {
        const action = setProfileUser.fulfilled({profile: fakeProfile}, 'requestId', 3)
        const endState = profileReducer(fakeState, action)

        expect(fakeState.profile).toBe(fakeProfile)
        expect(endState.profile?.userId).toBe(3)
        expect(endState.profile?.fullName).toBe('DK_AC')
        expect(endState.profile?.lookingForAJob).toBeTruthy()
    })

    test('set user status', () => {

        const action = getProfileUserStatus
            .fulfilled({profileStatus: 'new status'}, 'requestId', 1)
        const endState = profileReducer(fakeState, action)

        expect(fakeState.profileStatus).toBe('')
        expect(endState.profileStatus).toBe('new status')
    })

    test('user status should be changed', () => {

        const action = updateProfileUserStatus
            .fulfilled({profileStatus: 'change status'}, 'requestId', {profileStatus: ''})
        const endState = profileReducer(fakeState, action)

        expect(fakeState.profileStatus).toBe('')
        expect(endState.profileStatus).toBe('change status')
    })

    test('correct post should be deleted', () => {

        const endState = profileReducer(fakeState, deletePost({postId: 2}))

        expect(fakeState.posts.length).toBe(3)
        expect(endState.posts.length).toBe(2)
        expect(fakeState.posts[1].id).toBe(2)
        expect(endState.posts[1].id).toBe(3)
    })

    test('photo should be set', () => {

        const action = savePhoto.fulfilled({photos: {small: 'small', large: 'large'}}, 'requestId', fakeFile)
        const endState = profileReducer(fakeState, action)

        expect(fakeState.profile!.photos.small).toBe('')
        expect(endState.profile!.photos.small).toBe('small')
    })

    test('changed data profile should be save', () => {

        const action = saveProfile.fulfilled({profile: fakeProfile}, 'requestId', {
            ...fakeProfile,
            contacts: {
                vk: 'vk.com',
                facebook: '',
                mainLink: '',
                github: '',
                youtube: '',
                instagram: '',
                twitter: '',
                website: '',
            },
            aboutMe: 'YO YO YO',
        })
        const endState = profileReducer(fakeState, action)

        expect(fakeState.profile).toBe(fakeProfile)
        expect(fakeState.profile?.aboutMe).toBe('DK_AC')
        expect(fakeState.profile?.contacts.vk).toBe('')
        expect(endState.profile?.contacts.vk).toBe('vk.com')
        expect(endState.profile?.aboutMe).toBe('YO YO YO')
    })

})

