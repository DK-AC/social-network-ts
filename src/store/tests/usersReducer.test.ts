
import {FOLLOW, UNFOLLOW} from '../../constans'
import {
    changeCurrentPage,
    changePageSize,
    followUnfollow,
    setIsFollowingInProgress,
    setUsers,
    usersReducer,
} from '../reducers'
import {InitialUsersStateType} from '../reducers/usersReducer'

let fakeState: InitialUsersStateType
const fakeUsers = [
    {
        id: 1,
        name: 'Denis',
        uniqueUrlName: '',
        photos: {small: '', large: ''},
        status: '',
        followed: FOLLOW,
    },
    {
        id: 2,
        name: 'Jenya',
        uniqueUrlName: '',
        photos: {small: '', large: ''},
        status: '',
        followed: UNFOLLOW,
    }]

beforeEach(() => {
        fakeState = {
            users: fakeUsers,
            totalCount: 100,
            pageSize: 5,
            currentPage: 3,
            followingInProgress: [],
            filter: {
                term: '',
                friend: null,
            },
        }
    },
)

describe('user', () => {
    test('unfollowed user should be changed on true', () => {

        const action = followUnfollow
            .fulfilled({isFollow: true, userId: 2}, 'requestId', {isFollow: FOLLOW, userId: 2})
        const endState = usersReducer(fakeState, action)

        expect(fakeState.users[1].followed).toBeFalsy()
        expect(endState.users[1].followed).toBeTruthy()
    })

    test('followed user should be changed on false', () => {

        const action = followUnfollow
            .fulfilled({isFollow: false, userId: 1}, 'requestId', {isFollow: UNFOLLOW, userId: 1})
        const endState = usersReducer(fakeState, action)

        expect(fakeState.users[0].followed).toBeTruthy()
        expect(endState.users[0].followed).toBeFalsy()
    })

    test('users should be sets', () => {

        const fakeUsersForTests = [
            {
                id: 3,
                name: 'Sasha',
                uniqueUrlName: '',
                photos: {small: '', large: ''},
                status: '',
                followed: true,
            },
            {
                id: 4,
                name: 'Rita',
                uniqueUrlName: '',
                photos: {small: '', large: ''},
                status: '',
                followed: false,
            }]
        const fakeUserState = {
            users: fakeUsersForTests,
            totalCount: 4000,
            currentPage: 3,
            pageSize: 5,
            followingInProgress: [],
            portionNumber: 1,
            filter: {
                term: '',
                friend: null,
            },
        }

        const action = setUsers.fulfilled({
            users: fakeUserState.users,
            totalCount: fakeUserState.totalCount,
            term: '',
            friend: null,
        }, 'requestId', {currentPage: 3, pageSize: 5, term: '', friend: null})

        const endState = usersReducer(fakeState, action)

        expect(fakeState).toEqual(fakeState)
        expect(fakeState.users.length).toBe(2)

        expect(endState).toEqual(fakeUserState)
        expect(endState.users.length).toBe(2)

        expect(fakeState.totalCount).toBe(100)
        expect(endState.totalCount).toBe(4000)
    })

    test('page should be changed', () => {
        const endState = usersReducer(fakeState, changeCurrentPage({currentPage: 10}))

        expect(fakeState.currentPage).toBe(3)
        expect(endState.currentPage).toBe(10)
    })

    test('pagesize should be changed', () => {
        const endState = usersReducer(fakeState, changePageSize({pageSize: 100}))

        expect(fakeState.pageSize).toBe(5)
        expect(endState.pageSize).toBe(100)
    })

    test('show following user', () => {

        const userId1 = 1
        const endState = usersReducer(fakeState, setIsFollowingInProgress({isFollow: UNFOLLOW, userId: userId1}))

        expect(fakeState.followingInProgress.some((userId: number) => userId === userId1)).toBe(false)
        expect(endState.followingInProgress.some((userId: number) => userId === userId1)).toBe(false)
    })

    test('show unfollowing user', () => {

        const userId2 = 2
        const endState = usersReducer(fakeState, setIsFollowingInProgress({isFollow: true, userId: userId2}))

        expect(fakeState.followingInProgress.some((userId: number) => userId === userId2)).toBe(false)
        expect(endState.followingInProgress.some((userId: number) => userId === userId2)).toBe(true)
    })
})

