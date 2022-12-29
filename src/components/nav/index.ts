import tmpl from './template';
import './nav.scss';
import Component from '../../modules/component';
import IComponent from '../../interfaces/interface';

interface INav extends IComponent {
  links: Array<{
    href: string;
    label: string;
  }>;
}
export default class Nav extends Component<INav> {
  constructor(props:INav) {
    super('nav', props);
  }

  render() {
    return this.compile(tmpl, this.props);
  }
}
