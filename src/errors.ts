export class ValidationErrorClass extends Error {
  constructor(message: string | undefined) {
    super(message);
    this.name = "ValidationError";
  }
}

export class RouteErrorClass extends Error {
  constructor(message: string | undefined) {
    super(message);
    this.name = "RouteError";
  }
}
export class ConfigurationErrorClass extends Error {
  constructor(message: string | undefined) {
    super(message);
    this.name = "ConfigurationError";
  }
}

export const ValidationError = (message: any) => new ValidationErrorClass(message);
export const RouteError = (message: any) => new RouteErrorClass(message);
export const ConfigurationError = (message: any) => new ConfigurationErrorClass(message);

export const isForbiddenError = (error: { message: string; }) => error.message === 'Request failed with status code 403';

