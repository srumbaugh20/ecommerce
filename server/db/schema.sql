create table watercolors (id SERIAL PRIMARY KEY,
                               name varchar(200),
                               descript varchar(1000),
                               imageURL varchar(200),
                               price_large integer,
                               price_medium integer,
                               price_small integer


                               );

 create table temple_paintings (id SERIAL PRIMARY KEY,
                                name varchar(200),
                                descript varchar(1000),
                                location varchar(200),
                                imageURL varchar(200),
                                price_large integer,
                                price_medium integer,
                                price_small integer


                                );

create table orders (id SERIAL PRIMARY KEY,
                              token varchar(200),
                              name varchar(50),
                              email varchar(50),
                              address varchar(100),
                              cart varchar(2000),
                              amount_paid integer


                              );

create table contact (id serial primary key,
                      name varchar(50),
                      email varchar(50),
                      address_id INT not null,
                      foreign key (address_id) references address(address_id)
                    );




create table address (id serial primary key,
                      line_1 varchar(100),
                      line_2 varchar(50),
                      phone varchar(15)
                    );



  create view contactinfo as
  select line_1, line_2, phone
  from address
  join contact
  on address.id = contact.address_id
  where address_id = 1


insert into contact (name,
                      email,
                      address_id
                    )
values ('Debbie Russell-Walsch', 'debrussell53@hotmail.com', 1);

insert into address (line_1,
                      line_2,
                      phone
                    )
values ('1110 5th Ave South Apt 404', 'Edmonds, WA, United States 98020', '1-971-267-9010');
