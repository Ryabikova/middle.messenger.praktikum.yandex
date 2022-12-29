import tmpl from './template';
import Component from '../../modules/component';
import Header from '../../components/header';
import Button from '../../components/button';
import TextField from '../../components/text-field';
import Link from '../../components/link';
import IComponent from '../../interfaces/interface';

interface ISingIn extends IComponent {
  link?: Link;
  button?: Button;
  login?: TextField;
  password?: TextField;
  header?: Header;
}

export default class FormSingIn extends Component<ISingIn> {
  constructor(props:ISingIn) {
    props.button = new Button({ label: 'Авторизоваться' });
    props.link = new Link({ href: '/#/registration', label: 'Нет аккаута?' });
    props.login = new TextField({
      error: '',
      type: 'text',
      name: 'login',
      label: 'Логин',
    });
    props.password = new TextField({
      error: '',
      type: 'password',
      name: 'password',
      label: 'Пароль',
    });
    props.header = new Header({ title: 'Вход' });
    super('form', props);
  }

  render() {
    return this.compile(tmpl, this.props);
  }
}
