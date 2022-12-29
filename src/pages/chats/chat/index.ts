import tmpl from './template';
import './chat.scss';
import Component from '../../../modules/component';
import IComponent from '../../../interfaces/interface';
import SendMessage from './send-message';

interface IChat extends IComponent {
  listMessage: Array<
    {
      text: string;
      date: string;
    }
  >
  sendMessage: SendMessage;
}
export default class Chat extends Component<IChat> {
  constructor(props:IChat) {
    super('div', props);
  }

  render() {
    return this.compile(tmpl, this.props);
  }
}
