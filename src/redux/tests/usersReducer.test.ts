import {
    changeCurrentPageAC,
    followUserAC,
    setTotalUserCountAC,
    setUsersAC,
    unfollowUserAC,
    UsersPageType,
    usersReducer,
} from '../reducers/usersReducer';

let startState: UsersPageType;

beforeEach(() => {
        startState = {
            users: [
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
                },
            ],
            totalCount: 100,
            pageSize: 5,
            currentPage: 3,
            followingInProgress: [],
        };
    },
);

test('unfollowed user should be changed on true', () => {

    const endState = usersReducer(startState, followUserAC(2));

    expect(startState.users[1].followed).toBeFalsy();
    expect(endState.users[1].followed).toBeTruthy();
});

test('followed user should be changed on false', () => {

    const endState = usersReducer(startState, unfollowUserAC(1));

    expect(startState.users[0].followed).toBeTruthy();
    expect(endState.users[0].followed).toBeFalsy();
});

test('users should be sets', () => {

    const fakeState: UsersPageType = {users: [], totalCount: 1, currentPage: 1, pageSize: 5, followingInProgress: []};

    const endState = usersReducer(fakeState, setUsersAC(startState.users));

    expect(fakeState).toEqual({users: [], totalCount: 1, currentPage: 1, pageSize: 5, followingInProgress: []});
    expect(fakeState.users.length).toBe(0);
    expect(endState).toEqual({
        users: [
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
            },
        ],
        totalCount: 1,
        pageSize: 5,
        currentPage: 1,
        followingInProgress: [],
    });
    expect(endState.users.length).toBe(2);
});

test('total user count should be set', () => {
    const endState = usersReducer(startState, setTotalUserCountAC(4000));

    expect(startState.totalCount).toBe(100);
    expect(endState.totalCount).toBe(4000);
});

test('page should be changed', () => {
    const endState = usersReducer(startState, changeCurrentPageAC(10));

    expect(startState.currentPage).toBe(3);
    expect(endState.currentPage).toBe(10);
});