import tmpl from './template';
import './button.scss';
import Component from '../../modules/component';
import IComponent from '../../interfaces/interface';

interface IButton extends IComponent {
  label: string;
}
export default class Button extends Component<IButton> {
  constructor(props:IButton) {
    super('div', props);
  }

  render() {
    return this.compile(tmpl, {
      label: this.props.label,
    });
  }
}
