update users set password=$1::text, salt=$2::text
where uuid = $3::uuid;