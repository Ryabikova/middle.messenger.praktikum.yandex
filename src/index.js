import homeTmpl from './index.hbs';
import singInTmpl from './pages/singIn/singIn.hbs';
import singUpTmpl from './pages/singUp/singUp.hbs';
import chatsTmpl from './pages/chats/chats.hbs';
// import messageTmpl from './pages/message/message.hbs';
import profileTmpl from './pages/profile/profile.hbs';
import tmpl404 from './pages/404/404.hbs';
import tmpl500 from './pages/500/500.hbs';

import './components/button';
import './components/input';

import './style/style.scss'

let routes = {};
let templates = {};
let app_div = null;


function route (path, template) {
    if (typeof template === 'function') {
        return routes[path] = template;
    }
    else if (typeof template === 'string') {
        return routes[path] = templates[template];
    } else {
        return;
    };
};
function template (name, templateFunction) {
    return templates[name] = templateFunction;
};

template('home', () => {
    app_div.innerHTML = homeTmpl({ variable: 'Hello world' });
});

template('singIn', () => {
    app_div.innerHTML = singInTmpl({});
});

template('singUp', () => {
    app_div.innerHTML = singUpTmpl({});
});

template('chats', () => {
    app_div.innerHTML = chatsTmpl({});
});

// template('message', () => {
//     app_div.innerHTML = messageTmpl({});
// });

template('profile', () => {
    app_div.innerHTML = profileTmpl({});
});

template('404', () => {
    app_div.innerHTML = tmpl404({});
});

template('500', () => {
    app_div.innerHTML = tmpl500({});
});

route('/', 'home');
route('/auth', 'singIn');
route('/registration', 'singUp');
route('/chats', 'chats');
// route('/message', 'message');
route('/profile', 'profile');
route('/404', '404');
route('/500', '500');

function resolveRoute(route) {
    try {
        return routes[route];
    } catch (e) {
        throw new Error(`Route ${route} not found`);
    };
};

function router(evt) {
    console.log("router")
    let url = window.location.hash.slice(1) || '/';
    let route = resolveRoute(url);

    route();
};


window.addEventListener('DOMContentLoaded', () => {
    app_div = document.querySelector('#app');
    window.addEventListener('load', router);
    window.addEventListener('hashchange', router);
});
  
