<template>
  <section class="chat-box">
    <div class="chat-box-list-container" ref="chatbox">
      <ul class="chat-box-list">
        <li
          class="message d-flex px-3 py-5"
          v-for="(message, idx) in messages"
          :key="idx"
          :class="message.author"
        >
          <div class="profile ">
          </div>
          <p class="px-1 py-1 align-center"
          v-for="(msg, idx) in message.text"
          :key="idx"
          >
            <span @click="() => chatbotResp(msg)">
                {{msg }}
            </span>
          </p>
        </li>
      </ul>
    </div>
    <div class="chat-inputs">
      <input
        type="text"
        v-model="message"
        @keyup.enter="sendMessage"
      />
      <button @click="sendMessage">Enviar</button>
    </div>
  </section>
</template>

<script>
import { initialOptions, jsonMessage } from '../utils/messageChatbot';

export default {
  name: 'ChatBox',
  data: () => ({
    message: '',
    messages: [{
      text: ['Hola soy el chatbot'],
      author: 'server',

    }],
  }),
  methods: {
    sendMessage() {
      const { message } = this;
      this.messages.push({
        text: [message],
        author: 'client',

      });
      this.message = '';
      setTimeout(() => {
        this.messages.push({
          text: initialOptions,
          author: 'server',

        });
      }, 2000);
    },
    chatbotResp(msg) {
      this.messages.push({
        text: [msg],
        author: 'client',
      });
      setTimeout(() => {
        this.messages.push({
          text: jsonMessage(msg),
          author: 'server',

        });
      }, 2000);
    },
  },
};
</script>

<style scoped lang="scss">
.chat-box,
.chat-box-list {
  display: flex;
  flex-direction: column;
  list-style-type: none;
}
.chat-box-list-container {
  overflow: scroll;
  margin-bottom: 1px;
}
.chat-box-list {
  padding-left: 10px;
  padding-right: 10px;
  span {
    padding: 8px;
    color: white;
    border-radius: 4px;
  }
  .server {
    flex-direction: row-reverse;
    span {
      background: #99cc00;
    }
    p {
      float: right;
    }
    .profile{
    background:#99cc00;
    width: 50px;
    height: 50px;
    border-radius: 25px;
    }
  }
  .client {
    span {
      background: #0070C8;
    }
    p {
      float: left;
    }
    .profile{
    background: #0070C8;
    width: 50px;
    height: 50px;
    border-radius: 25px;
}
  }
}

.chat-box {
  margin: 10px;
  border: 1px solid #999;
  width: 50vw;
  height: 50vh;
  border-radius: 4px;
  margin-left: auto;
  margin-right: auto;
  align-items: space-between;
  justify-content: space-between;
}
.chat-inputs {
  display: flex;

  input {
    line-height: 3;
    width: 100%;
    border: 1px solid #999;
    border-left: none;
    border-bottom: none;
    border-right: none;
    border-bottom-left-radius: 4px;
    padding-left: 15px;
  }
  button {
    width: 145px;
    color: white;
    background: #0070C8;
    border-color: #999;
    border-bottom: none;
    border-right:none;
    border-bottom-right-radius: 3px;
  }
}
</style>
