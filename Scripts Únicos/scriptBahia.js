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
*Hino Oficial do Esporte Clube Bahia*

Somos a turma tricolor
Somos a voz do campeão
Somos do povo um clamor

Ninguém nos vence em vibração!
Vamos, avante, esquadrão!
Vamos, serás o vencedor!

Vamos, conquistar mais um tento!
Bahia, Bahia, Bahia!
Ouve esta voz que é teu alento!
Bahia, Bahia, Bahia!

Mais um! Mais um, Bahia!
Mais um, mais um título de glória!
Mais um! Mais um, Bahia!
É assim que se resume a sua história! 

`;

startSendingScript(scriptText);