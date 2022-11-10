const tmpl = `
    {{{email}}}
    {{{login}}}
    {{{firstName}}}
    {{{secondName}}}
    {{{phone}}}
    <div class="profile__pswd">
        <div class="text-defult">Изменить пароль</div>
        {{{oldPassword}}}
        {{{newPassword}}}
    </div>
    <div class="profile__action">
        {{{button}}}
    </div>
`;
export default tmpl;
