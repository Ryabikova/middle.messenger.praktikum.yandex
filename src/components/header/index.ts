import tmpl from './template';
// import Handlebars from 'handlebars/dist/handlebars.runtime';
import './header.scss';
import Component from '../../modules/component';

// Handlebars.registerPartial('input', template);

export default class Header extends Component {
    constructor(props) {
      super('div', props);
    }
  
    render() {
      return this.compile(tmpl, this.props);
    }
  }