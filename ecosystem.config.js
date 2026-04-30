module.exports = {
  apps: [
    {
      name: "convertlite-backend",
      script: "src/server.js",
      cwd: "./backend",
      instances: "max",
      exec_mode: "cluster",
      autorestart: true,
      watch: false,
      max_memory_restart: "1G",
      env: {
        NODE_ENV: "production",
      }
    },
    {
      name: "convertlite-frontend",
      script: "npm",
      args: "run start",
      cwd: "./frontend",
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: "1G",
      env: {
        NODE_ENV: "production",
      }
    }
  ]
};
