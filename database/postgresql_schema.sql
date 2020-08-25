CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
-- public.confirmations definition

-- Drop table

-- DROP TABLE confirmations;

CREATE TABLE confirmations (
	id serial NOT NULL,
	conftype varchar NOT NULL,
	useruuid uuid NOT NULL,
	conftoken varchar NOT NULL,
	createdate timestamp NOT NULL DEFAULT now()
);
CREATE UNIQUE INDEX confirmations_id_idx ON public.confirmations USING btree (id);
CREATE INDEX confirmations_type_idx ON public.confirmations USING btree (conftype);
CREATE INDEX confirmations_user_idx ON public.confirmations USING btree (useruuid);


-- public."groups" definition

-- Drop table

-- DROP TABLE "groups";

CREATE TABLE "groups" (
	id serial NOT NULL,
	"name" varchar NOT NULL,
	roles json NULL,
	uuid uuid NOT NULL DEFAULT uuid_generate_v4()
);
CREATE UNIQUE INDEX groups_id_idx ON public.groups USING btree (id);


-- public.usergroups definition

-- Drop table

-- DROP TABLE usergroups;

CREATE TABLE usergroups (
	"user" uuid NOT NULL,
	"group" uuid NOT NULL
);
CREATE UNIQUE INDEX usergroups_user_idx ON public.usergroups USING btree ("user", "group");


-- public.users definition

-- Drop table

-- DROP TABLE users;

CREATE TABLE users (
	id serial NOT NULL,
	username varchar NOT NULL,
	"password" varchar NOT NULL,
	create_date timestamp NULL,
	login_date timestamp NULL,
	uuid uuid NOT NULL,
	status varchar NULL,
	"role" int4 NOT NULL,
	salt varchar(64) NOT NULL
);
CREATE UNIQUE INDEX users_id_idx ON public.users USING btree (id);
CREATE INDEX users_role_idx ON public.users USING btree (role);
CREATE INDEX users_status_idx ON public.users USING btree (status);
CREATE UNIQUE INDEX users_username_idx ON public.users USING btree (username);

