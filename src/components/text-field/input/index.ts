import tmpl from './template';
import Component from '../../../modules/component';

// Handlebars.registerPartial('input', template);

export default class Input extends Component {
  constructor(props) {
    super('input', props);
  }

  render() {
    return this.compile(tmpl, this.props);
  }
}
