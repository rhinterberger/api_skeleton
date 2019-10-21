select useruuid from confirmations
where conftype = $1::text and conftoken = $2::text and extract(epoch from  now()-createdate) < $3::int