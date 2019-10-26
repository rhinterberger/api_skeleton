insert into confirmations (conftype, useruuid, conftoken)
values ($1::text, $2::uuid, $3::text);