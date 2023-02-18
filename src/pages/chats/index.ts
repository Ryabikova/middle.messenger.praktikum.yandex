import tmpl from './template';
import './chats.scss';
import Component from '../../modules/component';
import Link from '../../components/link';
import Search from '../../components/search';
import ChatList from './chat-list';
import Chat from './chat';
import SendMessage from './send-message';
import IComponent from '../../interfaces/interface';

interface IChats extends IComponent {
  link?: Link;
  search?: Search;
  chatList?: ChatList;
  chat?: Chat;
}
export default class Chats extends Component<IChats> {
  constructor(props:IChats) {
    props.link = new Link({ href: '/#/profile', label: 'Профиль' });
    props.search = new Search({});
    props.chatList = new ChatList({
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
    props.chat = new Chat({
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
            const formElement = e.target as HTMLFormElement;
            if (formElement) {
              const formData = new FormData(formElement);
              const message = formData.get('message');
              if (message) {
                console.log('message :>> ', message);
              }
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
    super('div', props);
  }

  render() {
    return this.compile(tmpl, this.props);
  }
}
