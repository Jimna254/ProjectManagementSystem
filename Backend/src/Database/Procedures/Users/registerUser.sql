CREATE OR ALTER PROCEDURE registerUser(
    @user_id VARCHAR(100),
    @name VARCHAR(50),
    @email VARCHAR(100) , 
    @areaofspecialization VARCHAR(100),
    @password VARCHAR(200)
  ) 
  AS
  BEGIN
    INSERT INTO Users(user_id, name, email, Password,  AreaOfSpecialization)
    VALUES(@user_id, @name, @email,  @password, @areaofspecialization)
  END
   

