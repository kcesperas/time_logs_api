module.exports = {
    /**
     * Application configuration section
     * http://pm2.keymetrics.io/docs/usage/application-declaration/
     */
    apps: [{
      name: 'api-server',
      script: 'npm',
      watch: true,
      env: {
        COMMON_VARIABLE: 'true'
      },
      env_production: {
        NODE_ENV: 'development'
      },
      args: 'run offline',
    }],
  };