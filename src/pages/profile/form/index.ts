import tmpl from './template';
import Component from '../../../modules/component';
import IComponent from '../../../interfaces/interface';
import TextField from '../../components/text-field';
import Button from '../../components/button';

interface IFormProfile extends IComponent {
  email: TextField;
  login: TextField;
  firstName: TextField;
  secondName: TextField;
  phone: TextField;
  oldPassword: TextField;
  newPassword: TextField;
  button: Button;
}

export default class FormProfile extends Component<IFormProfile> {
  constructor(props:IFormProfile) {
    super('form', props);
  }

  render() {
    return this.compile(tmpl, this.props);
  }
}
