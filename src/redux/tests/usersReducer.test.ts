import {
    changeCurrentPageAC,
    followingInProgressAC,
    InitialAuthStateType,
    setFollowUserAC,
    setTotalUserCountAC,
    setUsersAC,
    usersReducer,
} from '../reducers/usersReducer';

let fakeState: InitialAuthStateType;
const fakeUsers = [
    {
        id: 1,
        name: 'Denis',
        uniqueUrlName: '',
        photos: {small: '', large: ''},
        status: '',
        followed: true,
    },
    {
        id: 2,
        name: 'Jenya',
        uniqueUrlName: '',
        photos: {small: '', large: ''},
        status: '',
        followed: false,
    }]

beforeEach(() => {
        fakeState = {
            users: fakeUsers,
            totalCount: 100,
            pageSize: 5,
            currentPage: 3,
            followingInProgress: [],
        };
    },
);

test('unfollowed user should be changed on true', () => {

    const endState = usersReducer(fakeState, setFollowUserAC(2, true));

    expect(fakeState.users[1].followed).toBeFalsy();
    expect(endState.users[1].followed).toBeTruthy();
});

test('followed user should be changed on false', () => {

    const endState = usersReducer(fakeState, setFollowUserAC(1, false));

    expect(fakeState.users[0].followed).toBeTruthy();
    expect(endState.users[0].followed).toBeFalsy();
});

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
        }];
    const fakeUserState = {
        users: fakeUsersForTests,
        totalCount: 100,
        currentPage: 3,
        pageSize: 5,
        followingInProgress: [],
    };

    const endState = usersReducer(fakeState, setUsersAC(fakeUserState.users));

    expect(fakeState).toEqual({
        users: fakeUsers,
        totalCount: 100,
        currentPage: 3,
        pageSize: 5,
        followingInProgress: [],
    });
    expect(fakeState.users.length).toBe(2);
    expect(endState).toEqual({
        totalCount: 100,
        pageSize: 5,
        currentPage: 3,
        followingInProgress: [],
        users: fakeUsersForTests,
    });
    expect(endState.users.length).toBe(2);
});

test('total user count should be set', () => {
    const endState = usersReducer(fakeState, setTotalUserCountAC(4000));

    expect(fakeState.totalCount).toBe(100);
    expect(endState.totalCount).toBe(4000);
});

test('page should be changed', () => {
    const endState = usersReducer(fakeState, changeCurrentPageAC(10));

    expect(fakeState.currentPage).toBe(3);
    expect(endState.currentPage).toBe(10);
});

test('show following user', () => {

    const userId1 = 1
    const endState = usersReducer(fakeState, followingInProgressAC(false, userId1));

    expect(fakeState.followingInProgress.some(userId => userId === userId1)).toBe(false)
    expect(endState.followingInProgress.some(userId => userId === userId1)).toBe(false)
});

test('show unfollowing user', () => {

    const userId1 = 2
    const endState = usersReducer(fakeState, followingInProgressAC(true, userId1));

    expect(fakeState.followingInProgress.some(userId => userId === userId1)).toBe(false)
    expect(endState.followingInProgress.some(userId => userId === userId1)).toBe(true)
});