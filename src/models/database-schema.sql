--
-- PostgreSQL database dump
--

-- Dumped from database version 11.5
-- Dumped by pg_dump version 11.5

-- Started on 2019-10-13 15:18:35 CEST

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
-- Name: public; Type: SCHEMA; Schema: -; Owner: postgres
--

CREATE SCHEMA public;


ALTER SCHEMA public OWNER TO postgres;

--
-- TOC entry 3210 (class 0 OID 0)
-- Dependencies: 4
-- Name: SCHEMA public; Type: COMMENT; Schema: -; Owner: postgres
--

COMMENT ON SCHEMA public IS 'standard public schema';


--
-- TOC entry 605 (class 1247 OID 16388)
-- Name: status; Type: TYPE; Schema: public; Owner: rainer
--

CREATE TYPE public.status AS ENUM (
    'new',
    'active',
    'disable',
    'delete'
);


ALTER TYPE public.status OWNER TO rainer;

SET default_tablespace = '';

SET default_with_oids = false;

--
-- TOC entry 202 (class 1259 OID 16453)
-- Name: confirmations; Type: TABLE; Schema: public; Owner: rainer
--

CREATE TABLE public.confirmations (
    id integer NOT NULL,
    conftype character varying NOT NULL,
    useruuid uuid NOT NULL,
    conftoken character varying NOT NULL,
    createdate timestamp without time zone DEFAULT now() NOT NULL
);


ALTER TABLE public.confirmations OWNER TO rainer;

--
-- TOC entry 201 (class 1259 OID 16451)
-- Name: confirmations_id_seq; Type: SEQUENCE; Schema: public; Owner: rainer
--

CREATE SEQUENCE public.confirmations_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.confirmations_id_seq OWNER TO rainer;

--
-- TOC entry 3211 (class 0 OID 0)
-- Dependencies: 201
-- Name: confirmations_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: rainer
--

ALTER SEQUENCE public.confirmations_id_seq OWNED BY public.confirmations.id;


--
-- TOC entry 200 (class 1259 OID 16410)
-- Name: roles; Type: TABLE; Schema: public; Owner: rainer
--

CREATE TABLE public.roles (
    id integer NOT NULL,
    name character varying NOT NULL
);


ALTER TABLE public.roles OWNER TO rainer;

--
-- TOC entry 199 (class 1259 OID 16408)
-- Name: roles_id_seq; Type: SEQUENCE; Schema: public; Owner: rainer
--

CREATE SEQUENCE public.roles_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.roles_id_seq OWNER TO rainer;

--
-- TOC entry 3212 (class 0 OID 0)
-- Dependencies: 199
-- Name: roles_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: rainer
--

ALTER SEQUENCE public.roles_id_seq OWNED BY public.roles.id;


--
-- TOC entry 198 (class 1259 OID 16399)
-- Name: users; Type: TABLE; Schema: public; Owner: rainer
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


ALTER TABLE public.users OWNER TO rainer;

--
-- TOC entry 197 (class 1259 OID 16397)
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: rainer
--

CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.users_id_seq OWNER TO rainer;

--
-- TOC entry 3213 (class 0 OID 0)
-- Dependencies: 197
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: rainer
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- TOC entry 3068 (class 2604 OID 16456)
-- Name: confirmations id; Type: DEFAULT; Schema: public; Owner: rainer
--

ALTER TABLE ONLY public.confirmations ALTER COLUMN id SET DEFAULT nextval('public.confirmations_id_seq'::regclass);


--
-- TOC entry 3067 (class 2604 OID 16413)
-- Name: roles id; Type: DEFAULT; Schema: public; Owner: rainer
--

ALTER TABLE ONLY public.roles ALTER COLUMN id SET DEFAULT nextval('public.roles_id_seq'::regclass);


--
-- TOC entry 3066 (class 2604 OID 16402)
-- Name: users id; Type: DEFAULT; Schema: public; Owner: rainer
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- TOC entry 3202 (class 0 OID 16410)
-- Dependencies: 200
-- Data for Name: roles; Type: TABLE DATA; Schema: public; Owner: rainer
--

COPY public.roles (id, name) FROM stdin;
1	superuser
2	admin
3	reseller
4	customer
\.


--
-- TOC entry 3214 (class 0 OID 0)
-- Dependencies: 201
-- Name: confirmations_id_seq; Type: SEQUENCE SET; Schema: public; Owner: rainer
--

SELECT pg_catalog.setval('public.confirmations_id_seq', 7, true);


--
-- TOC entry 3215 (class 0 OID 0)
-- Dependencies: 199
-- Name: roles_id_seq; Type: SEQUENCE SET; Schema: public; Owner: rainer
--

SELECT pg_catalog.setval('public.roles_id_seq', 4, true);


--
-- TOC entry 3216 (class 0 OID 0)
-- Dependencies: 197
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: rainer
--

SELECT pg_catalog.setval('public.users_id_seq', 48, true);


--
-- TOC entry 3075 (class 1259 OID 16461)
-- Name: confirmations_id_idx; Type: INDEX; Schema: public; Owner: rainer
--

CREATE UNIQUE INDEX confirmations_id_idx ON public.confirmations USING btree (id);


--
-- TOC entry 3076 (class 1259 OID 16463)
-- Name: confirmations_type_idx; Type: INDEX; Schema: public; Owner: rainer
--

CREATE INDEX confirmations_type_idx ON public.confirmations USING btree (conftype);


--
-- TOC entry 3077 (class 1259 OID 16462)
-- Name: confirmations_user_idx; Type: INDEX; Schema: public; Owner: rainer
--

CREATE INDEX confirmations_user_idx ON public.confirmations USING btree (useruuid);


--
-- TOC entry 3074 (class 1259 OID 16417)
-- Name: roles_id_idx; Type: INDEX; Schema: public; Owner: rainer
--

CREATE UNIQUE INDEX roles_id_idx ON public.roles USING btree (id);


--
-- TOC entry 3070 (class 1259 OID 16406)
-- Name: users_id_idx; Type: INDEX; Schema: public; Owner: rainer
--

CREATE UNIQUE INDEX users_id_idx ON public.users USING btree (id);


--
-- TOC entry 3071 (class 1259 OID 16418)
-- Name: users_role_idx; Type: INDEX; Schema: public; Owner: rainer
--

CREATE INDEX users_role_idx ON public.users USING btree (role);


--
-- TOC entry 3072 (class 1259 OID 16419)
-- Name: users_status_idx; Type: INDEX; Schema: public; Owner: rainer
--

CREATE INDEX users_status_idx ON public.users USING btree (status);


--
-- TOC entry 3073 (class 1259 OID 16407)
-- Name: users_username_idx; Type: INDEX; Schema: public; Owner: rainer
--

CREATE UNIQUE INDEX users_username_idx ON public.users USING btree (username);


-- Completed on 2019-10-13 15:18:36 CEST

--
-- PostgreSQL database dump complete
--

