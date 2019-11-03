select groups.name, groups.uuid from groups
	join usergroups on (usergroups."group" = "groups".uuid)
	join users on (users.uuid = usergroups."user")
where users.uuid = $1::uuid;