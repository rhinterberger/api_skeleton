CREATE TYPE public.status AS ENUM (
    'new',
    'active',
    'disable',
    'delete'
);


CREATE TABLE public.confirmations (
    id integer NOT NULL,
    conftype character varying NOT NULL,
    useruuid uuid NOT NULL,
    conftoken character varying NOT NULL,
    createdate timestamp without time zone DEFAULT now() NOT NULL
);

CREATE SEQUENCE public.confirmations_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

ALTER SEQUENCE public.confirmations_id_seq OWNED BY public.confirmations.id;

CREATE SEQUENCE public.groups_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

CREATE TABLE public.groups (
    id integer DEFAULT nextval('public.groups_id_seq'::regclass) NOT NULL,
    name character varying NOT NULL,
    roles json,
    uuid uuid DEFAULT public.uuid_generate_v4() NOT NULL
);

CREATE SEQUENCE public.roles_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

ALTER SEQUENCE public.roles_id_seq OWNED BY public.groups.id;

CREATE TABLE public.usergroups (
    "user" uuid NOT NULL,
    "group" uuid NOT NULL
);

CREATE TABLE public.users (
    id integer NOT NULL,
    username character varying NOT NULL,
    password character varying NOT NULL,
    create_date timestamp without time zone,
    login_date timestamp without time zone,
    uuid uuid NOT NULL,
    status character varying,
    role integer NOT NULL,
    salt character varying(64) NOT NULL
);

CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;

ALTER TABLE ONLY public.confirmations ALTER COLUMN id SET DEFAULT nextval('public.confirmations_id_seq'::regclass);
ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);

CREATE UNIQUE INDEX confirmations_id_idx ON public.confirmations USING btree (id);
CREATE INDEX confirmations_type_idx ON public.confirmations USING btree (conftype);
CREATE INDEX confirmations_user_idx ON public.confirmations USING btree (useruuid);
CREATE UNIQUE INDEX groups_id_idx ON public.groups USING btree (id);
CREATE UNIQUE INDEX usergroups_user_idx ON public.usergroups USING btree ("user", "group");
CREATE UNIQUE INDEX users_id_idx ON public.users USING btree (id);
CREATE INDEX users_role_idx ON public.users USING btree (role);
CREATE INDEX users_status_idx ON public.users USING btree (status);
CREATE UNIQUE INDEX users_username_idx ON public.users USING btree (username);
