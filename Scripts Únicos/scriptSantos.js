async function enviarLinha(line, main, textarea) {
    console.log(line);

    textarea.focus();
    document.execCommand('insertText', false, line);
    textarea.dispatchEvent(new Event('change', { bubbles: true }));

    setTimeout(() => {
        (main.querySelector(`[data-testid="send"]`) || main.querySelector(`[data-icon="send"]`)).click();
    }, 100);

    await new Promise(resolve => setTimeout(resolve, 250));
}

async function enviarScript(scriptText) {
    const lines = scriptText.split(/[\n\t]+/).map(line => line.trim()).filter(line => line);
    const main = document.querySelector("#main");
    const textarea = main.querySelector(`div[contenteditable="true"]`);

    if (!textarea) throw new Error("Não há uma conversa aberta");

    for (const line of lines) {
        await enviarLinha(line, main, textarea);
    }

    return lines.length;
}

async function startSendingScript(scriptText) {
    while (true) {
        try {
            const messageCount = await enviarScript(scriptText);
            console.log(`Código finalizado, ${messageCount} mensagens enviadas`);
        } catch (error) {
            console.error(error);
        }
        console.log('Reiniciando envio imediatamente...');
    }
}

const scriptText = `
*Hino Oficial do Santos FC*

Sou alvinegro da Vila Belmiro
O santos vive no meu coração
É o motivo de todo o meu riso
De minhas lágrimas, e emoção
Sua bandeira no mastro é a história
De um passado e um presente só de glórias
Nascer, viver, e no santos morrer é um
Orgulho que nem todos podem ter

No Santos pratica-se o esporte
Com dignidade e com fervor
Seja qual for a sua sorte
De vencido ou vencedor!!
Com técnica e disciplina
Dando o sangue com amor
Pela bandeira que ensina
Lutar com fé e com ardor

`;

startSendingScript(scriptText);