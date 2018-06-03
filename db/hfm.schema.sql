--
-- PostgreSQL database dump
--

-- Dumped from database version 10.4
-- Dumped by pg_dump version 10.4 (Debian 10.4-2)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: plpgsql; Type: EXTENSION; Schema: -; Owner: 
--

CREATE EXTENSION IF NOT EXISTS plpgsql WITH SCHEMA pg_catalog;


--
-- Name: EXTENSION plpgsql; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION plpgsql IS 'PL/pgSQL procedural language';


--
-- Name: account_types_seq; Type: SEQUENCE; Schema: public; Owner: hfm
--

CREATE SEQUENCE public.account_types_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.account_types_seq OWNER TO hfm;

SET default_tablespace = '';

SET default_with_oids = false;

--
-- Name: account_types; Type: TABLE; Schema: public; Owner: hfm
--

CREATE TABLE public.account_types (
    _id integer DEFAULT nextval('public.account_types_seq'::regclass) NOT NULL,
    name character varying(100) NOT NULL,
    min bigint,
    max bigint,
    closed date
);


ALTER TABLE public.account_types OWNER TO hfm;

--
-- Name: accounts_id_seq; Type: SEQUENCE; Schema: public; Owner: hfm
--

CREATE SEQUENCE public.accounts_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.accounts_id_seq OWNER TO hfm;

--
-- Name: accounts; Type: TABLE; Schema: public; Owner: hfm
--

CREATE TABLE public.accounts (
    _id integer DEFAULT nextval('public.accounts_id_seq'::regclass) NOT NULL,
    name character varying(100) NOT NULL,
    currency_id integer NOT NULL,
    balance bigint DEFAULT 0,
    description character varying(100) DEFAULT NULL::character varying,
    closed date,
    account_type_id integer DEFAULT 3 NOT NULL
);


ALTER TABLE public.accounts OWNER TO hfm;

--
-- Name: categories_id_seq; Type: SEQUENCE; Schema: public; Owner: hfm
--

CREATE SEQUENCE public.categories_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.categories_id_seq OWNER TO hfm;

--
-- Name: categories; Type: TABLE; Schema: public; Owner: hfm
--

CREATE TABLE public.categories (
    id integer DEFAULT nextval('public.categories_id_seq'::regclass) NOT NULL,
    name character varying(100) NOT NULL,
    type integer,
    parent_id integer,
    visible boolean DEFAULT true NOT NULL,
    closed date,
    CONSTRAINT categories_type_check CHECK ((type = ANY (ARRAY[1, 2])))
);


ALTER TABLE public.categories OWNER TO hfm;

--
-- Name: currencies; Type: TABLE; Schema: public; Owner: hfm
--

CREATE TABLE public.currencies (
    _id integer NOT NULL,
    name character varying(100),
    code character varying(3) NOT NULL,
    symbol character varying(1) DEFAULT NULL::character varying,
    home integer,
    rate integer DEFAULT NULL::numeric,
    closed date
);


ALTER TABLE public.currencies OWNER TO hfm;

--
-- Name: logs; Type: TABLE; Schema: public; Owner: hfm
--

CREATE TABLE public.logs (
    id integer NOT NULL,
    user_id integer NOT NULL,
    created_at timestamp without time zone DEFAULT now() NOT NULL,
    description character varying(1000) NOT NULL,
    ip inet NOT NULL
);


ALTER TABLE public.logs OWNER TO hfm;

--
-- Name: log_id_seq; Type: SEQUENCE; Schema: public; Owner: hfm
--

CREATE SEQUENCE public.log_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.log_id_seq OWNER TO hfm;

--
-- Name: log_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: hfm
--

ALTER SEQUENCE public.log_id_seq OWNED BY public.logs.id;


--
-- Name: transaction_params; Type: TABLE; Schema: public; Owner: hfm
--

CREATE TABLE public.transaction_params (
    id integer NOT NULL,
    transaction_id integer NOT NULL,
    category_id integer,
    amount bigint NOT NULL,
    equivalent bigint NOT NULL,
    description character varying(255),
    deleted_at timestamp without time zone
);


ALTER TABLE public.transaction_params OWNER TO hfm;

--
-- Name: transaction_params_id_seq; Type: SEQUENCE; Schema: public; Owner: hfm
--

CREATE SEQUENCE public.transaction_params_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.transaction_params_id_seq OWNER TO hfm;

--
-- Name: transaction_params_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: hfm
--

ALTER SEQUENCE public.transaction_params_id_seq OWNED BY public.transaction_params.id;


--
-- Name: transactions; Type: TABLE; Schema: public; Owner: hfm
--

