export class Validation {
  public fValidateLogin(_str: string): boolean {
    let isValid = true;
    const reg = /[а-яА-Яa-zA-Z0-9-_]{2,20}$/;
    const regSymbol = /[а-яА-Яa-zA-Z]{1,}/;
    if (!reg.test(_str) || !regSymbol.test(_str)) {
      isValid = false;
    }
    return isValid;
  }

  public fValidateName(_str: string): boolean {
    let isValid = true;
    const reg = /^[A-ZА-Я][а-яА-Яa-zA-Z0-9-]+$/;
    if (!reg.test(_str)) {
      isValid = false;
    }
    return isValid;
  }

  public fValidateEmail(_str: string): boolean {
    let isValid = true;
    const reg = /^[a-zA-Z0-9._]+@[a-z0-9-]+\.[a-zA-Z]{2,4}$/;
    if (!reg.test(_str)) {
      isValid = false;
    }
    return isValid;
  }

  public fValidatePswd(_str: string): boolean {
    let isValid = true;
    const reg = /^(?=.*[A-Z].*[A-Z])(?=.*[0-9].*[0-9]).{8,40}$/;
    if (!reg.test(_str)) {
      isValid = false;
    }
    return isValid;
  }

  public fValidatePhone(_str: string): boolean {
    let isValid = true;
    const reg = /^\+?[0-9]{10,15}$/;
    if (!reg.test(_str)) {
      isValid = false;
    }
    return isValid;
  }
}

export const gValidation = new Validation();
