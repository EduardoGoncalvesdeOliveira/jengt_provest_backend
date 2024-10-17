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
    status boolean
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

create table tbl_intituicoes
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
    
    foreign key (instituicao_id) references tbl_intituicoes(id) 
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
    alter table tbl_professor modify senha varchar(32);
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
    
    
    