import {dialogsReducer, initialDialogsStateType, sendMessage} from '../reducers/dialogsReducer';

let fakeState: initialDialogsStateType;

beforeEach(() => {
    fakeState = {
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
    };
});

test('post should be added', () => {
    const endState = dialogsReducer(fakeState, sendMessage({messageText: 'New Message Text'}));

    expect(fakeState.messages.length).toBe(4);
    expect(endState.messages.length).toBe(5);
    expect(fakeState.messages[4]).toBeUndefined();
    expect(endState.messages[4]).toBeDefined();
    expect(fakeState.messages[3].message).toBe('Stop');
    expect(endState.messages[4].message).toBe('New Message Text');
});

