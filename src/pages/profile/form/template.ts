const tmpl = `
    {{{email}}}
    {{{login}}}
    {{{firstName}}}
    {{{secondName}}}
    {{{phone}}}
    <div class="profile__pswd">
        <p class="text-defult">Изменить пароль</p>
        {{{oldPassword}}}
        {{{newPassword}}}
    </div>
    <div class="profile__action">
        {{{button}}}
    </div>
`;
export default tmpl;
