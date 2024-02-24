
import { createBot, createFlow, MemoryDB, createProvider, addKeyword } from "@bot-whatsapp/bot"
import { BaileysProvider, handleCtx } from "@bot-whatsapp/provider-baileys"

const flowBienvenida = addKeyword('hola').addAnswer ('Como estás!, bienvenido a PRONTO SERVICE')

const main = async  () =>{

    const provider = createProvider (BaileysProvider)
    provider.initHttpServer(3002)
    provider.http?.server.post ('/enviar-whatsapp', handleCtx(async (bot,req,res)=>{
        const phone = req.body.phone
        const message = req.body.message
        await bot.sendMessage(phone,message,{})
        res.end ('Mensaje enviado desde servidor donWeb')
    }))

    await createBot ({

        flow: createFlow([flowBienvenida]),
        database: new MemoryDB(),
        provider

    })

}

main ()
