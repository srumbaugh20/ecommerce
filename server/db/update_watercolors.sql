update watercolors
  set name = $1, descript = $2, imageurl = $3, price_large = $4, price_medium = $5, price_small = $6, card_size = $7
  where id = $8;
