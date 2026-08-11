(() => {
  'use strict';
  const form = document.querySelector('[data-contact-form]'); if (!form) return;
  const status = form.querySelector('[data-form-status]'); const submit = form.querySelector('button[type="submit"]'); const params = new URLSearchParams(location.search);
  const setValue = (name,value) => { const field=form.elements.namedItem(name); if(field) field.value=value; };
  const issueToken = async () => { const response=await fetch('https://koshijpn.com/contact/token.php',{headers:{Accept:'application/json'},mode:'cors',credentials:'omit'}); const result=await response.json().catch(()=>({ok:false})); if(!response.ok||!result.ok||!/^[a-f0-9]{64}$/.test(result.token||''))throw new Error('csrf_unavailable'); setValue('csrfToken',result.token); };
  const setMetadata = () => { setValue('startedAt',String(Date.now())); setValue('sourcePage',location.href); setValue('pageTitle',document.title); setValue('referrer',document.referrer); setValue('language',document.documentElement.lang||'en'); ['utm_source','utm_medium','utm_campaign','utm_content','utm_term'].forEach(name=>setValue(name,params.get(name)||'')); };
  setMetadata(); const requestedType=params.get('type'); const typeField=form.elements.namedItem('inquiryType'); if(requestedType&&typeField?.querySelector(`option[value="${CSS.escape(requestedType)}"]`)) typeField.value=requestedType;
  const show=(message,state='')=>{status.hidden=false;status.textContent=message;status.dataset.state=state;status.focus();};
  const text=()=>window.KoshiContactCopy||{}; const validate=()=>{let first=null;form.querySelectorAll('[required]').forEach(field=>{const valid=field.checkValidity();field.setAttribute('aria-invalid',String(!valid));if(!valid&&!first)first=field;});const message=form.elements.namedItem('message');if(message.value.trim().length<10){message.setCustomValidity(text().length||'Message must be at least 10 characters.');first||=message;}else message.setCustomValidity('');if(!first)return true;show(text().validation||'Please check all required fields and formats. The message must be at least 10 characters.','error');first.focus();return false;};
  let formStarted = false;
  form.addEventListener('input',event=>{
    if(!formStarted && event.target.matches('input,textarea,select')){
      formStarted = true;
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({event:'contact_form_start',form_name:'github_portfolio_contact'});
    }
    if(event.target.matches('input,textarea,select')){event.target.setAttribute('aria-invalid','false');if(event.target.name==='message')event.target.setCustomValidity('');}
  });
  form.addEventListener('submit',async event=>{
    event.preventDefault();
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({event:'contact_form_submit',form_name:'github_portfolio_contact'});
    if(!validate())return;const key='portfolio_contact_last_submit';if(Date.now()-Number(sessionStorage.getItem(key)||0)<60000){show(text().wait||'Please wait about one minute before sending another message.','error');return;}submit.disabled=true;submit.setAttribute('aria-busy','true');submit.dataset.originalLabel||=submit.textContent;submit.textContent=text().sending||'Sending…';show(text().pending||'Sending your message…','pending');try{await issueToken();const response=await fetch(form.action,{method:'POST',body:new FormData(form),headers:{Accept:'application/json'},mode:'cors',credentials:'omit'});const result=await response.json().catch(()=>({ok:false,code:'invalid_response'}));if(!response.ok||!result.ok)throw new Error(result.code||'send_failed');const inquiryType=String(form.elements.namedItem('inquiryType').value||'general');window.dataLayer=window.dataLayer||[];window.dataLayer.push({event:'generate_lead',source_site:'koshijpn.github.io',form_name:'github_portfolio_contact',inquiry_type:inquiryType,page_location:location.href.split('?')[0]});sessionStorage.setItem(key,String(Date.now()));form.reset();formStarted=false;setMetadata();show(text().success||'Message sent. I usually reply within 2–3 business days.','success');}catch(error){show(error.message==='rate_limited'?'Please wait before sending another message.':error.message==='server_not_configured'?(text().config||'The contact service has not been configured yet.'):error.message==='csrf_unavailable'?(text().token||'The security token could not be created. Please wait and try again.'):(text().failed||'Your message could not be sent. Please wait and try again.'),'error');}finally{submit.disabled=false;submit.removeAttribute('aria-busy');submit.textContent=submit.dataset.originalLabel;}});
})();
