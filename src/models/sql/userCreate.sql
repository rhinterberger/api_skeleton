insert into users (username, password, salt, create_date, uuid, status, role)
values ( $1::text, $2::text, $3::text, now(),  uuid_generate_v4(), 'new', 4);