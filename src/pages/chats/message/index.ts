import tmpl from './template';
// import Handlebars from 'handlebars/dist/handlebars.runtime';
import './message.scss';
import Component from '../../../modules/component';

// Handlebars.registerPartial('search', template);
export default class Message extends Component {
  constructor(props) {
    super('div', props);
  }

  render() {
    return this.compile(tmpl, this.props);
  }
}
