import tmpl from './template';
import './header.scss';
import Component from '../../modules/component';

interface IHeader {
  tagName?: string;
  title: string;
}
export default class Header extends Component<IHeader> {
  constructor(props:IHeader) {
    super('div', props);
  }

  render() {
    return this.compile(tmpl, this.props);
  }
}
