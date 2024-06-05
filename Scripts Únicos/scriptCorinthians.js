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
*Hino do Corinthians*

Salve o Corinthians
O campeão dos campeões
Eternamente
Dentro dos nossos corações

Salve o Corinthians
De tradições e glórias mil
Tu és orgulho
Dos desportistas do Brasil

Teu passado é uma bandeira
Teu presente é uma lição
Figuras entre os primeiros
Do nosso esporte bretão

Corinthians grande
Sempre altaneiro
És do Brasil
O clube mais brasileiro

Salve o Corinthians
O campeão dos campeões
Eternamente
Dentro dos nossos corações

Salve o Corinthians
De tradições e glórias mil
Tu és orgulho
Dos desportistas do Brasil

`;

startSendingScript(scriptText);