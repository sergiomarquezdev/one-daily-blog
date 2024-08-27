module.exports = {
  apps: [
    {
      name: "one-daily-blog",
      script: "dist/one-daily-blog/server/server.mjs",
      exec_mode: "fork",
      instances: 1,
      watch: false,
      env: {
        NODE_ENV: "production",
        OPENAI_API_KEY_BLOG: process.env.OPENAI_API_KEY_BLOG,
        PGHOST: process.env.PGHOST,
        PGDATABASE: process.env.PGDATABASE,
        PGUSER: process.env.PGUSER,
        PGPASSWORD: process.env.PGPASSWORD,
      },
    },
  ],
};
