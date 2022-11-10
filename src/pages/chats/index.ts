import tmpl from './template';
import './chats.scss';
import Component from '../../modules/component';
import Link from '../../components/link';
import Search from '../../components/search';
import ChatList from './chat-list';
import Chat from './chat';
import SendMessage from './send-message';

export default class Chats extends Component {
  constructor(props) {
    super('div', props);
  }

  render() {
    this.children.link = new Link({ href: '/#/profile', label: 'Профиль' });
    this.children.search = new Search({});
    this.children.chatList = new ChatList({
      tag: 'ul',
      chats: [
        {
          avatar: '',
          chatName: 'Киноклуб',
          count: '2',
          date: '10:49',
        },
        {
          avatar: '',
          chatName: 'Киноклуб',
          count: '2',
          date: '10:49',
        },
        {
          avatar: '',
          chatName: 'Киноклуб',
          count: '2',
          date: '10:49',
        },
      ],
    });
    this.children.chat = new Chat({
      attr: {
        class: 'chat',
      },
      sendMessage: new SendMessage({
        attr: {
          class: 'send-message',
        },
        events: {
          submit: (e) => {
            e.preventDefault();
            const formElement = e.target;
            const formData = new FormData(formElement);
            const message = formData.get('message');
            console.log('message :>> ', message);
            if (message) {
              console.log('Valid');
            }
          },
        },
      }),
      listMessage: [
        {
          text: 'Привет! Смотри, тут всплыл интересный кусок лунной космической истории — НАСА в какой-то момент попросила Хассельблад адаптировать модель SWC для полетов на Луну.',
          date: '11:56',
        },
      ],
    });
    return this.compile(tmpl, {
      search: this.props.search,
      chatList: this.props.chatList,
      link: this.props.link,
      chat: this.props.chat,
    });
  }
}
