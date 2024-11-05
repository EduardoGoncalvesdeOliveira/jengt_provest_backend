create database db_jengt_provest;

use db_jengt_provest;


create table tbl_tema
(
	id integer primary key auto_increment not null,
    nome varchar(255) not null,
    descricao varchar (255) not null
);

create table tbl_redacao
(
	id integer primary key auto_increment not null,
    titulo varchar(70) not null,
    texto text not null,
    tema_id int not null,
    status boolean,
    
    foreign key (tema_id) references tbl_tema (id)
);

create table tbl_cursos
(
	id integer primary key auto_increment not null,
    nome varchar(200) not null
);

create table tbl_disciplina
(
	id integer primary key auto_increment not null,
    nome varchar(100) not null
);

create table tbl_topicos
(
	id integer primary key auto_increment not null,
    nome text not null
);

create table tbl_disciplina_topico
(
	id integer primary key auto_increment not null,
    disciplina_id int not null,
    topico_id int not null,
    
    foreign key (disciplina_id) references tbl_disciplina(id),
	foreign key (topico_id) references tbl_topicos(id)
);

create table tbl_videoaulas
(
	id integer primary key auto_increment not null,
    titulo varchar(255) not null,
    duracao time not null,
    topico_id int not null,
    status boolean,
    
    foreign key (topico_id) references tbl_topicos(id)
);

create table tbl_exercicio
(
	id integer primary key auto_increment not null,
    questao text,
    topico_id int,    
    status boolean,
    
    foreign key (topico_id) references tbl_topicos(id)
);

create table tbl_alternativas
(
	id integer primary key auto_increment not null,
	opcao text not null,
    resposta boolean not null,
    questao_id integer not null,
    
    foreign key (questao_id) references tbl_exercicio(id)
);

create table tbl_cursos_disciplina
(
	id integer primary key auto_increment not null,
    curso_id int not null,
    disciplina_id int not null,
    
    foreign key (curso_id) references tbl_cursos(id),
    foreign key (disciplina_id) references tbl_disciplina(id)
);

create table tbl_aluno
(
	id integer primary key auto_increment not null,
    nome varchar(150) not null,
    email varchar(150) not null,
    senha varchar(15) not null,
    icone_id int not null,
    curso_id int not null,
	status boolean,
    
    foreign key (icone_id) references tbl_icones(id),
    foreign key (curso_id) references tbl_cursos(id)
);

create table tbl_professor
(
	id integer primary key auto_increment not null,
    nome varchar(150) not null,
    email varchar(150) not null,
    senha varchar(15) not null,
    icone_id int not null,
	status boolean,
    
    foreign key (icone_id) references tbl_icones(id)
);

create table tbl_icones
(
	id integer primary key auto_increment not null,
    url text not null,
    status boolean
);

create table tbl_semana
(
	id integer primary key auto_increment not null,
    nome varchar(3) not null
);

create table tbl_horarios
(
	id integer primary key auto_increment not null,
    horas time not null
);

create table caderno_aluno
(
	id integer primary key auto_increment not null,
    titulo varchar(45) not null,
    texto text not null,
    aluno_id int not null,
    
    foreign key (aluno_id) references tbl_aluno(id)
);

create table tbl_prof_agenda
(
	id integer primary key auto_increment not null,
    semana_id int not null,
    horario_id int not null,
    professor_id int not null,
    
    foreign key (semana_id) references tbl_semana(id),
    foreign key (horario_id) references tbl_horarios(id),
    foreign key (professor_id) references tbl_professor(id)
);

create table tbl_prof_disciplinas
(
	id integer primary key auto_increment not null,
    disciplina_id int not null,
    professor_id int not null,
    
	foreign key (disciplina_id) references tbl_disciplina(id),
    foreign key (professor_id) references tbl_professor(id)
);

create table tbl_aluno_agenda
(
	id integer primary key auto_increment not null,
    semana_id int not null,
    horario_id int not null,
    aluno_id int not null,
    
    foreign key (semana_id) references tbl_semana(id),
    foreign key (horario_id) references tbl_horarios(id),
    foreign key (aluno_id) references tbl_aluno(id)
);

create table tbl_cronograma
(
	id integer primary key auto_increment not null,
    agenda_aluno_id int not null,
    disciplina_id int not null,
    
    foreign key (agenda_aluno_id) references tbl_aluno_agenda(id),
    foreign key (disciplina_id) references tbl_disciplina(id)
);

