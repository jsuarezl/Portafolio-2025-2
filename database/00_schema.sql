DROP DATABASE IF EXISTS bsf;
CREATE DATABASE bsf;
USE bsf;

DROP TABLE IF EXISTS library_subscription;
DROP TABLE IF EXISTS library_entry_tags;
DROP TABLE IF EXISTS fanfic_tags;
DROP TABLE IF EXISTS tag;
DROP TABLE IF EXISTS fanfic_fandom;
DROP TABLE IF EXISTS library_entry_fandom;
DROP TABLE IF EXISTS library_entry_tags;
DROP TABLE IF EXISTS library_entry;
DROP TABLE IF EXISTS fanfic;
DROP TABLE IF EXISTS library;
DROP TABLE IF EXISTS fandom;
DROP TABLE IF EXISTS author;
DROP TABLE IF EXISTS user_role;
DROP TABLE IF EXISTS role;
DROP TABLE IF EXISTS user_login;
DROP TABLE IF EXISTS post_report;
DROP TABLE IF EXISTS post_response;
DROP TABLE IF EXISTS forum_post;
DROP TABLE IF EXISTS forum_member;
DROP TABLE IF EXISTS forum_role;
DROP TABLE IF EXISTS forum;
DROP TABLE IF EXISTS user_lang;
DROP TABLE IF EXISTS user_fandom;
DROP TABLE IF EXISTS user;
DROP TABLE IF EXISTS language;

CREATE OR REPLACE TABLE language
(
    id   INT UNSIGNED PRIMARY KEY AUTO_INCREMENT NOT NULL DEFAULT NULL,
    code CHAR(2)                                 NOT NULL,
    name VARCHAR(25)                             NOT NULL
);

-- regiones van a funcionar con api externa https://github.com/dr5hn/countries-states-cities-database
CREATE OR REPLACE TABLE user
(
    id         BIGINT UNSIGNED PRIMARY KEY AUTO_INCREMENT NOT NULL DEFAULT NULL,
    username   VARCHAR(255)                               NOT NULL,
    dob        DATE                                       NOT NULL,
    gender     ENUM ('male', 'female', 'other')           NOT NULL,
    created_at TIMESTAMP                                  NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP                                  NULL     DEFAULT NULL
    -- TODO: add ids for country, region, city
);

CREATE OR REPLACE TABLE user_lang
(
    user_id     BIGINT UNSIGNED NOT NULL REFERENCES user (id),
    language_id INT UNSIGNED    NOT NULL REFERENCES language (id),
    is_primary  BOOLEAN         NOT NULL DEFAULT FALSE
);

CREATE OR REPLACE TABLE user_login
(
    id         BIGINT UNSIGNED PRIMARY KEY AUTO_INCREMENT NOT NULL DEFAULT NULL,
    user_id    BIGINT UNSIGNED                            NOT NULL REFERENCES user (id),
    created_at TIMESTAMP                                  NOT NULL DEFAULT NOW()
);

CREATE OR REPLACE TABLE role
(
    id   BIGINT UNSIGNED PRIMARY KEY AUTO_INCREMENT NOT NULL DEFAULT NULL,
    name VARCHAR(255)                               NOT NULL
);

CREATE OR REPLACE TABLE user_role
(
    user_id BIGINT UNSIGNED NOT NULL REFERENCES user (id),
    role_id BIGINT UNSIGNED NOT NULL REFERENCES role (id),
    PRIMARY KEY (user_id, role_id)
);

CREATE OR REPLACE TABLE author
(
    id      BIGINT UNSIGNED PRIMARY KEY AUTO_INCREMENT NOT NULL DEFAULT NULL,
    user_id BIGINT UNSIGNED                            NULL     DEFAULT NULL REFERENCES user (id),
    name    VARCHAR(255)                               NOT NULL,
    alias   BOOLEAN                                    NOT NULL DEFAULT FALSE
);

-- fandom/tag blacklist
CREATE OR REPLACE TABLE fandom
(
    id          BIGINT UNSIGNED PRIMARY KEY AUTO_INCREMENT NOT NULL DEFAULT NULL,
    name        VARCHAR(255)                               NOT NULL,
    description TEXT                                       NULL     DEFAULT NULL,
    approved    BOOLEAN                                    NOT NULL DEFAULT FALSE,
    created_at  TIMESTAMP                                  NOT NULL DEFAULT NOW(),
    updated_at  TIMESTAMP                                  NULL     DEFAULT NULL
);

