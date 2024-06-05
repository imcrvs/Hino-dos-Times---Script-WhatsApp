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
*Hino do Palmeiras*

Quando surge o alviverde imponente
No gramado em que a luta o aguarda
Sabe bem o que vem pela frente
Que a dureza do prélio não tarda!

E o Palmeiras no ardor da partida
Transformando a lealdade em padrão
Sabe sempre levar de vencida
E mostrar que, de fato, é campeão!

Defesa que ninguém passa
Linha atacante de raça
Torcida que canta e vibra

Defesa que ninguém passa
Linha atacante de raça
Torcida que canta e vibra

Por nosso alviverde inteiro
Que sabe ser brasileiro
Ostentando a sua fibra!

Quando surge o alviverde imponente
No gramado em que a luta o aguarda
Sabe bem o que vem pela frente
Que a dureza do prélio não tarda!

E o Palmeiras no ardor da partida
Transformando a lealdade em padrão
Sabe sempre levar de vencida
E mostrar que, de fato, é campeão!

Defesa que ninguém passa
Linha atacante de raça
Torcida que canta e vibra

Defesa que ninguém passa
Linha atacante de raça
Torcida que canta e vibra

Por nosso alviverde inteiro
Que sabe ser brasileiro
Ostentando a sua fibra!

`;

startSendingScript(scriptText);