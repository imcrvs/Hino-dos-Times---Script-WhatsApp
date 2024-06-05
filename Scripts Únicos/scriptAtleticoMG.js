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
*Hino Oficial Do Clube Atlético Mineiro*

Nós somos do Clube Atlético Mineiro
Jogamos com muita raça e amor
Vibramos com alegria nas vitórias
Clube Atlético Mineiro
Galo Forte Vingador

Vencer, vencer, vencer
Este é o nosso ideal
Honramos o nome de Minas
No cenário esportivo mundial

Lutar, lutar, lutar
Pelos gramados do mundo pra vencer
Clube Atlético Mineiro
Uma vez até morrer

Nós somos campeões do gelo
O nosso time é imortal
Nós somos campeões dos Campeões
Somos o orgulho do esporte nacional

Lutar, lutar, lutar
Com toda nossa raça pra vencer
Clube Atlético Mineiro
Uma vez até morrer
Clube Atlético Mineiro
Uma vez até morrer

Nós somos campeões do gelo
O nosso time é imortal
Nós somos campeões dos Campeões
Somos o orgulho do esporte nacional

Lutar, lutar, lutar
Com toda nossa raça pra vencer
Clube Atlético Mineiro
Uma vez até morrer
Clube Atlético Mineiro
Uma vez até morrer

`;

startSendingScript(scriptText);