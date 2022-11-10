import tmpl from './template';
import Component from '../../modules/component';
import Header from '../../components/header';
import Button from '../../components/button';
import TextField from '../../components/text-field';
import Link from '../../components/link';
import { gValidation as V } from '../../utils/validation';

// Handlebars.registerPartial('search', template);
export default class FormSingUp extends Component {
  constructor(props) {
    super('form', props);
  }

  render() {
    this.children.button = new Button({ label: 'Зарегистрироваться' });
    this.children.link = new Link({ href: '/#/auth', label: 'Войти' });
    this.children.email = new TextField({
      error: false,
      type: 'text',
      name: 'email',
      label: 'Почта',
      events: {
        blur: (e) => {
          if (V.fValidateEmail(e.target.value)) {
            console.log('Valid');
          }
        },
      },
    });
    this.children.login = new TextField({
      error: false,
      type: 'text',
      name: 'login',
      label: 'Логин',
      events: {
        blur: (e) => {
          if (V.fValidateLogin(e.target.value)) {
            console.log('Valid');
          }
        },
      },
    });
    this.children.firstName = new TextField({
      error: false,
      type: 'text',
      name: 'first_name',
      label: 'Имя',
      events: {
        blur: (e) => {
          if (V.fValidateName(e.target.value)) {
            console.log('Valid');
          }
        },
      },
    });
    this.children.secondName = new TextField({
      error: false,
      type: 'text',
      name: 'second_name',
      label: 'Фамилия',
      events: {
        blur: (e) => {
          if (V.fValidateName(e.target.value)) {
            console.log('Valid');
          }
        },
      },
    });
    this.children.phone = new TextField({
      error: false,
      type: 'text',
      name: 'phone',
      label: 'Телефон',
      events: {
        blur: (e) => {
          if (V.fValidatePhone(e.target.value)) {
            console.log('Valid');
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
          if (V.fValidatePswd(e.target.value)) {
            console.log('Valid');
          }
        },
      },
    });
    this.children.repeatPassword = new TextField({
      error: false,
      type: 'password',
      name: 'repeat_password',
      label: 'Повторите',
      events: {
        blur: (e) => {
          if (V.fValidatePswd(e.target.value)) {
            console.log('Valid');
          }
        },
      },
    });
    this.children.header = new Header({ title: 'Зарегистрироваться' });

    return this.compile(tmpl, {
      events: this.props.events,
      button: this.props.button,
      link: this.props.link,
      login: this.props.login,
      password: this.props.password,
      header: this.props.header,
      email: this.props.email,
      firstName: this.props.firstName,
      secondName: this.props.secondName,
      phone: this.props.phone,
      repeatPassword: this.props.repeatPassword,
    });
  }
}
