import tmpl from './template';
import Component from '../../../modules/component';

// Handlebars.registerPartial('search', template);
export default class FormProfile extends Component {
  constructor(props) {
    super('form', props);
  }

  render() {
    return this.compile(tmpl, this.props);
  }
}
