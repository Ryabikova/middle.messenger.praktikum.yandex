const tmpl = `
<div class="Input">
    <div class="Input__wraper">
        {{{input}}}
        {{#if label}}
            <span class="Input__label">{{label}}</span>
        {{/if}}
    </div>
</div>
`;
export default tmpl;
