import tmpl from './template';
import './change-avatar.scss';
import Component from '../../../modules/component';
import IComponent from '../../../interfaces/interface';

export default class ChangeAvatar extends Component<IComponent> {
  constructor(props:IComponent) {
    super('div', props);
  }

  render() {
    return this.compile(tmpl, this.props);
  }
}
