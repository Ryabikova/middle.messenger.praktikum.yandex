const tmpl = `
<ul class="chat__message-list">
    {{#each listMessage}}
        <li class="chat__message">
            <div class="chat__message-text">{{text}}</div>
            <div class="chat__message-date">{{date}}</div>   
        </li>
    {{/each}}
</ul>
<div class="chat__message-send-container">{{{sendMessage}}}</div>
`;
export default tmpl;
