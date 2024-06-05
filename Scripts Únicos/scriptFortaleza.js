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
*Hino do Clube de Regatas do Flamengo*

Uma vez Flamengo
Sempre Flamengo
Flamengo sempre eu hei de ser

É meu maior prazer vê-lo brilhar
Seja na terra, seja no mar
Vencer, vencer, vencer

Uma vez Flamengo
Flamengo até morrer

Na regata, ele me mata
Me maltrata, me arrebata
Que emoção no coração
Consagrado no gramado
Sempre amado, o mais cotado
No Fla-Flu é o: Ai, Jesus!

Eu teria um desgosto profundo
Se faltasse o Flamengo no mundo
Ele vibra, ele é fibra
Muita libra já pesou
Flamengo até morrer eu sou

Uma vez Flamengo
Sempre Flamengo
Flamengo sempre eu hei de ser

É meu maior prazer vê-lo brilhar
Seja na terra, seja no mar
Vencer, vencer, vencer

Uma vez Flamengo
Flamengo até morrer

Na regata, ele me mata
Me maltrata, me arrebata
Que emoção no coração
Consagrado no gramado
Sempre amado, o mais cotado
No Fla-Flu é o: Ai, Jesus!

Eu teria um desgosto profundo
Se faltasse o Flamengo no mundo
Ele vibra, ele é fibra
Muita libra já pesou
Flamengo até morrer eu sou

`;

startSendingScript(scriptText);