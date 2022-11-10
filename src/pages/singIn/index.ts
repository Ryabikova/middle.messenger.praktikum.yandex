import tmpl from './template';
import Component from '../../modules/component';
import Header from '../../components/header';
import Button from '../../components/button';
import TextField from '../../components/text-field';
import Link from '../../components/link';
import { gValidation as V } from '../../utils/validation';

// Handlebars.registerPartial('search', template);
export default class FormSingIn extends Component {
  constructor(props) {
    super('form', props);
  }

  render() {
    this.children.button = new Button({ label: 'Авторизоваться' });
    this.children.link = new Link({ href: '/#/registration', label: 'Нет аккаута?' });
    this.children.login = new TextField({
      error: false,
      type: 'text',
      name: 'login',
      label: 'Логин',
      events: {
        blur: (e) => {
          if (V.fValidateLogin(e.target.value)) {
            console.log('Логин: Valid');
          }
        },
      },
    });
    this.children.password = new TextField({
      error: false,
      type: 'password',
      name: 'password',
      label: 'Пароль',
      events: {
        blur: (e) => {
          if (e.target.value) {
            console.log('Пароль: Valid');
          }
        },
      },
    });
    this.children.header = new Header({ title: 'Вход' });
    return this.compile(tmpl, {
      events: this.props.events,
      button: this.props.button,
      link: this.props.link,
      login: this.props.login,
      password: this.props.password,
      header: this.props.header,
    });
  }
}
