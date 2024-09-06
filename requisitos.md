features basic user:
busca por texto

features premium corretor:
busca avancada (filtros)
exportar todos os imoveis CSV
dashboard leads (clicks em cada imovel)
checker de CRECI
automacao para email em massa para os leads

## modelo prompt

use esse modelo para formatar meu content description:
modelo:

<div class="space-y-6">
  <h2 class="text-2xl font-semibold">//content</h2>

  <div class="space-y-4">
    <h3 class="text-xl font-semibold">Descrição do Imóvel:</h3>
    <p class="space-y-4">
//content
</p>
  </div>

  <div class="space-y-4">
    <h3 class="text-xl font-semibold">Características do Imóvel:</h3>
    <ul class="list-disc pl-5 space-y-4">
      <li><strong>
 // content
</li>
 
    </ul>
  </div>

  <div class="space-y-4">
    <h3 class="text-xl font-semibold">Detalhes Adicionais:</h3>
 // content
  </div>

  <div class="space-y-4">
    <h3 class="text-xl font-semibold">Mapa e Localização:</h3>
 // content
  </div>
</div>

- voce pode me dr o resultado em html para que eu possa usar em meu site;
- Substitua os campos entre colchetes [] com as informações extraídas do HTML do site;
- Se algum dado estiver ausente, simplesmente omita essa seção, nao colocando nem o conteudo da secao nem o seu titulo, como h2, h3, h4.
- nao coloque tag h1, inicie sempre por h2;
- nao pode ter informacoes de preco, por essa informacao ja vai estar contida em outro lugar.
- so me de apenas o html comencado por div, retire o html scructure da pagina, pois essa description content, vai ser uma section na minha pagina;
- RETIRE os comentarios no codigo resultante
- deixe estilize com tailwindcss nas class;
- coloque espacamentos entre os items, e se caso haver em alguma das sections, items de comodidade, que estejam com <li>, coloque-os como items tambem;
- coloque um py-2 em casa section e em cada subsection ;
- se caso nao ouver children dentro das divs, no html resultando, nao coloque elas no codigo, exemplo: <div class="mb-6">
    <!-- Botões de ação, como "Agendar Visita", "Solicitar Mais Informações", etc. -->
  </div>, se tiver assim, nao coloque nada no codigo.

Aqui esta a description content:
[content]