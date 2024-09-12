create database db_provest_jengt;

use db_provest_jengt;

create table tbl_redacao
(
	id integer primary key auto_increment not null,
    titulo varchar(70) not null,
    texto text not null,
    tema_id integer,
    status boolean,
    
    foreign key (tema_id) references tbl_temas(id)
);

create table tbl_temas
(
	id integer primary key auto_increment not null,
    nome varchar(100),
    descricao varchar (255)
);

create table tbl_icones
(
	id integer primary key auto_increment not null,
    url text,
    status boolean
);

create table tbl_cursos
(
	id integer primary key auto_increment not null,
    nome varchar(100)
);

create table tbl_disciplinas
(
	id integer primary key auto_increment not null,
    nome varchar(100)
);

create table tbl_topicos
(
	id integer primary key auto_increment not null,
    nome varchar(100)
);

create table tbl_exercicio_respostas
(
	id integer primary key auto_increment not null,
    questao varchar(255),
    alternativas text,
    resposta varchar(255)
);

create table tbl_calendario
(
	id integer primary key auto_increment not null,
    nome_vest varchar(60),
    fase integer,
    data_vest date,
    status boolean
);
