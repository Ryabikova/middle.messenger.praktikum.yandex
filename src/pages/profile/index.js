import './profile.scss'
import template from './profile.hbs';
import Handlebars from 'handlebars/dist/handlebars.runtime';
import './profile-input';
Handlebars.registerPartial('profile', template);