CREATE OR REPLACE TABLE fandom_blacklist
(
    id         BIGINT UNSIGNED PRIMARY KEY AUTO_INCREMENT NOT NULL DEFAULT NULL,
    name       VARCHAR(255)                               NOT NULL,
    reason     TEXT,
    created_at TIMESTAMP                                  NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP                                  NULL     DEFAULT NULL
);

CREATE OR REPLACE TABLE user_fandom
(
    user_id    BIGINT UNSIGNED NOT NULL REFERENCES user (id),
    fandom_id  BIGINT UNSIGNED NOT NULL REFERENCES fandom (id),
    created_at TIMESTAMP       NOT NULL DEFAULT NOW()
);

CREATE OR REPLACE TABLE tag
(
    id         BIGINT UNSIGNED PRIMARY KEY AUTO_INCREMENT NOT NULL DEFAULT NULL,
    name       VARCHAR(255)                               NOT NULL,
    required   BOOLEAN                                    NOT NULL DEFAULT FALSE,
    created_at TIMESTAMP                                  NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP                                  NULL     DEFAULT NULL
);

CREATE OR REPLACE TABLE fanfic
(
    id          BIGINT UNSIGNED PRIMARY KEY AUTO_INCREMENT NOT NULL DEFAULT NULL,
    author_id   BIGINT UNSIGNED                            NOT NULL REFERENCES author (id),
    external_id VARCHAR(50)                                NULL,
    title       VARCHAR(255)                               NOT NULL,
    created_at  TIMESTAMP                                  NOT NULL DEFAULT NOW(),
    updated_at  TIMESTAMP                                  NULL     DEFAULT NULL,
    url         VARCHAR(300)                               NULL     DEFAULT NULL,
    external    BOOLEAN                                    NOT NULL DEFAULT FALSE,
    summary     TEXT                                       NULL     DEFAULT NULL,
    language    VARCHAR(50)                                NOT NULL
);

CREATE OR REPLACE TABLE fanfic_fandom
(
    fanfic_id BIGINT UNSIGNED NOT NULL REFERENCES fanfic (id),
    fandom_id BIGINT UNSIGNED NOT NULL REFERENCES fandom (id),
    PRIMARY KEY (fanfic_id, fandom_id)
);

CREATE OR REPLACE TABLE fanfic_tags
(
    fanfic_id BIGINT UNSIGNED NOT NULL REFERENCES fanfic (id),
    tag_id    BIGINT UNSIGNED NOT NULL REFERENCES tag (id),
    PRIMARY KEY (fanfic_id, tag_id)
);

CREATE OR REPLACE TABLE warning
(
    id   BIGINT UNSIGNED PRIMARY KEY AUTO_INCREMENT NOT NULL DEFAULT NULL,
    name VARCHAR(255)                               NOT NULL
);

CREATE OR REPLACE TABLE fanfic_warning
(
    fanfic_id  BIGINT UNSIGNED NOT NULL REFERENCES fanfic (id),
    warning_id BIGINT UNSIGNED NOT NULL REFERENCES warning (id),
    PRIMARY KEY (fanfic_id, warning_id)
);

CREATE OR REPLACE TABLE library
(
    id          BIGINT UNSIGNED PRIMARY KEY AUTO_INCREMENT NOT NULL DEFAULT NULL,
    user_id     BIGINT UNSIGNED                            NOT NULL REFERENCES user (id),
    published   BOOLEAN                                    NOT NULL DEFAULT FALSE,
    name        VARCHAR(50)                                NOT NULL,
    description TEXT                                       NULL     DEFAULT NULL,
    created_at  TIMESTAMP                                  NOT NULL DEFAULT NOW(),
    updated_at  TIMESTAMP                                  NULL     DEFAULT NULL
);

CREATE OR REPLACE TABLE library_entry
(
    id         BIGINT UNSIGNED PRIMARY KEY AUTO_INCREMENT NOT NULL DEFAULT NULL,
    library_id BIGINT UNSIGNED                            NOT NULL REFERENCES library (id),
    fanfic_id  BIGINT UNSIGNED                            NOT NULL REFERENCES fanfic (id),
    ordering   INT                                        NOT NULL DEFAULT 0,
    summary    TEXT                                       NULL     DEFAULT NULL,
    rating     SMALLINT UNSIGNED                          NULL     DEFAULT NULL,
    created_at TIMESTAMP                                  NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP                                  NULL     DEFAULT NULL
);

CREATE OR REPLACE TABLE library_entry_fandom
(
    library_entry_id BIGINT UNSIGNED NOT NULL REFERENCES library_entry (id),
    fandom_id        BIGINT UNSIGNED NOT NULL REFERENCES fandom (id),
    created_at       TIMESTAMP       NOT NULL DEFAULT NOW(),
    PRIMARY KEY (library_entry_id, fandom_id)
);

