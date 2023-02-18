import tmpl from './template';
import './text-field.scss';
import Component from '../../modules/component';
import Input from './input';
import IComponent from '../../interfaces/interface';

interface ITextField extends IComponent {
  label?: string;
  error?: string;
  type?: string;
  name?: string;
  input?: Input;
}
export default class TextField extends Component<ITextField> {
  constructor(props:ITextField) {
    const attr = {
      class: 'Input',
    };
    props.input = new Input({
      attr: {
        class: 'Input__input',
        type: props.type,
        name: props.name,
      },
      events: props.events,
    });

    super('div', { attr, ...props });
  }

  render() {
    return this.compile(tmpl, this.props);
  }
}
