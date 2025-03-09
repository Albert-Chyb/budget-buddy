CREATE TABLE category_types
(
    id         BIGINT GENERATED BY DEFAULT AS IDENTITY NOT NULL,
    name       TEXT                                    NOT NULL,
    is_expense BOOLEAN                                 NOT NULL,

    CONSTRAINT category_types_pkey PRIMARY KEY (id),

    CONSTRAINT category_types_name_check CHECK (LENGTH(name) BETWEEN 1 AND 32)
);