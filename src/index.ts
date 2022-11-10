import FormSingIn from './pages/singIn';
import FormSingUp from './pages/singUp';
import Chats from './pages/chats';
import Profile from './pages/profile';
import ErrorPage from './pages/error';
import render from './utils/renderDOM';

import Button from './components/button';
import Nav from './components/nav';
import { gValidation as V } from './utils/validation';

import './style/style.scss';

const routes = {};
const templates = {};

function route(path, template) {
  if (typeof template === 'function') {
    return routes[path] = template;
  }
  if (typeof template === 'string') {
    return routes[path] = templates[template];
  }
}
function template(name, templateFunction) {
  return templates[name] = templateFunction;
}

template('home', () => {
  const nav = new Nav({
    class: 'nav',
    settings: { withInternalID: true },
    links: [
      { href: '/#/auth', label: 'Страница авторизации' },
      { href: '/#/registration', label: 'Страница регистрации' },
      { href: '/#/chats', label: 'Страница со списком чатов' },
      { href: '/#/profile', label: 'Страница профиля' },
      { href: '/#/404', label: 'Страница 404' },
      { href: '/#/500', label: 'Страница 500' },
    ],
  });
  render('#app', nav);
});

template('singIn', () => {
  const singIn = new FormSingIn({
    attr: {
      class: 'form',
    },
    events: {
      submit: (e) => {
        e.preventDefault();
        const formElement = e.target;
        const formData = new FormData(formElement);
        const login = formData.get('login');
        console.log('login :>> ', login);
        const password = formData.get('password');
        console.log('password :>> ', password);
        if (password.toString() && V.fValidateLogin(login.toString())) {
          console.log('form: Valid');
        }
      },
    },
  });
  render('#app', singIn);
});

template('singUp', () => {
  const singIn = new FormSingUp({
    attr: {
      class: 'form',
    },
    events: {
      submit: (e) => {
        e.preventDefault();
        const formElement = e.target;
        const formData = new FormData(formElement);
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
        const password = formData.get('password');
        console.log('password :>> ', password);
        const repeatPassword = formData.get('repeat_password');
        console.log('repeatPassword :>> ', repeatPassword);
        if (V.fValidatePswd(password.toString()) && V.fValidateLogin(login.toString())
            && V.fValidateEmail(email.toString()) && V.fValidateName(firstName.toString())
            && V.fValidateName(secondName.toString()) && V.fValidatePhone(phone.toString())
            && V.fValidatePswd(repeatPassword.toString())) {
          console.log('form: Valid');
        }
      },
    },
  });
  render('#app', singIn);
});

template('chats', () => {
  const chats = new Chats({});
  render('#app', chats);
});

template('profile', () => {
  const profile = new Profile({});
  render('#app', profile);
});

template('404', () => {
  const errorPage = new ErrorPage({
    title: '404',
    text: 'Страница не найдена',
    button: new Button({
      label: 'Назад к чатам',
      events: {
        click: () => {
          window.location.href = '#/chats';
        },
      },
    }),
  });
  render('#app', errorPage);
});

template('500', () => {
  const errorPage = new ErrorPage({
    title: '500',
    text: 'Мы уже фиксим',
    button: new Button({
      label: 'Назад к чатам',
      events: {
        click: () => {
          window.location.href = '#/chats';
        },
      },
    }),
  });
  render('#app', errorPage);
});

route('/', 'home');
route('/auth', 'singIn');
route('/registration', 'singUp');
route('/chats', 'chats');
route('/profile', 'profile');
route('/404', '404');
route('/500', '500');

function resolveRoute(route) {
  try {
    return routes[route];
  } catch (e) {
    throw new Error(`Route ${route} not found`);
  }
}

function router() {
  console.log('router');
  const url = window.location.hash.slice(1) || '/';
  const route = resolveRoute(url);

  route();
}

window.addEventListener('DOMContentLoaded', () => {
  window.addEventListener('load', router);
  window.addEventListener('hashchange', router);
});
