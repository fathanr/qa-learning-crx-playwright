import path from 'path';

const projectRoot = path.resolve(__dirname, '..');

export const sampleApp = (filename: string) => {
  return `file://${path.join(projectRoot, 'sample-app', filename)}`;
};

export const loginPage = sampleApp('login.html');
export const formPage = sampleApp('form.html');
