/* eslint-disable no-undef */
/* eslint-disable no-underscore-dangle */
import { v4 as makeUUID } from 'uuid';
import Handlebars from 'handlebars';
import EventBus from './event-bus';

export default abstract class Component<Props extends Record<string, any> = unknown> {
  static EVENTS = {
    INIT: 'init',
    FLOW_CDM: 'flow:component-did-mount',
    FLOW_CDU: 'flow:component-did-update',
    FLOW_RENDER: 'flow:render',
  };

  private _element: HTMLElement | any;

  private _meta: {tagName: string; propsWithChildren:Props};

  private _id: string;

  public props:Props;

  public children: Props;

  public attr: Record<string, string>;

  eventBus;

  /** JSDoc
   * @param {string} tagName
   * @param {Object} props
   *
   * @returns {void}
   */
  constructor(tagName: string = 'div', propsWithChildren: Props) {
    const eventBus = new EventBus();
    this._meta = {
      tagName,
      propsWithChildren,
    };
    if (!propsWithChildren.settings?.withInternalID) {
      this._id = makeUUID();
    }

    const { props, children } = this._getChildren(propsWithChildren);
    this.children = this._makePropsProxy(children);
    this.props = this._makePropsProxy({ ...props, _id: this._id });

    this.eventBus = () => eventBus;

    this._registerEvents(eventBus);
    eventBus.emit(Component.EVENTS.INIT);
  }

  private _registerEvents(eventBus:EventBus) {
    eventBus.on(Component.EVENTS.INIT, this.init.bind(this));
    eventBus.on(Component.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
    eventBus.on(Component.EVENTS.FLOW_RENDER, this._render.bind(this));
    eventBus.on(Component.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
  }

  private _createResources() {
    const { tagName } = this._meta;
    this._element = this._createDocumentElement(tagName);
  }

  init() {
    this._createResources();
    this.eventBus().emit(Component.EVENTS.FLOW_RENDER);
  }

  private _componentDidMount() {
    this.componentDidMount();

    Object.values(this.children).forEach((child) => {
      child.dispatchComponentDidMount();
    });
  }

  componentDidMount(): void {
  }

  dispatchComponentDidMount() {
    this.eventBus().emit(Component.EVENTS.FLOW_CDM);
  }

  private _componentDidUpdate(oldProps: Props, newProps: Props) {
    const response = this.componentDidUpdate(oldProps, newProps);
    if (response) {
      this.eventBus().emit(Component.EVENTS.FLOW_RENDER);
    }
  }

  componentDidUpdate(oldProps: Props, newProps: Props): boolean {
    if (JSON.stringify(oldProps) === JSON.stringify(newProps)) return false;
    return true;
  }

  setProps = (nextProps: Props) => {
    if (!nextProps) {
      return;
    }
    const { children, props } = this._getChildren(nextProps);
    if (Object.values(children)) {
      Object.assign(this.children, children);
    }
    if (Object.values(props)) {
      Object.assign(this.props, props);
    }
  };

  get element() {
    return this._element;
  }

  private _render() {
    const component = this.render();
    this._removeEvents();
    this._element.innerHTML = ''; // удаляем предыдущее содержимое
    this._element.appendChild(component);
    this._addEvents();
    this._addAttr();
  }

  abstract render():DocumentFragment

  compile(tmpl: string, props: Props): DocumentFragment {
    const propsAndStubs = { ...props };
    Object.entries(this.children).forEach(([key, child]) => {
      propsAndStubs[key] = `<div data-id="${child._id}"></div>`;
    });

    const fragment = <HTMLTemplateElement> this._createDocumentElement('template');

    fragment.innerHTML = Handlebars.compile(tmpl)(propsAndStubs);
    Object.values(this.children).forEach((child) => {
      const stub = fragment.content.querySelector(`[data-id="${child._id}"]`);
      if (stub) { stub.replaceWith(child.getContent()); }
    });

    return fragment.content;
  }

  getContent() {
    return this.element;
  }

  _makePropsProxy(props: Props) {
    const self = this;

    const propsProxy = new Proxy(props, {
      get(target: Props, prop: string) {
        const value = target[prop];
        return typeof value === 'function' ? value.bind(target) : value;
      },
      set(target: Props, prop: string, value) {
        const oldValue = { ...target };
        target[prop as keyof Props] = value;
        self.eventBus().emit(Component.EVENTS.FLOW_CDU, oldValue, target);
        return true;
      },
      deleteProperty() {
        throw new Error('Отказано в доступе');
      },
    });
    return propsProxy;
  }

  _createDocumentElement(tagName: string): HTMLElement {
    const element = document.createElement(tagName);
    element.setAttribute('data-id', this._id);
    return element;
  }

  _addEvents() {
    const { events = {} } = this.props;
    Object.keys(events).forEach((eventName) => {
      this._element.addEventListener(eventName, events[eventName]);
    });
  }

  _addAttr() {
    const { attr = {} } = this.props;
    Object.keys(attr).forEach((attrName) => {
      this._element.setAttribute(attrName, attr[attrName]);
    });
  }

  _removeEvents() {
    const { events = {} } = this.props;
    Object.keys(events).forEach((eventName) => {
      this._element.removeEventListener(eventName, events[eventName]);
    });
  }

  _getChildren(propsWithChildren: Props): {children:Props, props:Props} {
    const children: Props = <Props>{};
    const props: Props = <Props>{};

    Object.entries(propsWithChildren).forEach(([key, value]) => {
      if (value instanceof Component) {
        children[key] = value;
      } else {
        props[key as keyof Props] = value;
      }
    });
    return { children, props };
  }

  show() {
    this.getContent().style.display = 'block';
  }

  hide() {
    this.getContent().style.display = 'none';
  }
}
