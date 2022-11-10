import tmpl from './template';
// import Handlebars from 'handlebars/dist/handlebars.runtime';
import './link.scss';
import Component from '../../modules/component';

// Handlebars.registerPartial('input', template);

export default class Link extends Component {
    constructor(props) {
      super('div', props);
    }
  
    render() {
      return this.compile(tmpl, this.props);
    }
  }