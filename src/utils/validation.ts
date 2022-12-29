export class Validation {
  static rules: Record<string, RegExp> = {
    login: /^(?=.*[a-zA-Z])([a-zA-Z0-9-_]){3,20}$/,
    password: /^(?=.*[A-Z].*[A-Z])(?=.*[0-9].*[0-9]).{8,40}$/,
    email: /^[a-zA-Z0-9._]+@[a-z0-9-]+\.[a-zA-Z]{2,4}$/,
    tel: /^\+?[0-9]{10,15}$/,
    name: /^[A-ZА-Я][а-яА-Яa-zA-Z0-9-]+$/,
  };

  public static validate(value: string, name: string, type: string): boolean {
    let isValid = true;
    if (!value) {
      isValid = false;
    } else if (type === 'password') {
      if (!Validation.rules.password.test(value)) {
        isValid = false;
      }
    } else if (!Validation.rules[name].test(value)) {
      isValid = false;
    }

    return isValid;
  }

  public static validateShow(evt: Event): void {
    const input = evt.target as HTMLInputElement;
    const { value } = input;
    const { name } = input;
    const { type } = input;
    const wrapper = input.parentNode as HTMLElement;
    if (Validation.validate(value, name, type)) {
      wrapper.classList.remove('Input--error');
    } else {
      wrapper.classList.add('Input--error');
    }
  }

  public static validateForm(): void {
    const aInput = document.querySelectorAll('input');
    aInput.forEach((input) => {
      const { value } = input;
      const { name } = input;
      const { type } = input;
      console.log(name, ':>> ', value);
      const wrapper = input.parentNode as HTMLElement;
      if (Validation.validate(value, name, type)) {
        wrapper.classList.remove('Input--error');
      } else {
        wrapper.classList.add('Input--error');
      }
    });
  }
}

export default Validation;
