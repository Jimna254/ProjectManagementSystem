
CREATE OR ALTER PROCEDURE updateUser(
    @user_id VARCHAR(100),
    @name VARCHAR(50),
    @email VARCHAR(100) , 
    @role VARCHAR (20),
    @areaofspecialization VARCHAR(100),
    @password VARCHAR(20)
)
AS
BEGIN
    UPDATE Users SET 
        name=@name, 
        email=@email, 
        role=@role, 
        password=@password, 
        AreaOfSpecialization = @areaofspecialization
    WHERE user_id = @user_id
END
-- EXEC updateUser 
--     @user_id = 'fadc11ac-a4d0-4333-bc3e-452007da6086',
--     @name = 'New Name',
--     @email = 'newemail@example.com', 
--     @role = 'NewRole',
--     @areaofspecialization = 'New Specialization',
--     @password = 'NewPassword123!'