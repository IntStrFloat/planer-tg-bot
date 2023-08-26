const {Telegraf,Markup} = require('telegraf')
const { getFirestore, collection, getDocs,getDoc,addDoc,query,where } = require('firebase/firestore/lite');
require('dotenv').config()
const {db} = require('./db')
const bot = new Telegraf(process.env.TOKEN)

const tasksRef = collection(db,'tasks')

bot.command('start',async (ctx)=>{
    const data = await query(collection(db,'tasks'),where('user_id','==',ctx.chat.id))
    const frf = await getDocs(data)
    if(frf.docs.length===0) {
        await addDoc(tasksRef,{
            id:ctx.chat.id,
            user_id:ctx.chat.id,
            tasks:[]
        })
    }
    ctx.reply('Привет, это простой планировщик задачь :).\nЧтобы добавить задачу, просто напиши её мне, а через пробел укажи время чтобы я мог тебе напомнить о задаче)\n(Формат - XX:XX)',Markup.keyboard([Markup.button.callback('Список дел','tasks')]))
})

bot.on('text',async (ctx)=>{
    if (ctx.message.text === 'Список дел') {
        const data = await query(collection(db,'tasks'),where('user_id','==',ctx.chat.id))
        const frf = await getDocs(data)
        console.log(frf.docs[0].data().tasks)
        ctx.reply(`Дорогой, твой список дел: ${frf.docs[0].data().tasks.map((elem,index)=>{return `${index+1}) ${elem}\n`})}`)
    } else {
        
        const data = await getDocs(tasksRef);
        const filteredData = data.docs.map((doc)=>({...doc.data(),
                                                        id: doc.id}))
        console.log(filteredData[0])
        // ctx.reply(`Есть, в твой список дел добавлена задача!\nТеперь он выглядит вот так: ${tasks[ctx.message.from.id].map((elem,index)=>{return `${index+1}) ${elem}\n`})}`);
    }
    
})
bot.launch().then(()=>{
    console.log('Бот запущен')
})