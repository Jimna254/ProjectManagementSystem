CREATE OR ALTER PROCEDURE updateProject(
    @project_id VARCHAR(250),
    @projectname VARCHAR(250),
    @description VARCHAR(1000) , 
    @createdate VARCHAR (200),
    @enddate VARCHAR(200)
)
AS
BEGIN
    UPDATE Projects SET 
        projectname=@projectname, 
        description=@description, 
        createdate=@createdate, 
        enddate=@enddate
        
    WHERE project_id = @Project_id
END