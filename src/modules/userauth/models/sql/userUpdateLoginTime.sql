update users set login_date=now() where id = $1;