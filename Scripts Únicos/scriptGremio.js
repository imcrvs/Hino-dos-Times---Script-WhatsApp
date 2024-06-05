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
*Hino do Grêmio*

Até a pé nós iremos
Para o que der e vier
Mas o certo é que nós estaremos
Com o grêmio onde o grêmio estiver

Mais de cem anos de glória
Tens imortal tricolor
Os feitos da tua história
Canta o rio grande com amor

Até a pé nós iremos
Para o que der e vier
Mas o certo é que nós estaremos
Com o grêmio onde o grêmio estiver

Nós como bons torcedores
Sem hesitarmos se quer
Aplaudiremos o grêmio
Aonde o grêmio estiver

Até a pé nós iremos
Para o que der e vier
Mais o certo é que nós estaremos
Com o grêmio onde o grêmio estiver

Lara o craque imortal
Soube seu nome elevar
Hoje com o mesmo ideal
Nós saberemos te honrar

Até a pé nós iremos
Para o que der e vier
Mais o certo é que nós estaremos
Com o grêmio onde o grêmio estiver

`;

startSendingScript(scriptText);