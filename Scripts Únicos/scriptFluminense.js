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
*Hino do Fluminense*

Sou Tricolor de coração
Sou do clube tantas vezes campeão
Fascina pela sua disciplina, o Fluminense me domina
Eu tenho amor ao Tricolor

Salve o querido pavilhão
Das três cores que traduzem tradição
A paz, a esperança e o vigor, unido e forte pelo esporte
Eu sou é Tricolor

Vence, o Fluminense
Com o verde da esperança
Pois quem espera sempre alcança
Clube que orgulha o Brasil
Retumbante de glórias e vitórias mil

Sou Tricolor de coração
Sou do clube tantas vezes campeão
Fascina pela sua disciplina, o Fluminense me domina
Eu tenho amor ao Tricolor

Salve o querido pavilhão
Das três cores que traduzem tradição
A paz, a esperança e o vigor, unido e forte pelo esporte
Eu sou é Tricolor

Vence, o Fluminense
Com o sangue do encarnado
Com amor e com vigor
Faz a torcida querida vibrar com a emoção do tricampeão

Vence, o Fluminense
Usando a fidalguia
Branco é paz e harmonia, brilha com o Sol da manhã
Com a luz de um refletor
Salve o Tricolor

`;

startSendingScript(scriptText);