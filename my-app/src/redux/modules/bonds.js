import _ from 'lodash';

const ADD_MESSAGE = 'ADD_MESSAGE';
const SET_IS_ALL_MESSAGES = 'SET_IS_ALL_MESSAGES';

const GET_MESSAGES_HISTORY = 'GET_MESSAGES_HISTORY';
const GET_MESSAGES_HISTORY_SUCCESS = 'GET_MESSAGES_HISTORY_SUCCESS';
const GET_MESSAGES_HISTORY_FAIL = 'GET_MESSAGES_HISTORY_FAIL';

const GET_CHANNEL_MESSAGES = 'GET_CHANNEL_MESSAGES';
const GET_CHANNEL_MESSAGES_SUCCESS = 'GET_CHANNEL_MESSAGES_SUCCESS';
const GET_CHANNEL_MESSAGES_FAIL = 'GET_CHANNEL_MESSAGES_FAIL';

const GET_SYSTEM_MESSAGES = 'GET_SYSTEM_MESSAGES';
const GET_SYSTEM_MESSAGES_SUCCESS = 'GET_SYSTEM_MESSAGES_SUCCESS';
const GET_SYSTEM_MESSAGES_FAIL = 'GET_SYSTEM_MESSAGES_FAIL';

const SET_CHAT_MODAL_MAX_COUNT = 'SET_CHAT_MODAL_MAX_COUNT';

const GET_LAST_HAS_READ_MESSAGES = 'GET_LAST_HAS_READ_MESSAGES';
const GET_LAST_HAS_READ_MESSAGES_SUCCESS = 'GET_LAST_HAS_READ_MESSAGES_SUCCESS';
const GET_LAST_HAS_READ_MESSAGES_FAIL = 'GET_LAST_HAS_READ_MESSAGES_FAIL';

const UPDATE_LAST_HAS_READ_MESSAGES = 'UPDATE_LAST_HAS_READ_MESSAGES_MESSAGES';
const UPDATE_LAST_HAS_READ_MESSAGES_SUCCESS =
  'UPDATE_LAST_HAS_READ_MESSAGES_SUCCESS';
const UPDATE_LAST_HAS_READ_MESSAGES_FAIL = 'UPDATE_LAST_HAS_READ_MESSAGES_FAIL';

const UPDATE_USER_TYPING = 'UPDATE_USER_TYPING';

const CHANGE_CURRENT_CHANNEL = 'CHANGE_CURRENT_CHANNEL';
const CHANGE_CHAT_TYPE = 'CHANGE_CHAT_TYPE';
const SET_LAST_NUMBERS = 'SET_LAST_NUMBERS';

