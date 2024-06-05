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
*Hino Oficial do Coritiba Foot-ball Club*

Lá no alto de tantas glórias
Brilhou, brilhou um novo Sol
Clareando com seus raios verde e branco
Encantando o país do futebol
Palco de artistas, jogadores, de um passado sem igual
Da arte dos teus grandes valores
O seu nome pelo mundo vai brilhar

Coritiba, Coritiba campeão do Paraná
Tua camisa alviverde
Com orgulho para sempre hei de amar

Jogando pelos campos brasileiros
Despertando na torcida emoção
Coritiba campeão do povo
Alegria do meu coração

Coxa, Coxa, é garra, é força, é tradição
Coxa, Coxa, explode o coração

`;

startSendingScript(scriptText);