create table tbl_instituicoes
(
	id integer primary key auto_increment not null,
    nome varchar(200) not null
);

create table tbl_vestibulares
(
	id integer primary key auto_increment not null,
    nome varchar(15) not null,
    data_prova date not null,
    instituicao_id int not null,
    status boolean,
    
    foreign key (instituicao_id) references tbl_instituicoes(id) 
);

create table tbl_fases
(
	id integer primary key auto_increment not null,
    fase int
);

create table tbl_vest_fases
(
	id integer primary key auto_increment not null,
    vestibular_id int not null,
    fase_id int not null,
    
    foreign key (vestibular_id) references tbl_vestibulares(id),
    foreign key (fase_id) references tbl_fases(id)
);

create table tbl_notificacoes 
(
	id int primary key auto_increment not null,
    titulo varchar(100) not null,
    descricao varchar (255) not null,
    vest_fases_id int not null,
    
    foreign key (vest_fases_id) references tbl_vest_fases(id)
);

create table tbl_not_aluno
(
	id int primary key auto_increment not null,
	notificacoes_id int,
    aluno_id int,
    
    foreign key (notificacoes_id) references tbl_notificacoes(id),
    foreign key (aluno_id) references tbl_aluno(id)
);

-- CONSULTAS
	-- insert
    insert into tbl_cursos (nome)values(
		'Análise e Desenvolvimento de Sistemas'
    );
    
    insert into tbl_icones (url, status)values(
                'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ9X9bMjDZakjD5pSqXrhpRuMtUlS4vAzR0Dg&s',
               true
               );
               
    insert into tbl_professor (nome, email, senha, icone_id, status)values(
                "Arthur Lopes",
                'arthurlopes160@gmail.com',
                'tuco',
                1,
               true
               );
               
               
	insert into tbl_aluno (nome, email, senha, icone_id, curso_id, status)values(
			'Nycolle Lima',
			'nyck.lima01@gmail.com',
			'aaaa',
            '1',
			'5',
		   true
		);
		
	-- update
    update tbl_professor set 
						nome = "Eduardinho"
						where id = 2;
	update tbl_professor set status = false where id = 2;
	update tbl_professor set status = true where id = 2;
    update tbl_professor set senha = 'matheus' where id = 2;
	update tbl_aluno set 
						curso_id = 2
						where id = 5;
	update tbl_aluno set status = false where id = 5;
	update tbl_aluno set status = true where id = 5;
    update tbl_aluno set senha = "jogar" where id = 4;
               
	-- get
    use db_provest_jengt;
    select * from tbl_cursos;
    select * from tbl_aluno;
    select * from tbl_videoaulas;
    select * from tbl_alternativas;

    alter table tbl_professor modify icone_id int not null;
	select nome, email, senha from tbl_professor order by nome asc;
    select nome, email, senha from tbl_professor where id=2 and status=true;
    select * from tbl_professor where nome like '%ga%' and status=true;
    select cast(last_insert_id() as DECIMAL) as id from tbl_professor limit 1;
    select nome, email from tbl_professor where email='gabriela.cavalcanti886@gmail.com' and senha='hagrid'; 
    select tbl_aluno.id, tbl_aluno.nome, tbl_aluno.email, tbl_aluno.senha, tbl_cursos.nome as curso from tbl_aluno
			inner join tbl_cursos on tbl_aluno.curso_id=tbl_cursos.id order by nome asc;
	select tbl_aluno.nome, tbl_aluno.email, tbl_aluno.senha, tbl_cursos.nome as curso from tbl_aluno
                    inner join tbl_cursos on tbl_aluno.curso_id=tbl_cursos.id 
                    where tbl_aluno.id=4 and status=true;
	select tbl_aluno.nome, tbl_aluno.email, tbl_aluno.senha, tbl_cursos.nome as curso from tbl_aluno
			inner join tbl_cursos on tbl_aluno.curso_id=tbl_cursos.id 
            where tbl_aluno.nome like '%t%' and status=true;
	select cast(last_insert_id() as DECIMAL) as id from tbl_aluno limit 1;
    select nome, email from tbl_aluno where email = 'tamiressenaisp@gmail.com' and senha = "jogar";
    
    
    select tbl_alternativas.id, tbl_exercicio.questao, tbl_alternativas.opcao
	from tbl_alternativas inner join tbl_exercicio on tbl_alternativas.questao_id=tbl_exercicio.id 
	order by id desc;
    
    select tbl_alternativas.id, tbl_alternativas.opcao, tbl_alternativas.resposta from tbl_alternativas
	inner join tbl_exercicio on tbl_alternativas.questao_id=tbl_exercicio.id
	where tbl_exercicio.id=2;
        select * from tbl_topicos;
    select tbl_topicos.id, tbl_topicos.nome from tbl_topicos where id=3;
    
    select tbl_notificacoes.titulo, tbl_notificacoes.descricao, tbl_vestibulares.nome, tbl_vestibulares.data_prova, tbl_vest_fases.fase_id
                    from tbl_notificacoes 
                    inner join tbl_vest_fases on tbl_notificacoes.vest_fases_id=tbl_vest_fases.id
                    inner join tbl_vestibulares on tbl_vest_fases.vestibular_id=tbl_vestibulares.id
                    order by tbl_notificacoes.id desc;
                    
                    select tbl_notificacoes.titulo, tbl_notificacoes.descricao, tbl_vestibulares.nome, tbl_vestibulares.data_prova, tbl_vest_fases.fase_id
                    from tbl_notificacoes 
                    inner join tbl_vest_fases on tbl_notificacoes.vest_fases_id=tbl_vest_fases.id
                    inner join tbl_vestibulares on tbl_vest_fases.vestibular_id=tbl_vestibulares.id
                    where tbl_notificacoes.id = 1;
                    
