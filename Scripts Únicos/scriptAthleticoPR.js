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
*Hino Oficial do Club Athletico Paranaense*

Athletico! Athletico!
Conhecemos teu valor
E a camisa rubro-negra
Só se veste por amor
E a camisa rubro-negra
Só se veste por amor

Vamos marchar, sempre cantando
O hino do Furacão
E no peito ostentando
A faixa de campeão

Athletico! Athletico!
Conhecemos teu valor
E a camisa rubro-negra
Só se veste por amor
E a camisa rubro-negra
Só se veste por amor

O coração athleticano
Estará sempre voltado
Para os feitos do presente
E as glórias do passado

Athletico! Athletico!
Conhecemos teu valor
E a camisa rubro-negra
Só se veste por amor
E a camisa rubro-negra
Só se veste por amor

À tradição, vigor sem jaça
Nos legou o sangue forte
Rubro-negro é quem tem raça
E não teme a própria morte

Athletico! Athletico!
Conhecemos teu valor
E a camisa rubro-negra
Só se veste por amor
E a camisa rubro-negra
Só se veste por amor
E a camisa rubro-negra
Só se veste por amor

`;

startSendingScript(scriptText);