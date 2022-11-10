const tmpl = `
<div class="page-main chats bg-grey">
    <div class="chats__list-container"> 
        <div class="chats__top">
            {{{link}}}  
            {{{search}}}
        </div>
        {{{chatList}}}
    </div>
    <div class="chats__message-container">{{{chat}}}</div>
</div>
`;
export default tmpl;
