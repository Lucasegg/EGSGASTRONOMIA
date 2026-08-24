# Política de segurança

## Escopo atual

Este projeto é um site estático publicado pelo GitHub Pages. Ele não possui banco de dados, autenticação, cookies de sessão, API própria ou processamento de pagamentos.

Por isso, ataques como SQL injection, command injection e invasão de banco não possuem um alvo no código atual. Caso seja criado qualquer backend no futuro, ele deverá passar por revisão de segurança antes da publicação.

## Proteções implementadas

- Content Security Policy restritiva nas páginas HTML;
- JavaScript e CSS hospedados no próprio domínio;
- remoção de código JavaScript inline;
- links externos com `noopener noreferrer`;
- limites de tamanho e normalização dos campos dos formulários;
- campo honeypot e bloqueio de submissões automatizadas muito rápidas;
- nenhuma informação dos formulários é armazenada pelo site;
- permissões mínimas no GitHub Actions;
- ações críticas do workflow de publicação fixadas por SHA imutável;
- HTTPS obrigatório pelo GitHub Pages;
- atualização automática das versões usadas nos workflows via Dependabot;
- auditoria automática em pull requests para detectar ausência de CSP, padrões HTML perigosos, links externos inseguros e padrões comuns de segredos.

## Regra de produção

O site em produção não deve ser retirado do ar para manutenção preventiva. Alterações de segurança devem ser preparadas em branch separada, revisadas por pull request e publicadas somente após validação de impacto. Mudanças de hardening não devem alterar layout, galerias, conteúdo visual ou fluxos estáveis sem necessidade explícita.

## Regras para backend futuro

Se futuramente houver formulário enviado a servidor, login, painel administrativo ou banco de dados, será obrigatório:

1. usar consultas parametrizadas/prepared statements, nunca concatenar SQL;
2. validar dados no servidor por allow-list e limitar tamanho;
3. usar proteção CSRF, autenticação forte e rate limiting;
4. armazenar segredos somente em variáveis protegidas, nunca no repositório;
5. registrar eventos de segurança sem armazenar dados sensíveis desnecessários;
6. aplicar atualizações de dependências e revisar CVEs antes de cada publicação;
7. realizar backup, plano de resposta a incidentes e testes de segurança.

## Comunicação responsável

Não publique detalhes de uma vulnerabilidade ainda não corrigida em uma issue pública. Envie um relato privado ao responsável pelo repositório, informando impacto, forma de reprodução e evidências sem incluir dados de terceiros.
