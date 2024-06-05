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
*Hino do Vasco da Gama*

Vamos todos cantar de coração
A Cruz de Malta é o meu pendão
Tu tens o nome do heroico português
Vasco da Gama, a tua fama assim se fez

Tua imensa torcida é bem feliz
Norte-Sul, Norte-Sul deste Brasil
Tua estrela, na terra a brilhar
Ilumina o mar

No atletismo, és um braço
No remo, és imortal
No futebol, és um traço
De união Brasil-Portugal

No atletismo, és um braço
No remo, és imortal
No futebol, és um traço
De união Brasil-Portugal

Vamos todos cantar de coração
A Cruz de Malta é o meu pendão!
Tu tens o nome do heroico português
Vasco da Gama, a tua fama assim se fez

Tua imensa torcida é bem feliz
Norte-Sul, Norte-Sul deste Brasil
Tua estrela, na terra a brilhar
Ilumina o mar

No atletismo, és um braço
No remo, és imortal
No futebol, és um traço
De união Brasil-Portugal

No atletismo, és um braço
No remo, és imortal
No futebol, és um traço
De união Brasil-Portugal

`;

startSendingScript(scriptText);