CREATE TABLE public.transactions (
    id integer NOT NULL,
    type integer NOT NULL,
    account_id integer NOT NULL,
    transaction_date date NOT NULL,
    user_id integer NOT NULL,
    created_at timestamp without time zone NOT NULL,
    deleted_at timestamp without time zone,
    CONSTRAINT transactions_type_check CHECK ((type = ANY (ARRAY[1, 2])))
);


ALTER TABLE public.transactions OWNER TO hfm;

--
-- Name: transactions_id_seq; Type: SEQUENCE; Schema: public; Owner: hfm
--

CREATE SEQUENCE public.transactions_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.transactions_id_seq OWNER TO hfm;

--
-- Name: transactions_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: hfm
--

ALTER SEQUENCE public.transactions_id_seq OWNED BY public.transactions.id;


--
-- Name: transfers; Type: TABLE; Schema: public; Owner: hfm
--

CREATE TABLE public.transfers (
    id integer NOT NULL,
    debit_id integer NOT NULL,
    credit_id integer NOT NULL
);


ALTER TABLE public.transfers OWNER TO hfm;

--
-- Name: transfers_id_seq; Type: SEQUENCE; Schema: public; Owner: hfm
--

CREATE SEQUENCE public.transfers_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.transfers_id_seq OWNER TO hfm;

--
-- Name: transfers_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: hfm
--

ALTER SEQUENCE public.transfers_id_seq OWNED BY public.transfers.id;


--
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: hfm
--

CREATE SEQUENCE public.users_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.users_id_seq OWNER TO hfm;

--
-- Name: users; Type: TABLE; Schema: public; Owner: hfm
--

CREATE TABLE public.users (
    _id integer DEFAULT nextval('public.users_id_seq'::regclass) NOT NULL,
    login character varying(10) NOT NULL,
    password character varying(60) NOT NULL,
    name character varying(100) NOT NULL,
    is_active boolean DEFAULT false NOT NULL
);


ALTER TABLE public.users OWNER TO hfm;

--
-- Name: logs id; Type: DEFAULT; Schema: public; Owner: hfm
--

ALTER TABLE ONLY public.logs ALTER COLUMN id SET DEFAULT nextval('public.log_id_seq'::regclass);


--
-- Name: transaction_params id; Type: DEFAULT; Schema: public; Owner: hfm
--

ALTER TABLE ONLY public.transaction_params ALTER COLUMN id SET DEFAULT nextval('public.transaction_params_id_seq'::regclass);


--
-- Name: transactions id; Type: DEFAULT; Schema: public; Owner: hfm
--

ALTER TABLE ONLY public.transactions ALTER COLUMN id SET DEFAULT nextval('public.transactions_id_seq'::regclass);


--
-- Name: transfers id; Type: DEFAULT; Schema: public; Owner: hfm
--

ALTER TABLE ONLY public.transfers ALTER COLUMN id SET DEFAULT nextval('public.transfers_id_seq'::regclass);


--
-- Name: account_types account_types_pk; Type: CONSTRAINT; Schema: public; Owner: hfm
--

ALTER TABLE ONLY public.account_types
    ADD CONSTRAINT account_types_pk PRIMARY KEY (_id);


--
-- Name: accounts accounts_pkey; Type: CONSTRAINT; Schema: public; Owner: hfm
--

ALTER TABLE ONLY public.accounts
    ADD CONSTRAINT accounts_pkey PRIMARY KEY (_id);


--
-- Name: categories categories_pkey; Type: CONSTRAINT; Schema: public; Owner: hfm
--

ALTER TABLE ONLY public.categories
    ADD CONSTRAINT categories_pkey PRIMARY KEY (id);


--
-- Name: currencies currencies_pkey; Type: CONSTRAINT; Schema: public; Owner: hfm
--

ALTER TABLE ONLY public.currencies
    ADD CONSTRAINT currencies_pkey PRIMARY KEY (_id);


--
-- Name: logs log_pkey; Type: CONSTRAINT; Schema: public; Owner: hfm
--

ALTER TABLE ONLY public.logs
    ADD CONSTRAINT log_pkey PRIMARY KEY (id);


--
-- Name: transaction_params transaction_params_pkey; Type: CONSTRAINT; Schema: public; Owner: hfm
--

ALTER TABLE ONLY public.transaction_params
    ADD CONSTRAINT transaction_params_pkey PRIMARY KEY (id);


--
-- Name: transactions transactions_pkey; Type: CONSTRAINT; Schema: public; Owner: hfm
--

ALTER TABLE ONLY public.transactions
    ADD CONSTRAINT transactions_pkey PRIMARY KEY (id);


--
-- Name: transfers transfers_pkey; Type: CONSTRAINT; Schema: public; Owner: hfm
--

ALTER TABLE ONLY public.transfers
    ADD CONSTRAINT transfers_pkey PRIMARY KEY (id);


