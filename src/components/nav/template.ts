const tmpl = `
    {{#each links}}
        <li><a href="{{this.href}}" class="link">{{this.label}}</a></li>
    {{/each}}
`;
export default tmpl;
