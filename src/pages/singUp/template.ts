const tmpl = `
    <div class="singUp__container container ">
        {{{header}}}
        <div class="form__input">
            {{{email}}}
        </div>
        <div class="form__input">
            {{{login}}}
        </div>
        <div class="form__input">
            {{{firstName}}}
        </div>
        <div class="form__input">
            {{{secondName}}}
        </div>
        <div class="form__input">
            {{{phone}}}
        </div>
        <div class="form__input">
            {{{password}}}
        </div>
        <div class="form__input">
            {{{repeatPassword}}}
        </div>
        <div class="form__btn-container">
            {{{button}}}
            {{{link}}}
        </div>
    </div>
`;
export default tmpl;
