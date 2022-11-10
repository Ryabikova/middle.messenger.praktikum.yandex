import tmpl from './template';
import './button-circle.scss';
import Component from '../../modules/component';

export default class ButtonCircle extends Component {
  constructor(props) {
    super('div', props);
  }

  render() {
    return this.compile(tmpl, this.props);
  }
}
