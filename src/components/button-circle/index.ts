import tmpl from './template';
import './button-circle.scss';
import Component from '../../modules/component';
import IComponent from '../../interfaces/interface';

interface IButton extends IComponent {
  icon: string;
}
export default class ButtonCircle extends Component<IButton> {
  constructor(props:IButton) {
    super('div', props);
  }

  render() {
    return this.compile(tmpl, this.props);
  }
}
