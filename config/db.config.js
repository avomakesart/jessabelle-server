module.exports = {
  HOST: 'ec2-52-1-95-247.compute-1.amazonaws.com',
  USER: 'zolwzwewlzlihg',
  PASSWORD: '2af06cc868863e9c885f54ceb45fc1e0bd1dccda12c1f7f0a54f7c8aae2e6e9e',
  DB: 'dd7n9u4dueie33',
  PORT: 5432,
  dialect: 'postgresql',
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
}
