import tmpl from './template';
import './search.scss';
import Component from '../../modules/component';
import IComponent from '../../interfaces/interface';

export default class Search extends Component<IComponent> {
  constructor(props:IComponent) {
    super('div', props);
  }

  render() {
    return this.compile(tmpl, this.props);
  }
}
