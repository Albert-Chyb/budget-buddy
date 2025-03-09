CREATE TABLE
    categories
(
    id              BIGINT GENERATED BY DEFAULT AS IDENTITY NOT NULL,
    name            TEXT                                    NOT NULL,
    color_id        BIGINT                                  NULL,
    type_id         BIGINT                                  NOT NULL,
    owner_id        UUID                                    NOT NULL,

    CONSTRAINT categories_pkey PRIMARY KEY (id),
    CONSTRAINT categories_color_id_fkey FOREIGN KEY (color_id) REFERENCES category_colors (id),
    CONSTRAINT categories_type_id_fkey FOREIGN KEY (type_id) REFERENCES category_types (id),
    CONSTRAINT categories_owner_id_fkey FOREIGN KEY (owner_id) REFERENCES auth.users (id) ON DELETE CASCADE,

    CONSTRAINT categories_name_check CHECK (LENGTH(name) BETWEEN 1 AND 64)
);