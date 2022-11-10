import tmpl from './template';
// import Handlebars from 'handlebars/dist/handlebars.runtime';
import './send-message.scss';
import Component from '../../../modules/component';

// Handlebars.registerPartial('search', template);
export default class SendMessage extends Component {
  constructor(props) {
    super('form', props);
  }

  render() {
    return this.compile(tmpl, {
      events: this.props.events,
      attr: this.props.attr,
    });
  }
}