let initialState = {
  typing: {},
  messages: {
    /* EXAMPLE:
     ${channelId}: [
      {
        id: '...'
        toId: '...',
        fromid: '...',
        type: '...',
        createdAt: '...',
      }
    ]
    */
  },
  isAllMessages: {},
  currentChannels: [
    /*    id:'...',
     type:'...'*/
  ],
  isChatPage: false,
  chatModalMaxCount: null,
  lastHasReadMessages: {
    /* EXAMPLE:
     ${channelId}: ${lastHasReadMessageId}
     */
  },
  lastSequenceNumbers: {
    /* EXAMPLE:
     ${channelId}: ${lastSequenceNumber}
     */
  },
  frozenChannel: null,
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case ADD_MESSAGE: {
      const { channelId, messageData } = action;
      let lastSequenceNumbers = { ...state.lastSequenceNumbers };
      let channelName =
        messageData.typeId === 1
          ? (channelId === messageData.senderId &&
              `${messageData.toId}_${channelId}`) ||
            `${messageData.senderId}_${channelId}`
          : channelId;
      lastSequenceNumbers[channelName] = messageData.sequenceNumber;
      let messages = { ...state.messages };
      messages[channelId] = (messages[channelId] && [
        ...messages[channelId],
        messageData,
      ]) || [messageData];

      return {
        ...state,
        messages,
        lastSequenceNumbers,
      };
    }

    case SET_IS_ALL_MESSAGES: {
      const { channelId } = action;
      let isAllMessages = { ...state.isAllMessages };
      isAllMessages[channelId] = true;
      return {
        ...state,
        isAllMessages,
      };
    }

    case GET_MESSAGES_HISTORY:
    case GET_CHANNEL_MESSAGES:
    case GET_SYSTEM_MESSAGES:
    case GET_MESSAGES_HISTORY_FAIL:
    case GET_CHANNEL_MESSAGES_FAIL:
    case GET_SYSTEM_MESSAGES_FAIL:
      return state;

    case GET_MESSAGES_HISTORY_SUCCESS:
    case GET_CHANNEL_MESSAGES_SUCCESS:
    case GET_SYSTEM_MESSAGES_SUCCESS: {
      const { messagesData, channelId } = action.result;
      let messages = {},
        isAllMessages = { ...state.isAllMessages };
      messages[channelId] = _.unionWith(
        state.messages[channelId] || [],
        messagesData,
        (m1, m2) => m1.id === m2.id
      );
      messages[channelId] = _.sortBy(
        messages[channelId],
        message => new Date(message.date)
      );

      if (messagesData.length < 15) {
        isAllMessages[channelId] = true;
      }

      return {
        ...state,
        messages: {
          ...state.messages,
          ...messages,
        },
        isAllMessages,
      };
    }

    case SET_CHAT_MODAL_MAX_COUNT:
      let count = (state.isChatPage && 1) || action.chatModalMaxCount;
      let currentChannels = [...state.currentChannels];
      if (currentChannels.length > count) {
        currentChannels.splice(0, currentChannels.length - count);
        return {
          ...state,
          chatModalMaxCount: action.chatModalMaxCount,
          currentChannels: currentChannels,
        };
      }
      return {
        ...state,
        chatModalMaxCount: action.chatModalMaxCount,
      };

    case UPDATE_USER_TYPING:
      const { toId, isTyping, senderName } = action.data;
      let typing = { ...state.typing };
      if (typing[toId]) {
        isTyping
          ? (typing[toId] = [...typing[toId], senderName])
          : (typing[toId] = typing[toId].filter(name => name !== senderName));
      }/* else {
        isTyping ? (typing[toId] = [senderName]) : [];
      }*/

      return {
        ...state,
        typing,
      };

    case CHANGE_CURRENT_CHANNEL:
      let channels = [...state.currentChannels];
      if (action.channel) {
        let isNewChannel = true;
        channels = state.currentChannels.filter(channel => {
          let isNew = channel.id !== action.channel.id;
          if (!isNew) isNewChannel = isNew;
          return isNew;
        });
        if (isNewChannel) channels = [...channels, action.channel];
      }

      let maxCount = (state.isChatPage && 1) || state.chatModalMaxCount;
      if (channels.length > maxCount) {
        channels.splice(0, channels.length - maxCount);
      }
      return {
        ...state,
        currentChannels: channels,
      };

    case CHANGE_CHAT_TYPE:
      return {
        ...state,
        isChatPage: action.isChatPage,
      };
    case SET_LAST_NUMBERS:
      return {
        ...state,
        lastSequenceNumbers: {
          ...state.lastSequenceNumbers,
          ...JSON.parse(action.lastSequenceNumbers),
        },
      };

    case GET_LAST_HAS_READ_MESSAGES:
      return {
        ...state,
      };

    case GET_LAST_HAS_READ_MESSAGES_SUCCESS:
      let lastHasReadMessages = JSON.parse(action.result);
      return {
        ...state,
        lastHasReadMessages: lastHasReadMessages,
      };

    case GET_LAST_HAS_READ_MESSAGES_FAIL:
      return {
        ...state,
      };

    case UPDATE_LAST_HAS_READ_MESSAGES:
      return {
        ...state,
        frozenChannel: action.channelId,
      };

    case UPDATE_LAST_HAS_READ_MESSAGES_SUCCESS:
      let newLastHasReadMessages = { ...state.lastHasReadMessages };
      newLastHasReadMessages[action.result.channelId] =
        action.result.sequenceNumber;
      return {
        ...state,
        lastHasReadMessages: newLastHasReadMessages,
        frozenChannel: null,
      };

    case UPDATE_LAST_HAS_READ_MESSAGES_FAIL:
      return {
        ...state,
      };

    default:
      return state;
  }
}

