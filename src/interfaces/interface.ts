export default interface IComponent {
    tagName?: string;
    attr?: Record<string, string>;
    settings?: Record<string, any>;
    events?: {[key:string]: (e:Event) => void};
}

