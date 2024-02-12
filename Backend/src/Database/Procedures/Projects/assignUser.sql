CREATE OR ALTER PROCEDURE assignUser(
    @project_id VARCHAR(250),
    @user_id VARCHAR(250)
    
)
AS
BEGIN
    UPDATE Projects SET 
    user_id = @user_id
    WHERE project_id=@project_id;
END