export enum WebSocketEventType {
    Close = 'close',
    Open = 'open',
    Message = 'message',
    Error = 'error',
}

export enum WebSocketStatus {
    MessagesReceived = 'messages-received',
    StatusChanged = 'status-changed'
}

export enum StatusChat {
    Pending = 'pending',
    Ready = 'ready',
    Error = 'error',
}
