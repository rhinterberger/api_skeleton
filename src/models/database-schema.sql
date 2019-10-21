--
-- PostgreSQL database dump
--

-- Dumped from database version 11.5
-- Dumped by pg_dump version 11.5

-- Started on 2019-10-21 18:42:58 CEST

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- TOC entry 4 (class 2615 OID 2200)
-- Name: public; Type: SCHEMA; Schema: -; Owner: -
--

CREATE SCHEMA public;


--
-- TOC entry 3210 (class 0 OID 0)
-- Dependencies: 4
-- Name: SCHEMA public; Type: COMMENT; Schema: -; Owner: -
--

COMMENT ON SCHEMA public IS 'standard public schema';


--
-- TOC entry 605 (class 1247 OID 16388)
-- Name: status; Type: TYPE; Schema: public; Owner: -
--

CREATE TYPE public.status AS ENUM (
    'new',
    'active',
    'disable',
    'delete'
);


SET default_tablespace = '';

SET default_with_oids = false;

--
-- TOC entry 202 (class 1259 OID 16453)
-- Name: confirmations; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.confirmations (
    id integer NOT NULL,
    conftype character varying NOT NULL,
    useruuid uuid NOT NULL,
    conftoken character varying NOT NULL,
    createdate timestamp without time zone DEFAULT now() NOT NULL
);


--
-- TOC entry 201 (class 1259 OID 16451)
-- Name: confirmations_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.confirmations_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- TOC entry 3211 (class 0 OID 0)
-- Dependencies: 201
-- Name: confirmations_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.confirmations_id_seq OWNED BY public.confirmations.id;


--
-- TOC entry 200 (class 1259 OID 16410)
-- Name: roles; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.roles (
    id integer NOT NULL,
    name character varying NOT NULL
);


--
-- TOC entry 199 (class 1259 OID 16408)
-- Name: roles_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.roles_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- TOC entry 3212 (class 0 OID 0)
-- Dependencies: 199
-- Name: roles_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.roles_id_seq OWNED BY public.roles.id;


--
-- TOC entry 198 (class 1259 OID 16399)
-- Name: users; Type: TABLE; Schema: public; Owner: -
--

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


--
-- TOC entry 197 (class 1259 OID 16397)
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- TOC entry 3213 (class 0 OID 0)
-- Dependencies: 197
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- TOC entry 3068 (class 2604 OID 16456)
-- Name: confirmations id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.confirmations ALTER COLUMN id SET DEFAULT nextval('public.confirmations_id_seq'::regclass);


--
-- TOC entry 3067 (class 2604 OID 16413)
-- Name: roles id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.roles ALTER COLUMN id SET DEFAULT nextval('public.roles_id_seq'::regclass);


--
-- TOC entry 3066 (class 2604 OID 16402)
-- Name: users id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);

--
-- TOC entry 3202 (class 0 OID 16410)
-- Dependencies: 200
-- Data for Name: roles; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.roles VALUES (1, 'superuser');
INSERT INTO public.roles VALUES (2, 'admin');
INSERT INTO public.roles VALUES (3, 'groupadmin');
INSERT INTO public.roles VALUES (4, 'user');


--
-- TOC entry 3214 (class 0 OID 0)
-- Dependencies: 201
-- Name: confirmations_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.confirmations_id_seq', 29, true);


--
-- TOC entry 3215 (class 0 OID 0)
-- Dependencies: 199
-- Name: roles_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.roles_id_seq', 4, true);


--
-- TOC entry 3216 (class 0 OID 0)
-- Dependencies: 197
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.users_id_seq', 94, true);


--
-- TOC entry 3075 (class 1259 OID 16461)
-- Name: confirmations_id_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX confirmations_id_idx ON public.confirmations USING btree (id);


--
-- TOC entry 3076 (class 1259 OID 16463)
-- Name: confirmations_type_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX confirmations_type_idx ON public.confirmations USING btree (conftype);


--
-- TOC entry 3077 (class 1259 OID 16462)
-- Name: confirmations_user_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX confirmations_user_idx ON public.confirmations USING btree (useruuid);


--
-- TOC entry 3074 (class 1259 OID 16417)
-- Name: roles_id_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX roles_id_idx ON public.roles USING btree (id);


--
-- TOC entry 3070 (class 1259 OID 16406)
-- Name: users_id_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX users_id_idx ON public.users USING btree (id);


--
-- TOC entry 3071 (class 1259 OID 16418)
-- Name: users_role_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX users_role_idx ON public.users USING btree (role);


--
-- TOC entry 3072 (class 1259 OID 16419)
-- Name: users_status_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX users_status_idx ON public.users USING btree (status);


--
-- TOC entry 3073 (class 1259 OID 16407)
-- Name: users_username_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX users_username_idx ON public.users USING btree (username);


-- Completed on 2019-10-21 18:42:58 CEST

--
-- PostgreSQL database dump complete
--

