import tmpl from './template';
import './link.scss';
import Component from '../../modules/component';
import IComponent from '../../interfaces/interface';

interface ILink extends IComponent {
  label: string;
  href: string;
}
export default class Link extends Component<ILink> {
  constructor(props: ILink) {
    super('div', props);
  }

  render() {
    return this.compile(tmpl, this.props);
  }
}