select tbl_notificacoes.titulo, tbl_notificacoes.descricao, tbl_vestibulares.nome, tbl_vestibulares.data_prova, tbl_vest_fases.fase_id
from tbl_notificacoes 
inner join tbl_vest_fases on tbl_notificacoes.vest_fases_id=tbl_vest_fases.id
inner join tbl_vestibulares on tbl_vest_fases.vestibular_id=tbl_vestibulares.id
inner join tbl_not_aluno on tbl_notificacoes.id=tbl_not_aluno.aluno_id
where tbl_not_aluno.aluno_id = 1;
				
insert into tbl_notificacoes(titulo, descricao, vest_fases_id)values           
('Fuvest 2025 chegando!', 'Faltam 45 dias para a primeira fase da Fuvest 2025, que ocorrerá em 17 de novembro de 2024. Prepare-se!', 3),
('ENEM 2024 está chegando!', 'Faltam 30 dias para o ENEM 2024, que será realizado em 03 de novembro de 2024. Não perca a data!', 3),
('UNICAMP 2025 em breve!', 'Faltam 50 dias para a primeira fase da UNICAMP 2025, que será em 19 de novembro de 2024. Revisem seus estudos!', 3),
('UNESP 2025: Fique atento!', 'Faltam 40 dias para a primeira fase da UNESP 2025, agendada para 15 de novembro de 2024. Continue focado!', 3),
('UFRJ 2025: Vestibular a caminho!', 'Faltam 60 dias para o vestibular UFRJ 2025. A prova ocorrerá em 03 de dezembro de 2024.', 3),
('UFPR 2025: Prova se aproxima!', 'Faltam 20 dias para o vestibular UFPR 2025, agendado para 23 de outubro de 2024. Últimas semanas de preparação!', 3);

                   
select * from tbl_not_aluno;
select * from tbl_instituicoes;
select * from tbl_vestibulares;
select * from tbl_aluno;
select * from tbl_fases;
select * from tbl_notificacoes;
select * from tbl_vest_fases;

insert into tbl_vest_fases(vestibular_id, fase_id)values
(1, 4);

select cast(last_insert_id() as DECIMAL) as id from tbl_aluno limit 1;

select * from tbl_cursos_disciplina;
select * from tbl_cursos as c left join tbl_cursos_disciplina as cd on c.id=cd.curso_id left join tbl_disciplina as d on cd.disciplina_id=d.id;
select * from tbl_disciplina;

select * from tbl_tema;

SELECT 
    c.nome, 
    GROUP_CONCAT(d.nome ORDER BY d.nome SEPARATOR ', ') AS disciplinas
FROM tbl_cursos AS c
LEFT JOIN tbl_cursos_disciplina AS cd ON c.id = cd.curso_id
LEFT JOIN tbl_disciplina AS d ON cd.disciplina_id = d.id
GROUP BY c.id;

