const Wolvesville = require('wolvesville.js');

const client = new Wolvesville.Client();

client.login({
  email: 'salihcankaradag@gmail.com',
  password: 'sakalcocuk81'
}).then(async client => {
  const player = await client.players.fetchByUsername('MAHPERI');
  console.log(player.username, player.level)
});