export function addMessage(messageData, channelId) {
  return {
    type: ADD_MESSAGE,
    messageData,
    channelId,
  };
}

export function setIsAllMessages(channelId) {
  return {
    type: SET_IS_ALL_MESSAGES,
    channelId,
  };
}
/*
export function getMessagesHistory(athleteId, offset) {
  return {
    isSpinnerHidden: true,
    types: [
      GET_MESSAGES_HISTORY,
      GET_MESSAGES_HISTORY_SUCCESS,
      GET_MESSAGES_HISTORY_FAIL,
    ],
    promise: client =>
      client.get(
        `${API_URL}/companies/{state.company.id}/athletes/${athleteId}/messages?offset=${offset}`
      ),
  };
}
export function getChannelMessages(channelId, offset) {
  return {
    isSpinnerHidden: true,
    types: [
      GET_CHANNEL_MESSAGES,
      GET_CHANNEL_MESSAGES_SUCCESS,
      GET_CHANNEL_MESSAGES_FAIL,
    ],
    promise: client =>
      client.get(`${API_URL}/chat/${channelId}/messages?offset=${offset}`),
  };
}

export function getSystemMessages(teamId, offset, typeId, userId) {
  return {
    isSpinnerHidden: true,
    types: [
      GET_SYSTEM_MESSAGES,
      GET_SYSTEM_MESSAGES_SUCCESS,
      GET_SYSTEM_MESSAGES_FAIL,
    ],
    promise: client =>
      client.get(
        `${API_URL}/chat/${teamId}/system?offset=${offset}&typeId=${typeId}&userId=${userId}`
      ),
  };
}

export function getLastHasReadMessages(id) {
  return {
    isSpinnerHidden: true,
    types: [
      GET_LAST_HAS_READ_MESSAGES,
      GET_LAST_HAS_READ_MESSAGES_SUCCESS,
      GET_LAST_HAS_READ_MESSAGES_FAIL,
    ],
    promise: client =>
      client.get(`${API_URL}/messages/lasthasread?user_id=${id}`),
  };
}*/

/*export function updateLastHasReadMessages(data) {
  return {
    isSpinnerHidden: true,
    types: [
      UPDATE_LAST_HAS_READ_MESSAGES,
      UPDATE_LAST_HAS_READ_MESSAGES_SUCCESS,
      UPDATE_LAST_HAS_READ_MESSAGES_FAIL,
    ],
    promise: client => client.put(`${API_URL}/messages/lasthasread`, { data }),
    channelId: data.channelId,
  };
}*/

export function setChatModalMaxCount(chatModalMaxCount) {
  return {
    type: SET_CHAT_MODAL_MAX_COUNT,
    chatModalMaxCount,
  };
}

export function updateUserTyping(data) {
  return {
    type: UPDATE_USER_TYPING,
    data,
  };
}

export function changeCurrentChannel(channel) {
  return {
    type: CHANGE_CURRENT_CHANNEL,
    channel,
  };
}

export function changeChatType(isChatPage) {
  return {
    type: CHANGE_CHAT_TYPE,
    isChatPage,
  };
}
export function setLastSequenceNumbers(lastSequenceNumbers) {
  return {
    type: SET_LAST_NUMBERS,
    lastSequenceNumbers,
  };
}
