import tmpl from './template';
import './profile.scss';
import Component from '../../modules/component';
import FormProfile from './form';
import ButtonCircle from '../../components/button-circle';
import ChangeAvatar from './change-avatar';
import TextField from '../../components/text-field';
import Button from '../../components/button';
import Validation from '../../utils/validation';
import IComponent from '../../interfaces/interface';

interface IProfile extends IComponent {
  back?: ButtonCircle;
  changeAvatar?: ChangeAvatar;
  form?: FormProfile;
}

export default class Profile extends Component<IProfile> {
  constructor(props:IProfile) {
    props.back = new ButtonCircle({
      icon: 'fa-solid fa-arrow-left',
      events: {
        click: (e) => {
          window.location.href = '/';
        },
      },
    });
    props.changeAvatar = new ChangeAvatar({});
    props.form = new FormProfile({
      email: new TextField({
        error: 'Некорректный email',
        type: 'text',
        name: 'email',
        label: 'Почта',
        events: {
          blur: Validation.validateShow,
        },
      }),
      login: new TextField({
        error: 'Некорректный логин',
        type: 'text',
        name: 'login',
        label: 'Логин',
        events: {
          blur: Validation.validateShow,
        },
      }),
      firstName: new TextField({
        error: 'Некорректное имя',
        type: 'text',
        name: 'first_name',
        label: 'Имя',
        events: {
          blur: Validation.validateShow,
        },
      }),
      secondName: new TextField({
        error: 'Некорректная фамилия',
        type: 'text',
        name: 'second_name',
        label: 'Фамилия',
        events: {
          blur: Validation.validateShow,
        },
      }),
      phone: new TextField({
        error: 'Некорректный телефон',
        type: 'text',
        name: 'phone',
        label: 'Телефон',
        events: {
          blur: Validation.validateShow,
        },
      }),
      oldPassword: new TextField({
        error: 'Некорректный пароль',
        type: 'password',
        name: 'password',
        label: 'Старый пароль',
        events: {
          blur: Validation.validateShow,
        },
      }),
      newPassword: new TextField({
        error: 'Некорректный пароль',
        type: 'password',
        name: 'new_password',
        label: 'Новый пароль',
        events: {
          blur: Validation.validateShow,
        },
      }),
      button: new Button({
        label: 'Сохранить',
      }),
      events: {
        submit: (e) => {
          e.preventDefault();
          Validation.validateForm();
        },
      },
    });
    super('div', props);
  }

  render() {
    return this.compile(tmpl, this.props);
  }
}
