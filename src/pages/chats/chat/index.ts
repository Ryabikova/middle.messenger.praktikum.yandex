import tmpl from './template';
// import Handlebars from 'handlebars/dist/handlebars.runtime';
import './chat.scss';
import Component from '../../../modules/component';

// Handlebars.registerPartial('search', template);
export default class Chat extends Component {
  constructor(props) {
    super('div', props);
  }

  render() {
    return this.compile(tmpl, {
      sendMessage: this.props.sendMessage,
      events: this.props.events,
      listMessage: this.props.listMessage,
      attr: this.props.attr,
    });
  }
}
