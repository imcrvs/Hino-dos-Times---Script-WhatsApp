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
*Hino do Cuiabá Esporte Clube*

Cuiabá Esporte Clube, time do meu coração
Nasceste, predestinado para ser um grande campeão

Legítimo representante da cidade verde, da terra do sol
És guerreiro, és gigante, na arte do futebol
És guerreiro, és gigante, na arte do futebol

Auriverde da baixada
Suas cores lembram nossa tradição
E cada gol (gol) é uma jogada que ascende a chama da nossa paixão
E cada gol (gol) é uma jogada que ascende a chama da nossa paixão

Cuiabá, Cuiabá, Cuiabá
Tens a valentia de um dourado
Em campo nos faz vibrar
No gingado do rasqueado

Cuiabá, Cuiabá, Cuiabá
Tens a valentia de um dourado
Em campo nos faz vibrar
No gingado do rasqueado

Cuiabá Esporte Clube, este é o time do meu coração

`;

startSendingScript(scriptText);