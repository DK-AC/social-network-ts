import {followingTC, InitialUsersStateType, setUsersTC, usersReducer} from '../reducers/usersReducer';

let fakeState: InitialUsersStateType;
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
            portionNumber: 1,
        };
    },
);

test('unfollowed user should be changed on true', () => {

    const action = followingTC
        .fulfilled({isFollow: true, userId: 2}, 'requestId', {isFollow: true, userId: 2})
    const endState = usersReducer(fakeState, action);

    expect(fakeState.users[1].followed).toBeFalsy();
    expect(endState.users[1].followed).toBeTruthy();
});

test('followed user should be changed on false', () => {

    const action = followingTC
        .fulfilled({isFollow: false, userId: 1}, 'requestId', {isFollow: false, userId: 1})
    const endState = usersReducer(fakeState, action);

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
        portionNumber: 1,
    };

    const action = setUsersTC.fulfilled({
        users: fakeUserState.users,
        totalCount: fakeUserState.totalCount,
    }, 'requestId', {currentPage: 3, pageSize: 5})

    const endState = usersReducer(fakeState, action);

    expect(fakeState).toEqual(fakeState);
    expect(fakeState.users.length).toBe(2);
    expect(endState).toEqual({
        totalCount: 100,
        pageSize: 5,
        currentPage: 3,
        followingInProgress: [],
        users: fakeUsersForTests,
        portionNumber: 1,
    });
    expect(endState.users.length).toBe(2);
});
//
// test('total user count should be set', () => {
//     const endState = usersReducer(fakeState, setTotalUserCountAC(4000));
//
//     expect(fakeState.totalCount).toBe(100);
//     expect(endState.totalCount).toBe(4000);
// });
//
// test('page should be changed', () => {
//     const endState = usersReducer_(fakeState, changeCurrentPage({currentPage: 10}));
//
//     expect(fakeState.currentPage).toBe(3);
//     expect(endState.currentPage).toBe(10);
// });

// test('show following user', () => {
//
//     const userId1 = 1
//     const endState = usersReducer(fakeState, followingInProgressAC(false, userId1));
//
//     expect(fakeState.followingInProgress.some(userId => userId === userId1)).toBe(false)
//     expect(endState.followingInProgress.some(userId => userId === userId1)).toBe(false)
// });
//
// test('show unfollowing user', () => {
//
//     const userId1 = 2
//     const endState = usersReducer(fakeState, followingInProgressAC(true, userId1));
//
//     expect(fakeState.followingInProgress.some(userId => userId === userId1)).toBe(false)
//     expect(endState.followingInProgress.some(userId => userId === userId1)).toBe(true)
// });