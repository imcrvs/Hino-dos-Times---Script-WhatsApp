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
*Hino do Internacional*

Glória do desporto nacional
Oh, Internacional
Que eu vivo a exaltar
Levas a plagas distantes
Teus feitos relevantes
Vives a brilhar
Olhos onde surge o amanhã
Radioso de luz, varonil
Segue a tua senda de vitórias
Colorado das glórias
Orgulho do Brasil

É teu passado alvirrubro
Motivo de festas em nossos corações
O teu presente diz tudo
Trazendo à torcida alegres emoções
Colorado de ases celeiro
Teus astros cintilam num céu sempre azul
Vibra o Brasil inteiro
Com o clube do povo do Rio Grande do Sul

Glória do desporto nacional
Oh, Internacional
Que eu vivo a exaltar
Levas a plagas distantes
Feitos relevantes
Vives a brilhar
Correm os anos, surge o amanhã
Radioso de luz, varonil
Segue a tua senda de vitórias
Colorado das glórias
Orgulho do Brasil

`;

startSendingScript(scriptText);