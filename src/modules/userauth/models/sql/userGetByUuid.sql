select uuid, username, status, role, create_date, login_date from users where uuid = $1::uuid limit 1;