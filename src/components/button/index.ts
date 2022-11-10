import tmpl from './template';
import './button.scss';
import Component from '../../modules/component';

export default class Button extends Component {
  constructor(props) {
    super('div', props);
  }

  render() {
    return this.compile(tmpl, this.props);
  }
}
