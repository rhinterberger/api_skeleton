select roles from groups
	join usergroups on (usergroups."group" = "groups".id)
	join users on (users.id = usergroups."user")
where users.uuid = $1::uuid;