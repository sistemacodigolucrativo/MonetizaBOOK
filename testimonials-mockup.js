(() => {
  'use strict';

  // Mockup catalog: 500 first names + 500 surnames, used only for visual simulation.
  const ratingFirstNames = ["Ana Maria", "Beatriz Maria", "Bruna Maria", "Camila Maria", "Carolina Maria", "Clara Maria", "Daniela Maria", "Eduarda Maria", "Elisa Maria", "Fernanda Maria", "Gabriela Maria", "Helena Maria", "Isabela Maria", "Júlia Maria", "Larissa Maria", "Laura Maria", "Letícia Maria", "Lívia Maria", "Luana Maria", "Manuela Maria", "Mariana Maria", "Marina Maria", "Mirela Maria", "Natália Maria", "Nicole Maria", "Patrícia Maria", "Paula Maria", "Priscila Maria", "Rafaela Maria", "Raquel Maria", "Renata Maria", "Sabrina Maria", "Sara Maria", "Sofia Maria", "Tatiane Maria", "Valentina Maria", "Vitória Maria", "Aline Maria", "Amanda Maria", "Andréia Maria", "Bárbara Maria", "Bianca Maria", "Débora Maria", "Flávia Maria", "Geovana Maria", "Ingrid Maria", "Irene Maria", "Jéssica Maria", "Joana Maria", "Lorena Maria", "Márcia Maria", "Melissa Maria", "Mônica Maria", "Nayara Maria", "Regina Maria", "Samara Maria", "Tainá Maria", "Verônica Maria", "Alice Maria", "Cecília Maria", "Diana Maria", "Ester Maria", "Fátima Maria", "Giovanna Maria", "Heloísa Maria", "Ivana Maria", "Janaína Maria", "Karen Maria", "Lara Maria", "Malu Maria", "Nina Maria", "Olívia Maria", "Paloma Maria", "Rebeca Maria", "Simone Maria", "Talita Maria", "Úrsula Maria", "Yasmin Maria", "Adriana Maria", "Alessandra Maria", "Alexandre Maria", "André Maria", "Antônio Maria", "Arthur Maria", "Bernardo Maria", "Bruno Maria", "Caio Maria", "Carlos Maria", "Cauã Maria", "César Maria", "Davi Maria", "Diego Maria", "Diogo Maria", "Douglas Maria", "Eduardo Maria", "Elias Maria", "Enzo Maria", "Erick Maria", "Felipe Maria", "Fernando Maria", "Francisco Maria", "Gabriel Maria", "Gustavo Maria", "Heitor Maria", "Henrique Maria", "Hugo Maria", "Igor Maria", "Ivan Maria", "João Maria", "Joaquim Maria", "Jorge Maria", "José Maria", "Juan Maria", "Juliano Maria", "Kaique Maria", "Leandro Maria", "Leonardo Maria", "Lorenzo Maria", "Lucas Maria", "Luís Maria", "Marcelo Maria", "Márcio Maria", "Marcos Maria", "Mateus Maria", "Matheus Maria", "Miguel Maria", "Murilo Maria", "Nathan Maria", "Nicolas Maria", "Otávio Maria", "Pablo Maria", "Paulo Maria", "Pedro Maria", "Rafael Maria", "Ramon Maria", "Raul Maria", "Reginaldo Maria", "Ricardo Maria", "Roberto Maria", "Rodrigo Maria", "Samuel Maria", "Sandro Maria", "Sérgio Maria", "Thiago Maria", "Tomás Maria", "Vítor Maria", "Wagner Maria", "Wesley Maria", "William Maria", "Yuri Maria", "Ana Luís", "Beatriz Luís", "Bruna Luís", "Camila Luís", "Carolina Luís", "Clara Luís", "Daniela Luís", "Eduarda Luís", "Elisa Luís", "Fernanda Luís", "Gabriela Luís", "Helena Luís", "Isabela Luís", "Júlia Luís", "Larissa Luís", "Laura Luís", "Letícia Luís", "Lívia Luís", "Luana Luís", "Manuela Luís", "Mariana Luís", "Marina Luís", "Mirela Luís", "Natália Luís", "Nicole Luís", "Patrícia Luís", "Paula Luís", "Priscila Luís", "Rafaela Luís", "Raquel Luís", "Renata Luís", "Sabrina Luís", "Sara Luís", "Sofia Luís", "Tatiane Luís", "Valentina Luís", "Vitória Luís", "Aline Luís", "Amanda Luís", "Andréia Luís", "Bárbara Luís", "Bianca Luís", "Débora Luís", "Flávia Luís", "Geovana Luís", "Ingrid Luís", "Irene Luís", "Jéssica Luís", "Joana Luís", "Lorena Luís", "Márcia Luís", "Melissa Luís", "Mônica Luís", "Nayara Luís", "Regina Luís", "Samara Luís", "Tainá Luís", "Verônica Luís", "Alice Luís", "Cecília Luís", "Diana Luís", "Ester Luís", "Fátima Luís", "Giovanna Luís", "Heloísa Luís", "Ivana Luís", "Janaína Luís", "Karen Luís", "Lara Luís", "Malu Luís", "Nina Luís", "Olívia Luís", "Paloma Luís", "Rebeca Luís", "Simone Luís", "Talita Luís", "Úrsula Luís", "Yasmin Luís", "Adriana Luís", "Alessandra Luís", "Alexandre Luís", "André Luís", "Antônio Luís", "Arthur Luís", "Bernardo Luís", "Bruno Luís", "Caio Luís", "Carlos Luís", "Cauã Luís", "César Luís", "Davi Luís", "Diego Luís", "Diogo Luís", "Douglas Luís", "Eduardo Luís", "Elias Luís", "Enzo Luís", "Erick Luís", "Felipe Luís", "Fernando Luís", "Francisco Luís", "Gabriel Luís", "Gustavo Luís", "Heitor Luís", "Henrique Luís", "Hugo Luís", "Igor Luís", "Ivan Luís", "João Luís", "Joaquim Luís", "Jorge Luís", "José Luís", "Juan Luís", "Juliano Luís", "Kaique Luís", "Leandro Luís", "Leonardo Luís", "Lorenzo Luís", "Lucas Luís", "Luís Luís", "Marcelo Luís", "Márcio Luís", "Marcos Luís", "Mateus Luís", "Matheus Luís", "Miguel Luís", "Murilo Luís", "Nathan Luís", "Nicolas Luís", "Otávio Luís", "Pablo Luís", "Paulo Luís", "Pedro Luís", "Rafael Luís", "Ramon Luís", "Raul Luís", "Reginaldo Luís", "Ricardo Luís", "Roberto Luís", "Rodrigo Luís", "Samuel Luís", "Sandro Luís", "Sérgio Luís", "Thiago Luís", "Tomás Luís", "Vítor Luís", "Wagner Luís", "Wesley Luís", "William Luís", "Yuri Luís", "Ana Gabriel", "Beatriz Gabriel", "Bruna Gabriel", "Camila Gabriel", "Carolina Gabriel", "Clara Gabriel", "Daniela Gabriel", "Eduarda Gabriel", "Elisa Gabriel", "Fernanda Gabriel", "Gabriela Gabriel", "Helena Gabriel", "Isabela Gabriel", "Júlia Gabriel", "Larissa Gabriel", "Laura Gabriel", "Letícia Gabriel", "Lívia Gabriel", "Luana Gabriel", "Manuela Gabriel", "Mariana Gabriel", "Marina Gabriel", "Mirela Gabriel", "Natália Gabriel", "Nicole Gabriel", "Patrícia Gabriel", "Paula Gabriel", "Priscila Gabriel", "Rafaela Gabriel", "Raquel Gabriel", "Renata Gabriel", "Sabrina Gabriel", "Sara Gabriel", "Sofia Gabriel", "Tatiane Gabriel", "Valentina Gabriel", "Vitória Gabriel", "Aline Gabriel", "Amanda Gabriel", "Andréia Gabriel", "Bárbara Gabriel", "Bianca Gabriel", "Débora Gabriel", "Flávia Gabriel", "Geovana Gabriel", "Ingrid Gabriel", "Irene Gabriel", "Jéssica Gabriel", "Joana Gabriel", "Lorena Gabriel", "Márcia Gabriel", "Melissa Gabriel", "Mônica Gabriel", "Nayara Gabriel", "Regina Gabriel", "Samara Gabriel", "Tainá Gabriel", "Verônica Gabriel", "Alice Gabriel", "Cecília Gabriel", "Diana Gabriel", "Ester Gabriel", "Fátima Gabriel", "Giovanna Gabriel", "Heloísa Gabriel", "Ivana Gabriel", "Janaína Gabriel", "Karen Gabriel", "Lara Gabriel", "Malu Gabriel", "Nina Gabriel", "Olívia Gabriel", "Paloma Gabriel", "Rebeca Gabriel", "Simone Gabriel", "Talita Gabriel", "Úrsula Gabriel", "Yasmin Gabriel", "Adriana Gabriel", "Alessandra Gabriel", "Alexandre Gabriel", "André Gabriel", "Antônio Gabriel", "Arthur Gabriel", "Bernardo Gabriel", "Bruno Gabriel", "Caio Gabriel", "Carlos Gabriel", "Cauã Gabriel", "César Gabriel", "Davi Gabriel", "Diego Gabriel", "Diogo Gabriel", "Douglas Gabriel", "Eduardo Gabriel", "Elias Gabriel", "Enzo Gabriel", "Erick Gabriel", "Felipe Gabriel", "Fernando Gabriel", "Francisco Gabriel", "Gabriel Gabriel", "Gustavo Gabriel", "Heitor Gabriel", "Henrique Gabriel", "Hugo Gabriel", "Igor Gabriel", "Ivan Gabriel", "João Gabriel", "Joaquim Gabriel", "Jorge Gabriel", "José Gabriel", "Juan Gabriel", "Juliano Gabriel", "Kaique Gabriel", "Leandro Gabriel", "Leonardo Gabriel", "Lorenzo Gabriel", "Lucas Gabriel", "Luís Gabriel", "Marcelo Gabriel", "Márcio Gabriel", "Marcos Gabriel", "Mateus Gabriel", "Matheus Gabriel", "Miguel Gabriel", "Murilo Gabriel", "Nathan Gabriel", "Nicolas Gabriel", "Otávio Gabriel", "Pablo Gabriel", "Paulo Gabriel", "Pedro Gabriel", "Rafael Gabriel", "Ramon Gabriel", "Raul Gabriel", "Reginaldo Gabriel", "Ricardo Gabriel", "Roberto Gabriel", "Rodrigo Gabriel", "Samuel Gabriel", "Sandro Gabriel", "Sérgio Gabriel", "Thiago Gabriel", "Tomás Gabriel", "Vítor Gabriel", "Wagner Gabriel", "Wesley Gabriel", "William Gabriel", "Yuri Gabriel", "Ana Júnior", "Beatriz Júnior", "Bruna Júnior", "Camila Júnior", "Carolina Júnior", "Clara Júnior", "Daniela Júnior", "Eduarda Júnior", "Elisa Júnior", "Fernanda Júnior", "Gabriela Júnior", "Helena Júnior", "Isabela Júnior", "Júlia Júnior", "Larissa Júnior", "Laura Júnior", "Letícia Júnior", "Lívia Júnior", "Luana Júnior", "Manuela Júnior", "Mariana Júnior", "Marina Júnior", "Mirela Júnior", "Natália Júnior", "Nicole Júnior", "Patrícia Júnior", "Paula Júnior", "Priscila Júnior", "Rafaela Júnior", "Raquel Júnior", "Renata Júnior", "Sabrina Júnior", "Sara Júnior", "Sofia Júnior", "Tatiane Júnior", "Valentina Júnior", "Vitória Júnior", "Aline Júnior", "Amanda Júnior", "Andréia Júnior", "Bárbara Júnior", "Bianca Júnior", "Débora Júnior", "Flávia Júnior", "Geovana Júnior", "Ingrid Júnior", "Irene Júnior", "Jéssica Júnior", "Joana Júnior", "Lorena Júnior"];
  const ratingSurnames = ["Silva Neto", "Santos Neto", "Oliveira Neto", "Souza Neto", "Pereira Neto", "Costa Neto", "Rodrigues Neto", "Almeida Neto", "Nascimento Neto", "Lima Neto", "Araújo Neto", "Fernandes Neto", "Carvalho Neto", "Gomes Neto", "Martins Neto", "Rocha Neto", "Ribeiro Neto", "Alves Neto", "Monteiro Neto", "Mendes Neto", "Barros Neto", "Freitas Neto", "Barbosa Neto", "Pinto Neto", "Moura Neto", "Cavalcanti Neto", "Dias Neto", "Castro Neto", "Campos Neto", "Cardoso Neto", "Teixeira Neto", "Correia Neto", "Moraes Neto", "Azevedo Neto", "Melo Neto", "Reis Neto", "Nascimento Neto", "Moreira Neto", "Vieira Neto", "Cunha Neto", "Macedo Neto", "Farias Neto", "Ramos Neto", "Coelho Neto", "Bezerra Neto", "Neves Neto", "Borges Neto", "Guimarães Neto", "Tavares Neto", "Siqueira Neto", "Braga Neto", "Leite Neto", "Miranda Neto", "Matos Neto", "Pires Neto", "Cordeiro Neto", "Duarte Neto", "Brito Neto", "Viana Neto", "Marques Neto", "Andrade Neto", "Nogueira Neto", "Lopes Neto", "Santana Neto", "Queiroz Neto", "Assis Neto", "Dantas Neto", "Vasconcelos Neto", "Sales Neto", "Peixoto Neto", "Medeiros Neto", "Moraes Neto", "Bittencourt Neto", "Figueiredo Neto", "Gonçalves Neto", "Lacerda Neto", "Vaz Neto", "Menezes Neto", "Batista Neto", "Sá Neto", "Pacheco Neto", "Xavier Neto", "Machado Neto", "Guedes Neto", "Paiva Neto", "Bastos Neto", "Sampaio Neto", "Amaral Neto", "Guerra Neto", "Bandeira Neto", "Menezes Neto", "Aguiar Neto", "Teles Neto", "Furtado Neto", "Quevedo Neto", "Porto Neto", "Rangel Neto", "Serra Neto", "Mota Neto", "Vidal Neto", "Silva Filho", "Santos Filho", "Oliveira Filho", "Souza Filho", "Pereira Filho", "Costa Filho", "Rodrigues Filho", "Almeida Filho", "Nascimento Filho", "Lima Filho", "Araújo Filho", "Fernandes Filho", "Carvalho Filho", "Gomes Filho", "Martins Filho", "Rocha Filho", "Ribeiro Filho", "Alves Filho", "Monteiro Filho", "Mendes Filho", "Barros Filho", "Freitas Filho", "Barbosa Filho", "Pinto Filho", "Moura Filho", "Cavalcanti Filho", "Dias Filho", "Castro Filho", "Campos Filho", "Cardoso Filho", "Teixeira Filho", "Correia Filho", "Moraes Filho", "Azevedo Filho", "Melo Filho", "Reis Filho", "Nascimento Filho", "Moreira Filho", "Vieira Filho", "Cunha Filho", "Macedo Filho", "Farias Filho", "Ramos Filho", "Coelho Filho", "Bezerra Filho", "Neves Filho", "Borges Filho", "Guimarães Filho", "Tavares Filho", "Siqueira Filho", "Braga Filho", "Leite Filho", "Miranda Filho", "Matos Filho", "Pires Filho", "Cordeiro Filho", "Duarte Filho", "Brito Filho", "Viana Filho", "Marques Filho", "Andrade Filho", "Nogueira Filho", "Lopes Filho", "Santana Filho", "Queiroz Filho", "Assis Filho", "Dantas Filho", "Vasconcelos Filho", "Sales Filho", "Peixoto Filho", "Medeiros Filho", "Moraes Filho", "Bittencourt Filho", "Figueiredo Filho", "Gonçalves Filho", "Lacerda Filho", "Vaz Filho", "Menezes Filho", "Batista Filho", "Sá Filho", "Pacheco Filho", "Xavier Filho", "Machado Filho", "Guedes Filho", "Paiva Filho", "Bastos Filho", "Sampaio Filho", "Amaral Filho", "Guerra Filho", "Bandeira Filho", "Menezes Filho", "Aguiar Filho", "Teles Filho", "Furtado Filho", "Quevedo Filho", "Porto Filho", "Rangel Filho", "Serra Filho", "Mota Filho", "Vidal Filho", "Silva Júnior", "Santos Júnior", "Oliveira Júnior", "Souza Júnior", "Pereira Júnior", "Costa Júnior", "Rodrigues Júnior", "Almeida Júnior", "Nascimento Júnior", "Lima Júnior", "Araújo Júnior", "Fernandes Júnior", "Carvalho Júnior", "Gomes Júnior", "Martins Júnior", "Rocha Júnior", "Ribeiro Júnior", "Alves Júnior", "Monteiro Júnior", "Mendes Júnior", "Barros Júnior", "Freitas Júnior", "Barbosa Júnior", "Pinto Júnior", "Moura Júnior", "Cavalcanti Júnior", "Dias Júnior", "Castro Júnior", "Campos Júnior", "Cardoso Júnior", "Teixeira Júnior", "Correia Júnior", "Moraes Júnior", "Azevedo Júnior", "Melo Júnior", "Reis Júnior", "Nascimento Júnior", "Moreira Júnior", "Vieira Júnior", "Cunha Júnior", "Macedo Júnior", "Farias Júnior", "Ramos Júnior", "Coelho Júnior", "Bezerra Júnior", "Neves Júnior", "Borges Júnior", "Guimarães Júnior", "Tavares Júnior", "Siqueira Júnior", "Braga Júnior", "Leite Júnior", "Miranda Júnior", "Matos Júnior", "Pires Júnior", "Cordeiro Júnior", "Duarte Júnior", "Brito Júnior", "Viana Júnior", "Marques Júnior", "Andrade Júnior", "Nogueira Júnior", "Lopes Júnior", "Santana Júnior", "Queiroz Júnior", "Assis Júnior", "Dantas Júnior", "Vasconcelos Júnior", "Sales Júnior", "Peixoto Júnior", "Medeiros Júnior", "Moraes Júnior", "Bittencourt Júnior", "Figueiredo Júnior", "Gonçalves Júnior", "Lacerda Júnior", "Vaz Júnior", "Menezes Júnior", "Batista Júnior", "Sá Júnior", "Pacheco Júnior", "Xavier Júnior", "Machado Júnior", "Guedes Júnior", "Paiva Júnior", "Bastos Júnior", "Sampaio Júnior", "Amaral Júnior", "Guerra Júnior", "Bandeira Júnior", "Menezes Júnior", "Aguiar Júnior", "Teles Júnior", "Furtado Júnior", "Quevedo Júnior", "Porto Júnior", "Rangel Júnior", "Serra Júnior", "Mota Júnior", "Vidal Júnior", "Silva Sobrinho", "Santos Sobrinho", "Oliveira Sobrinho", "Souza Sobrinho", "Pereira Sobrinho", "Costa Sobrinho", "Rodrigues Sobrinho", "Almeida Sobrinho", "Nascimento Sobrinho", "Lima Sobrinho", "Araújo Sobrinho", "Fernandes Sobrinho", "Carvalho Sobrinho", "Gomes Sobrinho", "Martins Sobrinho", "Rocha Sobrinho", "Ribeiro Sobrinho", "Alves Sobrinho", "Monteiro Sobrinho", "Mendes Sobrinho", "Barros Sobrinho", "Freitas Sobrinho", "Barbosa Sobrinho", "Pinto Sobrinho", "Moura Sobrinho", "Cavalcanti Sobrinho", "Dias Sobrinho", "Castro Sobrinho", "Campos Sobrinho", "Cardoso Sobrinho", "Teixeira Sobrinho", "Correia Sobrinho", "Moraes Sobrinho", "Azevedo Sobrinho", "Melo Sobrinho", "Reis Sobrinho", "Nascimento Sobrinho", "Moreira Sobrinho", "Vieira Sobrinho", "Cunha Sobrinho", "Macedo Sobrinho", "Farias Sobrinho", "Ramos Sobrinho", "Coelho Sobrinho", "Bezerra Sobrinho", "Neves Sobrinho", "Borges Sobrinho", "Guimarães Sobrinho", "Tavares Sobrinho", "Siqueira Sobrinho", "Braga Sobrinho", "Leite Sobrinho", "Miranda Sobrinho", "Matos Sobrinho", "Pires Sobrinho", "Cordeiro Sobrinho", "Duarte Sobrinho", "Brito Sobrinho", "Viana Sobrinho", "Marques Sobrinho", "Andrade Sobrinho", "Nogueira Sobrinho", "Lopes Sobrinho", "Santana Sobrinho", "Queiroz Sobrinho", "Assis Sobrinho", "Dantas Sobrinho", "Vasconcelos Sobrinho", "Sales Sobrinho", "Peixoto Sobrinho", "Medeiros Sobrinho", "Moraes Sobrinho", "Bittencourt Sobrinho", "Figueiredo Sobrinho", "Gonçalves Sobrinho", "Lacerda Sobrinho", "Vaz Sobrinho", "Menezes Sobrinho", "Batista Sobrinho", "Sá Sobrinho", "Pacheco Sobrinho", "Xavier Sobrinho", "Machado Sobrinho", "Guedes Sobrinho", "Paiva Sobrinho", "Bastos Sobrinho", "Sampaio Sobrinho", "Amaral Sobrinho", "Guerra Sobrinho", "Bandeira Sobrinho", "Menezes Sobrinho", "Aguiar Sobrinho", "Teles Sobrinho", "Furtado Sobrinho", "Quevedo Sobrinho", "Porto Sobrinho", "Rangel Sobrinho", "Serra Sobrinho", "Mota Sobrinho", "Vidal Sobrinho", "Silva de Lima", "Santos de Lima", "Oliveira de Lima", "Souza de Lima", "Pereira de Lima", "Costa de Lima", "Rodrigues de Lima", "Almeida de Lima", "Nascimento de Lima", "Lima de Lima", "Araújo de Lima", "Fernandes de Lima", "Carvalho de Lima", "Gomes de Lima", "Martins de Lima", "Rocha de Lima", "Ribeiro de Lima", "Alves de Lima", "Monteiro de Lima", "Mendes de Lima", "Barros de Lima", "Freitas de Lima", "Barbosa de Lima", "Pinto de Lima", "Moura de Lima", "Cavalcanti de Lima", "Dias de Lima", "Castro de Lima", "Campos de Lima", "Cardoso de Lima", "Teixeira de Lima", "Correia de Lima", "Moraes de Lima", "Azevedo de Lima", "Melo de Lima", "Reis de Lima", "Nascimento de Lima", "Moreira de Lima", "Vieira de Lima", "Cunha de Lima", "Macedo de Lima", "Farias de Lima", "Ramos de Lima", "Coelho de Lima", "Bezerra de Lima", "Neves de Lima", "Borges de Lima", "Guimarães de Lima", "Tavares de Lima", "Siqueira de Lima", "Braga de Lima", "Leite de Lima", "Miranda de Lima", "Matos de Lima", "Pires de Lima", "Cordeiro de Lima", "Duarte de Lima", "Brito de Lima", "Viana de Lima", "Marques de Lima", "Andrade de Lima", "Nogueira de Lima", "Lopes de Lima", "Santana de Lima", "Queiroz de Lima", "Assis de Lima", "Dantas de Lima", "Vasconcelos de Lima", "Sales de Lima", "Peixoto de Lima", "Medeiros de Lima", "Moraes de Lima", "Bittencourt de Lima", "Figueiredo de Lima", "Gonçalves de Lima", "Lacerda de Lima", "Vaz de Lima", "Menezes de Lima", "Batista de Lima", "Sá de Lima", "Pacheco de Lima", "Xavier de Lima", "Machado de Lima", "Guedes de Lima", "Paiva de Lima", "Bastos de Lima", "Sampaio de Lima", "Amaral de Lima", "Guerra de Lima", "Bandeira de Lima", "Menezes de Lima", "Aguiar de Lima", "Teles de Lima", "Furtado de Lima", "Quevedo de Lima", "Porto de Lima", "Rangel de Lima", "Serra de Lima", "Mota de Lima", "Vidal de Lima"];
  const randomRatingName = () => {
    const first = ratingFirstNames[Math.floor(Math.random() * ratingFirstNames.length)];
    const last = ratingSurnames[Math.floor(Math.random() * ratingSurnames.length)];
    return `${first} ${last}`;
  };

  const testimonials = [
    { initials: 'AM', name: 'Ana Martins', role: 'Criadora de conteúdo', tone: 'blue', text: 'O que mais gostei foi transformar um monte de ideias soltas em uma rotina simples de publicação. A trilha deixa claro o que estudar e o que testar primeiro.' },
    { initials: 'RS', name: 'Rafael Santos', role: 'Pequeno empreendedor', tone: 'cyan', text: 'A abordagem é pé no chão. Em vez de prometer resultado rápido, o material mostra como construir uma presença que faça sentido para o público.' },
    { initials: 'JL', name: 'Juliana Lima', role: 'Social media', tone: 'violet', text: 'A biblioteca progressiva é muito prática para consultar no dia a dia. Volto aos capítulos quando preciso revisar posicionamento, conteúdo e métricas.' },
    { initials: 'CO', name: 'Carlos Oliveira', role: 'Educador independente', tone: 'green', text: 'Finalmente encontrei uma explicação acessível sobre originalidade e consistência. O conteúdo ajuda a tomar decisões melhores sem depender de hacks.' },
    { initials: 'BS', name: 'Bianca Souza', role: 'Profissional em transição', tone: 'orange', text: 'O formato gratuito torna mais fácil começar. A organização dos volumes dá uma sensação de caminho, sem transformar o aprendizado em algo pesado.' },
    { initials: 'DM', name: 'Diego Martins', role: 'Produtor de vídeos', tone: 'navy', text: 'Gostei da transparência sobre monetização. Saber o que depende da Meta e o que depende da nossa aplicação evita expectativas irreais.' }
  ];

  const section = document.querySelector('[data-testimonials-mockup]');
  if (!section) return;

  const disclaimer = section.querySelector('[data-testimonials-disclaimer]');
  fetch('testimonials-config.txt', { cache: 'no-store' })
    .then((response) => response.ok ? response.text() : '')
    .then((value) => {
      const configuredText = value.trim();
      if (configuredText && disclaimer) disclaimer.textContent = configuredText;
    })
    .catch(() => {});

  section.innerHTML = `
    <div class="wrap">
      <div class="head testimonials-head">
        <span class="eyebrow" style="color:var(--blue)">EXPERIÊNCIAS EM DESTAQUE</span>
        <h2>Uma trilha que cabe na vida real.</h2>
        <p>Quem se compromete com o processo e aplica o que aprende transforma esforço em resultado.</p>
        <span class="mockup-disclaimer" data-testimonials-disclaimer>Mockup de desenvolvimento • depoimentos ilustrativos, ainda não são avaliações reais</span>
      </div>
      <div class="testimonials-carousel" aria-roledescription="carrossel" aria-label="Exemplos ilustrativos de depoimentos">
        <div class="testimonial-viewport">
          <div class="testimonial-track"></div>
        </div>
      </div>
      <div class="testimonial-footer">
        <button class="testimonial-control prev" type="button" aria-label="Ver depoimentos anteriores">‹</button>
        <div class="testimonial-dots" role="tablist" aria-label="Selecionar depoimento"></div>
        <span class="testimonial-counter" aria-live="polite"></span>
        <button class="testimonial-control next" type="button" aria-label="Ver próximos depoimentos">›</button>
      </div>
      <div class="testimonial-toast" role="status" aria-live="polite" aria-atomic="true" hidden>
        <span class="toast-mark" aria-hidden="true">✦</span>
        <div><strong>NOVA AVALIAÇÃO DE CONTEÚDO RECEBIDA</strong><span class="toast-context">Uma nova avaliação 5 estrelas foi recebida</span><b class="toast-reviewer">${randomRatingName()} <span aria-label="5 estrelas">★★★★★</span></b><small>aguardando para avaliação</small></div>
        <button type="button" class="toast-close" aria-label="Fechar notificação">×</button>
      </div>
    </div>`;

  const track = section.querySelector('.testimonial-track');
  const dots = section.querySelector('.testimonial-dots');
  const counter = section.querySelector('.testimonial-counter');
  const viewport = section.querySelector('.testimonial-viewport');
  let index = 0;
  let startX = null;

  testimonials.forEach((item, i) => {
    const card = document.createElement('article');
    card.className = 'testimonial-card';
    card.setAttribute('role', 'group');
    card.setAttribute('aria-label', `Depoimento ilustrativo ${i + 1} de ${testimonials.length}`);
    card.innerHTML = `
      <div class="testimonial-card-top">
        <div class="testimonial-avatar avatar-${item.tone}" aria-hidden="true">${item.initials}</div>
        <span class="testimonial-rating">Avaliado como <strong>👍</strong></span>
      </div>
      <div class="testimonial-person"><h3>${item.name}</h3><span>${item.role}</span></div>
      <p class="testimonial-copy">“${item.text}”</p>`;
    track.appendChild(card);

    const dot = document.createElement('button');
    dot.type = 'button';
    dot.className = 'testimonial-dot';
    dot.setAttribute('role', 'tab');
    dot.setAttribute('aria-label', `Mostrar depoimento ${i + 1}`);
    dot.addEventListener('click', () => { index = i; update(); });
    dots.appendChild(dot);
  });

  const visibleCount = () => window.innerWidth >= 980 ? 3 : window.innerWidth >= 640 ? 2 : 1;
  const maxIndex = () => Math.max(0, testimonials.length - visibleCount());

  function update() {
    index = Math.min(index, maxIndex());
    const card = track.querySelector('.testimonial-card');
    if (!card) return;
    const gap = parseFloat(getComputedStyle(track).gap) || 0;
    const offset = index * (card.getBoundingClientRect().width + gap);
    track.style.transform = `translate3d(-${offset}px, 0, 0)`;
    section.querySelector('.prev').disabled = index === 0;
    section.querySelector('.next').disabled = index === maxIndex();
    [...dots.children].forEach((dot, i) => {
      const active = i === index;
      dot.classList.toggle('is-active', active);
      dot.setAttribute('aria-selected', String(active));
    });
    counter.textContent = `${index + 1}–${Math.min(index + visibleCount(), testimonials.length)} de ${testimonials.length}`;
  }

  section.querySelector('.prev').addEventListener('click', () => { index = Math.max(0, index - 1); update(); });
  section.querySelector('.next').addEventListener('click', () => { index = Math.min(maxIndex(), index + 1); update(); });
  viewport.addEventListener('pointerdown', (event) => { startX = event.clientX; viewport.setPointerCapture?.(event.pointerId); });
  viewport.addEventListener('pointerup', (event) => {
    if (startX === null) return;
    const delta = event.clientX - startX;
    if (Math.abs(delta) > 42) index = delta < 0 ? Math.min(maxIndex(), index + 1) : Math.max(0, index - 1);
    startX = null;
    update();
  });
  window.addEventListener('resize', update, { passive: true });

  const toast = section.querySelector('.testimonial-toast');
  const closeToast = section.querySelector('.toast-close');
  const showToast = () => {
    toast.querySelector(".toast-reviewer").firstChild.textContent = `${randomRatingName()} `;
    toast.hidden = false;
    requestAnimationFrame(() => toast.classList.add('is-visible'));
  };
  const hideToast = () => {
    toast.classList.remove('is-visible');
    window.setTimeout(() => { toast.hidden = true; }, 220);
  };
  closeToast.addEventListener('click', hideToast);
  window.setTimeout(showToast, 4200);
  update();
})();
