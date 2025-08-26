drop database if exists bsf;
create database bsf;
use bsf;

drop table if exists library_subscription;
drop table if exists library_entry_tags;
drop table if exists fanfic_tags;
drop table if exists tag;
drop table if exists fanfic_fandom;
drop table if exists library_entry_fandom;
drop table if exists library_entry_tags;
drop table if exists library_entry;
drop table if exists fanfic;
drop table if exists library;
drop table if exists fandom;
drop table if exists author;
drop table if exists user_role;
drop table if exists role;
drop table if exists user_login;
drop table if exists user;

create or replace table user
(
    id         bigint unsigned primary key auto_increment not null default null,
    username   varchar(255)                               not null,
    dob        date                                       not null,
    created_at timestamp                                  not null default now()
);

create or replace table user_login
(
    id      bigint unsigned primary key auto_increment not null default null,
    user_id bigint unsigned                            not null references user (id),
    created timestamp                                  not null default now()
);

create or replace table role
(
    id   bigint unsigned primary key auto_increment not null default null,
    name varchar(255)                               not null
);

create or replace table user_role
(
    user_id bigint unsigned not null references user (id),
    role_id bigint unsigned not null references role (id),
    primary key (user_id, role_id)
);

create or replace table author
(
    id      bigint unsigned primary key auto_increment not null default null,
    user_id bigint unsigned                            null     default null references user (id),
    name    varchar(255)                               not null,
    alias   boolean                                    not null default false
);

create or replace table fandom
(
    id    bigint unsigned primary key auto_increment not null default null,
    name  varchar(255)                               not null,
    alias boolean                                    not null default false
);

create or replace table tag
(
    id   bigint unsigned primary key auto_increment not null default null,
    name varchar(255)                               not null
);

create or replace table fanfic
(
    id          bigint unsigned primary key auto_increment not null default null,
    author_id   bigint unsigned                            not null references author (id),
    external_id varchar(50)                                null,
    title       varchar(255)                               not null,
    created_at  timestamp                                  not null,
    updated_at  timestamp                                  not null,
    url         varchar(300)                               null     default null,
    external    boolean                                    not null default false,
    summary     text                                       null     default null,
    language    varchar(50)                                not null
);

create or replace table fanfic_fandom
(
    fanfic_id bigint unsigned not null references fanfic (id),
    fandom_id bigint unsigned not null references fandom (id),
    primary key (fanfic_id, fandom_id)
);

create or replace table fanfic_tags
(
    fanfic_id bigint unsigned not null references fanfic (id),
    tag_id    bigint unsigned not null references tag (id),
    required  boolean         not null default false,
    primary key (fanfic_id, tag_id)
);

create or replace table library
(
    id          bigint unsigned primary key auto_increment not null default null,
    user_id     bigint unsigned                            not null references user (id),
    name        varchar(50)                                not null,
    description text                                       null     default null,
    created_at  timestamp                                  not null default now(),
    updated_at  timestamp                                  not null default now()
);

create or replace table library_entry
(
    id         bigint unsigned primary key auto_increment not null default null,
    library_id bigint unsigned                            not null references library (id),
    fanfic_id  bigint unsigned                            not null references fanfic (id),
    ordering   int                                        not null default 0,
    summary    text                                       null     default null,
    rating     smallint unsigned                          null     default null,
    created_at timestamp                                  not null,
    updated_at timestamp                                  not null
);

create or replace table library_entry_fandom
(
    library_entry_id bigint unsigned not null references library_entry (id),
    fandom_id        bigint unsigned not null references fandom (id),
    primary key (library_entry_id, fandom_id)
);

create or replace table library_entry_tags
(
    library_entry_id bigint unsigned not null references library_entry (id),
    tag_id           bigint unsigned not null references tag (id),
    primary key (library_entry_id, tag_id)
);

create or replace table library_subscription
(
    library_id bigint unsigned not null references library (id),
    user_id    bigint unsigned not null references user (id),
    primary key (library_id, user_id)
);
