export type MessageType =
  | "StateUpdate"
  | "CallFunction"
  | "SubscribeState"
  | "SubscribeFunction"
  | "UnsubscribeState"
  | "UnsubscribeFunction"
  | "RoommateSubscribed"
  | "RoommateUnsubscribed"

export interface Message {
  /**
   * A distinct ID generated on the server at receive time, used for deduplication
   */
  MessageID?: string

  MessageType: MessageType

  /**
   * Added by the server (so all clients have a timestamp to "agree" on.
   * This means that a client with a wonky clock will only impact itself,
   * not all other clients!
   */
  MessageMS: number
  /**
   * Added by the server, ID of the invoking client (undefined if sent by server)
   */
  ClientID?: string

  RoomID: string

  /**
   * If a `MessageType = 'StateUpdate'`, what that value is,
   * with `JSON.stringify()` called on it
   */
  Value?: string

  /**
   * If a `MessageType = 'CallFunction', the parameters of the called function
   */
  Args?: string[]
}

export interface SubscribeMessage extends Message {
  MessageType: "SubscribeState" | "SubscribeFunction"
}

export interface UnsubscribeMessage extends Message {
  MessageType: "UnsubscribeState" | "UnsubscribeFunction"
}

export interface StateUpdateMessage extends Message {
  MessageType: "StateUpdate"
  Value: string
}

export interface CallFunctionMessage extends Message {
  MessageType: "CallFunction"
  Args: string[]
}

export interface RoommateSubscribedMessage extends Message {
  MessageType: "RoommateSubscribed"
  ClientID: string
}

export interface RoommateUnsubscribedMessage extends Message {
  MessageType: "RoommateUnsubscribed"
  ClientID: string
}
