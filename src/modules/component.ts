/* eslint-disable no-undef */
/* eslint-disable no-underscore-dangle */
import { v4 as makeUUID } from 'uuid';
import Handlebars from 'handlebars';
import EventBus from './event-bus';

export default class Component {
  static EVENTS = {
    INIT: 'init',
    FLOW_CDM: 'flow:component-did-mount',
    FLOW_CDU: 'flow:component-did-update',
    FLOW_RENDER: 'flow:render',
  };

  _element = null;

  _meta = null;

  _id;

  props;

  children;

  attr;

  eventBus;

  /** JSDoc
   * @param {string} tagName
   * @param {Object} props
   *
   * @returns {void}
   */
  constructor(tagName = 'div', propsWithChildren: any = {}) {
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

  _registerEvents(eventBus) {
    eventBus.on(Component.EVENTS.INIT, this.init.bind(this));
    eventBus.on(Component.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
    eventBus.on(Component.EVENTS.FLOW_RENDER, this._render.bind(this));
    eventBus.on(Component.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
  }

  _createResources() {
    const { tagName } = this._meta;
    this._element = this._createDocumentElement(tagName);
  }

  init() {
    this._createResources();
    this.eventBus().emit(Component.EVENTS.FLOW_RENDER);
  }

  _componentDidMount() {
    this.componentDidMount();

    Object.values(this.children).forEach((child) => {
      child.dispatchComponentDidMount();
    });
  }

  componentDidMount() {}

  dispatchComponentDidMount() {
    this.eventBus().emit(Component.EVENTS.FLOW_CDM);
  }

  _componentDidUpdate(oldProps, newProps) {
    const response = this.componentDidUpdate(oldProps, newProps);
    if (response) {
      this.eventBus().emit(Component.EVENTS.FLOW_RENDER);
    }
  }

  componentDidUpdate(oldProps: any, newProps: any): boolean {
    if (JSON.stringify(oldProps) === JSON.stringify(newProps)) return false;
    return true;
  }

  setProps = (nextProps) => {
    if (!nextProps) {
      return;
    }
    Object.assign(this.props, nextProps);
  };

  get element() {
    return this._element;
  }

  _render() {
    const component = this.render();
    this._removeEvents();
    this._element.innerHTML = ''; // удаляем предыдущее содержимое

    this._element.appendChild(component);
    this._addEvents();
    this._addAttr();
  }

  render() {}

  compile(tmpl: string, props: any): DocumentFragment {
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

  _makePropsProxy(props: any): any {
    const self = this;

    const propsProxy = new Proxy(props, {
      get(target, prop: string) {
        const value = target[prop];
        return typeof value === 'function' ? value.bind(target) : value;
      },
      set(target, prop: string, value) {
        target[prop] = value;
        self.eventBus().emit(Component.EVENTS.FLOW_CDU);
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

  _getChildren(propsWithChildren: any): {[key: string]: {}} {
    const children = {};
    const props = {};

    Object.entries(propsWithChildren).forEach(([key, value]) => {
      if (value instanceof Component) {
        children[key] = value;
      } else {
        props[key] = value;
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
