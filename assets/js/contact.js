(()=>{
  'use strict';

  const form=document.querySelector('#contato-form');
  if(!form)return;

  const endpoint='https://script.google.com/macros/s/AKfycbyiX1dJEU-NnfMCIV7TtMbJz6yFYdMjIvPchO8SB_MCKfecMWSxHsmJpz5T8a2xv1Or/exec';
  const started=Date.now();
  const clean=(v,max)=>String(v||'').replace(/[<>\u0000-\u001F]/g,' ').replace(/\s+/g,' ').trim().slice(0,max);
  const button=form.querySelector('button[type="submit"]');
  const note=form.parentElement?.querySelector('.form-note');

  if(button)button.textContent='Enviar mensagem';
  if(note)note.textContent='Sua mensagem será enviada diretamente para a EGS Gastronomia.';

  form.addEventListener('submit',async(e)=>{
    e.preventDefault();
    e.stopImmediatePropagation();

    if(document.querySelector('#website')?.value||Date.now()-started<1200)return;

    const nome=clean(document.querySelector('#nome')?.value,80);
    const telefone=clean(document.querySelector('#telefone')?.value,30);
    const assunto=clean(document.querySelector('#assunto')?.value,80);
    const mensagem=clean(document.querySelector('#mensagem')?.value,700);

    if(!nome||!mensagem){
      if(note)note.textContent='Preencha seu nome e a mensagem.';
      return;
    }

    if(button){button.disabled=true;button.textContent='Enviando...';}
    if(note)note.textContent='Enviando sua mensagem...';

    try{
      await fetch(endpoint,{
        method:'POST',
        mode:'no-cors',
        headers:{'Content-Type':'text/plain;charset=utf-8'},
        body:JSON.stringify({type:'contato',website:'',nome,telefone,assunto,mensagem})
      });
      form.reset();
      if(note)note.textContent='Mensagem enviada com sucesso. Em breve entraremos em contato.';
    }catch(error){
      console.error('Falha ao enviar formulário de contato',error);
      if(note)note.textContent='Não foi possível enviar agora. Tente novamente em instantes ou use o botão do WhatsApp.';
    }finally{
      if(button){button.disabled=false;button.textContent='Enviar mensagem';}
    }
  },true);
})();