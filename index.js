const Wolvesville = require('wolvesville.js');

const client = new Wolvesville.Client();

client.login({
  email: 'test1@gmail.com',
  password: '123456'
}).then(async client => {
  const player = await client.players.fetchByUsername('TEST');
  console.log(player.username, player.level)
});
