const {Telegraf} = require('telegraf')
require('dotenv').config()
const bot = new Telegraf(process.env.TOKEN)
bot.command('start',()=>{
    console.log('start')
})
bot.launch().then(()=>{
    console.log('Бот запущен')
})