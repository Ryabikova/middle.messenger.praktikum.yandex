const tmpl = `
    <div class="Input__wrapper ">
        {{{input}}}
        {{#if label}}
            <span class="Input__label">{{label}}</span>
        {{/if}}
            <div class="Input__text-error">{{error}}</div>
    </div>
`;
export default tmpl;