--
-- Name: users unique_login_key; Type: CONSTRAINT; Schema: public; Owner: hfm
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT unique_login_key UNIQUE (login);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: hfm
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (_id);


--
-- Name: fki_transaction_params_category_id; Type: INDEX; Schema: public; Owner: hfm
--

CREATE INDEX fki_transaction_params_category_id ON public.transaction_params USING btree (category_id);


--
-- Name: fki_transaction_params_transaction_id; Type: INDEX; Schema: public; Owner: hfm
--

CREATE INDEX fki_transaction_params_transaction_id ON public.transaction_params USING btree (transaction_id);


--
-- Name: fki_transactions_user_id_users_id_fk; Type: INDEX; Schema: public; Owner: hfm
--

CREATE INDEX fki_transactions_user_id_users_id_fk ON public.transactions USING btree (user_id);


--
-- Name: fki_transfers_credit_id; Type: INDEX; Schema: public; Owner: hfm
--

CREATE INDEX fki_transfers_credit_id ON public.transfers USING btree (credit_id);


--
-- Name: fki_transfers_debit_id; Type: INDEX; Schema: public; Owner: hfm
--

CREATE INDEX fki_transfers_debit_id ON public.transfers USING btree (debit_id);


--
-- Name: idx1_categories; Type: INDEX; Schema: public; Owner: hfm
--

CREATE INDEX idx1_categories ON public.categories USING btree (parent_id);


--
-- Name: idx1_log; Type: INDEX; Schema: public; Owner: hfm
--

CREATE INDEX idx1_log ON public.logs USING btree (created_at);


--
-- Name: idx1_transactions; Type: INDEX; Schema: public; Owner: hfm
--

CREATE INDEX idx1_transactions ON public.transactions USING btree (type);


--
-- Name: idx2_log; Type: INDEX; Schema: public; Owner: hfm
--

CREATE INDEX idx2_log ON public.logs USING btree (user_id);


--
-- Name: idx2_transactions; Type: INDEX; Schema: public; Owner: hfm
--

CREATE INDEX idx2_transactions ON public.transactions USING btree (transaction_date);


--
-- Name: accounts accounts_fk1; Type: FK CONSTRAINT; Schema: public; Owner: hfm
--

ALTER TABLE ONLY public.accounts
    ADD CONSTRAINT accounts_fk1 FOREIGN KEY (currency_id) REFERENCES public.currencies(_id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: accounts accounts_fk2; Type: FK CONSTRAINT; Schema: public; Owner: hfm
--

ALTER TABLE ONLY public.accounts
    ADD CONSTRAINT accounts_fk2 FOREIGN KEY (account_type_id) REFERENCES public.account_types(_id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: categories categories_fk1; Type: FK CONSTRAINT; Schema: public; Owner: hfm
--

ALTER TABLE ONLY public.categories
    ADD CONSTRAINT categories_fk1 FOREIGN KEY (parent_id) REFERENCES public.categories(id) ON DELETE RESTRICT;


--
-- Name: transaction_params transaction_params_category_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: hfm
--

ALTER TABLE ONLY public.transaction_params
    ADD CONSTRAINT transaction_params_category_id_fkey FOREIGN KEY (category_id) REFERENCES public.categories(id) ON DELETE RESTRICT;


--
-- Name: transaction_params transaction_params_transaction_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: hfm
--

ALTER TABLE ONLY public.transaction_params
    ADD CONSTRAINT transaction_params_transaction_id_fkey FOREIGN KEY (transaction_id) REFERENCES public.transactions(id) ON DELETE RESTRICT;


--
-- Name: transactions transactions_account_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: hfm
--

ALTER TABLE ONLY public.transactions
    ADD CONSTRAINT transactions_account_id_fkey FOREIGN KEY (account_id) REFERENCES public.accounts(_id) ON DELETE RESTRICT;


--
-- Name: transactions transactions_user_id_users_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: hfm
--

ALTER TABLE ONLY public.transactions
    ADD CONSTRAINT transactions_user_id_users_id_fk FOREIGN KEY (user_id) REFERENCES public.users(_id) ON DELETE RESTRICT;


--
-- Name: transfers transfers_credit_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: hfm
--

ALTER TABLE ONLY public.transfers
    ADD CONSTRAINT transfers_credit_id_fkey FOREIGN KEY (credit_id) REFERENCES public.transactions(id) ON DELETE RESTRICT;


--
-- Name: transfers transfers_debit_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: hfm
--

ALTER TABLE ONLY public.transfers
    ADD CONSTRAINT transfers_debit_id_fkey FOREIGN KEY (debit_id) REFERENCES public.transactions(id) ON DELETE RESTRICT;


--
-- PostgreSQL database dump complete
--

