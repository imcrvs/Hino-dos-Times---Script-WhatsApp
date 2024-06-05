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
*Hino do Goiás Esporte Clube*

Eu sou Goiás Esporte Clube
Eu sou Goiás, eu sou Goiás e vou vibrar

Até o peito me doer
Até perder a voz eu sou Goiás
Eu sou Goiás até morrer, eu Sou Goiás,
Eu sou Goiás de coração

Cada vez nossa torcida cresce mais
Eternamente serei Goiás
Nosso Clube é a nossa glória
A nossa garra, nossa gente, nossa história

O amor pela nossa bandeira
É para nós a maior vitória

Nosso Clube é a nossa glória
Nossa garra, nossa gente, nossa história
A vida toda eu vou torcer
Eu sou Goiás, Goiás, até morrer

Eu sou Goiás Esporte Clube
Eu sou Goiás, eu sou Goiás e vou gritar

Até o peito me doer
Até perder a voz eu sou Goiás
Eu sou Goiás até morrer
Eu sou Goiás, eu sou Goiás de coração

Cada vez nossa torcida cresce mais
Eternamente serei Goiás.

`;

startSendingScript(scriptText);