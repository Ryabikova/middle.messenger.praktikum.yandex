import tmpl from './template';
// import Handlebars from 'handlebars/dist/handlebars.runtime';
import './chat-list.scss';
import Component from '../../../modules/component';

// Handlebars.registerPartial('search', template);
export default class ChatList extends Component {
  constructor(props) {
    super('ul', props);
  }

  render() {
    return this.compile(tmpl, this.props);
  }
}
