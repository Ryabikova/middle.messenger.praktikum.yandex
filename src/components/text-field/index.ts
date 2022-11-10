import tmpl from './template';
import './text-field.scss';
import Component from '../../modules/component';
import Input from './input';

export default class TextField extends Component {
  constructor(props) {
    super('div', props);
  }

  render() {
    this.children.input = new Input({
      attr: {
        type: this.props.type,
        name: this.props.name,
        class: 'Input__input',
      },
      events: this.props.events,
    });
    return this.compile(tmpl, {
      input: this.props.input,
      error: this.props.error,
      label: this.props.label,
    });
  }
}
