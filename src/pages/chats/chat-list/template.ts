const tmpl = `
{{#each chats}}
        <li class="chat-list__item">
            <div class="chat-list__flex-container">
                <div class="chat-list__avatar">
                    {{#if avatar}}<img src="{{avatar}}" alt="avatar"/>{{/if}}
                </div>
                <p class="chat-list__name text-defult"> {{chatName}}</p>
            </div>
            <div class="chat-list__container">
                <div class="chat-list__date">{{date}}</div>
                <div class="chat-list__count text-defult">{{count}}</div>
            </div>
        </li>
    {{/each}}
`;
export default tmpl;
