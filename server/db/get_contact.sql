select *
from contact
join address
on address.id = contact.address_id
where address_id = 1
