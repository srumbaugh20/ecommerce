update temple_paintings
  set name = $1, location = $2, descript = $3, imageurl = $4, price_large = $5, price_medium = $6, price_small = $7, card_size = $8
  where id = $9;
