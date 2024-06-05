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
*Hino do São Paulo*

Salve o Tricolor Paulista
Amado clube brasileiro
Tu és forte, tu és grande
Dentre os grandes, és o primeiro
Tu és forte, tu és grande
Dentre os grandes, és o primeiro

Oh, Tricolor
Clube bem amado
As tuas glórias
Vêm do passado

Oh, Tricolor
Clube bem amado
As tuas glórias
Vêm do passado

São teus guias brasileiros
Que te amam ternamente
De São Paulo tens o nome
Que ostentas dignamente
De São Paulo tens o nome
Que ostentas dignamente

Oh, Tricolor
Clube bem amado
As tuas glórias
Vêm do passado

Oh, Tricolor
Clube bem amado
As tuas glórias
Vêm do passado

Oh, Tricolor
Clube bem amado
As tuas glórias
Vêm do passado

Oh, Tricolor
Clube bem amado
As tuas glórias
Vêm do passado

`;

startSendingScript(scriptText);