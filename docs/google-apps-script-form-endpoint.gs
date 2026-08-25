const DESTINATION = 'cervejaedubieer@gmail.com';
const ALLOWED_TYPES = new Set(['contato', 'orcamento']);

function doPost(e) {
  try {
    const data = JSON.parse((e.postData && e.postData.contents) || '{}');
    const type = clean(data.type, 20);
    if (!ALLOWED_TYPES.has(type)) return json({ok:false, error:'invalid_type'});
    if (clean(data.website, 100)) return json({ok:true}); // honeypot

    const nome = clean(data.nome, 80);
    const telefone = clean(data.telefone, 30);
    const assunto = clean(data.assunto, 80);
    const evento = clean(data.evento, 60);
    const mensagem = clean(data.mensagem, 700);
    if (!nome || !mensagem) return json({ok:false, error:'required_fields'});

    const subject = type === 'orcamento'
      ? `EGS Gastronomia - Solicitação de orçamento - ${evento || 'Evento'}`
      : `EGS Gastronomia - Fale Conosco - ${assunto || 'Contato'}`;

    const body = [
      `Origem: ${type === 'orcamento' ? 'Orçamento' : 'Fale Conosco'}`,
      `Nome: ${nome}`,
      telefone ? `Telefone: ${telefone}` : '',
      assunto ? `Assunto: ${assunto}` : '',
      evento ? `Tipo de evento: ${evento}` : '',
      '',
      mensagem
    ].filter(Boolean).join('\n');

    MailApp.sendEmail({to: DESTINATION, subject, body});
    return json({ok:true});
  } catch (err) {
    console.error(err);
    return json({ok:false, error:'server_error'});
  }
}

function clean(value, max) {
  return String(value || '').replace(/[<>\u0000-\u001F]/g, ' ').replace(/\s+/g, ' ').trim().slice(0, max);
}

function json(value) {
  return ContentService.createTextOutput(JSON.stringify(value)).setMimeType(ContentService.MimeType.JSON);
}
