DROP DATABASE IF EXISTS bamazon;
CREATE database bamazon;

USE bamazon;

CREATE TABLE products (
  item_id INT NOT NULL AUTO_INCREMENT,
  product_name VARCHAR(100) NOT NULL,
  department_name VARCHAR(100) NULL,
  price DECIMAL(8,2) NOT NULL,
  stock_quantity INT NOT NULL,
  PRIMARY KEY (item_id)
);


insert into products (
  product_name ,
  department_name ,
  price ,
  stock_quantity
)

VALUES ('chair','dinning','50.00',2),
        ('table','dinning','100.99',4),
                ('sofa','livingroom','799.94',40),
                ('lamp','livingroom','10.99',1),
                ('toaster','kitchen','7.00',1),
                ('bed','bedroom','200.00',3),
                ('mattress','bedroom','200.00',3),
                ('flowers','garden','1.00',100),
                ('shovel','garden','30.00',5),
                ('plates','kitchen','5.00',10);
                
select * from bamazon;
