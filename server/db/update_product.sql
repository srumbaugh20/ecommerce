update temple_paintings
  set name = $1, location = $2, descript = $3, imageurl = $4
  where id = $5;
