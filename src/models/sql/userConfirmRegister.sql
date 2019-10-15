update users set status = 'active'
where status = 'new' and uuid = (
  select useruuid from confirmations
  where extract(epoch from  now()-createdate) < $1::int and conftoken = $2::text and conftype = 'register'
 );