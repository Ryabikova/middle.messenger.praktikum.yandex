import tmpl from './template';
import Component from '../../../modules/component';
import IComponent from '../../interfaces/interface';

export default class Input extends Component<IComponent> {
  constructor(props:IComponent) {
    super('input', props);
  }

  render() {
    return this.compile(tmpl, this.props);
  }
}
