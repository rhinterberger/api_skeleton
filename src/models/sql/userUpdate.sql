update users set username=$1::text, status=$2::status, role=$3::int
where uuid = $4::uuid;