update groups set name=$1::text, roles=$2::json
where uuid = $3::uuid;