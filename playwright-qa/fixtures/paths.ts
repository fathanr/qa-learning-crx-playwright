import path from 'path';

export const sampleApp = (filename: string) => {
  return `file://${path.resolve(__dirname, '../sample-app')}/${filename}`;
};

export const loginPage = sampleApp('login.html');
export const formPage = sampleApp('form.html');
