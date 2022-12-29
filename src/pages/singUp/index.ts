import tmpl from './template';
import Component from '../../modules/component';
import Header from '../../components/header';
import Button from '../../components/button';
import TextField from '../../components/text-field';
import Link from '../../components/link';
import Validation from '../../utils/validation';
import IComponent from '../../interfaces/interface';

interface IFormSingUp extends IComponent {
  link?: Link;
  button?: Button;
  login?: TextField;
  password?: TextField;
  email?: TextField;
  firstName?: TextField;
  secondName?: TextField;
  phone?: TextField;
  repeatPassword?: TextField;
  header?: Header;
}
export default class FormSingUp extends Component<IFormSingUp> {
  constructor(props:IFormSingUp) {
    props.button = new Button({ label: 'Зарегистрироваться' });
    props.link = new Link({ href: '/#/auth', label: 'Войти' });
    props.email = new TextField({
      error: 'Некорректный email',
      type: 'text',
      name: 'email',
      label: 'Почта',
      events: {
        blur: Validation.validateShow,
      },
    });
    props.login = new TextField({
      error: 'Некорректный логин',
      type: 'text',
      name: 'login',
      label: 'Логин',
      events: {
        blur: Validation.validateShow,
      },
    });
    props.firstName = new TextField({
      error: 'Некорректное имя',
      type: 'text',
      name: 'first_name',
      label: 'Имя',
      events: {
        blur: Validation.validateShow,
      },
    });
    props.secondName = new TextField({
      error: 'Некорректная фамилия',
      type: 'text',
      name: 'second_name',
      label: 'Фамилия',
      events: {
        blur: Validation.validateShow,
      },
    });
    props.phone = new TextField({
      error: 'Некорректный телефон',
      type: 'text',
      name: 'tel',
      label: 'Телефон',
      events: {
        blur: Validation.validateShow,
      },
    });
    props.password = new TextField({
      error: 'Некорректный пароль',
      type: 'password',
      name: 'password',
      label: 'Пароль',
      events: {
        blur: Validation.validateShow,
      },
    });
    props.repeatPassword = new TextField({
      error: 'Некорректный пароль',
      type: 'password',
      name: 'repeat_password',
      label: 'Повторите',
      events: {
        blur: Validation.validateShow,
      },
    });
    props.header = new Header({ title: 'Зарегистрироваться' });

    super('form', props);
  }

  render() {
    return this.compile(tmpl, this.props);
  }
}