insert into tbl_cursos_disciplina(curso_id, disciplina_id)values
(2, 5),  -- Biologia
(2, 3),  -- Química
(2, 4),  -- Física
(3, 5),  -- Biologia
(3, 3),  -- Química
(4, 5),  -- Biologia
(4, 3),
(5, 3),  -- Química
(5, 5),
(6, 6),  -- Língua Portuguesa
(6, 2),  -- História
(6, 10), -- Filosofia
(6, 11),
(7, 3),  -- Química
(7, 4),  -- Física
(7, 1),
(8, 1),  -- Matemática
(8, 4);  
use db_provest_jengt;

select * from tbl_topicos;


-- Passo 1: Adicionar a coluna (caso ainda não exista)
ALTER TABLE tbl_exercicio
ADD COLUMN topico_id INT;

-- Passo 2: Adicionar a Foreign Key
ALTER TABLE tbl_exercicio
ADD CONSTRAINT fk_topico
FOREIGN KEY (topico_id) REFERENCES tbl_topicos(id)
ON DELETE NO ACTION
ON UPDATE NO ACTION;

ALTER TABLE tbl_exercicio
DROP FOREIGN KEY fk_curso;

select * from tbl_videoaulas;

select tbl_videoaulas.titulo, tbl_videoaulas.duracao, tbl_topicos.nome as topico
from tbl_videoaulas
inner join tbl_topicos on tbl_videoaulas.topico_id=tbl_topicos.id
where tbl_videoaulas.id=4;

select tbl_videoaulas.titulo, tbl_videoaulas.duracao, tbl_topicos.nome as topico
from tbl_videoaulas
inner join tbl_topicos on tbl_videoaulas.topico_id=tbl_topicos.id
where tbl_videoaulas.topico_id=7;

INSERT INTO tbl_videoaulas(titulo, duracao, topico_id, status) VALUES
('Introdução à Geografia Física', '00:15:30', 1, true),
('Estruturas da Terra', '00:20:45', 1, true),
('Introdução à Geografia Humana', '00:18:00', 2, true),
('População e Cultura', '00:22:10', 2, true),
('Climas e Zonas Climáticas', '00:30:00', 3, true),
('Impactos Climáticos no Brasil', '00:25:30', 3, true),
('Importância dos Rios no Ecossistema', '00:17:50', 4, true),
('Bacias Hidrográficas Brasileiras', '00:28:15', 4, true),
('Formação e Transformação do Relevo', '00:21:45', 5, true),
('Tipos de Relevo', '00:26:30', 5, true),
('Biomas Mundiais e Diversidade', '00:24:00', 6, true),
('Biogeografia e Preservação Ambiental', '00:19:30', 6, true),
('História e Conceitos de Geopolítica', '00:27:00', 7, true),
('Geopolítica Atual e Conflitos', '00:29:45', 7, true),
('Geografia Econômica e Globalização', '00:31:15', 8, true),
('Agronegócio e Comércio Exterior', '00:33:00', 8, true),
('Estudos de Demografia', '00:18:20', 9, true),
('Demografia e Política Populacional', '00:22:35', 9, true),
('Urbanização e Crescimento das Cidades', '00:20:15', 10, true),
('Desafios da Geografia Urbana', '00:19:50', 10, true);


INSERT INTO tbl_topicos (nome) VALUES
('Geografia Física'),
('Geografia Humana'),
('Climatologia'),
('Hidrografia'),
('Geomorfologia'),
('Biogeografia'),
('Geopolítica'),
('Geografia Econômica'),
('Demografia'),
('Geografia Urbana');

select * from tbl_fases;
select * from tbl_vestibulares;
select * from tbl_instituicoes;
select * from tbl_vest_fases;

select tbl_vestibulares.nome, tbl_vestibulares.data_prova, tbl_instituicoes.nome, tbl_instituicoes.sigla tbl_fases.fase
from tbl_vest_fases
inner join tbl_vestibulares on tbl_vest_fases.vestibular_id=tbl_vestibulares.id
inner join tbl_instituicoes on tbl_vestibulares.instituicao_id=tbl_instituicoes.id
inner join tbl_fases on tbl_vest_fases.fase_id=tbl_fases.id
order by tbl_vest_fases.id desc;