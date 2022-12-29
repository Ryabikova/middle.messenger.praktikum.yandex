enum METHODS {
    GET = 'GET',
    POST = 'POST',
    PUT = 'PUT',
    PATCH = 'PATCH',
    DELETE = 'DELETE'
}

type Options = {
    method: METHODS;
    data?: any;
    timeout?: number;
    headers?: {[key: string]: string};
};

type OptionsWithoutMethod = Omit<Options, 'method'>;

function queryStringify(data: object) {
  const keys = Object.keys(data);
  return keys.reduce((result, key, index) => `${result}${key}=${data[key]}${index < keys.length - 1 ? '&' : ''}`, '?');
}
// тип метода
type HTTPMethod = (url: string, options?: OptionsWithoutMethod) => Promise<XMLHttpRequest>

export default class HTTPTransport {
  get:HTTPMethod = (url, options = {}) => {
    const queryUrl = options.data ? `${url}${queryStringify(options.data)}` : url;
    return this.request(queryUrl, { ...options, method: METHODS.GET }, options.timeout);
  };

  put:HTTPMethod = (url, options = {}) => this.request(
    url,
    { ...options, method: METHODS.PUT },
    options.timeout,
  );

  post:HTTPMethod = (url, options = {}) => this.request(
    url,
    { ...options, method: METHODS.POST },
    options.timeout,
  );

  delete:HTTPMethod = (url, options = {}) => this.request(
    url,
    { ...options, method: METHODS.DELETE },
    options.timeout,
  );

  request(url: string, options: Options, timeout = 5000): Promise<XMLHttpRequest> {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();

      xhr.open(options.method, url);

      if (options.headers) {
        Object.entries(options.headers).forEach(
          ([key, val]) => xhr.setRequestHeader(key, val),
        );
      }

      xhr.onload = function () {
        resolve(xhr);
      };
      xhr.onabort = reject;
      xhr.onerror = reject;
      xhr.timeout = timeout;
      xhr.ontimeout = reject;

      if (options.method === METHODS.GET || !options.data) {
        xhr.send();
      } else {
        xhr.send(options.data);
      }
    });
  }
}
