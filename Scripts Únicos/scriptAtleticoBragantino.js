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
*Hino Oficial do Clube Atlético Bragantino*

Chegou a hora da luta
É o alvinegro em ação
Bragança toda se inflama
Massa Bruta, campeão

Na força de uma raça
Na luta já vencida
Ergamos sempre uma taça
Para a grande fiel torcida

Bragantino, o melhor
Primeiro em emoção
No campo é o maior
Arrebenta coração

Defesa bem guardada
A arte no meio do campo
Velocidade no ataque
E a bola entrando no canto

Olê, olê, olê, olá
O Massa Bruta só joga pra ganhar

Vamos lá, rapaz
Vamos lá, menino
Venham, vamos todos
Futebol é Bragantino

`;

startSendingScript(scriptText);