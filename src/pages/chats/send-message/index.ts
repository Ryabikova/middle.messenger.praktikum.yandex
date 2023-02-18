import tmpl from './template';
import './send-message.scss';
import Component from '../../../modules/component';
import IComponent from '../../../interfaces/interface';

export default class SendMessage extends Component<IComponent> {
  constructor(props:IComponent) {
    super('form', props);
  }

  render() {
    return this.compile(tmpl, {
      events: this.props.events,
      attr: this.props.attr,
    });
  }
}
