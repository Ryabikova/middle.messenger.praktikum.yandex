import tmpl from './template';
import './error-page.scss';
import Component from '../../modules/component';
import IComponent from '../../../interfaces/interface';
import Button from '../../components/button';

interface IErrorPage extends IComponent {
  title: string;
  text: string;
  button: Button;
}
export default class ErrorPage extends Component<IErrorPage> {
  constructor(props:IErrorPage) {
    super('div', props);
  }

  render() {
    return this.compile(tmpl, this.props);
  }
}
