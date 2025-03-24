const TelegramBot = require('node-telegram-bot-api');
const moment = require('moment-timezone')

// Substitua pelo seu token do BotFather
const TOKEN = '7680075076:AAFknyECUaPfrUyuQzTTret4V3m_usdtX0w';
const bot = new TelegramBot(TOKEN, { polling: true });

bot.on('message', async (msg) => {
    const chatId = msg.chat.id;
    
    // Verifica se a mensagem é um serviço de novo membro ou membro saiu
    if (msg.new_chat_members || msg.left_chat_member) {
        const user = msg.new_chat_members ? msg.new_chat_members[0] : msg.left_chat_member;
        const firstName = user.first_name || '';
        const lastName = user.last_name || '';
        const userId = user.id;
        
        try {
            await bot.deleteMessage(chatId, msg.message_id);
            console.log(`${moment().tz('America/Sao_Paulo').format('DD/MM/YYYY HH:mm:ss')} [${msg.new_chat_members ? "ENTROU NO GRUPO":"SAIU DO GRUPO"}] mensagem de serviço do usuario ${firstName} ${lastName} (${userId}) apagada`);
        } catch (error) {
            console.error(`Erro ao excluir mensagem no chat ${chatId}:`, error.message);
        }
    }
});

console.log(`${moment().tz('America/Sao_Paulo').format('DD/MM/YY HH:mm:ss')} bot para apagar mensagens de serviço iniciado`);
