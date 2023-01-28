import getConfig from 'next/config';

const config = getConfig() || {};
const S: { [key: string]: string } = {
  ...process.env,
  ...config?.publicRuntimeConfig,
  ...config?.serverRuntimeConfig
};
Object.assign(S, {
  IS_LOCAL: S.PUBLIC_ENV === 'local',
  IS_DEVELOPMENT: S.PUBLIC_ENV === 'develop',
  IS_PRODUCTION: S.PUBLIC_ENV === 'production'
});

export default S;
