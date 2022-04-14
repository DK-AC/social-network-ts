import {DialogsPageType, dialogsReducer, sendMessageAC, updateNewMessageAC} from "../reducers/dialogsReducer";

let fakeState: DialogsPageType

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
        newMessageText: ''
    }
})

test('post should be added', () => {
    let endState = dialogsReducer(fakeState, sendMessageAC('New Message Text'))

    expect(fakeState.messages.length).toBe(4)
    expect(endState.messages.length).toBe(5)
    expect(fakeState.messages[4]).toBeUndefined()
    expect(endState.messages[4]).toBeDefined()
    expect(fakeState.messages[3].message).toBe('Stop')
    expect(endState.messages[4].message).toBe('New Message Text')
    expect(endState.newMessageText).toBe('')
})

test('new message text should be changed', () => {
    let endState = dialogsReducer(fakeState, updateNewMessageAC('New Message Text'))

    expect(fakeState.newMessageText).toBe('')
    expect(endState.newMessageText).toBe('New Message Text')
})