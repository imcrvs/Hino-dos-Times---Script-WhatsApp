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
*Hino do Cruzeiro*

Existe um grande clube na cidade
Que mora dentro do meu coração
Eu vivo cheio de vaidade
Pois na realidade é um grande campeão

Nos gramados de Minas Gerais
Temos páginas heroicas e imortais
Cruzeiro, Cruzeiro querido
Tão combatido, jamais vencido!

Existe um grande clube na cidade
Que mora dentro do meu coração
Eu vivo cheio de vaidade
Pois na realidade é um grande campeão

Nos gramados de Minas Gerais
Temos páginas heroicas e imortais
Cruzeiro, Cruzeiro querido
Tão combatido, jamais vencido!

Existe um grande clube na cidade
Que mora dentro do meu coração
Eu vivo cheio de vaidade
Pois na realidade é um grande campeão

Nos gramados de Minas Gerais
Temos páginas heroicas e imortais
Cruzeiro, Cruzeiro querido
Tão combatido, jamais vencido!

`;

startSendingScript(scriptText);