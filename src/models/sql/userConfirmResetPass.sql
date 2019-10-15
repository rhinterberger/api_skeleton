select useruuid from confirmations
where extract(epoch from  now()-createdate) < $1::int and conftoken = $2::text and conftype = 'resetpass';