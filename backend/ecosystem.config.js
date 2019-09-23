module.exports = {
  apps: [{
    name: 'Valley Tech Con 2019 API',
    cwd: '/home/morphatic/valley-tech-con/backend',
    script: 'src/index.js',
    instances: 1,
    autorestart: true,
    watch: false,
    max_memory_restart: '1G',
    env: {
      NODE_ENV: 'development'
    },
    env_production: {
      NODE_ENV: 'production'
    }
  }]
};
