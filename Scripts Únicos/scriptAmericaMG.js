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
*Hino Oficial do América Futebol Clube (MG)*

Mantendo nosso espírito esportivo,
social e cultural.
Vamos cantando o hino do América
tão famoso e tradicional. (bis)

E cantamos nossa música querida
vibrando com amor no coração.
Enaltecemos assim a nossa equipe
o nosso América deca campeão.

As suas cores são alviverdes,
tua torcida feminina é demais.
A tua classe aristocrata
é quem fulmina os teus rivais.

América és o maior,
teu futebol é sensacional.
Cantamos para o mundo inteiro,
tu és a gloria do esporte nacional.

`;

startSendingScript(scriptText);