CREATE OR ALTER PROCEDURE getOneProject(@project_id VARCHAR(250))
AS
BEGIN
    SELECT * FROM Projects WHERE project_id = @project_id;

   
END