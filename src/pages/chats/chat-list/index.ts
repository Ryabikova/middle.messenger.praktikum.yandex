import tmpl from './template';
import './chat-list.scss';
import Component from '../../../modules/component';
import IComponent from '../../../interfaces/interface';

interface IChat extends IComponent {
  chats: Array<
    {
      avatar: string;
      chatName: string;
      date: string;
      count: string;
    }
  >
}
export default class ChatList extends Component<IChat> {
  constructor(props:IChat) {
    super('ul', props);
  }

  render() {
    return this.compile(tmpl, this.props);
  }
}
