import tmpl from './template';
// import Handlebars from 'handlebars/dist/handlebars.runtime';
import './profile.scss';
import Component from '../../modules/component';
import FormProfile from './form';
import ButtonCircle from '../../components/button-circle';
import ChangeAvatar from './change-avatar';
import TextField from '../../components/text-field';
import Button from '../../components/button';
import { gValidation as V } from '../../utils/validation';

// Handlebars.registerPartial('search', template);
export default class Profile extends Component {
  constructor(props) {
    super('div', props);
  }

  render() {
    this.children.back = new ButtonCircle({
      type: 'button',
      icon: 'fa-solid fa-arrow-left',
      events: {
        click: (e) => {
          window.location.href = '/';
        },
      },
    });
    this.children.changeAvatar = new ChangeAvatar({});
    this.children.form = new FormProfile({
      email: new TextField({ type: 'text', name: 'email', label: 'Почта' }),
      login: new TextField({ type: 'text', name: 'login', label: 'Логин' }),
      firstName: new TextField({ type: 'text', name: 'first_name', label: 'Имя' }),
      secondName: new TextField({ type: 'text', name: 'second_name', label: 'Фамилия' }),
      phone: new TextField({ type: 'text', name: 'phone', label: 'Телефон' }),
      oldPassword: new TextField({ type: 'password', name: 'password', label: 'Старый пароль' }),
      newPassword: new TextField({
        type: 'password',
        name: 'new_password',
        label: 'Новый пароль',
      }),
      button: new Button({
        label: 'Сохранить',
      }),
      events: {
        submit: (e) => {
          e.preventDefault();
          const formElement = e.target;
          const formData = new FormData(formElement);
          console.log('formData :>> ', formData);
          const email = formData.get('email');
          console.log('email :>> ', email);
          const login = formData.get('login');
          console.log('login :>> ', login);
          const firstName = formData.get('first_name');
          console.log('firstName :>> ', firstName);
          const secondName = formData.get('second_name');
          console.log('secondName :>> ', secondName);
          const phone = formData.get('phone');
          console.log('phone :>> ', phone);
          const oldPassword = formData.get('password');
          console.log('oldPassword :>> ', oldPassword);
          const newPassword = formData.get('new_password');
          console.log('newPassword :>> ', newPassword);
          if (V.fValidatePswd(oldPassword.toString()) && V.fValidateLogin(login.toString())
            && V.fValidateEmail(email.toString()) && V.fValidateName(firstName.toString())
            && V.fValidateName(secondName.toString()) && V.fValidatePhone(phone.toString())
            && V.fValidatePswd(newPassword.toString())) {
            console.log('form: Valid');
          }
        },
      },
    });
    return this.compile(tmpl, {
      back: this.props.back,
      changeAvatar: this.props.changeAvatar,
      form: this.props.form,
    });
  }
}
