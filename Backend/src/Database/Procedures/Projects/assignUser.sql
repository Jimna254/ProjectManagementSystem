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
EXEC assignUser @project_id = '49ad4376-a194-4b79-b6b3-73aa82964aa2', @user_id = 'b7bd1c01-e1fe-4ccb-8bd1-074848aa0e68';