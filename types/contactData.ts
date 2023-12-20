export interface ContactData {
  id?: string;
  firstName?: string;
  middleName?: string;
  lastName?: string;
  reason?: string;
  email?: string;
  phone?: string;
  subject?: string;
  message?: string;
  termsAccepted?: boolean | string;
}

export interface EventHandler {
  target: {
    name: string;
    value: string | boolean | number;
  }
}
