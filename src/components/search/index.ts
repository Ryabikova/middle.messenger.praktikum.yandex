import tmpl from './template';
// import Handlebars from 'handlebars/dist/handlebars.runtime';
import './search.scss';
import Component from '../../modules/component';

// Handlebars.registerPartial('search', template);
export default class Search extends Component {
  constructor(props) {
    super('div', props);
  }

  render() {
    return this.compile(tmpl, this.props);
  }
}
