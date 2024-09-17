create database db_provest_jengt;

use db_provest_jengt;
aaaaaqaaa

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