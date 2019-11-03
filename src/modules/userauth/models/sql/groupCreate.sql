insert into groups (name, roles, uuid)
values ( $1::text, $2::json, uuid_generate_v4());