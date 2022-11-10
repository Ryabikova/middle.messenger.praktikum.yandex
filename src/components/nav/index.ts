import tmpl from './template';
// import Handlebars from 'handlebars/dist/handlebars.runtime';
import './nav.scss';
import Component from '../../modules/component';

// Handlebars.registerPartial('input', template);

export default class Nav extends Component {
  constructor(props) {
    super('ul', props);
  }

  render() {
    return this.compile(tmpl, this.props);
  }
}