CREATE OR REPLACE TABLE library_entry_tags
(
    library_entry_id BIGINT UNSIGNED NOT NULL REFERENCES library_entry (id),
    tag_id           BIGINT UNSIGNED NOT NULL REFERENCES tag (id),
    created_at       TIMESTAMP       NOT NULL DEFAULT NOW(),
    PRIMARY KEY (library_entry_id, tag_id)
);

CREATE OR REPLACE TABLE library_subscription
(
    library_id BIGINT UNSIGNED NOT NULL REFERENCES library (id),
    user_id    BIGINT UNSIGNED NOT NULL REFERENCES user (id),
    created_at TIMESTAMP       NOT NULL DEFAULT NOW(),
    PRIMARY KEY (library_id, user_id)
);

CREATE OR REPLACE TABLE forum
(
    id         BIGINT UNSIGNED PRIMARY KEY AUTO_INCREMENT NOT NULL DEFAULT NULL,
    name       VARCHAR(255)                               NOT NULL,
    created_at TIMESTAMP                                  NOT NULL DEFAULT NOW()
);

CREATE OR REPLACE TABLE forum_role
(
    id   BIGINT UNSIGNED PRIMARY KEY AUTO_INCREMENT NOT NULL DEFAULT NULL,
    role VARCHAR(255)                               NOT NULL
);

CREATE OR REPLACE TABLE forum_member
(
    id         BIGINT UNSIGNED PRIMARY KEY AUTO_INCREMENT NOT NULL DEFAULT NULL,
    forum_id   BIGINT UNSIGNED                            NOT NULL REFERENCES forum (id),
    user_id    BIGINT UNSIGNED                            NOT NULL REFERENCES user (id),
    role_id    BIGINT UNSIGNED                            NOT NULL REFERENCES forum_role (id),
    subscribed BOOLEAN                                    NOT NULL DEFAULT FALSE,
    created_at TIMESTAMP                                  NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP                                  NULL     DEFAULT NULL
);

CREATE OR REPLACE TABLE forum_post
(
    id         BIGINT UNSIGNED PRIMARY KEY AUTO_INCREMENT NOT NULL DEFAULT NULL,
    forum_id   BIGINT UNSIGNED                            NOT NULL REFERENCES forum (id),
    user_id    BIGINT UNSIGNED                            NOT NULL REFERENCES forum_member (id),
    title      VARCHAR(255)                               NOT NULL,
    content    TEXT                                       NOT NULL,
    created_at TIMESTAMP                                  NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP                                  NULL     DEFAULT NULL,
    deleted_at TIMESTAMP                                  NULL     DEFAULT NULL,
    deleted_by BIGINT UNSIGNED                            NULL     DEFAULT NULL REFERENCES forum_member (id)
);

CREATE OR REPLACE TABLE post_response
(
    id          BIGINT UNSIGNED PRIMARY KEY AUTO_INCREMENT NOT NULL DEFAULT NULL,
    post_id     BIGINT UNSIGNED                            NOT NULL REFERENCES forum_post (id),
    reporter_id BIGINT UNSIGNED                            NOT NULL REFERENCES forum_member (id),
    content     TEXT                                       NOT NULL,
    created_at  TIMESTAMP                                  NOT NULL DEFAULT NOW(),
    updated_at  TIMESTAMP                                  NULL     DEFAULT NULL,
    deleted_at  TIMESTAMP                                  NULL     DEFAULT NULL,
    deleted_by  BIGINT UNSIGNED                            NULL     DEFAULT NULL REFERENCES forum_member (id)
);

CREATE OR REPLACE TABLE post_report
(
    id          BIGINT UNSIGNED PRIMARY KEY AUTO_INCREMENT NOT NULL DEFAULT NULL,
    post_id     BIGINT UNSIGNED                            NOT NULL REFERENCES post_response (id),
    reporter_id BIGINT UNSIGNED                            NOT NULL REFERENCES forum_member (id),
    created_at  TIMESTAMP                                  NOT NULL DEFAULT NOW(),
    updated_at  TIMESTAMP                                  NULL     DEFAULT NULL,
    reason      TEXT                                       NOT NULL,
    resolved    BOOLEAN                                    NOT NULL DEFAULT FALSE,
    resolved_at TIMESTAMP                                  NULL     DEFAULT NULL,
    resolved_by BIGINT UNSIGNED                            NULL     DEFAULT NULL REFERENCES forum_member (id)
);
